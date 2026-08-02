<template>
  <ul class="awards measure">
    <li v-for="a in awards" :key="a.year + a.title">
      <span class="year faint">{{ a.year }}</span>
      <span class="title">{{ a.title }}</span>
      <span v-if="a.org" class="org muted">{{ a.org }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { awards } from '@/data/awards'
</script>

<style scoped>
.awards li {
  display: flex;
  gap: 1rem;
  font-size: 0.92rem;
  padding: 0.35rem 0;
}

.awards li + li {
  border-top: 1px solid var(--rule);
}

.year {
  flex: 0 0 5.5rem;
  font-variant-numeric: tabular-nums;
}

.title {
  flex: 0 0 7rem;
}

@media (max-width: 640px) {
  .awards li {
    flex-wrap: wrap;
    gap: 0 0.6rem;
  }

  .year {
    flex: none;
  }

  .title {
    flex: none;
  }

  .org {
    flex-basis: 100%;
    font-size: 0.86rem;
  }
}
</style>
