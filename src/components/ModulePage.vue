<template>
  <div class="module-page">
    <p v-reveal class="claim">{{ t(module.claim) }}</p>

    <section class="block" :aria-labelledby="`${module.id}-skills`">
      <h2 :id="`${module.id}-skills`" class="block-label">{{ t('Skills') }}</h2>
      <ul class="skill-chips">
        <li v-for="skill in module.skills" :key="skill">{{ t(skill) }}</li>
      </ul>
    </section>

    <section class="block" :aria-labelledby="`${module.id}-projects`">
      <h2 :id="`${module.id}-projects`" class="block-label">{{ t('Projects') }}</h2>
      <ProjectGroups :group="group" :section="module.id" :target="target" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SkillModule } from '@/data/modules'
import { projectGroups } from '@/data/projects'
import { t } from '@/i18n'
import ProjectGroups from './ProjectGroups.vue'

const props = defineProps<{ module: SkillModule; target?: string | null }>()

const group = computed(() => projectGroups.find((g) => g.id === props.module.projectGroup)!)
</script>

<style scoped>
.claim {
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.25;
}
.block {
  margin-top: 56px;
}
.block-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 20px;
  scroll-margin-top: calc(var(--header-h) + 24px);
}
.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skill-chips li {
  padding: 6px 14px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  font-size: 14px;
}
@media (max-width: 860px) {
  .block {
    margin-top: 44px;
  }
}
</style>
