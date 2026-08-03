<template>
  <svg
    class="glyph"
    :viewBox="glyph.viewBox"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="glyph.path" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IconName } from '@/data/site'

const props = defineProps<{ name: IconName }>()

/* Single-path glyphs so the whole set stays inline — no icon font, no CDN. */
const glyphs: Record<IconName, { viewBox: string; path: string }> = {
  mail: {
    viewBox: '0 0 24 24',
    path: 'M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.5L12 12.3 19.8 6H4.2ZM20 8.1l-7.4 5.9a1 1 0 0 1-1.2 0L4 8.1V18h16V8.1Z',
  },
  github: {
    viewBox: '0 0 24 24',
    path: 'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.34 1.12 2.91.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.48A10.14 10.14 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z',
  },
  cv: {
    viewBox: '0 0 24 24',
    path: 'M6 2h8l6 6v14H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 2v5h5l-5-5ZM8 12h8v2H8v-2Zm0 4h8v2H8v-2Z',
  },
  linkedin: {
    viewBox: '0 0 24 24',
    path: 'M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.5 2.5 0 0 1 4.98 3.5ZM3 8.98h4V21H3V8.98ZM9.5 8.98h3.83v1.64h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V8.98Z',
  },
  scholar: {
    viewBox: '0 0 24 24',
    path: 'M12 2 1 8l11 6 11-6-11-6Zm-7 9.2v3.4c0 2.1 3.1 3.9 7 3.9s7-1.8 7-3.9v-3.4l-7 3.8-7-3.8Z',
  },
}

const glyph = computed(() => glyphs[props.name])
</script>

<style scoped>
.glyph {
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: -0.12em;
}
</style>
