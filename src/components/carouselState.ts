import { ref } from 'vue'

export function createCarouselState(count: number) {
  const active = ref(0)
  const paused = ref(false)
  const select = (index: number) => {
    active.value = ((index % count) + count) % count
  }
  const next = () => select(active.value + 1)
  const previous = () => select(active.value - 1)
  const togglePause = () => {
    paused.value = !paused.value
  }
  const advance = (context: { visible: boolean; interacting: boolean; reducedMotion: boolean }) => {
    if (context.visible && !context.interacting && !context.reducedMotion && !paused.value) next()
  }
  return { active, paused, select, next, previous, togglePause, advance }
}
