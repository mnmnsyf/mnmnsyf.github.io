<template>
  <dl class="results">
    <div v-for="result in results" :key="result.label" class="result">
      <dt>{{ t(result.label) }}</dt>
      <dd>{{ result.value }}</dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { ModuleResult } from '@/data/types'
import { t } from '@/i18n'

defineProps<{ results: ModuleResult[] }>()
</script>

<style scoped>
.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 20px 0 0;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
}
.result {
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;
}
.result dd {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(26px, 2.6vw, 34px);
  line-height: 1.1;
  color: var(--text);
}
.result dt {
  font-size: 13px;
  line-height: 1.4;
  color: var(--text-muted);
}
</style>
