<template>
  <a href="#main-content" class="skip-link" @click.prevent="focusMain">{{
    t('Skip to content')
  }}</a>
  <div class="site-layout" :data-route="route.section" @click="onRouteLinkClick">
    <SiteNav :active="route.section" @open-palette="paletteOpen = true" />
    <main id="main-content" class="page" tabindex="-1">
      <div class="section-viewport">
        <Transition
          name="section-view"
          mode="out-in"
          @enter="scrollRoute"
          @after-enter="focusRoute"
        >
          <div :key="route.section" class="section-view" :data-section="route.section">
            <SiteHeader v-if="route.section === 'top'" />
            <SectionBlock
              v-else-if="activeModule"
              :id="activeModule.id"
              :title="t(activeModule.title)"
              heading-tag="h1"
            >
              <ModulePage :module="activeModule" :target="route.target" />
            </SectionBlock>
            <SectionBlock
              v-else-if="route.section === 'research'"
              id="research"
              :title="t('Research')"
              heading-tag="h1"
            >
              <ProjectEntry :project="articulateArena" />
            </SectionBlock>
            <SectionBlock
              v-else-if="route.section === 'about'"
              id="about"
              :title="t('About')"
              heading-tag="h1"
            >
              <AboutPage />
            </SectionBlock>
          </div>
        </Transition>
      </div>
      <SiteFooter />
    </main>
    <CommandPalette v-if="paletteOpen" @close="paletteOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SiteNav from '@/components/SiteNav.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SectionBlock from '@/components/SectionBlock.vue'
import ProjectEntry from '@/components/ProjectEntry.vue'
import { articulateArena } from '@/data/publications'
import { sections, site } from '@/data/site'
import { resolveRoute } from '@/navigation'
import { locale, t } from '@/i18n'
import ModulePage from '@/components/ModulePage.vue'
import AboutPage from '@/components/AboutPage.vue'
import { skillModules } from '@/data/modules'
import SiteFooter from '@/components/SiteFooter.vue'
import CommandPalette from '@/components/CommandPalette.vue'

const props = defineProps<{ initialHash?: string }>()
const route = ref(
  resolveRoute(props.initialHash ?? (typeof window === 'undefined' ? '#/' : window.location.hash)),
)

const activeModule = computed(() =>
  skillModules.find((module) => module.id === route.value.section),
)

const paletteOpen = ref(false)

/** Ctrl/Cmd+K anywhere, or "/" outside text fields, opens the command palette. */
function onGlobalKey(event: KeyboardEvent) {
  const typing =
    event.target instanceof HTMLElement &&
    (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))
  if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    paletteOpen.value = !paletteOpen.value
  } else if (event.key === '/' && !typing && !paletteOpen.value) {
    event.preventDefault()
    paletteOpen.value = true
  }
}

function focusMain() {
  document.getElementById('main-content')?.focus()
}
function scrollRoute() {
  // Role pages show one project at a time: open at the project index so it stays in view.
  const { section, target: id } = route.value
  const target = id
    ? document.getElementById(activeModule.value ? `${section}-projects` : id)
    : null
  if (target) {
    // Layout offsets exclude the entrance transform, so deep links do not jump
    // again when the transition finishes.
    let top = 0
    let element: HTMLElement | null = target
    while (element) {
      top += element.offsetTop
      element = element.offsetParent as HTMLElement | null
    }
    const margin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
    window.scrollTo({ top: Math.max(0, top - margin), behavior: 'instant' })
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}
function focusRoute() {
  const destination = document.getElementById(route.value.target ?? 'main-content')
  if (destination) {
    if (route.value.target) destination.setAttribute('tabindex', '-1')
    destination.focus({ preventScroll: true })
  }
}
function positionRoute() {
  scrollRoute()
  focusRoute()
}
function onRouteLinkClick(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return
  const link = event.target instanceof Element ? event.target.closest('a') : null
  const href = link?.getAttribute('href')
  if (href?.startsWith('#') && href !== '#main-content' && href === window.location.hash) {
    event.preventDefault()
    positionRoute()
  }
}
function updateTitle() {
  const label = sections.find((section) => section.id === route.value.section)?.label ?? ''
  document.title =
    route.value.section === 'top'
      ? `${t(site.name)} — ${t('Personal Website')}`
      : `${t(label)} — ${t(site.name)}`
}
function syncRoute() {
  if (window.location.hash === '#main-content') return
  const previousSection = route.value.section
  route.value = resolveRoute(window.location.hash)
  updateTitle()
  if (route.value.section === previousSection) void nextTick(positionRoute)
}
watch(locale, updateTitle)
onMounted(() => {
  window.addEventListener('hashchange', syncRoute)
  window.addEventListener('keydown', onGlobalKey)
  updateTitle()
  void nextTick(positionRoute)
})
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncRoute)
  window.removeEventListener('keydown', onGlobalKey)
})
</script>
