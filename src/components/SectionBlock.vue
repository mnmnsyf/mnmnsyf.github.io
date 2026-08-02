<template>
  <section :id="id" class="section">
    <h2 class="section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{ id: string; title: string }>()
</script>
