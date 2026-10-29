<template>
  <div class="skills">
    <p v-reveal class="summary">{{ t(skillsSummary) }}</p>
    <div class="skill-grid">
      <section v-for="(group, g) in groups" :key="group.label" v-reveal="g * 40" class="skill-card">
        <h2>
          <span aria-hidden="true">{{ String(g + 1).padStart(2, '0') }}</span
          >{{ group.label }}
        </h2>
        <ul>
          <li v-for="item in group.items" :key="item">{{ item }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { skills, skillsSummary } from '@/data/skills'
import { localize, t } from '@/i18n'

const groups = computed(() => localize(skills))
</script>

<style scoped>
.summary {
  font-family: var(--font-display);
  font-size: clamp(24px, 2.6vw, 34px);
  line-height: 1.3;
  max-width: 34ch;
  margin-bottom: 48px;
}
.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  border-top: 1px solid var(--text);
  border-left: 1px solid var(--rule);
}
.skill-card {
  padding: 22px 22px 26px;
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  transition: background-color 0.3s;
}
.skill-card:hover {
  background: var(--bg-raised);
}
.skill-card h2 {
  display: flex;
  gap: 12px;
  align-items: baseline;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 14px;
}
.skill-card h2 span {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
}
.skill-card ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.skill-card li {
  font-size: 13px;
  padding: 3px 10px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  color: var(--text-muted);
}
</style>
