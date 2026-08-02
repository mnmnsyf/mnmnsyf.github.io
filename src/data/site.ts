import type { Link } from './types'

/**
 * Header identity and contact block.
 *
 * TODO before publishing: add the two entries below to `links` once available.
 *   { label: 'CV', href: '/cv.pdf' }            -- export 参考/佘泳霏简历.docx to PDF into public/
 *   { label: 'LinkedIn', href: 'https://...' }
 * Both are expected by recruiters; the link row renders whatever is present.
 */
export const site = {
  name: 'Yongfei She',
  nameZh: '佘泳霏',
  title: 'Graphics / Engine / Gameplay Programmer',
  photo: { src: '/syf1.jpg', alt: 'Yongfei She' },

  affiliations: [
    {
      text: 'M.S. Computer Science (Graphics), University of Southern California',
      detail: 'expected 2028',
    },
    {
      text: 'Visiting Student, Artificial Intelligence & Visual Computing Lab, UCLA',
      detail: 'advised by Prof. Chenfanfu Jiang',
      href: 'https://www.math.ucla.edu/aivc/',
    },
    {
      text: 'Previously UE5 Gameplay Engineer, Chengdu Digital Sky Technology',
      detail: 'shipped title',
    },
  ],

  seeking: 'Seeking a Summer 2027 internship in engine, graphics, or gameplay programming.',

  intro: [
    'I build the systems underneath games: renderers, engine subsystems, and the geometry and graph algorithms that gameplay runs on. Eighteen months on a commercial Unreal Engine 5 strategy title taught me what holds up in production; a competitive programming background is why I reach for the data structure that makes a feature affordable.',
    'At UCLA I work on generative 3D content for embodied-AI simulation. At USC I have been writing renderers and engine subsystems from scratch — rasterization, skeletal animation, and multithreaded physics — to understand the layers I used to build on top of.',
  ],

  lastUpdated: 'August 2026',
} satisfies {
  name: string
  nameZh: string
  title: string
  photo: { src: string; alt: string }
  affiliations: { text: string; detail?: string; href?: string }[]
  seeking: string
  intro: string[]
  lastUpdated: string
}

export const links: Link[] = [
  { label: 'Email', href: 'mailto:sheyfff@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/mnmnsyf' },
]
