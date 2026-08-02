<template>
  <div class="skills measure">
    <p class="summary muted">{{ skillsSummary }}</p>
    <dl>
      <template v-for="group in skills" :key="group.label">
        <dt class="faint">{{ group.label }}</dt>
        <dd>{{ group.items.join(', ') }}</dd>
      </template>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { skills, skillsSummary } from '@/data/skills'
</script>

<style scoped>
.summary {
  font-size: 0.94rem;
  margin-bottom: 1.1rem;
}

dl {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 0.35rem 1rem;
  font-size: 0.92rem;
}

dt {
  font-size: 0.88rem;
}

dd {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  dl {
    grid-template-columns: 1fr;
    gap: 0 0;
  }

  dd {
    margin-bottom: 0.6rem;
  }
}
</style>
