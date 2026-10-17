import type { Experience } from './types'

export const experience: Experience[] = [
  {
    org: 'Artificial Intelligence & Visual Computing Lab, UCLA',
    role: 'Research Assistant',
    links: [
      { label: 'AIVC Lab', href: 'https://www.math.ucla.edu/aivc/' },
      { label: 'ArticulateArena paper', href: 'https://arxiv.org/abs/2609.33931' },
    ],
    period: 'Jun 2026 – Present',
    location: 'Los Angeles, CA',
    advisor: {
      label: 'Prof. Chenfanfu Jiang',
      href: 'https://www.math.ucla.edu/~cffjiang/index.html',
    },
    bullets: [
      'Co-first author of ArticulateArena: A Metric for Articulated Kinematics, available on arXiv.',
      'Contributed to representation-invariant joint-motion metrics and standardized evaluation protocols for articulated objects.',
      'Built and ran multi-model experiments covering model execution, quality assessment, and comparative analysis.',
    ],
  },
  {
    org: 'Chengdu Digital Sky Technology',
    role: 'Software Engineer (C++ / Unreal Systems)',
    links: [
      { label: 'Digital Sky', href: 'https://www.digisky.com/' },
      { label: 'Mandate Order on Steam', href: 'https://store.steampowered.com/app/1733690' },
    ],
    period: 'Sep 2023 \u2013 Dec 2025',
    location: 'Chengdu, China',
    bullets: [
      'Shipped production C++ systems for Mandate Order, a commercial Unreal Engine 5 strategy game released on Steam Early Access, growing from intern to full-time engineer.',
      'Cut connectivity computation by 85% at the typical 1,000-unit workload with spatial hashing on a uniform grid; built a templated KD-tree, union-find and DBSCAN library for 5,000+ unit scenes.',
      'Built a threat-aware pathfinding service (heap-based multi-source Dijkstra) for 1,000+ concurrent agents, with batched, queue-based state sync to the AI thread.',
      'Owned the data-driven skill system for 100+ abilities on the project\u2019s multithreaded ECS: triggers decoupled from execution, commander skill preview and release, and Unreal Mass projectile processors.',
      'Designed reusable input and UI frameworks: prioritized input contexts with reference-counted action monitoring, a stack-based UI layer manager, and a registry-based settings system.',
      'Implemented Floyd\u2013Warshall routing with cached next hops for command relay across 50+ signal-tower nodes, and Voronoi land partitioning with grid-approximated adjacency.',
      'Built reusable behavior-tree components, reducing implementation time by approximately 50%.',
    ],
    media: [
      {
        kind: 'image',
        src: '/mandate-order.png',
        alt: 'Mandate Order Steam store page',
        caption: 'Mandate Order on Steam Early Access',
      },
    ],
  },
  {
    org: 'Data Structures & Algorithms Lab, Chengdu University of Information Technology',
    role: 'Member',
    links: [{ label: 'University website', href: 'https://www.cuit.edu.cn/' }],
    period: 'Sep 2020 – Jun 2023',
    location: 'Chengdu, China',
    bullets: [
      'Represented the university at ICPC, CCPC and Lan Qiao Cup, winning multiple medals including an ICPC silver.',
      'Mentored new team members on algorithmic approach and contest strategy; prepared daily practice sets, ran mock contests, and taught at winter and summer training camps.',
    ],
  },
]
