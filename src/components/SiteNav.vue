<template>
  <header class="topbar">
    <div class="topbar-inner">
      <a href="#/" class="brand" :aria-label="`${site.name} — back to introduction`">
        <img class="brand-portrait" :src="assetUrl(site.photo.src)" alt="" width="28" height="28" />
        <span class="brand-name">{{ site.name }}</span>
      </a>
      <nav ref="nav" class="section-nav" aria-label="Main navigation">
        <a
          v-for="(section, index) in sections"
          :key="section.id"
          :ref="(el) => (links[index] = el as HTMLElement | null)"
          :href="sectionHref(section.id)"
          :class="{ active: active === section.id }"
          :aria-current="active === section.id ? 'page' : undefined"
        >
          <span class="nav-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span
          >{{ section.label }}
        </a>
        <span class="nav-indicator" :style="indicator" aria-hidden="true"></span>
      </nav>
      <div class="topbar-actions">
        <button
          type="button"
          class="search-trigger"
          aria-label="Open command palette"
          aria-keyshortcuts="Control+K Meta+K"
          @click="$emit('open-palette')"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.4" />
            <path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.4" />
          </svg>
          <span class="search-label">Jump to</span>
          <kbd>{{ shortcut }}</kbd>
        </button>
        <button
          type="button"
          class="theme-toggle"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="onToggle"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" :class="theme">
            <mask id="theme-mask">
              <rect width="20" height="20" fill="#fff" />
              <circle class="moon-cut" cx="15" cy="5" r="5" fill="#000" />
            </mask>
            <circle class="sun-core" cx="10" cy="10" r="4.5" mask="url(#theme-mask)" />
            <g class="sun-rays" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path
                d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
    <span class="scroll-progress" aria-hidden="true"></span>
  </header>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { assetUrl } from '@/assetUrl'
import { site, sections } from '@/data/site'
import { sectionHref, type SectionId } from '@/navigation'
import { useTheme } from '@/theme'

const props = defineProps<{ active: SectionId }>()
defineEmits<{ 'open-palette': [] }>()

const { theme, toggle } = useTheme()
const nav = ref<HTMLElement | null>(null)
const links = ref<(HTMLElement | null)[]>([])
const indicator = ref<Record<string, string>>({ opacity: '0' })
const shortcut = ref('Ctrl K')

/** A single underline slides between links instead of each link owning one. */
function placeIndicator() {
  const index = sections.findIndex((section) => section.id === props.active)
  const link = links.value[index]
  if (!link) return
  indicator.value = {
    opacity: '1',
    transform: `translateX(${link.offsetLeft}px)`,
    width: `${link.offsetWidth}px`,
  }
  link.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
}

function onToggle(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  toggle(rect.left + rect.width / 2, rect.top + rect.height / 2)
}

let resizeObserver: ResizeObserver | undefined
watch(
  () => props.active,
  () => void nextTick(placeIndicator),
)
onMounted(() => {
  if (/Mac|iPhone|iPad/.test(navigator.platform)) shortcut.value = '⌘K'
  resizeObserver = new ResizeObserver(placeIndicator)
  if (nav.value) resizeObserver.observe(nav.value)
  void document.fonts?.ready.then(placeIndicator)
  placeIndicator()
})
onBeforeUnmount(() => resizeObserver?.disconnect())
</script>
