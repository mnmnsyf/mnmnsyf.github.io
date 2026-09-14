/** Shared shapes for the content modules in this folder. */

export interface Link {
  label: string
  href: string
}

export interface Media {
  kind: 'image' | 'video'
  src: string
  alt: string
  /** Videos only: still shown before playback. */
  poster?: string
  caption?: string
}

/** Mutually exclusive views of the same frame, rendered as a toggle. */
export interface MediaVariant {
  label: string
  src: string
  alt: string
  caption?: string
}

/** A named sub-topic inside a project, e.g. one system the author owned. */
export interface ProjectModule {
  title: string
  body: string[]
  media?: Media[]
  /** Overrides the media grid width. Charts need room; screenshots tile fine. */
  mediaColumns?: 1 | 2 | 3
  variants?: MediaVariant[]
}

export interface Project {
  id: string
  title: string
  /** Shown next to the title, e.g. "Gameplay Programmer". */
  role?: string
  period?: string
  tech: string[]
  /** One scannable sentence. The only line a skimming reader is guaranteed to read. */
  summary: string
  /** Quantified outcomes, rendered as a compact line under the summary. */
  metrics?: string[]
  body?: string[]
  links?: Link[]
  media?: Media[]
  /** Overrides the media grid width. Charts need room; screenshots tile fine. */
  mediaColumns?: 1 | 2 | 3
  modules?: ProjectModule[]
  /** Rendered in small italics, e.g. a confidentiality note. */
  note?: string
}

export interface ProjectGroup {
  id: string
  title: string
  blurb?: string
  projects: Project[]
}

export interface Experience {
  org: string
  role: string
  period: string
  location?: string
  advisor?: Link
  bullets: string[]
  media?: Media[]
}

export interface Education {
  school: string
  degree: string
  period: string
  location?: string
  focus?: string
  honors?: string[]
  coursework?: string[]
}

export interface Award {
  year: string
  title: string
  org?: string
}

export interface NewsItem {
  date: string
  text: string
  links?: Link[]
}

export interface SkillGroup {
  label: string
  items: string[]
}
