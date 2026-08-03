<template>
  <SiteHeader />

  <div class="page">
    <!-- TODO: demo reel goes here, above News. A 60-90s cut of the strongest
         moments across the engine, rasterizer, mocap and UE5 work. Game studios
         screen on reels, so this is the highest-value addition still missing. -->

    <SectionBlock id="news" title="News">
      <NewsList />
    </SectionBlock>

    <SectionBlock id="experience" title="Experience">
      <ExperienceList />
    </SectionBlock>

    <SectionBlock id="projects" title="Selected Projects">
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
import SiteHeader from '@/components/SiteHeader.vue'
import SectionBlock from '@/components/SectionBlock.vue'
import NewsList from '@/components/NewsList.vue'
import ExperienceList from '@/components/ExperienceList.vue'
import ProjectGroups from '@/components/ProjectGroups.vue'
import EducationList from '@/components/EducationList.vue'
import AwardList from '@/components/AwardList.vue'
import SkillList from '@/components/SkillList.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>
