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
     I also write renderers and simulation tools, and am the second author of
     <a href="#articulatearena">ArticulateArena</a>, now on arXiv.`,
  ],

  lastUpdated: 'October 2026',
}

export const navLinks: NavLink[] = [
  { label: 'Email', href: 'mailto:sheyfff@gmail.com', icon: 'mail' },
  { label: 'GitHub', href: 'https://github.com/mnmnsyf', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yongfei-she-a28945392/',
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
    label: 'C++ · Rendering',
    title: 'Software Rasterizer',
    href: '#software-rasterizer',
    image: '/raster-shading.jpg',
    alt: 'Flat, Gouraud and Phong shading rendered on the CPU',
  },
  {
    label: 'Tools · Engine systems',
    title: 'Shader Authoring & ECS',
    href: '#engine-subsystems',
    image: '/engine-shader-live-poster.jpg',
    alt: 'Shader authoring tool connected to a live engine session',
  },
]

/** Anchor targets for the top navigation, in page order. */
export const sections = [
  { id: 'news', label: 'News' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'skills', label: 'Skills' },
]
