<template>
  <ol v-reveal class="awards">
    <li v-for="a in awards" :key="a.year + a.title">
      <span class="year">{{ t(a.year) }}</span>
      <span class="medal" :data-tier="tier(a.title)">
        <span class="medal-dot" aria-hidden="true"></span>{{ t(a.title) }}
      </span>
      <span v-if="a.org" class="org">{{ t(a.org) }}</span>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { awards } from '@/data/awards'
import { t } from '@/i18n'

function tier(title: string) {
  if (/gold|first/i.test(title)) return 'gold'
  if (/silver/i.test(title)) return 'silver'
  return 'bronze'
}
</script>

<style scoped>
.awards li {
  display: grid;
  grid-template-columns: 240px 180px minmax(0, 1fr);
  gap: 24px;
  align-items: baseline;
  padding: 20px 0;
  border-top: 1px solid var(--rule);
}
.awards li:first-child {
  border-top-color: var(--text);
}
.year {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
}
.medal {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}
.medal-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #b08d57;
  box-shadow: inset 0 0 0 1px #00000026;
}
[data-tier='gold'] .medal-dot {
  background: linear-gradient(135deg, #f3d27a, #b8892c);
}
[data-tier='silver'] .medal-dot {
  background: linear-gradient(135deg, #e6e6e6, #9a9a9a);
}
[data-tier='bronze'] .medal-dot {
  background: linear-gradient(135deg, #e0a676, #96582c);
}
.org {
  font-family: var(--font-display);
  font-size: 22px;
  line-height: 1.3;
}
@media (max-width: 860px) {
  .awards li {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 18px 0;
  }
  .org {
    font-size: 20px;
  }
}
</style>
