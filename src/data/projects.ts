import type { ProjectGroup } from './types'

const engineRendering: ProjectGroup = {
  id: 'engine-rendering',
  title: 'Engine & Rendering',
  blurb: 'Rendering pipelines and engine-level systems.',
  projects: [
    {
      id: 'engine-subsystems',
      title: 'Engine Subsystems & Shader Authoring Tool',
      period: 'Jan – May 2026',
      tech: ['C++', 'Lua', 'DirectX 11', 'HLSL', 'Python'],
      summary:
        'Rendering, animation and physics subsystems plus a natural-language shader authoring tool, built inside PrimeEngine — the C++/Lua DirectX 11 engine framework used in USC’s engine course.',
      body: [
        'The shader tool runs outside the engine and talks to a live session. It offers manual parameter controls and style presets, and takes natural-language input that produces either a parameter set or an HLSL snippet dropped into a controlled region of a fixed template — a snippet rather than a whole shader, which is what keeps the output predictable. Generated code stays visible and editable before it is applied.',
        'Applying recompiles against the running engine, so the target object updates without a restart. A failed compile keeps the last working shader and surfaces the error instead of leaving the object in a broken state.',
        'Alongside the tool I implemented the skeletal animation system — partial-body blending, additive layers, recursive state machine updates — a multithreaded physics simulation with an independent lifecycle and a decoupled component architecture, and GPU instance culling through the engine’s RHI.',
      ],
      note: 'PrimeEngine is the course framework; the subsystems and tooling described here are my own work.',
      mediaColumns: 1,
      media: [
        {
          kind: 'video',
          src: '/engine-shader-live.mp4',
          poster: '/engine-shader-live-poster.jpg',
          alt: 'Generated effect applied to a character in the running engine',
          caption:
            'A generated effect applied to the boss character without restarting the engine. Tool on the right, live session on the left.',
        },
        {
          kind: 'image',
          src: '/engine-authoring-tool.jpg',
          alt: 'Shader authoring tool interface',
          caption: 'The authoring tool: presets, manual parameters, and natural-language input',
        },
      ],
    },
    {
      id: 'software-rasterizer',
      title: 'C++ Software Rasterizer',
      period: 'Nov – Dec 2025',
      tech: ['C++'],
      summary:
        'A complete 3D rendering pipeline written against nothing but the C++ standard library — no OpenGL, no DirectX.',
      metrics: ['Fragment-shades meshes of 10,000+ vertices'],
      mediaColumns: 1,
      body: [
        'Implemented rasterization, Z-buffering and a programmable shader pipeline from first principles, with no external graphics API.',
        'Added perspective-correct interpolation and Blinn-Phong shading, which is where the pipeline stopped being a demo and started producing images worth looking at.',
      ],
      media: [
        {
          kind: 'image',
          src: '/raster-shading.jpg',
          alt: 'Flat, Gouraud and Phong shading compared',
          caption: 'Flat, Gouraud and Phong shading, same geometry and light',
        },
        {
          kind: 'image',
          src: '/raster-obj.jpg',
          alt: 'Textured character mesh rendered by the software rasterizer',
          caption: 'Textured OBJ mesh, rasterized and shaded on the CPU',
        },
      ],
    },
  ],
}

const animationSimulation: ProjectGroup = {
  id: 'animation-simulation',
  title: 'Animation & Simulation',
  blurb:
    'Character animation and physical simulation, with the tooling to measure whether they are right.',
  projects: [
    {
      id: 'mocap-interpolation',
      title: 'Motion Capture Interpolation & Analysis',
      period: 'Spring 2026',
      tech: ['C++', 'OpenGL'],
      summary:
        'ASF/AMC motion reconstruction across four interpolation schemes, with tooling built to see and measure the difference between them.',
      metrics: [
        'Bezier quaternion interpolation costs 21x linear Euler — 1108 ms against 52 ms, averaged over 1000 runs',
      ],
      body: [
        'Reconstructed motion capture frames using linear Euler, Bezier Euler, SLERP quaternion, and Bezier SLERP quaternion interpolation.',
        'Built the analysis and visualization tooling alongside it: overlapping playback against the input motion, ghosting trails, motion paths, gimbal lock detection, and benchmarks comparing each scheme on visual quality against runtime cost.',
        'The comparison quantified what the theory predicts. On root rotation the input peaks near -105 degrees; SLERP tracks it to -117 while linear Euler overshoots past -135, and the cost table shows what that accuracy is worth in milliseconds.',
      ],
      mediaColumns: 2,
      media: [
        {
          kind: 'image',
          src: '/mocap-euler-vs-slerp.png',
          alt: 'Input, linear Euler and SLERP quaternion angle curves compared',
          caption: 'Root Z rotation: linear Euler overshoots where SLERP tracks the input',
        },
        {
          kind: 'image',
          src: '/mocap-benchmark.png',
          alt: 'Computation time per interpolation scheme',
          caption: 'Average time per run over 1000 repeats',
        },
        {
          kind: 'video',
          src: '/mocap-slerp-comparison.mp4',
          poster: '/mocap-slerp-poster.jpg',
          alt: 'Input motion played back against SLERP quaternion reconstruction',
          caption: 'Input motion overlaid with the SLERP quaternion reconstruction',
        },
      ],
    },
    {
      id: 'ik-skinning',
      title: 'Inverse Kinematics with Skinning',
      period: 'Spring 2026',
      tech: ['C++', 'OpenGL', 'ADOL-C', 'Eigen'],
      summary:
        'An interactive IK system where dragging a handle solves for joint angles and the mesh deforms in real time — with the Jacobian obtained by automatically differentiating the forward kinematics.',
      body: [
        'Forward kinematics composes global joint transforms from local Euler angles under Maya conventions (M = T · JO · R) with configurable rotation orders; linear blend skinning drives the mesh from the resulting transforms.',
        'IK solves (JᵀJ + αI)Δθ = JᵀΔb with Tikhonov regularisation, using ADOL-C to differentiate the forward kinematics into the Jacobian and Eigen’s LDLT to solve it. A pseudoinverse solver built on SVD is available at runtime as an alternative, since it degrades more gracefully on rank-deficient configurations.',
        'Dual quaternion skinning can be toggled against LBS, which removes the candy-wrapper volume loss that shows up at the armadillo’s shoulders under large joint rotations.',
        'Handles can also be placed at mesh vertices rather than joints. There the ADOL-C tape records the entire pipeline — forward kinematics, skinning transforms, blend — so the Jacobian maps joint angles directly to vertex positions.',
        'Large drags are subdivided into up to three intermediate solves with the per-joint angle change clamped, which converges more reliably than one long step. A scripted stair climb drives four handles at once, with parabolic foot arcs and the root translating to track the body.',
      ],
      mediaColumns: 1,
      media: [
        {
          kind: 'image',
          src: '/ik-lbs-vs-dqs.jpg',
          alt: 'Linear blend skinning compared with dual quaternion skinning',
          caption: 'Linear blend skinning, left; dual quaternion skinning, right',
        },
        {
          kind: 'video',
          src: '/ik-demo.mp4',
          poster: '/ik-demo-poster.jpg',
          alt: 'IK and skinning demo across armadillo, dragon and hand models',
          caption: 'Automated pass over three rigs: IK solvers, skinning modes, vertex handles',
        },
      ],
    },
    {
      id: 'jello-simulation',
      title: 'Mass-Spring Deformable Simulation',
      period: 'Spring 2026',
      tech: ['C++', 'OpenGL'],
      summary:
        'An 8×8×8 mass-spring lattice with structural, shear and bend springs, integrated with Euler or RK4 and colliding against analytic geometry.',
      body: [
        'Collision response is constraint-based rather than penalty-based. A penalty spring injects energy on fast impacts and eventually explodes; resolving positions against the constraint instead stays stable.',
        'A volume-conservation pressure force keeps the lattice from collapsing or inverting during high-speed collisions and fast mouse drags. That one force is what made the simulation robust enough to be worth playing with.',
        'Past the box walls, the cube collides against inclined planes, spheres and cones, and against a second cube through node-to-node repulsion. Force fields are sampled by trilinear interpolation.',
        'A travelling sine wave field with buoyancy and Stokes drift carries the cube along like water. Dragging works both globally, with the force aligned to the camera so the cube moves the way the mouse does, and per-node through a spring anchor that pulls neighbouring points along smoothly.',
      ],
      media: [
        {
          kind: 'image',
          src: '/jello-scene.jpg',
          alt: 'Deformable cube in a scene with helix, sphere, cone and inclined planes',
          caption: 'Collision geometry: helix, sphere, cone and inclined planes',
        },
        {
          kind: 'video',
          src: '/jello-demo.mp4',
          poster: '/jello-demo-poster.jpg',
          alt: 'Mass-spring cube simulation',
          caption: 'Constraint-based collision response with volume conservation',
        },
      ],
    },
  ],
}

const gameplayEngineering: ProjectGroup = {
  id: 'gameplay-engineering',
  title: 'Gameplay Engineering',
  blurb: 'Systems and algorithms shipped inside Unreal Engine 5 projects.',
  projects: [
    {
      id: 'project-mo',
      title: 'Project Mo',
      role: 'Gameplay Programmer',
      period: '2023 – 2025',
      tech: ['Unreal Engine 5', 'C++', 'Computational Geometry', 'Strategy'],
      summary:
        'A commercial historical strategy game set in the Spring and Autumn and Warring States periods, where I owned the geometry and graph algorithms behind unit command, terrain ownership and construction.',
      metrics: [
        'Connected-component computation cut to ~25% of original time at 120 unit clusters',
      ],
      body: [
        'An in-development title built in Unreal Engine 5. I worked on it as a gameplay programmer; the systems below are the ones I designed and owned.',
      ],
      links: [{ label: 'Official Site', href: 'https://www.digisky.com/product/mo' }],
      note: 'Content here complies with the project confidentiality agreement.',
      media: [
        { kind: 'image', src: '/project-mo-chariot.png', alt: 'Ancient chariot' },
        { kind: 'image', src: '/project-mo-character.png', alt: 'Character portrait' },
        { kind: 'image', src: '/project-mo-siege.png', alt: 'Siege weapon' },
      ],
      modules: [
        {
          title: 'Optimising maximum connected component computation',
          body: [
            'Convex hulls over unit clusters drive squad averaging, mouse selection, pathfinding and dynamic faction alignment, and they have to be rebuilt in real time. Computing the maximum connected component is the prerequisite step, and it was the bottleneck.',
            'Replacing the naive search with a kd-tree brought computation down to roughly 25% of its original cost at 120 unit clusters, and the margin widens as unit count grows.',
          ],
          media: [
            {
              kind: 'video',
              src: '/connected-component-optimization.mp4',
              poster: '/connected-component-poster.png',
              alt: 'Connected component optimization',
            },
          ],
        },
        {
          title: 'Flag command dispatch',
          body: [
            'Players issue orders to distant units through a chain of signal towers, and signals propagate along the path of least time cost. Because the target can move while a signal is still in flight, every unit that has already received the order needs its shortest path recomputed against the new destination — a multi-source shortest path problem.',
            'I implemented it with Floyd–Warshall, which fits because the tower graph is small, dense and static enough to precompute.',
          ],
          media: [
            {
              kind: 'video',
              src: '/flag-command.mp4',
              poster: '/flag-command-poster.png',
              alt: 'Flag command dispatch',
            },
          ],
        },
        {
          title: 'Dynamic battle frontline',
          body: [
            'The frontline is the shifting boundary between engaged armies. I partitioned the terrain into a grid, determined which force occupies each cell, then extracted and ordered the borders between adjacent cells held by different factions into a continuous series of segments.',
            'Sampling segment endpoints through a sine function gives the line its wave-like movement instead of a hard polygonal edge.',
          ],
          media: [
            {
              kind: 'image',
              src: '/dynamic-battle-frontline-1.png',
              alt: 'Dynamic battle frontline',
            },
            {
              kind: 'image',
              src: '/dynamic-battle-frontline-2.png',
              alt: 'Dynamic battle frontline',
            },
          ],
        },
        {
          title: 'Voronoi-based plot management',
          body: [
            'Buildings own land, and land ownership is a Voronoi partition. Voronoi assets authored in a web tool are imported as SVG, each encoding the polygonal boundary of one plot, then attached programmatically to the building that owns it — scaled and rotated to match that building’s orientation in the 3D world. In construction mode, a central building expands outward through its neighbours layer by layer in a chosen order (clockwise, counterclockwise, or by distance) until it reaches the map edge, skipping roads and existing structures.',
            'The interesting problem was adjacency. Standard Voronoi implementations assume plot edges are fully connected, but this game deliberately leaves gaps between plots, which breaks the usual edge search and makes it expensive. I wrote a grid-based approximation instead: subdivide the diagram into cells of configurable size and treat plot vertices sharing a cell as adjacent. Tuning the cell size trades precision against speed, which is what made adjacency cheap enough to recompute during gameplay.',
          ],
          media: [
            {
              kind: 'video',
              src: '/voronoi-tile-management.mp4',
              poster: '/voronoi-tile-management-poster.png',
              alt: 'Voronoi-based plot management',
            },
          ],
        },
      ],
    },
    {
      id: 'sight-tour',
      title: 'Sight Tour',
      period: '2023',
      tech: ['Unreal Engine 5', 'C++', 'Post-Process Materials', 'Stereo Rendering'],
      summary:
        'Amblyopia rehabilitation built on custom stereo rendering — channel-isolated content and a hand-written anaglyph post-process material that puts a therapeutic target in front of one eye at a time.',
      body: [
        'A first-person game supporting vision rehabilitation for children with amblyopia. It is not really a shooter: the weapon solves arithmetic problems, and objects carry grating textures chosen to stimulate the weaker eye. The rendering work is what makes the therapy possible.',
      ],
      media: [
        {
          kind: 'image',
          src: '/sight-tour-arena.png',
          alt: 'Shape recognition challenge',
          caption: 'Collect shape-matching spheres and strike the corresponding target',
        },
        {
          kind: 'image',
          src: '/sight-tour-anaglyph.png',
          alt: 'Anaglyph 3D effect',
          caption: 'Red-cyan stereoscopic view with arithmetic challenges',
        },
      ],
      modules: [
        {
          title: 'Fine vision training',
          body: [
            'Objects that demand fine visual attention are drawn in the red channel only (255, 0, 0) — the floating answer above each ball, for instance. Behind red-cyan glasses, only the red lens resolves that text. Placing the amblyopic eye behind the red lens forces it to do the reading, so both eyes stay engaged while the weaker one carries the detail work.',
          ],
          variants: [
            { label: 'Normal view', src: '/fine-vision-main.png', alt: 'Normal view' },
            {
              label: 'Blue lens',
              src: '/fine-vision-blue-glasses.png',
              alt: 'Through the blue lens',
            },
            { label: 'Red lens', src: '/fine-vision-red-glasses.png', alt: 'Through the red lens' },
          ],
        },
        {
          title: 'Stereoscopic training',
          body: [
            'The stereo effect is produced by a custom post-process material rather than engine stereo support: it shifts each object’s red channel slightly left and the cyan channels (green and blue) slightly right. With the offsets tuned, red-cyan glasses resolve a genuine sense of depth.',
            'Not every child with amblyopia has impaired depth perception, so the effect is a settings-menu toggle rather than always-on.',
          ],
          media: [
            {
              kind: 'image',
              src: '/stereoscopic-training.png',
              alt: 'Anaglyph stereoscopic effect',
            },
          ],
        },
        {
          title: 'Raster vision training',
          body: [
            'Quick time events put a rotating black-and-white grating at the centre of the screen with a key prompt in its middle, drawn so that only the red lens resolves it. The amblyopic eye has to focus and respond under time pressure, which turns a standard QTE into targeted training.',
          ],
          media: [
            {
              kind: 'image',
              src: '/raster-vision-training.png',
              alt: 'QTE with red key prompt over a rotating grating',
            },
          ],
        },
      ],
    },
    {
      id: 'orca',
      title: 'ORCA Collision Avoidance in UE5',
      tech: ['Unreal Engine 5', 'C++', 'Multi-Agent Navigation'],
      summary:
        'Unreal’s built-in RVO avoidance degrades as agent count climbs, so I implemented ORCA inside the engine as a reusable subsystem.',
      metrics: ['Stable avoidance for hundreds of simultaneous agents'],
      body: [
        'ORCA (Optimal Reciprocal Collision Avoidance) gives more predictable and stable behaviour than RVO at scale. I implemented optimal velocity computation and reciprocal velocity obstacles as a custom navigation layer, available across projects rather than bolted onto one.',
      ],
      media: [
        {
          kind: 'video',
          src: '/orca-algorithm.mp4',
          poster: '/orca-poster.png',
          alt: 'ORCA collision avoidance',
        },
      ],
    },
    {
      id: 'others',
      title: 'Smaller Projects',
      tech: ['Unreal Engine 5', 'C++'],
      summary: 'Prototypes exploring different gameplay mechanics and visual styles.',
      media: [
        {
          kind: 'image',
          src: '/jumping-party.png',
          alt: 'Jumping Party',
          caption: 'Jumping Party',
        },
        {
          kind: 'image',
          src: '/tavern-adventure.png',
          alt: 'Tavern and Adventure',
          caption: 'Tavern and Adventure',
        },
        {
          kind: 'image',
          src: '/little-adventure.png',
          alt: 'Little Adventure',
          caption: 'Little Adventure',
        },
      ],
    },
  ],
}

export const projectGroups: ProjectGroup[] = [
  engineRendering,
  animationSimulation,
  gameplayEngineering,
]
