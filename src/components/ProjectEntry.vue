<template>
  <article :id="project.id" class="project">
    <div class="project-overview">
      <div class="project-copy">
        <p v-if="project.period || project.role" class="project-meta">
          {{ [project.period, project.role].filter(Boolean).join(' / ') }}
        </p>
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-summary">{{ project.summary }}</p>
        <ul v-if="project.metrics?.length" class="metrics">
          <li v-for="metric in project.metrics" :key="metric">{{ metric }}</li>
        </ul>
        <div v-if="project.tech.length" class="tags">
          <span v-for="tech in project.tech" :key="tech">{{ tech }}</span>
        </div>
        <nav
          v-if="project.links?.length"
          class="link-row project-links"
          :aria-label="`${project.title} resources`"
        >
          <a
            v-for="link in project.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            >{{ link.label }} <span aria-hidden="true">↗</span></a
          >
        </nav>
      </div>
      <div v-if="project.media?.length" class="project-preview">
        <MediaFigure :media="project.media[0]!" />
      </div>
    </div>
    <details
      v-if="project.body?.length || project.modules?.length || (project.media?.length ?? 0) > 1"
      class="project-details"
    >
      <summary>
        <span>Technical notes & more visuals</span
        ><span class="disclosure-icon" aria-hidden="true">+</span>
      </summary>
      <div class="details-content">
        <div v-if="project.body?.length" class="prose">
          <p v-for="(paragraph, index) in project.body" :key="index">{{ paragraph }}</p>
        </div>
        <MediaGrid
          v-if="(project.media?.length ?? 0) > 1"
          :items="project.media!.slice(1)"
          :columns="project.mediaColumns"
          class="detail-media"
        />
        <section v-for="module in project.modules ?? []" :key="module.title" class="module">
          <h4>{{ module.title }}</h4>
          <div class="prose">
            <p v-for="(paragraph, index) in module.body" :key="index">{{ paragraph }}</p>
          </div>
          <VariantToggle
            v-if="module.variants?.length"
            :variants="module.variants"
            class="detail-media"
          />
          <MediaGrid
            v-else-if="module.media?.length"
            :items="module.media"
            :columns="module.mediaColumns"
            class="detail-media"
          />
        </section>
        <p v-if="project.note" class="project-note">{{ project.note }}</p>
      </div>
    </details>
    <p v-else-if="project.note" class="project-note">{{ project.note }}</p>
  </article>
</template>
<script setup lang="ts">
import type { Project } from '@/data/types'
import MediaFigure from './MediaFigure.vue'
import MediaGrid from './MediaGrid.vue'
import VariantToggle from './VariantToggle.vue'
defineProps<{ project: Project }>()
</script>
