<template>
  <figure class="illustration">
    <img
      :src="assetUrl(illustration.src)"
      :alt="illustration.alt"
      :width="dimensions?.width"
      :height="dimensions?.height"
      loading="lazy"
      decoding="async"
    />
    <figcaption>
      <span class="illustration-kind">Illustration</span>{{ illustration.caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { assetUrl } from '@/assetUrl'
import { mediaDimensions } from '@/data/mediaDimensions'
import type { Illustration } from '@/data/types'

const props = defineProps<{ illustration: Illustration }>()
const dimensions = computed(() => mediaDimensions[props.illustration.src])
</script>

<style scoped>
.illustration {
  margin: 0;
  border: 1px solid var(--rule);
  border-radius: 10px;
  overflow: hidden;
  /* The artwork is drawn on light paper; keep it on that paper in dark mode too. */
  background: #f3f2ee;
}
img {
  width: 100%;
  height: auto;
}
figcaption {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
  padding: 10px 14px;
  border-top: 1px solid var(--rule);
  background: var(--bg-raised);
  font-size: 13px;
  color: var(--text-muted);
}
.illustration-kind {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}
</style>
