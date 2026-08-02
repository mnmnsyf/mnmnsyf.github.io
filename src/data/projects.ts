import type { ProjectGroup } from './types'

/**
 * TODO before publishing — the three USC/personal projects below have no media
 * or repository links yet. Each is marked with the assets it needs. The layout
 * renders fine without them, but these are the entries an internship reviewer
 * will care about most, so they are worth filling first.
 */

const engineRendering: ProjectGroup = {
  id: 'engine-rendering',
  title: 'Engine & Rendering',
  blurb: 'Renderers and engine subsystems built from the ground up.',
  projects: [
    {
      id: 'custom-engine',
      title: 'Custom Game Engine',
      period: 'Jan – May 2026',
      tech: ['C++', 'Lua', 'DirectX 11', 'HLSL'],
      summary:
        'A from-scratch DirectX 11 engine with live-reloading shaders, layered skeletal animation, and a multithreaded physics simulation.',
      body: [
        'Built a prompt-assisted shader pipeline that exposes D3D11 JIT compilation to Lua, giving real-time HLSL hot-reloading and modular material templates.',
        'Architected the skeletal animation system, supporting partial-body blending, additive layers, and recursive state machine updates for high-fidelity character motion.',
        'Designed a multithreaded physics engine with an independent simulation lifecycle, optimized primitive collision detection, and a fully decoupled component-based architecture.',
      ],
      // TODO media: screen capture of HLSL hot-reloading, plus a still of the animation blending.
      media: [],
      // TODO links: { label: 'Code', href: '...' }
    },
    {
      id: 'software-rasterizer',
      title: 'C++ Software Rasterizer',
      period: 'Nov – Dec 2025',
      tech: ['C++'],
      summary:
        'A complete 3D rendering pipeline written against nothing but the C++ standard library — no OpenGL, no DirectX.',
      metrics: ['Fragment-shades meshes of 10,000+ vertices'],
      body: [
        'Implemented rasterization, Z-buffering and a programmable shader pipeline from first principles, with no external graphics API.',
        'Added perspective-correct interpolation and Blinn-Phong shading, which is where the pipeline stopped being a demo and started producing images worth looking at.',
      ],
      // TODO media: a render output. This is the single most useful image on the site for a graphics role.
      media: [],
    },
    {
      id: 'mocap-interpolation',
      title: 'Motion Capture Interpolation & Analysis',
      period: 'Spring 2026',
      tech: ['C++', 'OpenGL'],
      summary:
        'ASF/AMC motion reconstruction across four interpolation schemes, with tooling built to see and measure the difference between them.',
      body: [
        'Reconstructed motion capture frames using linear Euler, Bezier Euler, SLERP quaternion, and Bezier SLERP quaternion interpolation.',
        'Built the analysis and visualization tooling alongside it: overlapping playback, ghosting trails, motion paths, gimbal lock detection, and benchmarks comparing each scheme on visual quality against runtime cost.',
        'The comparison quantified what the theory predicts — quaternion interpolation stays robust on segments with difficult root rotation, where Euler angles degrade.',
      ],
      // TODO media: motion trail visualization and a benchmark chart. Both would render well here.
      media: [],
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

export const projectGroups: ProjectGroup[] = [engineRendering, gameplayEngineering]
