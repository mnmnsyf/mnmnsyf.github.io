export type IconName = 'mail' | 'github' | 'cv' | 'linkedin' | 'scholar'

export interface NavLink {
  label: string
  href: string
  icon: IconName
}

/** Public identity and recruiting information. */
export const site = {
  name: 'Fiona She',
  roleLine: 'Software Engineer · C++ Systems, Performance & Tooling',
  photo: { src: '/portrait.jpg', alt: 'Fiona She' },

  /**
   * Rendered with v-html so institution and advisor names can carry links, the
   * way an academic homepage bio does. These are authored here as constants —
   * no external or user input reaches this field.
   */
  bio: [
    `I'm a software engineer who builds performance-critical C++ systems, from graph and
     spatial algorithms in a shipped real-time strategy game to developer-facing SDKs and tools.`,
    `At
     <a href="https://www.digisky.com/" target="_blank" rel="noopener">Chengdu Digital Sky</a>
     (intern to full-time, two-plus years) I owned eight production systems for
     <a href="https://www.digisky.com/product/mo" target="_blank" rel="noopener">Mandate Order</a>,
     now on Steam Early Access: pathfinding for 2,000+ agents, spatial indexing, a data-driven skill
     system, and the input and UI frameworks.`,
    `<strong>Seeking 2027 full-time roles in C++ software systems, backend and infrastructure, and
     performance engineering.</strong> M.S. in Computer Science at
     <a href="https://www.usc.edu/" target="_blank" rel="noopener">USC</a>, May 2027 (current course:
     CSCI 566 Deep Learning). ICPC medalist; research assistant at UCLA's
     <a href="https://www.math.ucla.edu/aivc/" target="_blank" rel="noopener">AIVC Lab</a> and co-first author of
     <a href="#/research/articulatearena">ArticulateArena</a>. Recently: an
     <a href="#/engine/angle-graphics-sdk">ANGLE-based .NET graphics SDK</a> and
     <a href="#/graphics/path-tracing-denoising">deep learning for path-tracing denoising</a> in PyTorch.`,
  ],

  lastUpdated: 'October 2026',
}

/** The general software engineering resume; site-relative, so render it through assetUrl. */
export const resumeHref = '/Fiona_She_Resume.pdf'

export const navLinks: NavLink[] = [
  { label: 'Email', href: 'mailto:sheyfff@gmail.com', icon: 'mail' },
  { label: 'Résumé (PDF)', href: resumeHref, icon: 'cv' },
  { label: 'GitHub', href: 'https://github.com/mnmnsyf', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yongfei-she/',
    icon: 'linkedin',
  },
]

/** Direct routes to the strongest public evidence. */
export const featuredWork = [
  {
    label: 'Research · Co-first author',
    title: 'ArticulateArena',
    href: '#/research/articulatearena',
    image: '/articulatearena-category.png',
    alt: 'Five joint types covered by ArticulateArena',
  },
  {
    label: 'C++ / C# · SDK & Tools',
    title: 'ANGLE Graphics SDK',
    href: '#/engine/angle-graphics-sdk',
    image: '/angle-sdk-architecture.svg',
    alt: 'ANGLE graphics SDK architecture',
  },
  {
    label: 'UE5 / PyTorch · In progress',
    title: 'Path Tracing Denoising',
    href: '#/graphics/path-tracing-denoising',
    image: '/denoising-workflow.svg',
    alt: 'Path-tracing denoising training and evaluation workflow',
  },
]

/** Independent sections in navigation order. `nav` is the short top-bar label. */
export const sections = [
  { id: 'top', label: 'Entry', nav: 'Entry' },
  { id: 'engine', label: 'Engine Development', nav: 'Engine' },
  { id: 'gameplay', label: 'Gameplay Development', nav: 'Gameplay' },
  { id: 'graphics', label: 'Graphics & Simulation', nav: 'Graphics' },
  { id: 'research', label: 'Research', nav: 'Research' },
  { id: 'about', label: 'About', nav: 'About' },
] as const
