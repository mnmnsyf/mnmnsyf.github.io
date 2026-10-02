<template>
  <div>
    <section v-for="group in projectGroups" :id="group.id" :key="group.id" class="group">
      <div v-reveal class="group-head measure">
        <h3 class="group-title">{{ group.title }}</h3>
        <p v-if="group.blurb" class="group-blurb faint">{{ group.blurb }}</p>
      </div>
      <ProjectEntry
        v-for="project in group.projects"
        :key="project.id"
        :project="project"
        class="entry"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { projectGroups } from '@/data/projects'
import ProjectEntry from './ProjectEntry.vue'
</script>

<style scoped>
.group + .group {
  margin-top: 3.5rem;
}

.group-head {
  margin-bottom: 1.75rem;
}

.group-title {
  font-size: 1rem;
  color: var(--accent);
}

.group-blurb {
  font-size: 0.9rem;
  margin-top: 0.1rem;
}

.entry + .entry {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid var(--rule);
}
</style>
