import type { SkillGroup } from './types'

export const skillsSummary =
  'Production C++ systems and performance work, algorithms and data structures, software architecture and developer tooling, with depth in real-time graphics, simulation and deep learning.'

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['C++', 'C', 'C#', 'Python', 'Java', 'Lua', 'HLSL', 'SQL (MySQL)'] },
  {
    label: 'Systems',
    items: [
      'Data Structures & Algorithms',
      'Graph & Spatial Algorithms',
      'Unreal Mass (ECS)',
      'Performance Optimization',
    ],
  },
  {
    label: 'Architecture & Tooling',
    items: [
      'Input & UI Frameworks',
      'SDK & API Design',
      'Code Generation',
      'Hot Reload',
      'Editor & Debug Tools',
    ],
  },
  {
    label: 'Testing & Validation',
    items: ['Deterministic Rendering Tests', 'Benchmarking', 'Multi-model Evaluation'],
  },
  { label: 'Graphics', items: ['DirectX 11', 'OpenGL', 'OpenGL ES', 'EGL', 'ANGLE'] },
  { label: 'Simulation', items: ['Kinematics', 'Physics Simulation', 'Animation Systems'] },
  {
    label: 'Deep Learning',
    items: ['PyTorch', 'Neural Denoising', 'Training-Data Pipelines'],
  },
  {
    label: 'Engines & Tools',
    items: [
      'Unreal Engine',
      'Unity',
      'Git',
      'Perforce',
      'CMake',
      'Visual Studio',
      'Unreal Insights',
      'RenderDoc',
      '.NET',
      'Blender',
    ],
  },
]
