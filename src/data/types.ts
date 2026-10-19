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
/** An explanatory drawing, captioned as an illustration so it is never mistaken for a screenshot. */
export interface Illustration {
  src: string
  alt: string
  caption: string
}

export interface ProjectModule {
  title: string
  body: string[]
  illustration?: Illustration
  media?: Media[]
  /** Overrides the media grid width. Charts need room; screenshots tile fine. */
  mediaColumns?: 1 | 2 | 3
  variants?: MediaVariant[]
  /** Recruiter-facing keywords, shown as chips on the summary card and the module. */
  tags?: string[]
}

export interface Project {
  id: string
  title: string
  /** Shown beside the write-up. */
  illustration?: Illustration
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
  links: Link[]
  media?: Media[]
}

export interface Education {
  school: string
  href: string
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
