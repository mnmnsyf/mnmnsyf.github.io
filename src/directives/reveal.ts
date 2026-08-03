import type { Directive } from 'vue'

/**
 * Reveals an element on first scroll into view: fade up into place.
 *
 * The reference site does this with WOW.js + Animate.css + jQuery (its
 * `fadeInUp` translates a full 100% of element height). This is the same effect
 * on an IntersectionObserver with no dependencies, and with a fixed offset
 * instead — a full-height slide on a 1000px project entry reads as a lurch.
 *
 * The hiding class is applied from here rather than in the template, so if this
 * script never runs the content is simply visible instead of stuck at opacity 0.
 */

let observer: IntersectionObserver | null = null

function shared(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('reveal-in')
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.04, rootMargin: '0px 0px -10% 0px' },
  )
  return observer
}

/** Optional binding value is a stagger delay in milliseconds. */
export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.classList.add('reveal')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    shared().observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}
