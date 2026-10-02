<template>
  <figure class="figure">
    <video
      v-if="media.kind === 'video'"
      controls
      preload="metadata"
      :poster="media.poster"
      :aria-label="media.alt"
      :width="dimensions?.width"
      :height="dimensions?.height"
    >
      <source :src="media.src" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img
      v-else
      :src="media.src"
      :alt="media.alt"
      :width="dimensions?.width"
      :height="dimensions?.height"
      loading="lazy"
    />
    <figcaption v-if="media.caption" class="caption">{{ media.caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { Media } from '@/data/types'
import { computed } from 'vue'
import { mediaDimensions } from '@/data/mediaDimensions'

const props = defineProps<{ media: Media }>()
const dimensions = computed(
  () => mediaDimensions[props.media.src] ?? mediaDimensions[props.media.poster ?? ''],
)
</script>

<style scoped>
.figure {
  margin: 0;
  min-width: 0;
}

video {
  width: 100%;
  background: var(--bg-inset);
}

/* No `width: 100%` on stills: a render upscaled past its native size just looks
   soft. Narrower sources sit centred in their cell instead. */
img {
  max-width: 100%;
  margin-inline: auto;
  background: var(--bg-inset);
}
</style>
