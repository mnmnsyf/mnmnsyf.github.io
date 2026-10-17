import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export interface CanvasFrame {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  /** Seconds since the previous frame, clamped so a background tab cannot explode a simulation. */
  dt: number
  time: number
}

/**
 * A device-pixel-ratio aware 2D canvas with a requestAnimationFrame loop that
 * only runs while the canvas is on screen and the tab is visible. With reduced
 * motion the loop still runs, since these demos respond to direct input; the
 * caller decides what to animate on its own.
 */
export function useCanvasLoop(
  canvas: Ref<HTMLCanvasElement | null>,
  options: {
    setup?: (width: number, height: number) => void
    resize?: (width: number, height: number) => void
    frame: (frame: CanvasFrame) => void
  },
) {
  let ctx: CanvasRenderingContext2D | null = null
  let width = 0
  let height = 0
  let raf = 0
  let last = 0
  let visible = false
  let running = false
  let resizeObserver: ResizeObserver | undefined
  let intersection: IntersectionObserver | undefined

  function measure() {
    const el = canvas.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const first = width === 0
    width = rect.width
    height = rect.height
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    el.width = Math.round(width * dpr)
    el.height = Math.round(height * dpr)
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (first) options.setup?.(width, height)
    else options.resize?.(width, height)
  }

  function tick(t: number) {
    if (!running || !ctx) return
    const dt = Math.min((t - (last || t)) / 1000, 1 / 30)
    last = t
    options.frame({ ctx, width, height, dt, time: t / 1000 })
    raf = requestAnimationFrame(tick)
  }

  function update() {
    const shouldRun = visible && !document.hidden
    if (shouldRun && !running) {
      running = true
      last = 0
      raf = requestAnimationFrame(tick)
    } else if (!shouldRun && running) {
      running = false
      cancelAnimationFrame(raf)
    }
  }

  onMounted(() => {
    const el = canvas.value
    if (!el) return
    ctx = el.getContext('2d')
    if (!ctx) return
    measure()
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(el)
    intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false
      update()
    })
    intersection.observe(el)
    document.addEventListener('visibilitychange', update)
  })

  onBeforeUnmount(() => {
    running = false
    cancelAnimationFrame(raf)
    resizeObserver?.disconnect()
    intersection?.disconnect()
    document.removeEventListener('visibilitychange', update)
  })

  /** Pointer position in canvas CSS pixels. */
  function point(event: PointerEvent) {
    const rect = canvas.value!.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  return { point }
}
