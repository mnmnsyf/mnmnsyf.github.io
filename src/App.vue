<template>
  <SiteNav />
  <SiteHeader />

  <div class="page">
    <SectionBlock id="news" title="News">
      <NewsList />
    </SectionBlock>

    <SectionBlock id="research" title="Research">
      <ProjectEntry :project="articulateArena" />
    </SectionBlock>

    <SectionBlock id="experience" title="Experience">
      <ExperienceList />
    </SectionBlock>

    <SectionBlock id="projects" title="Projects">
      <ProjectGroups />
    </SectionBlock>

    <SectionBlock id="education" title="Education">
      <EducationList />
    </SectionBlock>

    <SectionBlock id="awards" title="Awards">
      <AwardList />
    </SectionBlock>

    <SectionBlock id="skills" title="Skills">
      <SkillList />
    </SectionBlock>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteNav from '@/components/SiteNav.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SectionBlock from '@/components/SectionBlock.vue'
import NewsList from '@/components/NewsList.vue'
import ExperienceList from '@/components/ExperienceList.vue'
import ProjectGroups from '@/components/ProjectGroups.vue'
import ProjectEntry from '@/components/ProjectEntry.vue'
import { articulateArena } from '@/data/publications'
import EducationList from '@/components/EducationList.vue'
import AwardList from '@/components/AwardList.vue'
import SkillList from '@/components/SkillList.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>
