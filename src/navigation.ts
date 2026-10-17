import { sections } from './data/site'
import { projectGroups } from './data/projects'
import { articulateArena } from './data/publications'

export type SectionId = (typeof sections)[number]['id']
export interface SectionRoute {
  section: SectionId
  target: string | null
}

const sectionIds = new Set<string>(sections.map((section) => section.id))
const targetSections = new Map<string, SectionId>([[articulateArena.id, 'research']])
for (const group of projectGroups) {
  targetSections.set(group.id, 'projects')
  for (const project of group.projects) targetSections.set(project.id, 'projects')
}

export function sectionHref(section: SectionId): string {
  return section === 'top' ? '#/' : `#/${section}`
}

/** Resolve modern section URLs and previously shared one-page anchors. */
export function resolveRoute(hash: string): SectionRoute {
  let value: string
  try {
    value = decodeURIComponent(hash.replace(/^#/, ''))
  } catch {
    return { section: 'top', target: null }
  }
  if (value.startsWith('/')) {
    const [section, target] = value.slice(1).split('/')
    if (section && sectionIds.has(section)) {
      return {
        section: section as SectionId,
        target: target && targetSections.get(target) === section ? target : null,
      }
    }
  } else {
    if (sectionIds.has(value)) return { section: value as SectionId, target: null }
    const section = targetSections.get(value)
    if (section) return { section, target: value }
  }
  return { section: 'top', target: null }
}
