import type { Experience } from './types'

export const experience: Experience[] = [
  {
    org: 'Artificial Intelligence & Visual Computing Lab, UCLA',
    role: 'Research Assistant',
    period: 'Jun 2026 – Present',
    location: 'Los Angeles, CA',
    advisor: {
      label: 'Prof. Chenfanfu Jiang',
      href: 'https://www.math.ucla.edu/~cffjiang/index.html',
    },
    bullets: [
      'Second author of ArticulateArena: A Metric for Articulated Kinematics, available on arXiv.',
      'Contributed to representation-invariant joint-motion metrics and standardized evaluation protocols for articulated objects.',
      'Built and ran multi-model experiments covering model execution, quality assessment, and comparative analysis.',
    ],
  },
  {
    org: 'Chengdu Digital Sky Technology',
    role: 'Software Engineer · C++ / Unreal Systems',
    period: 'Jul 2024 – Dec 2025 · Full-time',
    location: 'Chengdu, China',
    bullets: [
      'Built production C++ engine and simulation systems for Mandate Order, released on Steam Early Access.',
      'Scaled rendering to 10,000+ entities with GPU instancing to reduce draw-call overhead.',
      'Designed a multithreaded ECS, separating event triggers from execution across 100+ configurable abilities.',
      'Built dynamic road-graph routing with heap-based multi-source Dijkstra for threat-aware and supply routes, supporting 1,000+ concurrent agents; batched road-state synchronization across GameWorld and AIWorld.',
      'Built a supply transportation system on the navigation mesh, automating strategic resource routing across large-scale battles.',
      'Designed a multi-mode input and UI system on Enhanced Input, supporting layered, context-aware interaction.',
      'Partitioned terrain with Voronoi diagrams to derive plot adjacency, backing the in-game construction system.',
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
    org: 'Chengdu Digital Sky Technology',
    role: 'Software Engineer Intern · C++ / Unreal Systems',
    period: 'Sep 2023 – Jul 2024 · Internship',
    location: 'Chengdu, China',
    bullets: [
      'Reduced connectivity calculation overhead by 85% at 2,000+ units using a KD-tree and reusable C++ templates.',
      'Implemented Floyd–Warshall shortest paths for command relay across 50+ connected signal-tower nodes.',
      'Built reusable behavior-tree components, reducing implementation time by approximately 50%.',
      'Delivered a playable tavern-management and farming prototype within one month with cross-functional teammates.',
    ],
  },
  {
    org: 'Data Structures & Algorithms Lab, Chengdu University of Information Technology',
    role: 'Member',
    period: 'Sep 2020 – Jun 2023',
    location: 'Chengdu, China',
    bullets: [
      'Represented the university at ICPC, CCPC and Lan Qiao Cup, winning multiple medals including an ICPC silver.',
      'Mentored new team members on algorithmic approach and contest strategy; prepared daily practice sets, ran mock contests, and taught at winter and summer training camps.',
    ],
  },
]
