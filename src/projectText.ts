import type { Project } from './data/types'
import { highlightCards } from './data/highlights'

/** Split a paragraph into its first sentence and the remainder. */
export function splitLead(text: string): { lead: string; rest: string } {
  // A sentence ends at . ! ? followed by a capital, digit or opening mark,
  // so abbreviations such as "e.g. x" do not split.
  // Chinese sentences end at 。！？ with no following space.
  const match =
    text.match(/^(.{20,}?[.!?])\s+(?=[A-Z0-9“"(])/) ?? text.match(/^(.{8,}?[。！？])\s*(?=.)/)
  return match ? { lead: match[1]!, rest: text.slice(match[0].length) } : { lead: text, rest: '' }
}

/**
 * Pull a headline figure out of a metric sentence: a percentage, a multiplier,
 * a "+" count or a comma-grouped number. Bare numbers such as dates are skipped.
 */
export function metricFigure(metric: string): string | null {
  const match = metric.match(/~?\d[\d,.]*(?:%|x|×|\+)|~?\d{1,3}(?:,\d{3})+\+?/)
  return match ? match[0] : null
}

export interface Highlight {
  title: string
  text: string
  tags?: string[]
  /** Element id inside the notes panel this highlight expands to. */
  target: string
}

/**
 * What the project shows before the notes are opened: one card per owned
 * system when the project has modules, otherwise one per write-up paragraph.
 */
export function projectHighlights(project: Project): Highlight[] {
  const cards = highlightCards[project.id] ?? []
  if (project.modules?.length) {
    return project.modules.map((module, i) => ({
      title: cards[i]?.title ?? module.title,
      text: splitLead(module.body[0] ?? '').lead,
      tags: module.tags ?? cards[i]?.tags,
      target: `${project.id}-m${i}`,
    }))
  }
  return (project.body ?? []).map((paragraph, i) => {
    const { lead, rest } = splitLead(paragraph)
    const card = cards[i]
    return card?.title
      ? { title: card.title, text: lead, tags: card.tags, target: `${project.id}-p${i}` }
      : { title: lead, text: rest, target: `${project.id}-p${i}` }
  })
}
