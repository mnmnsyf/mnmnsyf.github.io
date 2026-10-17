<template>
  <ol class="news">
    <li v-for="(item, i) in news" :key="item.date + item.text" v-reveal="i * 50">
      <time class="date">{{ item.date }}</time>
      <div class="body">
        <p>{{ item.text }}</p>
        <nav v-if="item.links?.length" class="link-row" :aria-label="`${item.date} links`">
          <a v-for="l in item.links" :key="l.href" :href="l.href" target="_blank" rel="noopener"
            >{{ l.label }} <span aria-hidden="true">↗</span></a
          >
        </nav>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { news } from '@/data/news'
</script>

<style scoped>
.news li {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 48px;
  padding: 28px 0;
  border-top: 1px solid var(--rule);
}
.news li:first-child {
  border-top-color: var(--text);
}
.date {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  padding-top: 5px;
}
.body p {
  font-size: 19px;
  line-height: 1.6;
  max-width: 62ch;
}
.body .link-row {
  margin-top: 12px;
}
@media (max-width: 860px) {
  .news li {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 22px 0;
  }
  .body p {
    font-size: 17px;
  }
}
</style>
