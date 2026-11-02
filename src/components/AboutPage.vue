<template>
  <div class="about-page">
    <section v-for="part in parts" :id="part.id" :key="part.id" class="about-part">
      <h2 class="about-label">{{ t(part.title) }}</h2>
      <component :is="part.component" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'
import { aboutParts } from '@/navigation'
import AwardList from './AwardList.vue'
import EducationList from './EducationList.vue'
import ExperienceList from './ExperienceList.vue'
import NewsList from './NewsList.vue'

const components = {
  experience: ExperienceList,
  education: EducationList,
  awards: AwardList,
  news: NewsList,
}
const parts = aboutParts.map((part) => ({ ...part, component: components[part.id] }))
</script>

<style scoped>
.about-part {
  scroll-margin-top: calc(var(--header-h) + 24px);
}
.about-part + .about-part {
  margin-top: 96px;
}
.about-label {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(30px, 3.4vw, 44px);
  line-height: 1.1;
  margin-bottom: 24px;
}
</style>
