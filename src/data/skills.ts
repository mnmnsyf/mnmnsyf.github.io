import type { SkillGroup } from './types'

export const skillsSummary =
  'Production C++ systems, real-time graphics and simulation, with research experience in articulated-object evaluation.'

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
    label: 'Tools',
    items: ['Git', 'Visual Studio', '.NET', 'PyTorch', 'Blender', 'Cursor', 'Confluence', 'Jira'],
  },
]
