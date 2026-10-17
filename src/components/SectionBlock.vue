<template>
  <section :id="id" class="section">
    <header class="section-head">
      <p v-if="index > 0" class="section-kicker" aria-hidden="true">
        <span>{{ String(index + 1).padStart(2, '0') }}</span> /
        {{ String(sections.length).padStart(2, '0') }}
      </p>
      <component :is="headingTag" class="section-title">{{ title }}</component>
    </header>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sections } from '@/data/site'

const props = withDefaults(defineProps<{ id: string; title: string; headingTag?: 'h1' | 'h2' }>(), {
  headingTag: 'h2',
})
const index = computed(() => sections.findIndex((section) => section.id === props.id))
</script>
