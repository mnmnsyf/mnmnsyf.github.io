<template>
  <figure class="figure">
    <video
      v-if="media.kind === 'video'"
      controls
      preload="metadata"
      :poster="media.poster"
      :aria-label="media.alt"
    >
      <source :src="media.src" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img v-else :src="media.src" :alt="media.alt" loading="lazy" />
    <figcaption v-if="media.caption" class="caption">{{ media.caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { Media } from '@/data/types'

defineProps<{ media: Media }>()
</script>

<style scoped>
.figure {
  margin: 0;
  min-width: 0;
}

video,
img {
  width: 100%;
  background: var(--bg-inset);
}
</style>
