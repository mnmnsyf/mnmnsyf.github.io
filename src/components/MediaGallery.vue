<template>
  <div class="gallery">
    <div class="stage">
      <Transition name="swap" mode="out-in">
        <MediaFigure :key="active.src" :media="active" class="stage-figure" />
      </Transition>
    </div>
    <div v-if="items.length > 1" class="thumbs" role="group" :aria-label="`${label} visuals`">
      <button
        v-for="(item, i) in items"
        :key="item.src"
        type="button"
        class="thumb"
        :aria-pressed="i === index"
        :aria-label="`Show visual ${i + 1}: ${item.alt}`"
        @click="index = i"
      >
        <img
          :src="assetUrl(item.kind === 'video' ? item.poster : item.src)"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span v-if="item.kind === 'video'" class="play" aria-hidden="true">▶</span>
      </button>
      <span class="count" aria-hidden="true"
        >{{ String(index + 1).padStart(2, '0') }} /
        {{ String(items.length).padStart(2, '0') }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { assetUrl } from '@/assetUrl'
import type { Media } from '@/data/types'
import MediaFigure from './MediaFigure.vue'

const props = defineProps<{ items: Media[]; label: string }>()
const index = ref(0)
const active = computed(() => props.items[index.value] ?? props.items[0]!)
</script>

<style scoped>
.gallery {
  min-width: 0;
}
.stage {
  border: 1px solid var(--rule);
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-inset);
}
.stage :deep(.figure img),
.stage :deep(.figure video) {
  width: 100%;
  max-height: 540px;
  object-fit: contain;
}
.stage :deep(.figure a) {
  display: block;
  cursor: zoom-in;
}
.stage :deep(.caption) {
  margin: 0;
  padding: 12px 16px;
  border-top: 1px solid var(--rule);
  background: var(--bg-raised);
}
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.22s ease;
}
.swap-enter-from,
.swap-leave-to {
  opacity: 0;
}
.thumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}
.thumb {
  position: relative;
  width: 76px;
  height: 46px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--rule);
  background: var(--bg-inset);
  opacity: 0.55;
  transition:
    opacity 0.2s,
    border-color 0.2s,
    transform 0.25s var(--ease-out);
}
.thumb:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
.thumb[aria-pressed='true'] {
  opacity: 1;
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent);
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.play {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 11px;
  color: #fff;
  background: #0000004d;
}
.count {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  font-variant-numeric: tabular-nums;
}
@media (max-width: 560px) {
  .thumb {
    width: 58px;
    height: 38px;
  }
}
</style>
