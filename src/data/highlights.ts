/**
 * Short, keyword-tagged cards for the "What I built" summary of each project,
 * in the same order as the project's write-up paragraphs (or modules). The full
 * paragraph stays in the technical notes; the card is what a recruiter scans.
 */
export interface HighlightCard {
  /** Omit to keep a module's own title. */
  title?: string
  tags: string[]
}

export const highlightCards: Record<string, HighlightCard[]> = {
  'angle-graphics-sdk': [
    {
      title: 'Native EGL bridge and GPU resource API',
      tags: ['C++ / C# interop', 'EGL', 'Resource lifetime', 'Thread safety'],
    },
    {
      title: 'Generated GLES bindings',
      tags: ['Code generation', 'Khronos XML', 'Idempotency tests', 'Deterministic tests'],
    },
    {
      title: 'Developer tooling: hot reload and benchmarks',
      tags: ['Hot reload', 'Failure fallback', 'Benchmarking'],
    },
  ],
  'path-tracing-denoising': [
    { title: 'UE5 training-data pipeline', tags: ['Data pipeline', 'Unreal Engine 5', 'C++'] },
    {
      title: 'Baselines and benchmarking harness',
      tags: ['SVGF', 'DLSS Ray Reconstruction', 'Benchmarking'],
    },
    {
      title: 'Neural denoiser training (in progress)',
      tags: ['PyTorch', 'Deep learning', 'Temporal stability'],
    },
  ],
  'engine-subsystems': [
    {
      title: 'AI-assisted authoring tool for a live engine',
      tags: ['Developer tooling', 'LLM integration', 'Constrained generation'],
    },
    {
      title: 'Hot reload with safe fallback',
      tags: ['Hot reload', 'Fault tolerance', 'Error handling', 'HLSL'],
    },
    {
      title: 'Multithreaded ECS engine subsystems',
      tags: ['Multithreading', 'ECS', 'Skeletal animation', 'GPU culling'],
    },
  ],
  'software-rasterizer': [
    {
      title: 'Rasterization pipeline from first principles',
      tags: ['C++', 'Z-buffer', 'Programmable shaders'],
    },
    {
      title: 'Perspective-correct shading',
      tags: ['Interpolation', 'Blinn–Phong', 'Shading models'],
    },
  ],
  'mocap-interpolation': [
    { title: 'Four interpolation schemes', tags: ['Quaternions', 'SLERP', 'Bézier curves'] },
    {
      title: 'Analysis and visualization tooling',
      tags: ['Visualization', 'Debug tooling', 'Benchmarking'],
    },
    { title: 'Accuracy measured against cost', tags: ['Benchmarking', 'Trade-off analysis'] },
  ],
  'ik-skinning': [
    {
      title: 'Forward kinematics and skinning',
      tags: ['Linear algebra', 'Transform hierarchies', 'Linear blend skinning'],
    },
    {
      title: 'Jacobian IK solver',
      tags: ['Automatic differentiation', 'Least squares', 'SVD'],
    },
    { title: 'Dual quaternion skinning', tags: ['Dual quaternions', 'Volume preservation'] },
    {
      title: 'Handles on mesh vertices',
      tags: ['Automatic differentiation', 'End-to-end Jacobian'],
    },
    {
      title: 'Stable large drags and scripted motion',
      tags: ['Numerical stability', 'Step clamping'],
    },
  ],
  'jello-simulation': [
    {
      title: 'Constraint-based collision response',
      tags: ['Numerical stability', 'Constraints'],
    },
    { title: 'Volume-preserving pressure', tags: ['Physics simulation', 'Robustness'] },
    {
      title: 'Collisions with analytic geometry',
      tags: ['Collision detection', 'Trilinear interpolation'],
    },
    { title: 'Force fields and interaction', tags: ['Force fields', 'Interaction design'] },
  ],
  'sight-tour': [
    { tags: ['Color-channel isolation', 'Rendering'] },
    { tags: ['Post-process shaders', 'Stereo rendering'] },
    { tags: ['Shader effects', 'Real-time input'] },
  ],
  orca: [
    {
      title: 'ORCA as a reusable navigation layer',
      tags: ['Multi-agent systems', 'Collision avoidance', 'Reusable subsystem'],
    },
  ],
  articulatearena: [
    {
      title: 'My contributions: metric and evaluation',
      tags: ['Metric design', 'Multi-model evaluation', 'Experiments'],
    },
    {
      title: 'Representation-invariant joint-motion metric',
      tags: ['Kinematic trees', 'Benchmarking'],
    },
  ],
}
