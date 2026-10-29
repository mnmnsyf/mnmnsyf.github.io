<template>
  <div ref="root" class="work-index" @pointermove="onMove" @pointerleave="onLeave">
    <ol class="work-rows">
      <li v-for="(item, index) in items" :key="item.href">
        <a
          :href="item.href"
          class="work-row"
          :class="{ dim: hovered >= 0 && hovered !== index }"
          @pointerenter="enter(index, $event)"
          @focus="hovered = index"
          @blur="hovered = -1"
        >
          <span class="work-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="work-title">{{ t(item.title) }}</span>
          <span class="work-kind">{{ t(item.kind) }}</span>
          <span class="work-year">{{ item.year }}</span>
          <span class="work-arrow" aria-hidden="true">→</span>
        </a>
      </li>
    </ol>
    <div
      class="work-preview"
      :class="{ show: hovered >= 0 && pointerFine }"
      :style="{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${tilt}deg)` }"
      aria-hidden="true"
    >
      <img
        v-for="(item, index) in items"
        :key="item.image"
        :src="assetUrl(item.image)"
        alt=""
        loading="lazy"
        :class="{ current: index === hovered, diagram: item.image.endsWith('.svg') }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { assetUrl } from '@/assetUrl'
import { t } from '@/i18n'

const items = [
  {
    title: 'Mandate Order',
    kind: 'Shipped · UE5 · C++',
    year: '2023–25',
    href: '#/projects/project-mo',
    image: '/project-mo-siege.png',
  },
  {
    title: 'ArticulateArena',
    kind: 'Research · co-first author',
    year: '2026',
    href: '#/research/articulatearena',
    image: '/articulatearena-category.png',
  },
  {
    title: 'ANGLE Graphics SDK',
    kind: 'C++ / C# · EGL · GLES',
    year: '2026',
    href: '#/projects/angle-graphics-sdk',
    image: '/angle-sdk-architecture.svg',
  },
  {
    title: 'Path Tracing Denoising',
    kind: 'UE5 · PyTorch · ongoing',
    year: '2026',
    href: '#/projects/path-tracing-denoising',
    image: '/denoising-workflow.svg',
  },
  {
    title: 'Mass-Spring Soft Body',
    kind: 'Simulation · live demo',
    year: '2026',
    href: '#/projects/jello-simulation',
    image: '/jello-scene.jpg',
  },
  {
    title: 'Inverse Kinematics & Skinning',
    kind: 'Animation · live demo',
    year: '2026',
    href: '#/projects/ik-skinning',
    image: '/ik-lbs-vs-dqs.jpg',
  },
]

const root = ref<HTMLElement | null>(null)
const hovered = ref(-1)
const pointerFine = ref(false)
const pos = reactive({ x: 0, y: 0 })
const tilt = ref(0)
const target = { x: 0, y: 0 }
let raf = 0
let running = false
let entering = true

/** The preview trails the pointer with critically damped easing and leans into motion. */
function follow() {
  const dx = target.x - pos.x
  const dy = target.y - pos.y
  pos.x += dx * 0.16
  pos.y += dy * 0.16
  tilt.value += (Math.max(-8, Math.min(8, dx * 0.05)) - tilt.value) * 0.12
  if (Math.abs(dx) + Math.abs(dy) > 0.3 || Math.abs(tilt.value) > 0.05) {
    raf = requestAnimationFrame(follow)
  } else running = false
}

function onMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !root.value) return
  const rect = root.value.getBoundingClientRect()
  target.x = event.clientX - rect.left
  target.y = event.clientY - rect.top
  if (entering) {
    // Appear under the pointer rather than flying in from the last exit point.
    pos.x = target.x
    pos.y = target.y
    entering = false
  }
  if (!running) {
    running = true
    raf = requestAnimationFrame(follow)
  }
}
function enter(index: number, event: PointerEvent) {
  hovered.value = index
  onMove(event)
}
function onLeave() {
  hovered.value = -1
  entering = true
}

onMounted(() => {
  pointerFine.value =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.work-index {
  position: relative;
}
.work-rows {
  border-top: 1px solid var(--rule);
}
.work-row {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) minmax(0, 220px) 72px 24px;
  align-items: baseline;
  gap: 16px;
  padding: 22px 0;
  border-bottom: 1px solid var(--rule);
  color: var(--text);
  transition:
    opacity 0.35s ease,
    padding 0.35s var(--ease-out);
}
.work-row:hover,
.work-row:focus-visible {
  text-decoration: none;
  color: var(--text);
  padding-left: 12px;
}
.work-row.dim {
  opacity: 0.35;
}
.work-number,
.work-kind,
.work-year {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  letter-spacing: 0.02em;
}
.work-title {
  font-family: var(--font-display);
  font-size: clamp(30px, 3.4vw, 46px);
  line-height: 1.05;
  letter-spacing: -0.01em;
}
.work-year {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.work-arrow {
  color: var(--accent);
  transform: translateX(-8px);
  opacity: 0;
  transition:
    transform 0.35s var(--ease-out),
    opacity 0.35s;
}
.work-row:hover .work-arrow,
.work-row:focus-visible .work-arrow {
  transform: none;
  opacity: 1;
}
.work-preview {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  aspect-ratio: 16 / 10;
  margin: -100px 0 0 40px;
  pointer-events: none;
  z-index: 3;
  border-radius: 6px;
  overflow: hidden;
  background: var(--bg-inset);
  box-shadow: 0 24px 60px -18px #00000059;
  clip-path: inset(50% 50% 50% 50% round 6px);
  transition: clip-path 0.45s var(--ease-in-out);
  will-change: transform;
}
.work-preview.show {
  clip-path: inset(0 0 0 0 round 6px);
}
.work-preview img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.12);
  transition:
    opacity 0.35s ease,
    transform 0.6s var(--ease-out);
}
.work-preview img.diagram {
  object-fit: contain;
  padding: 18px;
  background: var(--bg-raised);
}
.work-preview img.current {
  opacity: 1;
  transform: none;
}
@media (max-width: 760px) {
  .work-row {
    grid-template-columns: 30px minmax(0, 1fr) 18px;
    gap: 4px 10px;
    padding: 18px 0;
  }
  .work-kind {
    grid-column: 2;
    grid-row: 2;
  }
  .work-year {
    display: none;
  }
  .work-arrow {
    opacity: 1;
    transform: none;
    grid-column: 3;
    grid-row: 1;
  }
  .work-preview {
    display: none;
  }
}
</style>
