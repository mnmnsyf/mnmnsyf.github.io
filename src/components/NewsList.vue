<template>
  <ul class="news measure prose">
    <li v-for="(item, i) in news" :key="item.date + item.text" v-reveal="i * 60">
      <span class="date">{{ item.date }}</span>
      <span class="body">
        {{ item.text }}
        <template v-for="l in item.links ?? []" :key="l.href">
          <a :href="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
        </template>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { news } from '@/data/news'
</script>

<style scoped>
.news li {
  display: flex;
  gap: 1rem;
  font-size: 0.94rem;
}

.news li + li {
  margin-top: 0.7rem;
}

.date {
  flex: 0 0 5.5rem;
  color: var(--text-faint);
  font-variant-numeric: tabular-nums;
}

.body {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .news li {
    flex-direction: column;
    gap: 0.1rem;
  }

  .date {
    flex: none;
    font-size: 0.85rem;
  }
}
</style>
