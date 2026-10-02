import type { NewsItem } from './types'

/** Reverse-chronological. Keep the newest three or four meaningful; prune below that. */
export const news: NewsItem[] = [
  {
    date: 'Sep 2026',
    text: 'ArticulateArena: A Metric for Articulated Kinematics is on arXiv. Second author; contributions to joint-motion metric development and multi-model evaluation.',
    links: [
      { label: 'Paper', href: 'https://arxiv.org/abs/2609.33931' },
      { label: 'Project & demos', href: 'https://heyumeng.com/ArticulateArena-web/' },
    ],
  },
  {
    date: 'Aug 2026',
    text: 'Mandate Order — the game I worked on as a UE5 gameplay engineer — launched in Steam Early Access on August 12.',
    links: [{ label: 'Steam', href: 'https://store.steampowered.com/app/1733690' }],
  },
  {
    date: 'Jun 2026',
    text: 'Joined the Artificial Intelligence & Visual Computing Lab at UCLA as a research assistant, advised by Prof. Chenfanfu Jiang, working on end-to-end texture generation and data augmentation for multi-part 3D assets.',
    links: [{ label: 'AIVC Lab', href: 'https://www.math.ucla.edu/aivc/' }],
  },
  {
    date: 'May 2026',
    text: 'Finished the spring semester at USC: engine subsystems and a natural-language shader authoring tool in PrimeEngine, plus motion capture interpolation, inverse kinematics with skinning, and a mass-spring simulation.',
  },
  {
    date: 'Jan 2026',
    text: 'Started the M.S. in Computer Science at USC, on the graphics track.',
  },
  {
    date: 'Dec 2025',
    text: 'Completed eighteen months at Chengdu Digital Sky as a UE5 gameplay engineer, contributing to Mandate Order, a commercial strategy game.',
    links: [{ label: 'Steam', href: 'https://store.steampowered.com/app/1733690' }],
  },
]
