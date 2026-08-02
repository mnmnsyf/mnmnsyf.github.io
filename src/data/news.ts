import type { NewsItem } from './types'

/** Reverse-chronological. Keep the newest three or four meaningful; prune below that. */
export const news: NewsItem[] = [
  {
    date: 'Aug 2026',
    text: 'Continuing at UCLA on an end-to-end texture generation and data augmentation pipeline for multi-part 3D assets.',
  },
  {
    date: 'May 2026',
    text: 'Finished two spring-semester projects at USC: a custom C++/DirectX 11 engine with Lua-driven HLSL hot-reloading, and a motion capture interpolation and visualization tool.',
  },
  {
    date: 'Jan 2026',
    text: 'Started the M.S. in Computer Science at USC, on the graphics track.',
  },
  {
    date: 'Dec 2025',
    text: 'Wrapped up eighteen months as a UE5 gameplay engineer at Chengdu Digital Sky, and built a software rasterizer from scratch over the winter.',
  },
  {
    date: 'Jun 2025',
    text: 'Joined the Artificial Intelligence & Visual Computing Lab at UCLA as a visiting student, advised by Prof. Chenfanfu Jiang.',
    links: [{ label: 'AIVC Lab', href: 'https://www.math.ucla.edu/aivc/' }],
  },
]
