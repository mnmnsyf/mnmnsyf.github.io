import type { Project } from './types'

export const articulateArena: Project = {
  id: 'articulatearena',
  title: 'ArticulateArena: A Metric for Articulated Kinematics',
  role: 'Second author',
  period: 'arXiv preprint · Sep 2026',
  tech: ['Kinematics', 'Articulated Objects', 'Simulation', 'Evaluation'],
  summary:
    'Evaluating articulated objects by the motions their joints induce, rather than comparing joint parameters independently.',
  metrics: ['ArticulateArena-20K: 19,977 articulated objects with verified kinematics'],
  body: [
    'My contributions include joint-motion metric development and multi-model evaluation experiments at UCLA’s Artificial Intelligence & Visual Computing Lab.',
    'The collaborative work introduces a representation-invariant metric for joint motion, extends it to kinematic trees, and evaluates reconstruction methods on a shared articulated-object suite.',
  ],
  links: [
    { label: 'Read paper', href: 'https://arxiv.org/abs/2609.33931' },
    { label: 'Project & demos', href: 'https://heyumeng.com/ArticulateArena-web/' },
  ],
  note: 'Authors: Yumeng He, Yongfei She, Huanyu Chen, Chun Yuan, Peihao Li, Joseph Masterjohn, Yin Yang, Ying Jiang, and Chenfanfu Jiang. arXiv preprint, September 27, 2026.',
  mediaColumns: 1,
  media: [
    {
      kind: 'image',
      src: '/articulatearena-category.png',
      alt: 'Fixed, prismatic, revolute, continuous and helical joints with example articulated objects',
      caption: 'Five joint types covered by the metric. Figure from ArticulateArena.',
    },
  ],
}
