<template>
  <DemoFrame
    label="Mass-spring soft body · 2D"
    hint="drag any node · flick it into the sphere"
    caption="A small in-browser re-creation of the idea, not the original C++ code: structural, shear and bend springs, constraint-based collisions, and an area-preserving pressure force. Springs colour by strain."
  >
    <canvas
      ref="canvas"
      role="img"
      aria-label="Interactive mass-spring soft body that can be dragged with the pointer"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    ></canvas>
    <template #readout>
      {{ particleCount }} nodes · {{ springCount }} springs · area {{ areaPercent }}%
    </template>
    <template #controls>
      <button type="button" :aria-pressed="pressure" @click="pressure = !pressure">
        Pressure {{ pressure ? 'on' : 'off' }}
      </button>
      <button type="button" :aria-pressed="showSprings" @click="showSprings = !showSprings">
        Springs
      </button>
      <button type="button" @click="drop">Drop again</button>
      <span>semi-implicit Euler · {{ SUBSTEPS }} substeps</span>
    </template>
  </DemoFrame>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoFrame from './DemoFrame.vue'
import { useCanvasLoop } from './useCanvasLoop'
import { cssColor } from '@/theme'

const COLS = 8
const ROWS = 6
const SUBSTEPS = 12
const GRAVITY = 1500

interface Spring {
  a: number
  b: number
  rest: number
  k: number
  kind: 'structural' | 'shear' | 'bend'
}

const canvas = ref<HTMLCanvasElement | null>(null)
const pressure = ref(true)
const showSprings = ref(true)
const particleCount = COLS * ROWS
const springCount = ref(0)
const areaPercent = ref(100)

const px = new Float32Array(COLS * ROWS)
const py = new Float32Array(COLS * ROWS)
const vx = new Float32Array(COLS * ROWS)
const vy = new Float32Array(COLS * ROWS)
let springs: Spring[] = []
let boundary: number[] = []
let restArea = 1
let spacing = 20
let sphere = { x: 0, y: 0, r: 0 }
let W = 0
let H = 0
let grabbed = -1
const pointer = { x: 0, y: 0 }

const idx = (c: number, r: number) => r * COLS + c

function polygonArea() {
  let sum = 0
  for (let i = 0; i < boundary.length; i++) {
    const a = boundary[i]!
    const b = boundary[(i + 1) % boundary.length]!
    sum += px[a]! * py[b]! - px[b]! * py[a]!
  }
  return Math.abs(sum) / 2
}

function build(width: number, height: number) {
  W = width
  H = height
  spacing = Math.max(12, Math.min(width / 26, 30))
  sphere = { x: width * 0.62, y: height * 0.72, r: Math.min(width, height) * 0.15 }
  springs = []
  const add = (a: number, b: number, k: number, kind: Spring['kind']) => {
    springs.push({ a, b, rest: 0, k, kind })
  }
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (c + 1 < COLS) add(idx(c, r), idx(c + 1, r), 900, 'structural')
      if (r + 1 < ROWS) add(idx(c, r), idx(c, r + 1), 900, 'structural')
      if (c + 1 < COLS && r + 1 < ROWS) {
        add(idx(c, r), idx(c + 1, r + 1), 500, 'shear')
        add(idx(c + 1, r), idx(c, r + 1), 500, 'shear')
      }
      if (c + 2 < COLS) add(idx(c, r), idx(c + 2, r), 180, 'bend')
      if (r + 2 < ROWS) add(idx(c, r), idx(c, r + 2), 180, 'bend')
    }
  springCount.value = springs.length
  boundary = []
  for (let c = 0; c < COLS; c++) boundary.push(idx(c, 0))
  for (let r = 1; r < ROWS; r++) boundary.push(idx(COLS - 1, r))
  for (let c = COLS - 2; c >= 0; c--) boundary.push(idx(c, ROWS - 1))
  for (let r = ROWS - 2; r > 0; r--) boundary.push(idx(0, r))
  drop()
}

function drop() {
  // Land on the sphere's shoulder so the first thing a visitor sees is a deformation.
  const ox = sphere.x - (COLS - 1) * spacing * 0.95
  const oy = H * 0.06
  const tilt = 0.18
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const i = idx(c, r)
      const lx = c * spacing
      const ly = r * spacing
      px[i] = ox + lx * Math.cos(tilt) - ly * Math.sin(tilt)
      py[i] = oy + lx * Math.sin(tilt) + ly * Math.cos(tilt)
      vx[i] = 20
      vy[i] = 0
    }
  for (const s of springs) s.rest = Math.hypot(px[s.a]! - px[s.b]!, py[s.a]! - py[s.b]!)
  restArea = polygonArea()
}

function substep(h: number) {
  const n = COLS * ROWS
  const fx = new Float32Array(n)
  const fy = new Float32Array(n)
  for (let i = 0; i < n; i++) fy[i] = GRAVITY
  // Hooke springs with damping along the spring axis.
  for (const s of springs) {
    const dx = px[s.b]! - px[s.a]!
    const dy = py[s.b]! - py[s.a]!
    const len = Math.hypot(dx, dy) || 1e-6
    const ux = dx / len
    const uy = dy / len
    const relV = (vx[s.b]! - vx[s.a]!) * ux + (vy[s.b]! - vy[s.a]!) * uy
    const f = s.k * (len - s.rest) + 6 * relV
    fx[s.a]! += f * ux
    fy[s.a]! += f * uy
    fx[s.b]! -= f * ux
    fy[s.b]! -= f * uy
  }
  // Area-preserving pressure on the outline, along each edge's outward normal.
  if (pressure.value) {
    const area = polygonArea()
    const p = ((restArea - area) / restArea) * 2600
    let cx = 0
    let cy = 0
    for (const i of boundary) {
      cx += px[i]!
      cy += py[i]!
    }
    cx /= boundary.length
    cy /= boundary.length
    for (let e = 0; e < boundary.length; e++) {
      const a = boundary[e]!
      const b = boundary[(e + 1) % boundary.length]!
      const ex = px[b]! - px[a]!
      const ey = py[b]! - py[a]!
      let nx = ey
      let ny = -ex
      if (nx * ((px[a]! + px[b]!) / 2 - cx) + ny * ((py[a]! + py[b]!) / 2 - cy) < 0) {
        nx = -nx
        ny = -ny
      }
      const f = p * 0.5
      fx[a]! += nx * f
      fy[a]! += ny * f
      fx[b]! += nx * f
      fy[b]! += ny * f
    }
  }
  // A grabbed node is pulled by a spring anchor to the pointer.
  if (grabbed >= 0) {
    fx[grabbed]! += (pointer.x - px[grabbed]!) * 4000 - vx[grabbed]! * 60
    fy[grabbed]! += (pointer.y - py[grabbed]!) * 4000 - vy[grabbed]! * 60
  }
  for (let i = 0; i < n; i++) {
    vx[i]! += fx[i]! * h
    vy[i]! += fy[i]! * h
    vx[i]! *= 0.9995
    vy[i]! *= 0.9995
    px[i]! += vx[i]! * h
    py[i]! += vy[i]! * h
    collide(i)
  }
}

/** Constraint-based: project out of the obstacle and remove the inward velocity. */
function collide(i: number) {
  const pad = 2
  if (py[i]! > H - pad) {
    py[i] = H - pad
    if (vy[i]! > 0) vy[i] = -vy[i]! * 0.2
    vx[i]! *= 0.96
  }
  if (py[i]! < pad) {
    py[i] = pad
    if (vy[i]! < 0) vy[i] = -vy[i]! * 0.2
  }
  if (px[i]! < pad) {
    px[i] = pad
    if (vx[i]! < 0) vx[i] = -vx[i]! * 0.2
  }
  if (px[i]! > W - pad) {
    px[i] = W - pad
    if (vx[i]! > 0) vx[i] = -vx[i]! * 0.2
  }
  const dx = px[i]! - sphere.x
  const dy = py[i]! - sphere.y
  const d = Math.hypot(dx, dy)
  if (d < sphere.r && d > 0) {
    const nx = dx / d
    const ny = dy / d
    px[i] = sphere.x + nx * sphere.r
    py[i] = sphere.y + ny * sphere.r
    const vn = vx[i]! * nx + vy[i]! * ny
    if (vn < 0) {
      vx[i]! -= 1.2 * vn * nx
      vy[i]! -= 1.2 * vn * ny
    }
  }
}

const { point } = useCanvasLoop(canvas, {
  setup: build,
  resize: (w, h) => {
    const sx = w / W
    const sy = h / H
    for (let i = 0; i < COLS * ROWS; i++) {
      px[i]! *= sx
      py[i]! *= sy
    }
    W = w
    H = h
    sphere = { x: w * 0.62, y: h * 0.72, r: Math.min(w, h) * 0.15 }
  },
  frame({ ctx, width, height, dt }) {
    const h = dt / SUBSTEPS
    for (let s = 0; s < SUBSTEPS; s++) substep(h)
    areaPercent.value = Math.round((polygonArea() / restArea) * 100)

    const ink = cssColor('--text')
    const faint = cssColor('--rule-strong')
    const accent = cssColor('--accent')
    ctx.clearRect(0, 0, width, height)

    ctx.beginPath()
    ctx.arc(sphere.x, sphere.y, sphere.r, 0, Math.PI * 2)
    ctx.strokeStyle = faint
    ctx.lineWidth = 1
    ctx.setLineDash([3, 4])
    ctx.stroke()
    ctx.setLineDash([])

    ctx.beginPath()
    boundary.forEach((i, n) => (n ? ctx.lineTo(px[i]!, py[i]!) : ctx.moveTo(px[i]!, py[i]!)))
    ctx.closePath()
    ctx.fillStyle = accent
    ctx.globalAlpha = 0.1
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeStyle = ink
    ctx.lineWidth = 1.25
    ctx.stroke()

    if (showSprings.value) {
      for (const s of springs) {
        if (s.kind === 'bend') continue
        const len = Math.hypot(px[s.b]! - px[s.a]!, py[s.b]! - py[s.a]!)
        const strain = Math.min(1, Math.abs(len - s.rest) / s.rest / 0.25)
        ctx.strokeStyle = strain > 0.08 ? accent : faint
        ctx.globalAlpha = s.kind === 'shear' ? 0.35 + strain * 0.65 : 0.55 + strain * 0.45
        ctx.lineWidth = 0.75
        ctx.beginPath()
        ctx.moveTo(px[s.a]!, py[s.a]!)
        ctx.lineTo(px[s.b]!, py[s.b]!)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    ctx.fillStyle = ink
    for (let i = 0; i < COLS * ROWS; i++) {
      ctx.beginPath()
      ctx.arc(px[i]!, py[i]!, i === grabbed ? 4 : 1.6, 0, Math.PI * 2)
      ctx.fill()
    }
    if (grabbed >= 0) {
      ctx.strokeStyle = accent
      ctx.beginPath()
      ctx.moveTo(px[grabbed]!, py[grabbed]!)
      ctx.lineTo(pointer.x, pointer.y)
      ctx.stroke()
    }
  },
})

function onDown(event: PointerEvent) {
  const p = point(event)
  let best = -1
  let bestD = 44 * 44
  for (let i = 0; i < COLS * ROWS; i++) {
    const d = (px[i]! - p.x) ** 2 + (py[i]! - p.y) ** 2
    if (d < bestD) {
      bestD = d
      best = i
    }
  }
  if (best < 0) return
  grabbed = best
  pointer.x = p.x
  pointer.y = p.y
  ;(event.target as Element).setPointerCapture(event.pointerId)
}
function onMove(event: PointerEvent) {
  if (grabbed < 0) return
  const p = point(event)
  pointer.x = p.x
  pointer.y = p.y
}
function onUp() {
  grabbed = -1
}
</script>
