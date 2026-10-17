<template>
  <div class="palette-backdrop" @pointerdown.self="close">
    <div
      class="palette"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      @keydown="onKeydown"
    >
      <div class="palette-search">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.4" />
          <path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.4" />
        </svg>
        <input
          ref="input"
          v-model="query"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          :aria-activedescendant="results.length ? `palette-item-${cursor}` : undefined"
          aria-autocomplete="list"
          placeholder="Search projects, sections, links…"
          spellcheck="false"
          autocomplete="off"
        />
        <kbd>Esc</kbd>
      </div>
      <ul id="palette-results" ref="list" class="palette-results" role="listbox">
        <template v-for="(item, index) in results" :key="item.key">
          <li
            v-if="index === 0 || results[index - 1]!.group !== item.group"
            class="palette-group"
            role="presentation"
          >
            {{ item.group }}
          </li>
          <li
            :id="`palette-item-${index}`"
            role="option"
            :aria-selected="index === cursor"
            class="palette-item"
            :class="{ active: index === cursor }"
            @pointermove="cursor = index"
            @click="run(item)"
          >
            <span class="palette-title">
              <template v-for="(part, p) in item.parts" :key="p">
                <mark v-if="part.hit">{{ part.text }}</mark>
                <template v-else>{{ part.text }}</template>
              </template>
            </span>
            <span class="palette-meta">{{ item.meta }}</span>
            <span class="palette-enter" aria-hidden="true">↵</span>
          </li>
        </template>
        <li v-if="!results.length" class="palette-empty">No matches for “{{ query }}”.</li>
      </ul>
      <div class="palette-foot" aria-hidden="true">
        <span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span
        ><span>{{ results.length }} results</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { projectGroups } from '@/data/projects'
import { articulateArena } from '@/data/publications'
import { navLinks, sections } from '@/data/site'
import { sectionHref } from '@/navigation'
import { useTheme } from '@/theme'

const emit = defineEmits<{ close: [] }>()
const { toggle } = useTheme()

interface Command {
  key: string
  group: string
  title: string
  meta: string
  run: () => void
}

function go(hash: string) {
  if (window.location.hash === hash) window.dispatchEvent(new HashChangeEvent('hashchange'))
  else window.location.hash = hash
}

const commands: Command[] = [
  ...sections.map((section, index) => ({
    key: `section-${section.id}`,
    group: 'Sections',
    title: section.label,
    meta: String(index + 1).padStart(2, '0'),
    run: () => go(sectionHref(section.id)),
  })),
  ...projectGroups.flatMap((group) =>
    group.projects.map((project) => ({
      key: `project-${project.id}`,
      group: 'Projects',
      title: project.title,
      meta: project.tech.slice(0, 3).join(' · '),
      run: () => go(`#/projects/${project.id}`),
    })),
  ),
  {
    key: 'research',
    group: 'Research',
    title: articulateArena.title,
    meta: articulateArena.role ?? '',
    run: () => go(`#/research/${articulateArena.id}`),
  },
  ...navLinks.map((link) => ({
    key: `link-${link.label}`,
    group: 'Elsewhere',
    title: link.label,
    meta: link.href.startsWith('mailto:')
      ? link.href.slice('mailto:'.length)
      : new URL(link.href).hostname.replace(/^www\./, ''),
    run: () =>
      link.href.startsWith('mailto:')
        ? (window.location.href = link.href)
        : window.open(link.href, '_blank', 'noopener'),
  })),
  {
    key: 'theme',
    group: 'Actions',
    title: 'Toggle light / dark theme',
    meta: 'View Transitions',
    run: () => toggle(),
  },
]

/**
 * Fuzzy subsequence match. Consecutive and word-start hits score higher, so
 * "ik" ranks "Inverse Kinematics" above words that merely contain i…k.
 */
function match(title: string, q: string) {
  if (!q) return { score: 0, hits: [] as number[] }
  const lower = title.toLowerCase()
  const hits: number[] = []
  let score = 0
  let from = 0
  for (const ch of q.toLowerCase()) {
    if (ch === ' ') continue
    const at = lower.indexOf(ch, from)
    if (at < 0) return null
    const wordStart = at === 0 || /[\s\-·&/(]/.test(lower[at - 1]!)
    score += (hits.length && hits[hits.length - 1] === at - 1 ? 6 : 1) + (wordStart ? 4 : 0)
    hits.push(at)
    from = at + 1
  }
  return { score: score - title.length * 0.02, hits }
}

function split(title: string, hits: number[]) {
  const set = new Set(hits)
  const parts: { text: string; hit: boolean }[] = []
  for (let i = 0; i < title.length; i++) {
    const hit = set.has(i)
    const last = parts[parts.length - 1]
    if (last && last.hit === hit) last.text += title[i]
    else parts.push({ text: title[i]!, hit })
  }
  return parts
}

const query = ref('')
const cursor = ref(0)
const input = ref<HTMLInputElement | null>(null)
const list = ref<HTMLElement | null>(null)
const groupOrder = ['Sections', 'Projects', 'Research', 'Elsewhere', 'Actions']

const results = computed(() => {
  const q = query.value.trim()
  const scored = commands
    .map((command) => ({ command, result: match(command.title, q) }))
    .filter((entry) => entry.result)
  if (q) scored.sort((a, b) => b.result!.score - a.result!.score)
  // Keep groups contiguous; within a group keep the score order.
  const groups = q ? [...new Set(scored.map((entry) => entry.command.group))] : groupOrder
  return groups.flatMap((group) =>
    scored
      .filter((entry) => entry.command.group === group)
      .map(({ command, result }) => ({ ...command, parts: split(command.title, result!.hits) })),
  )
})

watch(query, () => (cursor.value = 0))
watch(cursor, () =>
  nextTick(() =>
    list.value
      ?.querySelector(`#palette-item-${cursor.value}`)
      ?.scrollIntoView({ block: 'nearest' }),
  ),
)

function close() {
  emit('close')
}
function run(item: Command) {
  close()
  item.run()
}

function onKeydown(event: KeyboardEvent) {
  const count = results.value.length
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  } else if (event.key === 'ArrowDown' && count) {
    event.preventDefault()
    cursor.value = (cursor.value + 1) % count
  } else if (event.key === 'ArrowUp' && count) {
    event.preventDefault()
    cursor.value = (cursor.value - 1 + count) % count
  } else if (event.key === 'Enter' && count) {
    event.preventDefault()
    run(results.value[cursor.value]!)
  } else if (event.key === 'Tab') {
    // The input is the only focus stop; keep focus inside the dialog.
    event.preventDefault()
  }
}

let previousFocus: Element | null = null
onMounted(() => {
  previousFocus = document.activeElement
  document.documentElement.style.overflow = 'hidden'
  input.value?.focus()
})
onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
})
</script>

<style scoped>
.palette-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  justify-items: center;
  align-items: start;
  padding: 14vh 16px 16px;
  background: color-mix(in srgb, var(--bg) 55%, transparent);
  backdrop-filter: blur(6px);
  animation: fade 0.18s ease;
}
.palette {
  width: min(620px, 100%);
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-raised);
  border: 1px solid var(--rule-strong);
  border-radius: 14px;
  box-shadow:
    0 30px 80px -20px #0000004d,
    0 0 0 1px #ffffff08 inset;
  overflow: hidden;
  animation: rise 0.24s var(--ease-out);
}
@keyframes fade {
  from {
    opacity: 0;
  }
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
}
.palette-search {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--rule);
  color: var(--text-muted);
}
.palette-search svg {
  width: 16px;
  height: 16px;
  flex: none;
}
.palette-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 16px;
}
.palette-search input::placeholder {
  color: var(--text-faint);
}
.palette-results {
  overflow-y: auto;
  padding: 6px;
  overscroll-behavior: contain;
}
.palette-group {
  padding: 10px 10px 4px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.palette-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 16px;
  align-items: center;
  gap: 14px;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}
.palette-item.active {
  background: var(--bg-inset);
}
.palette-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.palette-title mark {
  background: none;
  color: var(--accent);
  font-weight: 600;
}
.palette-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.palette-enter {
  color: var(--text-faint);
  opacity: 0;
}
.palette-item.active .palette-enter {
  opacity: 1;
}
.palette-empty {
  padding: 24px 12px;
  color: var(--text-muted);
  font-size: 14px;
}
.palette-foot {
  display: flex;
  gap: 18px;
  padding: 9px 16px;
  border-top: 1px solid var(--rule);
  font-size: 12px;
  color: var(--text-faint);
}
.palette-foot span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.palette-foot span:last-child {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 11px;
}
@media (max-width: 560px) {
  .palette-meta {
    display: none;
  }
  .palette-foot span:not(:last-child) {
    display: none;
  }
}
</style>
