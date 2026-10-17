import { onBeforeUnmount, onMounted, ref } from 'vue'

export type Theme = 'light' | 'dark'

/** The theme actually showing: an explicit choice, else the system preference. */
export function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Reactive theme plus a toggle. The switch runs inside a View Transition when
 * the browser supports it, revealing the new theme as a circle grown from
 * (x, y); otherwise it applies immediately.
 */
export function useTheme() {
  const theme = ref<Theme>('light')
  let media: MediaQueryList | undefined
  const sync = () => (theme.value = currentTheme())

  onMounted(() => {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', sync)
    sync()
  })
  onBeforeUnmount(() => media?.removeEventListener('change', sync))

  function toggle(x = window.innerWidth / 2, y = 0) {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* Storage can be unavailable; the choice still applies to this visit. */
      }
      theme.value = next
      window.dispatchEvent(new CustomEvent('themechange'))
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduced) return apply()

    const transition = document.startViewTransition(apply)
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    void transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: 'cubic-bezier(0.7, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  return { theme, toggle }
}

/** Read a hex colour token from :root as linear 0–1 RGB for WebGL / canvas use. */
export function readColor(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const hex = raw.replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(hex)) return [0.5, 0.5, 0.5]
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number]
}

export function cssColor(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#888'
}
