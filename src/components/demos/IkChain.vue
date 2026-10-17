<template>
  <DemoFrame
    label="Jacobian IK · 2D chain"
    hint="move the pointer to set the target · it follows a path when idle"
    caption="A planar re-creation of the solver structure, not the original C++ code: damped least squares Δθ = Jᵀ(JJᵀ + λ²I)⁻¹e with per-joint step clamping, or the Jacobian transpose for comparison. Push the target out of reach to see damping keep the chain calm."
  >
    <canvas
      ref="canvas"
      role="img"
      aria-label="Interactive inverse kinematics chain following the pointer"
      @pointermove="onMove"
      @pointerdown="onMove"
      @pointerleave="onLeave"
    ></canvas>
    <template #readout>‖e‖ {{ errorLabel }} px · {{ iterations }} it</template>
    <template #controls>
      <button type="button" :aria-pressed="solver === 'dls'" @click="solver = 'dls'">
        Damped LS
      </button>
      <button type="button" :aria-pressed="solver === 'transpose'" @click="solver = 'transpose'">
        Jᵀ
      </button>
      <label v-if="solver === 'dls'">
        λ
        <input v-model.number="lambda" type="range" min="0" max="60" step="1" />
        <span class="tabular">{{ lambda }}</span>
      </label>
    </template>
  </DemoFrame>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DemoFrame from './DemoFrame.vue'
import { useCanvasLoop } from './useCanvasLoop'
import { cssColor } from '@/theme'

const LENGTHS = [1, 0.85, 0.7, 0.55, 0.42]
const MAX_STEP = 0.12

const canvas = ref<HTMLCanvasElement | null>(null)
const solver = ref<'dls' | 'transpose'>('dls')
const lambda = ref(12)
const error = ref(0)
const iterations = ref(0)
const errorLabel = computed(() => error.value.toFixed(1))

const theta = new Float64Array(LENGTHS.length)
let unit = 40
let base = { x: 0, y: 0 }
const target = { x: 0, y: 0 }
const goal = { x: 0, y: 0 }
let pointerAt = -1e9

function joints() {
  const xs = [base.x]
  const ys = [base.y]
  let angle = -Math.PI / 2
  for (let i = 0; i < LENGTHS.length; i++) {
    angle += theta[i]!
    xs.push(xs[i]! + Math.cos(angle) * LENGTHS[i]! * unit)
    ys.push(ys[i]! + Math.sin(angle) * LENGTHS[i]! * unit)
  }
  return { xs, ys }
}

function solve() {
  let it = 0
  for (; it < 12; it++) {
    const { xs, ys } = joints()
    const n = LENGTHS.length
    const endX = xs[n]!
    const endY = ys[n]!
    let ex = target.x - endX
    let ey = target.y - endY
    const err = Math.hypot(ex, ey)
    error.value = err
    if (err < 0.3) break
    // Subdivide long reaches into bounded steps.
    const cap = unit * 0.6
    if (err > cap) {
      ex *= cap / err
      ey *= cap / err
    }
    // J columns: ∂end/∂θi = perp(end − pi).
    const jx: number[] = []
    const jy: number[] = []
    for (let i = 0; i < n; i++) {
      jx.push(-(endY - ys[i]!))
      jy.push(endX - xs[i]!)
    }
    let dTheta: number[]
    if (solver.value === 'dls') {
      // A = JJᵀ + λ²I (2×2), solve A·w = e, then Δθ = Jᵀw.
      const l2 = lambda.value * lambda.value
      let a = l2
      let b = 0
      let d = l2
      for (let i = 0; i < n; i++) {
        a += jx[i]! * jx[i]!
        b += jx[i]! * jy[i]!
        d += jy[i]! * jy[i]!
      }
      const det = a * d - b * b || 1e-9
      const wx = (d * ex - b * ey) / det
      const wy = (-b * ex + a * ey) / det
      dTheta = jx.map((x, i) => x * wx + jy[i]! * wy)
    } else {
      const g = jx.map((x, i) => x * ex + jy[i]! * ey)
      let jgx = 0
      let jgy = 0
      for (let i = 0; i < n; i++) {
        jgx += jx[i]! * g[i]!
        jgy += jy[i]! * g[i]!
      }
      const alpha = (ex * jgx + ey * jgy) / (jgx * jgx + jgy * jgy || 1e-9)
      dTheta = g.map((v) => v * alpha * 0.5)
    }
    for (let i = 0; i < n; i++) {
      theta[i]! += Math.max(-MAX_STEP, Math.min(MAX_STEP, dTheta[i]!))
    }
  }
  iterations.value = it
}

const { point } = useCanvasLoop(canvas, {
  setup(w, h) {
    layout(w, h)
    for (let i = 0; i < theta.length; i++) theta[i] = i === 0 ? 0.2 : 0.35
  },
  resize: layout,
  frame({ ctx, width, height, time }) {
    if (performance.now() - pointerAt > 1800) {
      // Idle path: a slow Lissajous that sometimes leaves the reachable disc.
      const R = unit * 3.4
      goal.x = base.x + Math.sin(time * 0.7) * R * 1.05
      goal.y = base.y - unit * 1.9 + Math.sin(time * 1.13) * R * 0.55
    }
    target.x += (goal.x - target.x) * 0.2
    target.y += (goal.y - target.y) * 0.2
    solve()

    const ink = cssColor('--text')
    const faint = cssColor('--rule-strong')
    const accent = cssColor('--accent')
    ctx.clearRect(0, 0, width, height)

    const reach = LENGTHS.reduce((a, b) => a + b, 0) * unit
    ctx.setLineDash([3, 5])
    ctx.strokeStyle = faint
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(base.x, base.y, reach, Math.PI, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.beginPath()
    ctx.moveTo(base.x - 22, base.y)
    ctx.lineTo(base.x + 22, base.y)
    ctx.strokeStyle = ink
    ctx.stroke()

    const { xs, ys } = joints()
    const n = LENGTHS.length
    for (let i = 0; i < n; i++) {
      ctx.lineWidth = 7 - i * 1.1
      ctx.lineCap = 'round'
      ctx.strokeStyle = ink
      ctx.beginPath()
      ctx.moveTo(xs[i]!, ys[i]!)
      ctx.lineTo(xs[i + 1]!, ys[i + 1]!)
      ctx.stroke()
    }
    ctx.lineWidth = 1.5
    for (let i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.arc(xs[i]!, ys[i]!, 4.5, 0, Math.PI * 2)
      ctx.fillStyle = cssColor('--bg-raised')
      ctx.fill()
      ctx.strokeStyle = ink
      ctx.stroke()
    }

    // Residual vector and target crosshair.
    ctx.strokeStyle = accent
    ctx.lineWidth = 1
    ctx.setLineDash([2, 3])
    ctx.beginPath()
    ctx.moveTo(xs[n]!, ys[n]!)
    ctx.lineTo(target.x, target.y)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.arc(target.x, target.y, 7, 0, Math.PI * 2)
    ctx.moveTo(target.x - 12, target.y)
    ctx.lineTo(target.x + 12, target.y)
    ctx.moveTo(target.x, target.y - 12)
    ctx.lineTo(target.x, target.y + 12)
    ctx.stroke()
    ctx.fillStyle = accent
    ctx.beginPath()
    ctx.arc(xs[n]!, ys[n]!, 3, 0, Math.PI * 2)
    ctx.fill()
  },
})

function layout(w: number, h: number) {
  unit = Math.min(w / 9.5, h / 4.6)
  base = { x: w / 2, y: h - 18 }
}

function onMove(event: PointerEvent) {
  const p = point(event)
  goal.x = p.x
  goal.y = p.y
  pointerAt = performance.now()
}
function onLeave() {
  pointerAt = -1e9
}
</script>

<style scoped>
.tabular {
  font-variant-numeric: tabular-nums;
  min-width: 2ch;
}
</style>
