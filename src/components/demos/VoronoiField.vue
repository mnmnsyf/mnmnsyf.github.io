<template>
  <div ref="host" class="voronoi-field" :class="{ ready, fallback }">
    <canvas ref="canvas" aria-hidden="true"></canvas>
    <div class="field-hud" aria-hidden="true">
      <span>VORONOI · WEBGL2</span>
      <span>{{ count }} SITES</span>
      <span>{{ fps }} FPS</span>
      <span>RES {{ scaleLabel }}×</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { readColor } from '@/theme'

/*
 * A live Voronoi partition drawn per pixel in a fragment shader. Sites drift
 * through a slow flow field, keep their distance from one another, and are
 * pushed aside by the pointer; clicking adds a site. Near the pointer the
 * shader also draws iso-contours of the distance field.
 *
 * Rendering resolution adapts to frame time so integrated GPUs stay smooth.
 */

const MAX_SITES = 64

const host = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
const fallback = ref(false)
const count = ref(0)
const fps = ref(60)
const scale = ref(1)
const scaleLabel = computed(() => scale.value.toFixed(2))

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uPx;
uniform vec2 uSites[${MAX_SITES}];
uniform int uCount;
uniform vec2 uMouse;
uniform float uMouseOn;
uniform int uMouseCell;
uniform float uTime;
uniform vec3 uBg;
uniform vec3 uInk;
uniform vec3 uLine;
uniform vec3 uAccent;
out vec4 outColor;

float hash(float n) { return fract(sin(n * 12.9898) * 43758.5453); }

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);

  float d1 = 1e12;
  int nearest = 0;
  for (int i = 0; i < ${MAX_SITES}; i++) {
    if (i >= uCount) break;
    vec2 d = uSites[i] - p;
    float dd = dot(d, d);
    if (dd < d1) { d1 = dd; nearest = i; }
  }
  vec2 a = uSites[nearest];

  // Distance to the cell boundary: the nearest perpendicular bisector.
  float edge = 1e12;
  for (int i = 0; i < ${MAX_SITES}; i++) {
    if (i >= uCount) break;
    if (i == nearest) continue;
    vec2 n = uSites[i] - a;
    float len = length(n);
    if (len < 1e-3) continue;
    edge = min(edge, abs(dot(p - 0.5 * (a + uSites[i]), n / len)));
  }

  float md = length(p - uMouse);
  float radius = 190.0 * uPx;
  float focus = uMouseOn * exp(-md * md / (2.0 * radius * radius));

  float h = hash(float(nearest) + 1.0);
  vec3 col = mix(uBg, uInk, 0.012 + 0.03 * h);
  if (nearest == uMouseCell) col = mix(col, uAccent, 0.07 * uMouseOn);

  float w = (0.55 + 0.9 * focus) * uPx;
  float line = 1.0 - smoothstep(w - 0.5, w + 0.8, edge);
  col = mix(col, mix(uLine, uAccent, focus), line);

  float sd = sqrt(d1);
  float r = sd / (16.0 * uPx);
  float toInt = 0.5 - abs(fract(r) - 0.5);
  float ring = (1.0 - smoothstep(0.0, fwidth(r) * 1.3, toInt)) * focus * 0.38;
  col = mix(col, uAccent, ring);

  float site = 1.0 - smoothstep(1.3 * uPx, 2.3 * uPx, sd);
  col = mix(col, mix(uInk, uAccent, focus), site * 0.9);

  float fade = smoothstep(0.5, 1.0, p.y / uRes.y);
  col = mix(col, uBg, fade * 0.92);

  col += (hash(dot(p, vec2(12.9898, 78.233)) + fract(uTime)) - 0.5) * 0.022;
  outColor = vec4(col, 1.0);
}`

interface Site {
  x: number
  y: number
  vx: number
  vy: number
}

let gl: WebGL2RenderingContext | null = null
let program: WebGLProgram | null = null
let uniforms: Record<string, WebGLUniformLocation | null> = {}
let sites: Site[] = []
let insertAt = 0
let width = 0
let height = 0
let raf = 0
let running = false
let visible = true
let reducedMotion = false
const mouse = { x: -1e4, y: -1e4, on: 0, target: 0 }
const sitePositions = new Float32Array(MAX_SITES * 2)
let colors = {
  bg: [1, 1, 1] as number[],
  ink: [0, 0, 0] as number[],
  line: [0.5, 0.5, 0.5] as number[],
  accent: [1, 0.4, 0.2] as number[],
}
let resizeObserver: ResizeObserver | undefined
let intersection: IntersectionObserver | undefined
let motionQuery: MediaQueryList | undefined

function compile(type: number, source: string) {
  const shader = gl!.createShader(type)!
  gl!.shaderSource(shader, source)
  gl!.compileShader(shader)
  if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
    throw new Error(gl!.getShaderInfoLog(shader) ?? 'shader compile failed')
  }
  return shader
}

function initGl(): boolean {
  gl = canvas.value!.getContext('webgl2', { antialias: false, alpha: false })
  if (!gl) return false
  try {
    program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false
  } catch {
    return false
  }
  gl.useProgram(program)
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  for (const name of [
    'uRes',
    'uPx',
    'uSites',
    'uCount',
    'uMouse',
    'uMouseOn',
    'uMouseCell',
    'uTime',
    'uBg',
    'uInk',
    'uLine',
    'uAccent',
  ]) {
    uniforms[name] = gl.getUniformLocation(program, name)
  }
  return true
}

function readTheme() {
  colors = {
    bg: readColor('--gl-bg'),
    ink: readColor('--gl-ink'),
    line: readColor('--gl-line'),
    accent: readColor('--gl-accent'),
  }
  if (!running) draw(performance.now())
}

/** Mitchell's best-candidate sampling: an even, organic first layout. */
function seed(n: number) {
  sites = []
  for (let i = 0; i < n; i++) {
    let best = { x: 0, y: 0 }
    let bestDistance = -1
    for (let k = 0; k < 12; k++) {
      const c = { x: Math.random() * width, y: Math.random() * height }
      let closest = Infinity
      for (const s of sites) closest = Math.min(closest, (s.x - c.x) ** 2 + (s.y - c.y) ** 2)
      if (closest > bestDistance) {
        bestDistance = closest
        best = c
      }
    }
    sites.push({ ...best, vx: 0, vy: 0 })
  }
  insertAt = 0
  count.value = sites.length
}

function addSite(x: number, y: number) {
  for (const s of sites) {
    const dx = s.x - x
    const dy = s.y - y
    const d = Math.hypot(dx, dy) || 1
    if (d < 220) {
      const push = (1 - d / 220) * 7
      s.vx += (dx / d) * push
      s.vy += (dy / d) * push
    }
  }
  const site = { x, y, vx: 0, vy: 0 }
  if (sites.length < MAX_SITES) sites.push(site)
  else {
    sites[insertAt] = site
    insertAt = (insertAt + 1) % MAX_SITES
  }
  count.value = sites.length
  if (!running) draw(performance.now())
}

function step(t: number, dt: number) {
  const k = dt * 60
  const spacing = Math.sqrt((width * height) / Math.max(sites.length, 1)) * 0.85
  for (let i = 0; i < sites.length; i++) {
    const s = sites[i]!
    // Slow divergence-free-ish drift.
    s.vx += Math.sin(s.y * 0.0035 + t * 0.00021 + i) * 0.012 * k
    s.vy += Math.cos(s.x * 0.0031 - t * 0.00017 + i * 0.7) * 0.012 * k
    // Separation keeps the partition readable.
    for (let j = i + 1; j < sites.length; j++) {
      const o = sites[j]!
      const dx = s.x - o.x
      const dy = s.y - o.y
      const d2 = dx * dx + dy * dy
      if (d2 > spacing * spacing || d2 < 1e-4) continue
      const d = Math.sqrt(d2)
      const f = ((1 - d / spacing) * 0.05 * k) / d
      s.vx += dx * f
      s.vy += dy * f
      o.vx -= dx * f
      o.vy -= dy * f
    }
    // The pointer parts the field.
    if (mouse.on > 0.01) {
      const dx = s.x - mouse.x
      const dy = s.y - mouse.y
      const d = Math.hypot(dx, dy) || 1
      if (d < 170) {
        const f = (1 - d / 170) ** 2 * 0.9 * mouse.on * k
        s.vx += (dx / d) * f
        s.vy += (dy / d) * f
      }
    }
    const damping = Math.pow(0.93, k)
    s.vx *= damping
    s.vy *= damping
    const speed = Math.hypot(s.vx, s.vy)
    if (speed > 6) {
      s.vx *= 6 / speed
      s.vy *= 6 / speed
    }
    s.x += s.vx * k
    s.y += s.vy * k
    if (s.x < 0 || s.x > width) {
      s.vx *= -0.6
      s.x = Math.min(Math.max(s.x, 0), width)
    }
    if (s.y < 0 || s.y > height) {
      s.vy *= -0.6
      s.y = Math.min(Math.max(s.y, 0), height)
    }
  }
}

function draw(t: number) {
  if (!gl || !canvas.value) return
  const px = canvas.value.width / Math.max(width, 1)
  let mouseCell = -1
  let best = Infinity
  sites.forEach((s, i) => {
    sitePositions[i * 2] = s.x * px
    sitePositions[i * 2 + 1] = s.y * px
    const d = (s.x - mouse.x) ** 2 + (s.y - mouse.y) ** 2
    if (d < best) {
      best = d
      mouseCell = i
    }
  })
  gl.viewport(0, 0, canvas.value.width, canvas.value.height)
  gl.uniform2f(uniforms.uRes!, canvas.value.width, canvas.value.height)
  gl.uniform1f(uniforms.uPx!, px)
  gl.uniform2fv(uniforms.uSites!, sitePositions)
  gl.uniform1i(uniforms.uCount!, sites.length)
  gl.uniform2f(uniforms.uMouse!, mouse.x * px, mouse.y * px)
  gl.uniform1f(uniforms.uMouseOn!, mouse.on)
  gl.uniform1i(uniforms.uMouseCell!, mouseCell)
  gl.uniform1f(uniforms.uTime!, t / 1000)
  gl.uniform3fv(uniforms.uBg!, colors.bg)
  gl.uniform3fv(uniforms.uInk!, colors.ink)
  gl.uniform3fv(uniforms.uLine!, colors.line)
  gl.uniform3fv(uniforms.uAccent!, colors.accent)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

function resize() {
  if (!host.value || !canvas.value) return
  const rect = host.value.getBoundingClientRect()
  const firstLayout = width === 0
  const oldW = width || rect.width
  const oldH = height || rect.height
  width = rect.width
  height = rect.height
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * scale.value
  canvas.value.width = Math.max(1, Math.round(width * dpr))
  canvas.value.height = Math.max(1, Math.round(height * dpr))
  if (firstLayout) seed(width < 700 ? 22 : 40)
  else
    for (const s of sites) {
      s.x *= width / oldW
      s.y *= height / oldH
    }
  if (!running) draw(performance.now())
}

// Frame loop with adaptive resolution.
let last = 0
let frameTimes: number[] = []
let lastAdapt = 0
function frame(t: number) {
  if (!running) return
  const dt = Math.min((t - (last || t)) / 1000, 1 / 20)
  if (last) frameTimes.push(t - last)
  last = t
  mouse.on += (mouse.target - mouse.on) * Math.min(1, dt * 6)
  step(t, dt)
  draw(t)
  if (t - lastAdapt > 1000 && frameTimes.length > 10) {
    const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length
    fps.value = Math.round(1000 / avg)
    const old = scale.value
    if (avg > 21 && scale.value > 0.5) scale.value = Math.max(0.5, scale.value - 0.15)
    else if (avg < 14 && scale.value < 1) scale.value = Math.min(1, scale.value + 0.1)
    if (old !== scale.value) resize()
    frameTimes = []
    lastAdapt = t
  }
  raf = requestAnimationFrame(frame)
}

function updateRunning() {
  const shouldRun = visible && !document.hidden && !reducedMotion && !!gl
  if (shouldRun && !running) {
    running = true
    last = 0
    lastAdapt = performance.now()
    raf = requestAnimationFrame(frame)
  } else if (!shouldRun && running) {
    running = false
    cancelAnimationFrame(raf)
  }
}

function localPoint(event: PointerEvent) {
  const rect = canvas.value!.getBoundingClientRect()
  return { x: event.clientX - rect.left, y: event.clientY - rect.top, rect }
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  const { x, y, rect } = localPoint(event)
  const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
  mouse.x = x
  mouse.y = y
  mouse.target = inside ? 1 : 0
  if (!running) {
    mouse.on = mouse.target
    draw(performance.now())
  }
}

function onPointerDown(event: PointerEvent) {
  const target = event.target as Element | null
  if (target?.closest('a, button, input, [data-no-site]')) return
  const { x, y } = localPoint(event)
  addSite(x, y)
}

function onVisibility() {
  updateRunning()
}
function onMotionChange() {
  reducedMotion = motionQuery?.matches ?? false
  updateRunning()
}

onMounted(() => {
  if (!canvas.value || !host.value) return
  if (!initGl()) {
    fallback.value = true
    return
  }
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)
  readTheme()
  resize()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host.value)
  intersection = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false
    updateRunning()
  })
  intersection.observe(host.value)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  host.value.parentElement?.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('themechange', readTheme)
  canvas.value.addEventListener('webglcontextlost', (e) => {
    e.preventDefault()
    running = false
    cancelAnimationFrame(raf)
    fallback.value = true
  })
  ready.value = true
  updateRunning()
})

onBeforeUnmount(() => {
  running = false
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  intersection?.disconnect()
  motionQuery?.removeEventListener('change', onMotionChange)
  window.removeEventListener('pointermove', onPointerMove)
  host.value?.parentElement?.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('themechange', readTheme)
  gl?.getExtension('WEBGL_lose_context')?.loseContext()
  gl = null
})
</script>

<style scoped>
.voronoi-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
canvas {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1.2s ease;
}
.ready canvas {
  opacity: 1;
}
.fallback canvas {
  display: none;
}
.fallback {
  background-image:
    linear-gradient(var(--rule) 1px, transparent 1px),
    linear-gradient(90deg, var(--rule) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, #000 30%, transparent 95%);
}
.field-hud {
  position: absolute;
  right: var(--gutter);
  top: calc(var(--header-h) + 20px);
  display: flex;
  gap: 18px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}
.fallback .field-hud {
  display: none;
}
@media (max-width: 760px) {
  .field-hud {
    display: none;
  }
}
</style>
