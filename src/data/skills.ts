import type { SkillGroup } from './types'

export const skillsSummary =
  'Algorithms and data structures, with depth in pathfinding, grid-based methods and graph theory; and the low-level workings of real-time computer graphics.'

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['C++', 'C', 'C#', 'Java', 'Python', 'Lua', 'HLSL', 'MySQL'] },
  { label: 'Graphics', items: ['DirectX 11', 'OpenGL'] },
  { label: 'Engines', items: ['Unreal Engine', 'Unity'] },
  {
    label: 'Tools',
    items: ['Git', 'Visual Studio', 'Blender', 'Cursor', 'Confluence', 'Jira'],
  },
]
