import { ref } from 'vue'
import { zh } from './data/zh'

export type Locale = 'en' | 'zh'

/**
 * English is the source text everywhere; Chinese is a lookup keyed by that
 * text, so content edits stay in one place. A string without a translation
 * falls back to English (technology names such as "C++" are meant to).
 */
export const locale = ref<Locale>('en')

const normalize = (text: string) => text.replace(/\s+/g, ' ').trim()
const zhText = new Map(Object.entries(zh).map(([en, text]) => [normalize(en), text]))

export function hasTranslation(text: string): boolean {
  return zhText.has(normalize(text))
}

export function t(text: string): string {
  if (locale.value === 'en') return text
  return zhText.get(normalize(text)) ?? text
}

/** Fields that hold addresses or identifiers, never reader-facing text. */
const rawKeys = new Set(['id', 'href', 'src', 'poster', 'image', 'kind', 'icon', 'target'])

/** Translate every reader-facing string in a content object, leaving links and ids alone. */
export function localize<T>(value: T): T {
  if (locale.value === 'en') return value
  const walk = (item: unknown): unknown => {
    if (typeof item === 'string') return t(item)
    if (Array.isArray(item)) return item.map(walk)
    if (item && typeof item === 'object') {
      return Object.fromEntries(
        Object.entries(item).map(([key, field]) => [key, rawKeys.has(key) ? field : walk(field)]),
      )
    }
    return item
  }
  return walk(value) as T
}

function applyLocale(next: Locale) {
  locale.value = next
  if (typeof document !== 'undefined')
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
}

/** Every visit opens in English; only a ?lang=zh link opens the Chinese version. */
export function initLocale() {
  const requested = new URLSearchParams(window.location.search).get('lang')
  applyLocale(requested === 'zh' ? 'zh' : 'en')
}

export function setLocale(next: Locale) {
  applyLocale(next)
}

export function toggleLocale() {
  setLocale(locale.value === 'zh' ? 'en' : 'zh')
}
