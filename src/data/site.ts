export type IconName = 'mail' | 'github' | 'cv' | 'linkedin' | 'scholar'

export interface NavLink {
  label: string
  href: string
  icon: IconName
}

/** Public identity and recruiting information. */
export const site = {
  name: 'Yongfei She',
  nameZh: '佘泳霏',
  roleLine: 'C++ Software Engineer · Systems, Graphics & Simulation',
  photo: { src: '/portrait.jpg', alt: 'Yongfei She' },

  /**
   * Rendered with v-html so institution and advisor names can carry links, the
   * way an academic homepage bio does. These are authored here as constants —
   * no external or user input reaches this field.
   */
  bio: [
    `I'm a C++ software engineer, ICPC medalist, and research assistant at the
     <a href="https://www.math.ucla.edu/aivc/" target="_blank" rel="noopener">AIVC Lab</a>
     at UCLA, advised by Prof.
     <a href="https://www.math.ucla.edu/~cffjiang/index.html" target="_blank" rel="noopener">Chenfanfu Jiang</a>,
     working on articulated-object evaluation for embodied-AI simulation.`,
    `<strong>Seeking 2027 full-time roles in C++ systems, graphics, simulation, and research engineering.</strong>
     Expected graduation: May 2027.`,
    `At
     <a href="https://www.digisky.com/" target="_blank" rel="noopener">Chengdu Digital Sky</a>,
     I built production C++ systems for
     <a href="https://www.digisky.com/product/mo" target="_blank" rel="noopener">Mandate Order</a>:
     GPU instancing for 10,000+ entities, multithreaded ECS, and routing for 1,000+ agents.
     My recent projects include an <a href="#angle-graphics-sdk">ANGLE-based .NET graphics SDK</a>
     and <a href="#path-tracing-denoising">path-tracing denoising in UE5</a>, with a PyTorch model currently in training.
     I am also the second author of
     <a href="#articulatearena">ArticulateArena</a>, now on arXiv.`,
  ],

  lastUpdated: 'October 2026',
}

export const navLinks: NavLink[] = [
  { label: 'Email', href: 'mailto:sheyfff@gmail.com', icon: 'mail' },
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
    label: 'Research · Second author',
    title: 'ArticulateArena',
    href: '#articulatearena',
    image: '/articulatearena-category.png',
    alt: 'Five joint types covered by ArticulateArena',
  },
  {
    label: 'C++ / C# · SDK & Tools',
    title: 'ANGLE Graphics SDK',
    href: '#angle-graphics-sdk',
    image: '/angle-sdk-architecture.svg',
    alt: 'ANGLE graphics SDK architecture',
  },
  {
    label: 'UE5 / PyTorch · In progress',
    title: 'Path Tracing Denoising',
    href: '#path-tracing-denoising',
    image: '/denoising-workflow.svg',
    alt: 'Path-tracing denoising training and evaluation workflow',
  },
]

/** Anchor targets for the top navigation, in page order. */
export const sections = [
  { id: 'top', label: 'Entry' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'news', label: 'Updates' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'skills', label: 'Skills' },
]
