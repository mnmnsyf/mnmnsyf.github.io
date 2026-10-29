<template>
  <article :id="p.id" class="project">
    <header class="p-head">
      <p class="p-meta">
        <span v-if="index" class="p-index">{{ pad(index) }}</span>
        <span v-if="p.period">{{ p.period }}</span>
        <span v-if="p.role">{{ p.role }}</span>
        <span v-if="demo" class="live-badge">{{ t('Live demo') }}</span>
      </p>
      <h3 class="p-title">{{ p.title }}</h3>
      <p class="p-summary">{{ p.summary }}</p>
      <ul class="p-stack" :aria-label="t('Technologies')">
        <li v-for="tech in p.tech" :key="tech">{{ tech }}</li>
      </ul>
      <div class="p-actions">
        <nav
          v-if="p.links?.length"
          class="link-row project-links"
          :aria-label="`${p.title} ${t('resources')}`"
        >
          <a
            v-for="link in p.links"
            :key="link.href"
            :href="assetUrl(link.href)"
            target="_blank"
            rel="noopener noreferrer"
            >{{ link.label }} <span aria-hidden="true">↗</span></a
          >
        </nav>
        <button
          v-if="hasNotes"
          type="button"
          class="notes-toggle"
          :aria-expanded="open"
          :aria-controls="notesId"
          @click="toggle"
        >
          <span class="toggle-icon" aria-hidden="true"></span>
          {{ t('Technical notes & more visuals') }}
        </button>
      </div>
    </header>

    <div v-if="p.media?.length" class="p-media">
      <ScreenshotCarousel
        v-if="isMandateOrder"
        :slides="mandateOrderScreenshots"
        label="Mandate Order project screenshots"
        class="p-carousel"
      />
      <MediaGallery v-else :items="p.media" :label="p.title" />
    </div>

    <div
      v-if="figures.length || highlights.length"
      class="p-spec"
      :class="{ solo: !figures.length }"
    >
      <section v-if="figures.length" class="p-results">
        <h4 class="spec-label">{{ t('Results') }}</h4>
        <ul>
          <li v-for="item in figures" :key="item.text">
            <strong v-if="item.figure" class="figure">{{ item.figure }}</strong>
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </section>
      <section v-if="highlights.length" class="p-highlights">
        <h4 class="spec-label">
          {{ t(p.modules?.length ? 'Systems I owned' : 'What I built') }}
        </h4>
        <ol>
          <li v-for="(item, i) in highlights" :key="item.target">
            <button type="button" class="highlight" @click="openAt(item.target)">
              <span class="h-num">{{ pad(i + 1) }}</span>
              <span class="h-body">
                <strong>{{ item.title }}</strong>
                <span v-if="item.tags?.length" class="h-tags">
                  <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                </span>
                <span v-else-if="item.text" class="h-text">{{ item.text }}</span>
              </span>
              <span class="h-go" aria-hidden="true">↓</span>
            </button>
          </li>
        </ol>
      </section>
    </div>

    <component :is="demo" v-if="demo" />

    <div
      v-if="hasNotes"
      :id="notesId"
      class="p-notes"
      :class="{ open }"
      :inert="!open"
      role="region"
      :aria-label="`${p.title} ${t('technical notes')}`"
    >
      <div class="p-notes-clip">
        <div class="p-notes-inner">
          <section v-if="p.body?.length" class="notes-block">
            <h4 class="spec-label">{{ t('Write-up') }}</h4>
            <div class="writeup" :class="{ 'has-illustration': p.illustration }">
              <div class="prose notes-prose">
                <p v-for="(paragraph, i) in p.body" :id="`${p.id}-p${i}`" :key="i" tabindex="-1">
                  {{ paragraph }}
                </p>
              </div>
              <IllustrationFigure v-if="p.illustration" :illustration="p.illustration" />
            </div>
          </section>
          <section v-if="isMandateOrder && p.media?.length" class="notes-block">
            <h4 class="spec-label">{{ t('Concept art') }}</h4>
            <MediaGrid :items="p.media" :columns="p.mediaColumns" />
          </section>
          <section
            v-for="(module, i) in p.modules ?? []"
            :id="`${p.id}-m${i}`"
            :key="module.title"
            class="notes-block module"
            tabindex="-1"
          >
            <div class="module-head">
              <span class="h-num">{{ pad(i + 1) }}</span>
              <h4>{{ module.title }}</h4>
              <p v-if="highlights[i]?.tags?.length" class="h-tags module-tags">
                <span v-for="tag in highlights[i]!.tags" :key="tag">{{ tag }}</span>
              </p>
            </div>
            <IllustrationFigure
              v-if="module.illustration"
              :illustration="module.illustration"
              class="module-illustration"
            />
            <div class="module-grid" :class="{ stacked: module.mediaColumns === 1 }">
              <div class="prose notes-prose">
                <p v-for="(paragraph, p) in module.body" :key="p">{{ paragraph }}</p>
              </div>
              <VariantToggle v-if="module.variants?.length" :variants="module.variants" />
              <MediaGrid
                v-else-if="module.media?.length"
                :items="module.media"
                :columns="module.mediaColumns ?? 1"
              />
            </div>
          </section>
          <p v-if="p.note" class="project-note">{{ p.note }}</p>
          <button type="button" class="notes-close" @click="close">
            {{ t('Collapse notes') }} <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </div>
    <p v-else-if="p.note" class="project-note">{{ p.note }}</p>
  </article>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, ref, type Component } from 'vue'
import { assetUrl } from '@/assetUrl'
import type { Project } from '@/data/types'
import { mandateOrderScreenshots } from '@/data/mandateOrderScreenshots'
import { metricFigure, projectHighlights } from '@/projectText'
import { localize, t } from '@/i18n'
import ScreenshotCarousel from './ScreenshotCarousel.vue'
import MediaGallery from './MediaGallery.vue'
import MediaGrid from './MediaGrid.vue'
import VariantToggle from './VariantToggle.vue'
import IllustrationFigure from './IllustrationFigure.vue'

/** Projects with an in-browser re-creation of their core technique. Loaded on demand. */
// A chunk that fails to load (e.g. a stale page after a redeploy) drops the demo
// rather than the whole section.
const lazyDemo = (loader: () => Promise<{ default: Component }>) =>
  defineAsyncComponent({ loader, onError: (_error, _retry, fail) => fail() })
const demos: Record<string, Component> = {
  'jello-simulation': lazyDemo(() => import('./demos/SpringLattice.vue')),
  'ik-skinning': lazyDemo(() => import('./demos/IkChain.vue')),
}

const props = defineProps<{ project: Project; index?: number }>()
/** The project as shown, in the current language. */
const p = computed(() => localize(props.project))
const demo = computed(() => demos[props.project.id])
const isMandateOrder = computed(() => props.project.id === 'project-mo')
const notesId = computed(() => `${props.project.id}-notes`)
const hasNotes = computed(() => !!(props.project.body?.length || props.project.modules?.length))
const highlights = computed(() => localize(projectHighlights(p.value)))
const figures = computed(() =>
  (p.value.metrics ?? []).map((text) => ({ text, figure: metricFigure(text) })),
)
// Notes start expanded so the full technical write-up is visible; the toggle collapses them.
const open = ref(true)

const pad = (n: number) => String(n).padStart(2, '0')

function scrollToElement(el: HTMLElement) {
  const header =
    Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) ||
    64
  const top = el.getBoundingClientRect().top + window.scrollY - header - 24
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'instant' })
}

function toggle() {
  open.value = !open.value
}
async function openAt(target: string) {
  open.value = true
  await nextTick()
  const el = document.getElementById(target)
  if (!el) return
  scrollToElement(el)
  el.focus({ preventScroll: true })
}
function close() {
  open.value = false
  const article = document.getElementById(props.project.id)
  if (article) scrollToElement(article)
}
</script>

<style scoped>
.project {
  scroll-margin-top: calc(var(--header-h) + 24px);
}

/* Header */
.p-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 18px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  margin-bottom: 16px;
}
.p-index {
  color: var(--accent);
}
.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 9px;
  border-radius: 999px;
  color: var(--accent);
  background: var(--accent-soft);
}
.live-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.p-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(38px, 4.4vw, 60px);
  line-height: 1;
  letter-spacing: -0.02em;
  max-width: 20ch;
}
.p-summary {
  margin-top: 20px;
  max-width: 62ch;
  font-size: 18px;
  line-height: 1.6;
  color: var(--text-muted);
}
.p-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 22px;
}
.p-stack li {
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 10px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  color: var(--text-muted);
}

/* Action row: resources and the notes toggle share one line. */
.p-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 26px;
}
.p-actions .link-row {
  gap: 10px;
}
.p-actions .link-row > a,
.notes-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  border: 1px solid var(--rule-strong);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  background: var(--bg);
  transition:
    border-color 0.2s,
    background-color 0.2s,
    color 0.2s;
}
.p-actions .link-row > a span {
  color: var(--accent);
}
.p-actions .link-row > a:hover {
  border-color: var(--text);
  text-decoration: none;
}
.notes-toggle {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}
.notes-toggle:hover {
  background: var(--accent);
  border-color: var(--accent);
}
.toggle-icon {
  position: relative;
  width: 10px;
  height: 10px;
}
.toggle-icon::before,
.toggle-icon::after {
  content: '';
  position: absolute;
  left: 0;
  top: 4.5px;
  width: 10px;
  height: 1.5px;
  background: currentColor;
  transition: transform 0.35s var(--ease-out);
}
.toggle-icon::after {
  transform: rotate(90deg);
}
.notes-toggle[aria-expanded='true'] .toggle-icon::after {
  transform: rotate(0deg);
}

/* Media */
.p-media {
  margin-top: 36px;
}
.p-carousel :deep(.carousel-window) {
  border-radius: 10px;
  border: 1px solid var(--rule);
}

/* Spec: results + what I built */
.p-spec {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 0;
  margin-top: 36px;
  border-top: 1px solid var(--text);
}
.p-spec.solo {
  grid-template-columns: minmax(0, 1fr);
}
.p-results,
.p-highlights {
  padding-top: 18px;
}
.p-results {
  padding-right: 28px;
  border-right: 1px solid var(--rule);
}
.p-spec.solo .p-highlights,
.p-results + .p-highlights {
  padding-left: 0;
}
.p-results + .p-highlights {
  padding-left: 28px;
}
.spec-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 14px;
}
.p-results ul {
  display: grid;
  gap: 22px;
}
.p-results li {
  display: grid;
  gap: 6px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-muted);
}
.figure {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 54px;
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: var(--accent);
}
.p-highlights ol {
  display: grid;
  border-top: 1px solid var(--rule);
}
.p-spec.solo .p-highlights ol {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 28px;
}
.p-highlights li {
  border-bottom: 1px solid var(--rule);
}
.highlight {
  width: 100%;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 16px;
  gap: 12px;
  padding: 16px 0;
  text-align: left;
  transition: padding 0.3s var(--ease-out);
}
.highlight:hover {
  padding-left: 6px;
}
.h-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  padding-top: 4px;
}
.h-body {
  display: grid;
  gap: 4px;
}
.h-body strong {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--text);
}
.h-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 4px;
}
.h-tags span {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.4;
  padding: 2px 8px;
  border-radius: 999px;
  color: var(--text-muted);
  background: var(--bg-inset);
}
.module-tags {
  grid-column: 2;
  margin: 2px 0 0;
}
.h-text {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.h-go {
  color: var(--text-faint);
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 0.25s,
    transform 0.3s var(--ease-out);
}
.highlight:hover .h-go,
.highlight:focus-visible .h-go {
  opacity: 1;
  transform: none;
  color: var(--accent);
}

/* Notes panel: animates its height with the 0fr → 1fr grid technique. */
.p-notes {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.55s var(--ease-out);
}
.p-notes.open {
  grid-template-rows: 1fr;
}
.p-notes-clip {
  min-height: 0;
  overflow: hidden;
}
.p-notes-inner {
  margin-top: 32px;
  padding: 36px 40px 28px;
  border: 1px solid var(--rule);
  border-radius: 12px;
  background: var(--bg-raised);
  opacity: 0;
  transform: translateY(-8px);
  transition:
    opacity 0.35s ease,
    transform 0.45s var(--ease-out);
}
.p-notes.open .p-notes-inner {
  opacity: 1;
  transform: none;
}
.notes-block + .notes-block {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid var(--rule);
}
.notes-block:focus,
.notes-prose p:focus {
  outline: none;
}
.notes-prose {
  font-size: 15.5px;
  color: var(--text-muted);
  max-width: 72ch;
}
.notes-prose p:target,
.notes-prose p:focus {
  color: var(--text);
}
.writeup.has-illustration {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}
.module-illustration {
  margin-bottom: 22px;
  max-width: 880px;
}
.module-head {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  gap: 12px;
  align-items: baseline;
  margin-bottom: 16px;
}
.module-head h4 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.1;
}
.module-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}
.module-grid.stacked,
.module-grid:has(> :only-child) {
  grid-template-columns: minmax(0, 1fr);
}
.module-grid :deep(img),
.module-grid :deep(video) {
  border-radius: 8px;
}
.project-note {
  margin-top: 28px;
  font-size: 13px;
  font-style: italic;
  color: var(--text-faint);
}
.notes-close {
  display: inline-flex;
  gap: 8px;
  margin-top: 28px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}
.notes-close:hover {
  color: var(--accent);
}

@media (max-width: 960px) {
  .p-spec {
    grid-template-columns: minmax(0, 1fr);
  }
  .p-results {
    padding-right: 0;
    border-right: 0;
    padding-bottom: 22px;
    border-bottom: 1px solid var(--rule);
  }
  .p-results ul {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .p-results + .p-highlights {
    padding-left: 0;
  }
  .p-spec.solo .p-highlights ol,
  .writeup.has-illustration,
  .module-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 640px) {
  .p-summary {
    font-size: 16.5px;
  }
  .figure {
    font-size: 44px;
  }
  .p-notes-inner {
    padding: 24px 18px 20px;
  }
  .module-head h4 {
    font-size: 25px;
  }
}
@media print {
  .p-notes {
    grid-template-rows: 1fr;
  }
  .p-notes-inner {
    opacity: 1;
    transform: none;
  }
  .notes-toggle,
  .notes-close {
    display: none;
  }
}
</style>
