import type { SkillGroup } from './types'

export const skillsSummary =
  'Production C++ software systems, real-time graphics and simulation, articulated-object research, and ongoing deep-learning work on neural rendering denoising.'

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['C++', 'C', 'C#', 'Java', 'Python', 'Lua', 'HLSL', 'MySQL'] },
  {
    label: 'Systems',
    items: ['Data Structures & Algorithms', 'Multithreading', 'ECS', 'Performance Optimization'],
  },
  { label: 'Graphics', items: ['DirectX 11', 'OpenGL', 'OpenGL ES', 'EGL', 'ANGLE'] },
  {
    label: 'Simulation & Research',
    items: ['Kinematics', 'Physics Simulation', 'Multi-model Evaluation', 'Benchmarking'],
  },
  { label: 'Engines', items: ['Unreal Engine', 'Unity'] },
  {
    label: 'Deep Learning',
    items: ['PyTorch', 'Neural Denoising', 'Training-Data Pipelines', 'Comparative Evaluation'],
  },
  {
    label: 'Tools',
    items: ['Git', 'Visual Studio', '.NET', 'PyTorch', 'Blender', 'Cursor', 'Confluence', 'Jira'],
  },
]
