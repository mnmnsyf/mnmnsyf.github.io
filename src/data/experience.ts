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
      'Research on end-to-end generation of articulated 3D meshes and textures, aimed at embodied-AI simulation and 3D asset generation.',
      'Leading the design of an end-to-end 3D texture generation and data augmentation pipeline, exploring automated texturing for multi-part 3D assets.',
    ],
  },
  {
    org: 'Chengdu Digital Sky Technology',
    role: 'Software Engineer (UE5)',
    period: 'Sep 2023 – Dec 2025',
    location: 'Chengdu, China',
    bullets: [
      'Software engineer on Mandate Order, a large-scale real-time strategy title; owned rendering, graph algorithms, navigation, AI, and modular gameplay systems.',
      'Optimized rendering for 10,000+ on-screen agents with GPU instancing and supported shortest-path routing for 1,000+ concurrent agents.',
      "Extended Unreal's spline module into a dynamic navigation system supporting single-source and multi-source shortest-path tactical pathfinding.",
      'Built a supply transportation system on the navigation mesh, automating strategic resource routing across large-scale battles.',
      'Designed a multi-mode input and UI system on Enhanced Input, supporting layered, context-aware interaction.',
      'Rebuilt the skill and buff framework to be modular, decoupling triggers from effectors so designers could configure ability logic without engineering support.',
      'Partitioned terrain with Voronoi diagrams to derive plot adjacency, backing the in-game construction system.',
      'Delivered a playable tavern-management and farming prototype within one month.',
      'Optimized legion connectivity computation with a KD-tree and refactored it into reusable C++ templates — 85% faster with 2,000+ units.',
      'Implemented Floyd–Warshall multi-source shortest paths to enable chained command relay between connected signal towers.',
      'Built general-purpose AI behavior trees, extending Sequence tracks and Flow Graph nodes to simplify handoff between the narrative and engineering teams.',
    ],
    media: [
      { kind: 'image', src: '/mandate-order.png', alt: 'Mandate Order Steam store page', caption: 'Mandate Order on Steam Early Access' },
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
