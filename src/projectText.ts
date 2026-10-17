import type { Project } from './data/types'

/** Split a paragraph into its first sentence and the remainder. */
export function splitLead(text: string): { lead: string; rest: string } {
  // A sentence ends at . ! ? followed by a capital, digit or opening mark,
  // so abbreviations such as "e.g. x" do not split.
  const match = text.match(/^(.{20,}?[.!?])\s+(?=[A-Z0-9“"(])/)
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
  /** Element id inside the notes panel this highlight expands to. */
  target: string
}

/**
 * What the project shows before the notes are opened: one card per owned
 * system when the project has modules, otherwise one per write-up paragraph.
 */
export function projectHighlights(project: Project): Highlight[] {
  if (project.modules?.length) {
    return project.modules.map((module, i) => ({
      title: module.title,
      text: splitLead(module.body[0] ?? '').lead,
      target: `${project.id}-m${i}`,
    }))
  }
  return (project.body ?? []).map((paragraph, i) => {
    const { lead, rest } = splitLead(paragraph)
    return { title: lead, text: rest, target: `${project.id}-p${i}` }
  })
}
