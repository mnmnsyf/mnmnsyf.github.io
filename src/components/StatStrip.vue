<template>
  <dl ref="root" class="stats">
    <div v-for="(stat, index) in stats" :key="stat.label" class="stat">
      <dt>{{ stat.label }}</dt>
      <dd>
        <span class="stat-value">{{ display[index] }}</span
        ><span class="stat-suffix">{{ stat.suffix }}</span>
      </dd>
      <p class="stat-source">{{ stat.source }}</p>
    </div>
  </dl>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Figures quoted from the experience and research entries. */
const stats = [
  {
    value: 10000,
    suffix: '+',
    label: 'entities rendered with GPU instancing',
    source: 'Mandate Order · Digital Sky',
  },
  {
    value: 1000,
    suffix: '+',
    label: 'concurrent agents on dynamic road-graph routing',
    source: 'Multi-source Dijkstra',
  },
  {
    value: 85,
    suffix: '%',
    label: 'less connectivity overhead at 2,000+ units',
    source: 'KD-tree + C++ templates',
  },
  {
    value: 19977,
    suffix: '',
    label: 'articulated objects in ArticulateArena-20K',
    source: 'arXiv · second author',
  },
]

const format = new Intl.NumberFormat('en-US')
// Server render and no-JS both show final values; the count-up is an enhancement.
const display = ref(stats.map((stat) => format.format(stat.value)))
const root = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined
let raf = 0

function countUp() {
  const start = performance.now()
  const duration = 1400
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 4)
    display.value = stats.map((stat) => format.format(Math.round(stat.value * eased)))
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !root.value) return
  display.value = stats.map(() => '0')
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      observer?.disconnect()
      countUp()
    },
    { threshold: 0.4 },
  )
  observer.observe(root.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(raf)
})
</script>
