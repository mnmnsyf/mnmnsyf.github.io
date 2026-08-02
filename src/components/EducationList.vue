<template>
  <ol class="education measure prose">
    <li v-for="item in education" :key="item.school" class="entry">
      <div class="head">
        <h3 class="school">{{ item.school }}</h3>
        <span class="period faint">{{ item.period }}</span>
      </div>
      <p class="degree">
        {{ item.degree }}
        <span v-if="item.focus" class="faint">· {{ item.focus }}</span>
      </p>
      <p v-if="item.honors?.length" class="detail">
        <span class="label">Honors</span>{{ item.honors.join('; ') }}
      </p>
      <p v-if="item.coursework?.length" class="detail">
        <span class="label">Coursework</span>{{ item.coursework.join(', ') }}
      </p>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { education } from '@/data/education'
</script>

<style scoped>
.entry + .entry {
  margin-top: 1.6rem;
}

.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.school {
  font-size: 1.02rem;
}

.period {
  font-size: 0.86rem;
  white-space: nowrap;
}

.degree {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin: 0.1rem 0 0;
}

.detail {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin: 0.35rem 0 0;
}

.label {
  display: inline-block;
  min-width: 5.5rem;
  color: var(--text-faint);
}

@media (max-width: 640px) {
  .head {
    flex-direction: column;
    gap: 0;
  }

  .label {
    display: block;
    min-width: 0;
  }
}
</style>
