<template>
  <div class="grid" :class="`cols-${Math.min(items.length, 3)}`">
    <MediaFigure v-for="m in items" :key="m.src" :media="m" />
  </div>
</template>

<script setup lang="ts">
import type { Media } from '@/data/types'
import MediaFigure from './MediaFigure.vue'

defineProps<{ items: Media[] }>()
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
}

.cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 700px) {
  .cols-2,
  .cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>
