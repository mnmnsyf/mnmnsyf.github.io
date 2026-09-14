<template>
  <ol class="experience measure prose">
    <li v-for="item in experience" :key="item.org + item.period" v-reveal class="entry">
      <div class="head">
        <h3 class="role">{{ item.role }}</h3>
        <span class="period faint">{{ item.period }}</span>
      </div>
      <p class="org">
        {{ item.org }}
        <span v-if="item.location" class="faint">· {{ item.location }}</span>
      </p>
      <p v-if="item.advisor" class="advisor faint">
        Advised by
        <a :href="item.advisor.href" target="_blank" rel="noopener">{{ item.advisor.label }}</a>
      </p>
      <ul class="bullets">
        <li v-for="(b, i) in item.bullets" :key="i">{{ b }}</li>
      </ul>
      <MediaGrid v-if="item.media?.length" :items="item.media" :columns="2" />
    </li>
  </ol>
</template>

<script setup lang="ts">
import { experience } from '@/data/experience'
import MediaGrid from './MediaGrid.vue'
</script>

<style scoped>
.entry + .entry {
  margin-top: 2rem;
}

.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.role {
  font-size: 1.02rem;
}

.period {
  font-size: 0.86rem;
  white-space: nowrap;
}

.org,
.advisor {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin: 0.1rem 0 0;
}

.bullets {
  margin-top: 0.6rem;
  font-size: 0.94rem;
  color: var(--text-muted);
}

.bullets li {
  position: relative;
  padding-left: 1rem;
}

.bullets li + li {
  margin-top: 0.35rem;
}

.bullets li::before {
  content: '';
  position: absolute;
  left: 0.15rem;
  top: 0.72em;
  width: 3px;
  height: 3px;
  background: var(--text-faint);
}

@media (max-width: 640px) {
  .head {
    flex-direction: column;
    gap: 0;
  }
}
</style>
