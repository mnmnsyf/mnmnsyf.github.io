<template>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <div class="site-layout">
    <SiteNav />
    <main id="main-content" class="page" tabindex="-1">
      <SiteHeader />

      <SectionBlock id="projects" title="Selected projects">
        <ProjectGroups />
      </SectionBlock>

      <SectionBlock id="research" title="Research">
        <ProjectEntry :project="articulateArena" />
      </SectionBlock>

      <SectionBlock id="experience" title="Experience">
        <ExperienceList />
      </SectionBlock>

      <SectionBlock id="news" title="Updates">
        <NewsList />
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
    </main>
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
