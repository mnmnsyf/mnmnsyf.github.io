<template>
  <figure class="variant">
    <img :src="active.src" :alt="active.alt" loading="lazy" />
    <div class="switch link-row">
      <button
        v-for="v in variants"
        :key="v.src"
        :class="{ active: v.src === active.src }"
        :aria-pressed="v.src === active.src"
        @click="current = v.src"
      >
        {{ v.label }}
      </button>
    </div>
    <figcaption v-if="active.caption" class="caption">{{ active.caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { MediaVariant } from '@/data/types'

const props = defineProps<{ variants: MediaVariant[] }>()

const current = ref(props.variants[0]?.src)
const active = computed(
  () => props.variants.find((v) => v.src === current.value) ?? props.variants[0],
)
</script>

<style scoped>
.variant {
  margin: 0;
  min-width: 0;
}

img {
  width: 100%;
  background: var(--bg-inset);
}

.switch {
  margin-top: 0.6rem;
}

.switch button {
  padding: 0.2rem 0.7rem;
  border: 1px solid var(--rule);
  border-radius: 2px;
  font-size: 0.84rem;
  color: var(--text-muted);
}

.switch button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.switch button.active {
  border-color: var(--accent);
  color: var(--bg);
  background: var(--accent);
}
</style>
