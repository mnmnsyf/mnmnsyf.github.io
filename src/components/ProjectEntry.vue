<template>
  <article class="project">
    <div v-reveal class="intro">
      <div class="head measure">
        <h3 class="title">
          {{ project.title }}
          <span v-if="project.role" class="role faint">— {{ project.role }}</span>
        </h3>
        <span v-if="project.period" class="period faint">{{ project.period }}</span>
      </div>

      <p class="summary measure">{{ project.summary }}</p>

      <ul v-if="project.metrics?.length" class="metrics measure">
        <li v-for="m in project.metrics" :key="m">{{ m }}</li>
      </ul>

      <div v-if="project.tech.length" class="tags measure">
        <span v-for="t in project.tech" :key="t">{{ t }}</span>
      </div>

      <div v-if="project.body?.length" class="body prose measure">
        <p v-for="(para, i) in project.body" :key="i">{{ para }}</p>
      </div>

      <nav v-if="project.links?.length" class="link-row measure">
        <a v-for="l in project.links" :key="l.href" :href="l.href" target="_blank" rel="noopener">{{
          l.label
        }}</a>
      </nav>

      <p v-if="project.note" class="note faint measure">{{ project.note }}</p>

      <MediaGrid
        v-if="project.media?.length"
        :items="project.media"
        :columns="project.mediaColumns"
        class="media"
      />
    </div>

    <section v-for="mod in project.modules ?? []" :key="mod.title" v-reveal class="module">
      <h4 class="module-title measure">{{ mod.title }}</h4>
      <div class="prose measure">
        <p v-for="(para, i) in mod.body" :key="i">{{ para }}</p>
      </div>
      <VariantToggle v-if="mod.variants?.length" :variants="mod.variants" class="media" />
      <MediaGrid
        v-else-if="mod.media?.length"
        :items="mod.media"
        :columns="mod.mediaColumns"
        class="media"
      />
    </section>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '@/data/types'
import MediaGrid from './MediaGrid.vue'
import VariantToggle from './VariantToggle.vue'

defineProps<{ project: Project }>()
</script>

<style scoped>
.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.title {
  font-size: 1.12rem;
}

.role {
  font-weight: 400;
  font-size: 0.9rem;
}

.period {
  font-size: 0.86rem;
  white-space: nowrap;
}

.summary {
  margin-top: 0.4rem;
  color: var(--text);
}

.tags {
  margin-top: 0.7rem;
}

.body {
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 0.96rem;
}

.link-row {
  margin-top: 1rem;
}

.note {
  margin-top: 0.9rem;
  font-size: 0.84rem;
  font-style: italic;
}

.media {
  margin-top: 1.25rem;
}

/* Constrained to the prose column so the rule lines up with the centred text.
   Project-level media above still breaks out to the full page width. */
.module {
  max-width: var(--measure);
  margin: 2rem auto 0;
  padding-left: 1.25rem;
  border-left: 1px solid var(--rule);
}

.module-title {
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
}

.module .prose {
  color: var(--text-muted);
  font-size: 0.94rem;
}

@media (max-width: 640px) {
  .head {
    flex-direction: column;
    gap: 0;
  }

  .module {
    padding-left: 0.9rem;
  }
}
</style>
