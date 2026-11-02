/**
 * The site is organized by the roles the author is applying for. Each module
 * states what the author can do in that role, lists the skills behind it, and
 * shows the projects of the matching project group in full.
 */
export interface SkillModule {
  id: 'engine' | 'gameplay' | 'graphics'
  title: string
  /** One sentence a recruiter can repeat back. */
  claim: string
  skills: string[]
  /** The project group whose projects this page shows. */
  projectGroup: string
}

export const skillModules: SkillModule[] = [
  {
    id: 'engine',
    title: 'Engine Development',
    claim:
      'Large-scale real-time systems in C++: multithreaded simulation, spatial data structures, graph algorithms and engine tooling that hold up at thousands of units.',
    skills: [
      'C++',
      'Multithreading',
      'Unreal Mass (ECS)',
      'KD-tree',
      'Union-find',
      'Graph algorithms',
      'Performance Optimization',
      'Unreal Insights',
      'Code Generation',
      'Hot Reload',
    ],
    projectGroup: 'engine-development',
  },
  {
    id: 'gameplay',
    title: 'Gameplay Development',
    claim:
      'Gameplay systems in Unreal Engine 5: data-driven abilities, input and UI frameworks, and AI behavior, shipped in a commercial strategy game.',
    skills: [
      'Data-driven design',
      'Unreal Enhanced Input',
      'CommonUI',
      'Behavior trees',
      'Post-process materials',
      'Editor & Debug Tools',
    ],
    projectGroup: 'gameplay-development',
  },
  {
    id: 'graphics',
    title: 'Graphics & Simulation',
    claim:
      'Rendering and physics built from first principles: a software rasterizer, deep-learning denoising for path tracing, inverse kinematics with skinning, and soft-body simulation with live demos.',
    skills: [
      'DirectX 11 / HLSL',
      'OpenGL / OpenGL ES',
      'Post-process shaders',
      'Kinematics',
      'Physics Simulation',
      'Animation Systems',
      'PyTorch',
    ],
    projectGroup: 'graphics-simulation',
  },
]
