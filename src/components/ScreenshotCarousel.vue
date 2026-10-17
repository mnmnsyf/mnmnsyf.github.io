<template>
  <section
    ref="root"
    class="screenshot-carousel"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="focused = true"
    @focusout="onFocusOut"
    @keydown.left.prevent="previous"
    @keydown.right.prevent="next"
  >
    <div class="carousel-window">
      <div class="carousel-track" :style="{ transform: `translateX(-${active * 100}%)` }">
        <a
          v-for="(slide, index) in slides"
          :key="slide.src"
          :href="assetUrl(slide.src)"
          class="carousel-slide"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Open full-size screenshot ${index + 1}: ${slide.alt}`"
          :aria-hidden="index !== active"
          :tabindex="index === active ? 0 : -1"
        >
          <img
            :src="assetUrl(slide.src)"
            :alt="slide.alt"
            width="1920"
            height="1080"
            :loading="index === 0 ? 'eager' : 'lazy'"
            decoding="async"
          />
        </a>
      </div>
    </div>
    <div class="carousel-controls">
      <div class="carousel-arrows">
        <button type="button" aria-label="Previous screenshot" @click="previous">←</button>
        <button type="button" aria-label="Next screenshot" @click="next">→</button>
      </div>
      <div class="carousel-dots" aria-label="Choose screenshot">
        <button
          v-for="(slide, index) in slides"
          :key="slide.src"
          type="button"
          :aria-label="`Show screenshot ${index + 1}`"
          :aria-pressed="index === active"
          @click="select(index)"
        >
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="carousel-playback">
        <span class="carousel-count" aria-live="off"
          >{{ String(active + 1).padStart(2, '0') }} /
          {{ String(slides.length).padStart(2, '0') }}</span
        >
        <button
          v-if="!reducedMotion"
          type="button"
          :aria-label="paused ? 'Play slideshow' : 'Pause slideshow'"
          @click="togglePause"
        >
          <span aria-hidden="true">{{ paused ? '▶' : 'Ⅱ' }}</span>
        </button>
      </div>
    </div>
    <p class="carousel-credit">
      Official game screenshots ·
      <a :href="mandateOrderScreenshotSource" target="_blank" rel="noopener noreferrer">Steam ↗</a>
    </p>
  </section>
</template>

<script setup lang="ts">
import { assetUrl } from '@/assetUrl'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createCarouselState } from './carouselState'
import { mandateOrderScreenshotSource, type Screenshot } from '@/data/mandateOrderScreenshots'
const props = withDefaults(defineProps<{ slides: Screenshot[]; label?: string }>(), {
  label: 'Mandate Order screenshots',
})
const { active, paused, select, next, previous, togglePause, advance } = createCarouselState(
  props.slides.length,
)
const root = ref<HTMLElement | null>(null)
const hovered = ref(false)
const focused = ref(false)
const reducedMotion = ref(false)
let visible = false
let observer: IntersectionObserver | undefined
let timer: ReturnType<typeof setInterval> | undefined
let mediaQuery: MediaQueryList | undefined
function updateMotion() {
  reducedMotion.value = mediaQuery?.matches ?? false
}
function onFocusOut(event: FocusEvent) {
  focused.value = !!root.value?.contains(event.relatedTarget as Node | null)
}
onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotion()
  mediaQuery.addEventListener('change', updateMotion)
  observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry?.isIntersecting ?? false
    },
    { threshold: 0.25 },
  )
  if (root.value) observer.observe(root.value)
  timer = setInterval(
    () =>
      advance({
        visible: visible && !document.hidden,
        interacting: hovered.value || focused.value,
        reducedMotion: reducedMotion.value,
      }),
    5000,
  )
})
onBeforeUnmount(() => {
  clearInterval(timer)
  observer?.disconnect()
  mediaQuery?.removeEventListener('change', updateMotion)
})
</script>

<style scoped>
.screenshot-carousel {
  min-width: 0;
  container-type: inline-size;
}
.carousel-window {
  overflow: hidden;
  background: var(--bg-inset);
  aspect-ratio: 16 / 9;
}
.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
  display: block;
}
.carousel-slide:focus-visible {
  outline-offset: -5px;
}
.carousel-slide img {
  width: 100%;
  height: 100%;
  max-height: none;
  object-fit: cover;
}
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 0 0;
}
.carousel-arrows,
.carousel-playback,
.carousel-dots {
  display: flex;
  align-items: center;
}
.carousel-controls button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  min-height: 38px;
  color: var(--accent);
}
.carousel-arrows button {
  font-size: 23px;
}
.carousel-controls button:hover {
  background: var(--bg-inset);
}
.carousel-dots button {
  min-width: 28px;
}
.carousel-dots span {
  display: block;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  border: 1px solid var(--accent);
}
.carousel-dots button[aria-pressed='true'] span {
  background: var(--accent);
}
.carousel-count {
  font-size: 12px;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.carousel-credit {
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-muted);
}
@container (max-width: 320px) {
  .carousel-controls {
    gap: 2px;
  }
  .carousel-controls button {
    min-width: 30px;
  }
  .carousel-dots button {
    min-width: 22px;
  }
  .carousel-count {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    transition: none;
  }
}
</style>
