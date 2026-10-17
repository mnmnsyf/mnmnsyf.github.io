<template>
  <div class="projects-layout">
    <nav class="project-rail" aria-label="Project index">
      <p class="rail-count">
        <span>{{ pad(position + 1) }}</span> / {{ pad(entries.length) }} projects
      </p>
      <div v-for="group in projectGroups" :key="group.id" class="rail-group">
        <p :id="group.id" class="rail-group-title">{{ group.title }}</p>
        <a
          v-for="project in group.projects"
          :key="project.id"
          :href="`#/projects/${project.id}`"
          class="rail-link"
          :class="{ current: active.project.id === project.id }"
          :aria-current="active.project.id === project.id ? 'true' : undefined"
        >
          <span class="rail-num">{{ pad(order.get(project.id)!) }}</span>
          <span class="rail-title">{{ project.title }}</span>
        </a>
      </div>
      <p class="rail-hint" aria-hidden="true"><kbd>←</kbd><kbd>→</kbd> switch project</p>
    </nav>

    <div class="project-stage">
      <nav ref="chips" class="project-chips" aria-label="Project index (compact)">
        <a
          v-for="entry in entries"
          :key="entry.project.id"
          :href="`#/projects/${entry.project.id}`"
          class="chip"
          :class="{ current: active.project.id === entry.project.id }"
          :aria-current="active.project.id === entry.project.id ? 'true' : undefined"
          ><span>{{ pad(entry.index) }}</span
          >{{ entry.project.title }}</a
        >
      </nav>

      <div class="stage-bar">
        <div class="stage-crumb">
          <span class="crumb-group">{{ active.group.title }}</span>
          <span v-if="active.group.blurb" class="crumb-blurb">{{ active.group.blurb }}</span>
        </div>
        <div class="stage-nav">
          <a
            class="step"
            :href="`#/projects/${previous.project.id}`"
            :aria-label="`Previous project: ${previous.project.title}`"
            >←</a
          >
          <span class="step-count"
            >{{ pad(position + 1) }} <span>/ {{ pad(entries.length) }}</span></span
          >
          <a
            class="step"
            :href="`#/projects/${next.project.id}`"
            :aria-label="`Next project: ${next.project.title}`"
            >→</a
          >
        </div>
      </div>

      <Transition :name="direction" mode="out-in">
        <ProjectEntry :key="active.project.id" :project="active.project" :index="active.index" />
      </Transition>

      <nav class="pager" aria-label="Adjacent projects">
        <a class="pager-card pager-prev" :href="`#/projects/${previous.project.id}`">
          <span class="pager-label">← Previous</span>
          <strong>{{ previous.project.title }}</strong>
          <span class="pager-group">{{ previous.group.title }}</span>
        </a>
        <a class="pager-card pager-next" :href="`#/projects/${next.project.id}`">
          <img
            v-if="thumbnail(next.project)"
            :key="next.project.id"
            :src="assetUrl(thumbnail(next.project))"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span class="pager-copy">
            <span class="pager-label">Next project →</span>
            <strong>{{ next.project.title }}</strong>
            <span class="pager-group">{{ next.group.title }}</span>
          </span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { assetUrl } from '@/assetUrl'
import { projectGroups } from '@/data/projects'
import { mandateOrderScreenshots } from '@/data/mandateOrderScreenshots'
import type { Project } from '@/data/types'
import ProjectEntry from './ProjectEntry.vue'

/**
 * One project at a time. The route target picks it: a project id, or a
 * category id (its first project). With no target the first entry, Mandate
 * Order, is shown. Only the active project's media is ever rendered.
 */
const props = defineProps<{ target?: string | null }>()

const entries = projectGroups
  .flatMap((group) => group.projects.map((project) => ({ project, group })))
  .map((entry, i) => ({ ...entry, index: i + 1 }))
const order = new Map(entries.map((entry) => [entry.project.id, entry.index]))

const position = computed(() => {
  const target = props.target
  const direct = entries.findIndex((entry) => entry.project.id === target)
  if (direct >= 0) return direct
  const group = entries.findIndex((entry) => entry.group.id === target)
  return Math.max(group, 0)
})
const active = computed(() => entries[position.value]!)
const previous = computed(() => entries[(position.value - 1 + entries.length) % entries.length]!)
const next = computed(() => entries[(position.value + 1) % entries.length]!)

const pad = (n: number) => String(n).padStart(2, '0')

function thumbnail(project: Project): string | undefined {
  if (project.id === 'project-mo') return mandateOrderScreenshots[0]?.src
  const media = project.media?.[0]
  return media?.kind === 'video' ? media.poster : media?.src
}

/** Slide direction follows reading order, including the wrap-around. */
const direction = ref('project-next')
watch(position, (now, before) => {
  const forward = (now - before + entries.length) % entries.length
  direction.value = forward <= entries.length / 2 ? 'project-next' : 'project-prev'
  void nextTick(centerChip)
})

const chips = ref<HTMLElement | null>(null)
function centerChip() {
  const strip = chips.value
  const chip = strip?.querySelector<HTMLElement>('.chip.current')
  if (!strip || !chip) return
  strip.scrollTo({
    left: chip.offsetLeft - strip.clientWidth / 2 + chip.offsetWidth / 2,
    behavior: 'smooth',
  })
}

function onKey(event: KeyboardEvent) {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
    return
  const el = event.target as HTMLElement | null
  // Leave arrow keys to fields, sliders, carousels and media controls.
  if (el?.closest('input, textarea, select, video, [role="region"], [contenteditable="true"]'))
    return
  if (event.key === 'ArrowRight') window.location.hash = `#/projects/${next.value.project.id}`
  else if (event.key === 'ArrowLeft')
    window.location.hash = `#/projects/${previous.value.project.id}`
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  centerChip()
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.projects-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 64px;
  align-items: start;
}

/* Index rail */
.project-rail {
  position: sticky;
  top: calc(var(--header-h) + 28px);
  max-height: calc(100dvh - var(--header-h) - 56px);
  overflow-y: auto;
  scrollbar-width: none;
  display: grid;
  gap: 22px;
  padding-right: 4px;
}
.rail-count {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding-bottom: 14px;
  border-bottom: 1px solid var(--text);
}
.rail-count span {
  color: var(--accent);
}
.rail-group {
  display: grid;
  gap: 2px;
}
.rail-group-title {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 6px;
}
.rail-link {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 6px;
  padding: 7px 10px;
  margin-left: -10px;
  border-radius: 8px;
  font-size: 13.5px;
  line-height: 1.35;
  color: var(--text-muted);
  transition:
    background-color 0.25s,
    color 0.25s;
}
.rail-link:hover {
  color: var(--text);
  background: var(--bg-inset);
  text-decoration: none;
}
.rail-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  padding-top: 1px;
}
.rail-link.current {
  color: var(--bg);
  background: var(--text);
}
.rail-link.current .rail-num {
  color: var(--accent);
}
.rail-hint {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-faint);
}

/* Stage header */
.stage-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding-bottom: 18px;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--rule);
}
.stage-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 14px;
  min-width: 0;
}
.crumb-group {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}
.crumb-blurb {
  font-size: 13.5px;
  color: var(--text-muted);
}
.stage-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: none;
}
.step {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--rule-strong);
  border-radius: 50%;
  color: var(--text);
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
}
.step:hover {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
  text-decoration: none;
}
.step-count {
  font-family: var(--font-mono);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  min-width: 52px;
  text-align: center;
}
.step-count span {
  color: var(--text-faint);
}

/* Compact index for narrow screens */
.project-chips {
  display: none;
}

/* Project switch */
.project-next-enter-active,
.project-prev-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.5s var(--ease-out);
}
.project-next-leave-active,
.project-prev-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}
.project-next-enter-from {
  opacity: 0;
  transform: translateX(28px);
}
.project-next-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
.project-prev-enter-from {
  opacity: 0;
  transform: translateX(-28px);
}
.project-prev-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

/* Pager */
.pager {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 14px;
  margin-top: 88px;
}
.pager-card {
  display: grid;
  align-content: end;
  gap: 4px;
  min-height: 150px;
  padding: 20px 22px;
  border: 1px solid var(--rule);
  border-radius: 12px;
  color: var(--text);
  background: var(--bg-raised);
  transition:
    border-color 0.25s,
    transform 0.35s var(--ease-out);
}
.pager-card:hover {
  text-decoration: none;
  color: var(--text);
  border-color: var(--text);
  transform: translateY(-3px);
}
.pager-next {
  position: relative;
  overflow: hidden;
  min-height: 220px;
  padding: 0;
}
.pager-next img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.04);
  transition: transform 0.8s var(--ease-out);
}
.pager-next:hover img {
  transform: scale(1);
}
.pager-next::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #000000e0 12%, #00000066 55%, #0000001f 90%);
}
.pager-copy {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 4px;
  align-self: end;
  padding: 22px 24px;
  color: #fff;
}
.pager-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.pager-card strong {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 30px;
  line-height: 1.1;
}
.pager-next strong {
  font-size: 38px;
}
.pager-group {
  font-size: 13px;
  color: var(--text-muted);
}
.pager-next .pager-label,
.pager-next .pager-group {
  color: #ffffffb3;
}

@media (max-width: 1100px) {
  .projects-layout {
    grid-template-columns: minmax(0, 1fr);
  }
  .project-rail {
    display: none;
  }
  .project-chips {
    position: sticky;
    top: var(--header-h);
    z-index: 5;
    display: flex;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
    margin: -12px calc(var(--gutter) * -1) 28px;
    padding: 10px var(--gutter);
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--rule);
  }
  .project-chips::-webkit-scrollbar {
    display: none;
  }
  .chip {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 12px;
    border: 1px solid var(--rule-strong);
    border-radius: 999px;
    font-size: 13px;
    color: var(--text-muted);
    white-space: nowrap;
  }
  .chip span {
    font-family: var(--font-mono);
    font-size: 10.5px;
    color: var(--text-faint);
  }
  .chip:hover {
    text-decoration: none;
    color: var(--text);
  }
  .chip.current {
    background: var(--text);
    border-color: var(--text);
    color: var(--bg);
  }
  .chip.current span {
    color: var(--accent);
  }
}
@media (max-width: 640px) {
  .stage-bar {
    align-items: flex-start;
    margin-bottom: 28px;
  }
  .crumb-blurb {
    display: none;
  }
  .pager {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 64px;
  }
  .pager-prev {
    min-height: 0;
    order: 2;
  }
  .pager-next {
    min-height: 190px;
  }
  .pager-next strong {
    font-size: 30px;
  }
}
</style>
