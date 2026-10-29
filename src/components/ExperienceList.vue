<template>
  <ol class="experience">
    <li v-for="item in items" :key="item.org + item.period" v-reveal class="entry">
      <div class="when">
        <span class="period">{{ item.period }}</span>
        <span v-if="item.location" class="location">{{ item.location }}</span>
      </div>
      <div class="what">
        <h2 class="role">{{ item.role }}</h2>
        <p class="org">{{ item.org }}</p>
        <p v-if="item.advisor" class="advisor">
          {{ t('Advised by') }}
          <a :href="item.advisor.href" target="_blank" rel="noopener">{{ item.advisor.label }}</a>
        </p>
        <ul class="bullets">
          <li v-for="(b, i) in item.bullets" :key="i">{{ b }}</li>
        </ul>
        <nav class="link-row experience-links" :aria-label="`${item.role} ${t('resources')}`">
          <a
            v-for="link in item.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            >{{ link.label }} <span aria-hidden="true">↗</span></a
          >
        </nav>
        <MediaGrid
          v-if="item.media?.length"
          class="experience-media"
          :items="item.media"
          :columns="1"
        />
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { experience } from '@/data/experience'
import { localize, t } from '@/i18n'

import MediaGrid from './MediaGrid.vue'

const items = computed(() => localize(experience))
</script>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 48px;
  padding: 44px 0;
  border-top: 1px solid var(--rule);
}
.entry:first-child {
  border-top-color: var(--text);
}
.when {
  display: grid;
  align-content: start;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  position: sticky;
  top: calc(var(--header-h) + 32px);
  align-self: start;
}
.period {
  color: var(--text);
}
.role {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 32px;
  line-height: 1.15;
}
.org {
  margin: 8px 0 0;
  color: var(--text-muted);
}
.advisor {
  margin: 2px 0 0;
  color: var(--text-muted);
  font-size: 15px;
}
.bullets {
  margin-top: 20px;
  display: grid;
  gap: 10px;
  color: var(--text-muted);
  max-width: 70ch;
}
.bullets li {
  position: relative;
  padding-left: 22px;
}
.bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.85em;
  width: 10px;
  height: 1px;
  background: var(--accent);
}
.experience-links {
  margin-top: 22px;
}
.experience-media {
  margin-top: 28px;
  max-width: 520px;
}
.experience-media :deep(img) {
  width: 100%;
  border-radius: 6px;
  border: 1px solid var(--rule);
}
@media (max-width: 860px) {
  .entry {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 32px 0;
  }
  .when {
    position: static;
    display: flex;
    flex-wrap: wrap;
    gap: 4px 14px;
  }
  .role {
    font-size: 27px;
  }
}
</style>
