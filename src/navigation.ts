import { sections } from './data/site'
import { skillModules } from './data/modules'
import { projectGroups } from './data/projects'
import { articulateArena } from './data/publications'

export type SectionId = (typeof sections)[number]['id']
export interface SectionRoute {
  section: SectionId
  target: string | null
}

/** The About page gathers what used to be four separate sections. */
export const aboutParts = [
  { id: 'experience', title: 'Experience' },
  { id: 'education', title: 'Education' },
  { id: 'awards', title: 'Awards' },
  { id: 'news', title: 'Updates' },
] as const

/** Each role page and the projects it shows. A project can appear on more than one. */
const roleProjects = new Map<SectionId, Set<string>>(
  skillModules.map((module) => [
    module.id,
    new Set(
      projectGroups
        .find((group) => group.id === module.projectGroup)!
        .projects.map((project) => project.id),
    ),
  ]),
)

/** The role page a project link opens on: the first one that shows it. */
export function projectSection(projectId: string): SectionId | undefined {
  for (const [section, ids] of roleProjects) if (ids.has(projectId)) return section
  return undefined
}

export function projectHref(projectId: string): string {
  return `#/${projectSection(projectId) ?? 'engine'}/${projectId}`
}

const legacyProjectGroups = new Map<string, SectionId>([
  ['engine-rendering', 'graphics'],
  ['animation-simulation', 'graphics'],
  ['gameplay-engineering', 'gameplay'],
  ['production-work', 'engine'],
  ...skillModules.map((module): [string, SectionId] => [module.projectGroup, module.id]),
])

/** Retired sections and project groups, and where their content lives now. */
function legacyRoute(section: string, target?: string): SectionRoute | undefined {
  if (section === 'projects') {
    if (!target) return { section: 'engine', target: null }
    const role = projectSection(target)
    if (role) return { section: role, target }
    return { section: legacyProjectGroups.get(target) ?? 'engine', target: null }
  }
  if (aboutParts.some((part) => part.id === section)) return { section: 'about', target: section }
  if (section === 'skills') return { section: 'engine', target: null }
  const role = projectSection(section)
  if (role) return { section: role, target: section }
  const group = legacyProjectGroups.get(section)
  if (group) return { section: group, target: null }
  return undefined
}

const sectionIds = new Set<string>(sections.map((section) => section.id))
const targetSections = new Map<string, Set<SectionId>>([
  [articulateArena.id, new Set(['research'])],
])
for (const part of aboutParts) targetSections.set(part.id, new Set(['about']))
for (const [section, ids] of roleProjects)
  for (const id of ids) {
    if (!targetSections.has(id)) targetSections.set(id, new Set())
    targetSections.get(id)!.add(section)
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
      const id = section as SectionId
      return { section: id, target: target && targetSections.get(target)?.has(id) ? target : null }
    }
    const legacy = section ? legacyRoute(section, target) : undefined
    if (legacy) return legacy
  } else {
    if (sectionIds.has(value)) return { section: value as SectionId, target: null }
    const sections = targetSections.get(value)
    if (sections?.size === 1 && !roleProjects.has([...sections][0]!))
      return { section: [...sections][0]!, target: value }
    const legacy = legacyRoute(value)
    if (legacy) return legacy
  }
  return { section: 'top', target: null }
}
