export type IconName = 'mail' | 'github' | 'cv' | 'linkedin' | 'scholar'

export interface NavLink {
  label: string
  href: string
  icon: IconName
}

/**
 * Header identity block.
 *
 * TODO before publishing: add the two entries commented out in `navLinks` once
 * the files exist. Both are expected by recruiters; the row renders whatever
 * is present.
 */
export const site = {
  name: 'Yongfei She',
  nameZh: '佘泳霏',
  roleLine: 'Software Engineer · Graphics, Systems & AI',
  photo: { src: '/portrait.jpg', alt: 'Yongfei She' },

  /**
   * Rendered with v-html so institution and advisor names can carry links, the
   * way an academic homepage bio does. These are authored here as constants —
   * no external or user input reaches this field.
   */
  bio: [
    `I'm Yongfei She, a software engineer and master's student in Computer Science at the
     <a href="https://www.usc.edu/" target="_blank" rel="noopener">University of Southern California</a>,
     working on graphics. I'm also a research assistant at the
     <a href="https://www.math.ucla.edu/aivc/" target="_blank" rel="noopener">AIVC Lab</a>
     at UCLA, advised by Prof.
     <a href="https://www.math.ucla.edu/~cffjiang/index.html" target="_blank" rel="noopener">Chenfanfu Jiang</a>,
     where I build generative 3D content pipelines for embodied-AI simulation.`,
    `Before USC I spent eighteen months as a gameplay engineer at
     <a href="https://www.digisky.com/" target="_blank" rel="noopener">Chengdu Digital Sky</a>,
     owning the geometry and graph algorithms behind unit command, terrain ownership
     and construction on a commercial
     <a href="https://www.digisky.com/product/mo" target="_blank" rel="noopener">Unreal Engine 5 strategy title</a>.
     Since then I have been writing renderers and engine subsystems from scratch —
     a software rasterizer, a DirectX 11 engine, a multithreaded physics simulation.`,
    `<strong>I am looking for a Summer 2027 software engineering internship, with a focus on C++, systems, graphics, or performance.</strong>`,
  ],

  lastUpdated: 'August 2026',
}

export const navLinks: NavLink[] = [
  { label: 'Email', href: 'mailto:sheyfff@gmail.com', icon: 'mail' },
  { label: 'GitHub', href: 'https://github.com/mnmnsyf', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yongfei-she-a28945392/', icon: 'linkedin' },
  // { label: 'CV', href: '/cv.pdf', icon: 'cv' },
]

/** Anchor targets for the top navigation, in page order. */
export const sections = [
  { id: 'news', label: 'News' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'skills', label: 'Skills' },
]
