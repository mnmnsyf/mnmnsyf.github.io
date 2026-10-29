/**
 * Simplified Chinese text, keyed by the English it replaces (whitespace is
 * normalized before lookup). Keep the English in the content files as the
 * source of truth; when an English string changes, update its key here too.
 * Names, products and technologies without an entry stay in English.
 */
export const zh: Record<string, string> = {
  // ── Site chrome ──────────────────────────────────────────────
  'Skip to content': '跳到正文',
  Entry: '首页',
  Projects: '项目',
  Research: '科研',
  Experience: '经历',
  Updates: '动态',
  Education: '教育',
  Awards: '奖项',
  Skills: '技能',
  'Selected projects': '精选项目',
  'Personal Website': '个人网站',
  'Main navigation': '主导航',
  Résumé: '简历',
  'Résumé (PDF)': '简历（PDF，英文）',
  'Jump to': '快速跳转',
  'Open command palette': '打开命令面板',
  'Switch to light theme': '切换到浅色主题',
  'Switch to dark theme': '切换到深色主题',
  'back to introduction': '返回首页',

  // Footer
  'Seeking 2027 full-time roles': '寻找 2027 年全职岗位',
  'Systems, graphics, simulation —': '做系统、图形、仿真，',
  'let’s talk.': '欢迎来聊。',
  Copy: '复制',
  Copied: '已复制',
  'Contact and profiles': '联系方式与主页',
  'Los Angeles': '洛杉矶',
  'Last updated': '最后更新',
  'October 2026': '2026 年 10 月',
  Email: '邮箱',

  // Entry page
  'Welcome to my personal website.': '欢迎来到我的个人主页。',
  Now: '现在',
  'Research · UCLA AIVC Lab': '科研 · UCLA AIVC 实验室',
  Study: '学业',
  'M.S. CS · USC, May 2027': 'USC 计算机硕士 · 2027 年 5 月毕业',
  Algorithms: '算法',
  'ICPC silver medalist': 'ICPC 银牌',
  'Open to': '求职意向',
  '2027 full-time SDE roles': '2027 年游戏开发全职岗位',
  'Selected work': '精选作品',
  'Get in touch': '联系我',
  'Move to disturb the field · click to add a site.': '移动鼠标可以扰动图案，点击可以加一个点。',
  'Voronoi partitions also ran': '同样的 Voronoi 划分，我也用在了',
  'land ownership in Mandate Order →': 'Mandate Order 的地块系统里 →',
  About: '关于我',
  'In numbers': '数据一览',
  'All projects →': '全部项目 →',
  Shipped: '已上线',
  'Mandate Order featured screenshots': 'Mandate Order 精选截图',
  'Digital Sky · Steam Early Access · Aug 2026': '数字天空 · Steam 抢先体验 · 2026 年 8 月',
  'A Warring States war city-builder with real-time battles of thousands of soldiers. I built production C++ systems for it in Unreal Engine 5: threat-aware routing, spatial grouping, command relay, Voronoi land plots, the battle frontline, the skill system, and the input and UI layers.':
    '战国题材的战争城建游戏，实时战斗动辄数千士兵同屏。我用 UE5 和 C++ 为它做了多个线上系统：威胁感知寻路、单位分组、军令传递、Voronoi 地块、战场前线、技能系统，还有输入和 UI 框架。',
  'Inside the systems': '看看具体做了什么',
  Latest: '最新动态',
  'All updates →': '全部动态 →',

  // Bio (authored HTML)
  "I'm a software engineer who builds performance-critical C++ systems, from graph and spatial algorithms in a shipped real-time strategy game to developer-facing SDKs and tools.":
    '我是一名游戏开发，主要写对性能要求高的 C++ 系统。做过已上线策略游戏里的图算法和空间算法，也做过给开发者用的 SDK 和工具。',
  'At <a href="https://www.digisky.com/" target="_blank" rel="noopener">Chengdu Digital Sky</a> (intern to full-time, two-plus years) I owned eight production systems for <a href="https://www.digisky.com/product/mo" target="_blank" rel="noopener">Mandate Order</a>, now on Steam Early Access: pathfinding for 2,000+ agents, spatial indexing, a data-driven skill system, and the input and UI frameworks.':
    '我在<a href="https://www.digisky.com/" target="_blank" rel="noopener">成都数字天空</a>的两年多里（实习转正），负责 <a href="https://www.digisky.com/product/mo" target="_blank" rel="noopener">Mandate Order</a> 的八个线上系统，包括支撑 2,000+ 单位的寻路、空间索引、数据驱动的技能系统，以及输入和 UI 框架。游戏目前已在 Steam 开启抢先体验。',
  '<strong>Seeking 2027 full-time roles in C++ software systems, backend and infrastructure, and performance engineering.</strong> M.S. in Computer Science at <a href="https://www.usc.edu/" target="_blank" rel="noopener">USC</a>, May 2027 (current course: CSCI 566 Deep Learning). ICPC medalist; research assistant at UCLA\'s <a href="https://www.math.ucla.edu/aivc/" target="_blank" rel="noopener">AIVC Lab</a> and co-first author of <a href="#/research/articulatearena">ArticulateArena</a>. Recently: an <a href="#/projects/angle-graphics-sdk">ANGLE-based .NET graphics SDK</a> and <a href="#/projects/path-tracing-denoising">deep learning for path-tracing denoising</a> in PyTorch.':
    '<strong>正在找 2027 年的游戏开发全职岗位，偏 C++ 游戏系统、引擎与工具、性能优化方向。</strong>目前在 <a href="https://www.usc.edu/" target="_blank" rel="noopener">USC</a> 读计算机硕士，2027 年 5 月毕业（这学期在上 CSCI 566 深度学习）。拿过 ICPC 奖牌；在 UCLA <a href="https://www.math.ucla.edu/aivc/" target="_blank" rel="noopener">AIVC 实验室</a>做研究助理，是 <a href="#/research/articulatearena">ArticulateArena</a> 的共同一作。最近在做基于 ANGLE 的 <a href="#/projects/angle-graphics-sdk">.NET 图形 SDK</a>，以及用 PyTorch 做<a href="#/projects/path-tracing-denoising">路径追踪的深度学习降噪</a>。',
  'Software Engineer · C++ Systems, Performance & Tooling': '游戏开发 · C++ 系统、性能与工具',

  // Stat strip
  'production systems owned in a shipped UE5 game': '个我负责的线上系统，来自已上线的 UE5 项目',
  'Mandate Order · Digital Sky': 'Mandate Order · 数字天空',
  'concurrent agents on dynamic road-graph routing': '个单位同时在动态路网上寻路',
  'Multi-source Dijkstra': '多源 Dijkstra',
  'less connectivity computation at a 2,000-unit workload': '2,000 单位规模下，连通性计算量的降幅',
  'Spatial hashing · uniform grid': '空间哈希 · 均匀网格',
  'years of production C++, intern to full-time': '年 C++ 项目经验，实习转正',
  'Chengdu Digital Sky': '成都数字天空',

  // Work index
  'Shipped · UE5 · C++': '已上线 · UE5 · C++',
  'Research · co-first author': '科研 · 共同一作',
  'UE5 · PyTorch · ongoing': 'UE5 · PyTorch · 进行中',
  'Mass-Spring Soft Body': '质点弹簧软体',
  'Simulation · live demo': '仿真 · 在线演示',
  'Inverse Kinematics & Skinning': '逆向运动学与蒙皮',
  'Animation · live demo': '动画 · 在线演示',
  'Path Tracing Denoising': '路径追踪降噪',
  'ANGLE Graphics SDK': 'ANGLE 图形 SDK',

  // Command palette
  'Command palette': '命令面板',
  'Search projects, sections, links…': '搜索项目、栏目、链接…',
  Sections: '栏目',
  Elsewhere: '其他链接',
  Actions: '操作',
  'Toggle light / dark theme': '切换浅色 / 深色主题',
  'Switch to Chinese / English': '切换中文 / English',
  'No matches for': '没有匹配',
  move: '移动',
  open: '打开',
  results: '条结果',

  // Projects page
  'Project index': '项目目录',
  'Project index (compact)': '项目目录（紧凑）',
  projects: '个项目',
  'switch project': '切换项目',
  'Previous project': '上一个项目',
  'Next project': '下一个项目',
  'Adjacent projects': '相邻项目',
  '← Previous': '← 上一个',
  'Next project →': '下一个项目 →',
  'Live demo': '在线演示',
  Technologies: '技术栈',
  resources: '相关资源',
  'Technical notes & more visuals': '技术细节与更多图片',
  Results: '成果',
  'Systems I owned': '我负责的系统',
  'What I built': '我做了什么',
  'Write-up': '详细介绍',
  'Concept art': '概念美术',
  'technical notes': '技术细节',
  'Collapse notes': '收起细节',
  Illustration: '示意图',
  'Your browser does not support the video tag.': '你的浏览器不支持视频播放。',
  'Open full-size image': '查看大图',
  visuals: '图片',
  'Show visual': '显示图片',

  // Screenshot carousel
  'Mandate Order screenshots': 'Mandate Order 截图',
  'Mandate Order project screenshots': 'Mandate Order 项目截图',
  'Open full-size screenshot': '查看截图大图',
  'Previous screenshot': '上一张截图',
  'Next screenshot': '下一张截图',
  'Choose screenshot': '选择截图',
  'Show screenshot': '显示截图',
  'Play slideshow': '播放幻灯片',
  'Pause slideshow': '暂停幻灯片',
  'Official game screenshots ·': '官方游戏截图 ·',
  'Mandate Order — fortified settlement in an autumn mountain landscape':
    'Mandate Order：秋日山间的设防聚落',
  'Mandate Order — farmland, irrigation paths, and a riverside settlement':
    'Mandate Order：农田、水渠与河边聚落',
  'Mandate Order — archers attacking a fortified settlement': 'Mandate Order：弓箭手进攻设防聚落',
  'Mandate Order — snow-covered city and surrounding mountain terrain':
    'Mandate Order：雪中的城池与周围山地',

  // Experience and education labels
  'Advised by': '导师',
  Honors: '荣誉',
  Coursework: '课程',

  // Live demos
  Live: '实时',
  'Jacobian IK · 2D chain': '雅可比 IK · 二维关节链',
  'move the pointer to set the target · it follows a path when idle':
    '移动鼠标设置目标 · 空闲时目标会沿路径移动',
  'A planar re-creation of the solver structure, not the original C++ code: damped least squares Δθ = Jᵀ(JJᵀ + λ²I)⁻¹e with per-joint step clamping, or the Jacobian transpose for comparison. Push the target out of reach to see damping keep the chain calm.':
    '在浏览器里用二维方式复现了求解器的结构，不是原来的 C++ 代码：阻尼最小二乘 Δθ = Jᵀ(JJᵀ + λ²I)⁻¹e，每个关节的步长有上限；也可以切到雅可比转置法对比。把目标拖到够不着的地方，能看到有阻尼时关节链依然很稳。',
  'Interactive inverse kinematics chain following the pointer': '跟随鼠标的交互式逆向运动学关节链',
  'Damped LS': '阻尼最小二乘',
  'Mass-spring soft body · 2D': '质点弹簧软体 · 二维',
  'drag any node · flick it into the sphere': '拖动任意节点 · 把它甩向圆球',
  'A small in-browser re-creation of the idea, not the original C++ code: structural, shear and bend springs, constraint-based collisions, and an area-preserving pressure force. Springs colour by strain.':
    '在浏览器里做的简化复现，不是原来的 C++ 代码：有结构、剪切和弯曲弹簧，基于约束的碰撞，还有保持面积的压力。弹簧颜色表示形变大小。',
  'Interactive mass-spring soft body that can be dragged with the pointer':
    '可以用鼠标拖动的交互式质点弹簧软体',
  Pressure: '压力',
  on: '开',
  off: '关',
  Springs: '弹簧',
  'Drop again': '重新掉落',
  nodes: '个节点',
  springs: '根弹簧',
  area: '面积',
  'semi-implicit Euler': '半隐式欧拉',
  substeps: '个子步',

  // ── Dates and places ─────────────────────────────────────────
  'Sep 2026': '2026 年 9 月',
  'Aug 2026': '2026 年 8 月',
  'Jun 2026': '2026 年 6 月',
  'May 2026': '2026 年 5 月',
  'Jan 2026': '2026 年 1 月',
  'Dec 2025': '2025 年 12 月',
  'Jun 2023': '2023 年 6 月',
  'May 2023': '2023 年 5 月',
  'Dec 2022': '2022 年 12 月',
  'Oct 2022': '2022 年 10 月',
  'Aug 2022': '2022 年 8 月',
  'Jul 2022': '2022 年 7 月',
  'Jan 2026 – May 2027 (expected)': '2026 年 1 月 – 2027 年 5 月（预计）',
  'Jun 2026 – Present': '2026 年 6 月 – 至今',
  'Sep 2023 – Dec 2025': '2023 年 9 月 – 2025 年 12 月',
  'Sep 2020 – Jun 2023': '2020 年 9 月 – 2023 年 6 月',
  'Sep 2026 – Present': '2026 年 9 月 – 至今',
  'Jan – May 2026': '2026 年 1 月 – 5 月',
  'Nov – Dec 2025': '2025 年 11 月 – 12 月',
  'Spring 2026': '2026 年春季',
  'arXiv preprint · Sep 2026': 'arXiv 预印本 · 2026 年 9 月',
  'Los Angeles, CA': '美国加州洛杉矶',
  'Chengdu, China': '中国成都',

  // ── Updates ──────────────────────────────────────────────────
  'ArticulateArena: A Metric for Articulated Kinematics is on arXiv. Co-first author; contributions to joint-motion metric development and multi-model evaluation.':
    'ArticulateArena 论文已挂上 arXiv。我是共同一作，主要做关节运动度量和多模型评测。',
  Paper: '论文',
  'Project & demos': '项目主页与演示',
  'Mandate Order — the game I worked on as a C++ software engineer — launched in Steam Early Access on August 12.':
    '我参与开发的 Mandate Order 于 8 月 12 日在 Steam 开启抢先体验。',
  'Joined the Artificial Intelligence & Visual Computing Lab at UCLA as a research assistant, advised by Prof. Chenfanfu Jiang, working on end-to-end texture generation and data augmentation for multi-part 3D assets.':
    '加入 UCLA 人工智能与视觉计算实验室做研究助理，导师是蒋陈凡夫教授，方向是多部件 3D 资产的端到端纹理生成和数据增强。',
  'AIVC Lab': 'AIVC 实验室',
  'Finished the spring semester at USC: engine subsystems and a natural-language shader authoring tool in PrimeEngine, plus motion capture interpolation, inverse kinematics with skinning, and a mass-spring simulation.':
    'USC 春季学期结束。这学期在 PrimeEngine 里做了几个引擎子系统，和一个用自然语言写 shader 的工具；另外还做了动捕插值、IK 与蒙皮、质点弹簧仿真。',
  'Started the M.S. in Computer Science at USC, on the graphics track.':
    '入学 USC 计算机硕士，图形学方向。',
  'Completed over two years at Chengdu Digital Sky, from intern to full-time C++ software engineer, building production systems for Mandate Order, a commercial strategy game.':
    '结束在成都数字天空两年多的工作。从实习到转正，一直在用 C++ 给商业策略游戏 Mandate Order 做线上系统。',

  // ── Skills ───────────────────────────────────────────────────
  'Production C++ systems and performance work, algorithms and data structures, software architecture and developer tooling, with depth in real-time graphics, simulation and deep learning.':
    'C++ 线上系统开发和性能优化，算法与数据结构，软件架构和开发工具；在实时图形、仿真和深度学习上也做过比较深入的项目。',
  Languages: '编程语言',
  Systems: '系统',
  'Data Structures & Algorithms': '数据结构与算法',
  'Graph & Spatial Algorithms': '图算法与空间算法',
  'Performance Optimization': '性能优化',
  'Architecture & Tooling': '架构与工具',
  'Input & UI Frameworks': '输入与 UI 框架',
  'SDK & API Design': 'SDK 与 API 设计',
  'Code Generation': '代码生成',
  'Hot Reload': '热重载',
  'Editor & Debug Tools': '编辑器与调试工具',
  'Testing & Validation': '测试与验证',
  'Deterministic Rendering Tests': '确定性渲染测试',
  Benchmarking: '基准测试',
  'Multi-model Evaluation': '多模型评测',
  Graphics: '图形',
  Simulation: '仿真',
  Kinematics: '运动学',
  'Physics Simulation': '物理仿真',
  'Animation Systems': '动画系统',
  'Deep Learning': '深度学习',
  'Neural Denoising': '神经网络降噪',
  'Training-Data Pipelines': '训练数据管线',
  'Engines & Tools': '引擎与工具',

  // ── Awards ───────────────────────────────────────────────────
  'Silver Medal': '银牌',
  'Bronze Medal': '铜牌',
  'Gold Medal': '金牌',
  'First Prize': '一等奖',
  'Sichuan Provincial Collegiate Programming Contest': '四川省大学生程序设计竞赛',
  'ICPC Invitational — Shaanxi': 'ICPC 邀请赛（陕西）',
  'ICPC Invitational — Nanjing': 'ICPC 邀请赛（南京）',
  "CCPC Women's Finals": 'CCPC 女生专场',
  'Baidu Star Programming Contest (C/C++ Division)': '百度之星程序设计大赛（C/C++ 组）',
  'China Collegiate Algorithm Design & Programming Contest': '中国大学生算法设计与编程挑战赛',

  // ── Education ────────────────────────────────────────────────
  'University of Southern California': '南加州大学（USC）',
  'M.S. Computer Science': '计算机科学硕士',
  'Graphics track': '图形学方向',
  'Game Engine Development': '游戏引擎开发',
  'Computer Animation and Simulation': '计算机动画与仿真',
  'Foundations of Artificial Intelligence': '人工智能基础',
  'CSCI 566: Deep Learning and Its Applications (in progress)':
    'CSCI 566：深度学习及其应用（在修）',
  'Chengdu University of Information Technology': '成都信息工程大学',
  'B.Eng., School of Computer Science': '工学学士，计算机学院',
  'National Scholarship: 1st in program (2023)': '国家奖学金：专业第一（2023）',
  'University Merit Scholarship: Highest Tier (2021 & 2022)':
    '校级优秀奖学金：最高等级（2021、2022）',
  'Computer Graphics': '计算机图形学',
  'Data Structures': '数据结构',
  'Discrete Mathematics': '离散数学',
  'Probability Theory': '概率论',
  Databases: '数据库',
  'Software Engineering': '软件工程',
  'Network Game Programming': '网络游戏编程',
  'Unity Game Programming': 'Unity 游戏编程',
  'Unreal Engine Game Programming': 'Unreal Engine 游戏编程',

  // ── Experience ───────────────────────────────────────────────
  'Artificial Intelligence & Visual Computing Lab, UCLA': 'UCLA 人工智能与视觉计算实验室',
  'Research Assistant': '研究助理',
  'ArticulateArena paper': 'ArticulateArena 论文',
  'Prof. Chenfanfu Jiang': '蒋陈凡夫教授',
  'Co-first author of ArticulateArena: A Metric for Articulated Kinematics, available on arXiv.':
    'ArticulateArena: A Metric for Articulated Kinematics 共同一作，论文已挂 arXiv。',
  'Contributed to representation-invariant joint-motion metrics and standardized evaluation protocols for articulated objects.':
    '参与设计不依赖表示方式的关节运动度量，以及铰接物体的标准化评测流程。',
  'Built and ran multi-model experiments covering model execution, quality assessment, and comparative analysis.':
    '搭建并跑多模型实验，包括模型推理、质量评估和对比分析。',
  'Chengdu Digital Sky Technology': '成都数字天空科技',
  'Software Engineer (C++ / Unreal Systems)': '游戏开发（C++ / Unreal 系统）',
  'Digital Sky': '数字天空',
  'Mandate Order on Steam': 'Steam 上的 Mandate Order',
  'Shipped production C++ systems for Mandate Order, a commercial Unreal Engine 5 strategy game released on Steam Early Access, growing from intern to full-time engineer.':
    '为商业 UE5 策略游戏 Mandate Order 开发多个 C++ 线上系统（已在 Steam 抢先体验上线），从实习做到正式员工。',
  'Cut connectivity computation by 85% at the typical 2,000-unit workload with spatial hashing on a uniform grid; built a templated KD-tree, union-find and DBSCAN library for 5,000+ unit scenes.':
    '用均匀网格空间哈希优化单位连通性计算，常见的 2,000 单位规模下计算量降低 85%；针对 5,000+ 单位的场景，实现了模板化的 KD 树、并查集和 DBSCAN 库。',
  'Built a threat-aware pathfinding service (heap-based multi-source Dijkstra) for 2,000+ concurrent agents, with batched, queue-based state sync to the AI thread.':
    '实现威胁感知寻路服务（基于堆的多源 Dijkstra），支撑 2,000+ 单位同时寻路；状态变更批量入队，再同步给 AI 线程。',
  'Owned the data-driven skill system for 100+ abilities on the project’s multithreaded ECS: triggers decoupled from execution, commander skill preview and release, and Unreal Mass projectile processors.':
    '负责基于项目多线程 ECS 的数据驱动技能系统，覆盖 100+ 个技能：触发和执行解耦、将领技能预览与释放、Unreal Mass 投射物 Processor。',
  'Designed reusable input and UI frameworks: prioritized input contexts with reference-counted action monitoring, a stack-based UI layer manager, and a registry-based settings system.':
    '设计可复用的输入和 UI 框架：带优先级的输入上下文、引用计数的 Action 监听、基于栈的 UI 层级管理，以及基于注册表的设置系统。',
  'Implemented Floyd–Warshall routing with cached next hops for command relay across 50+ signal-tower nodes, and Voronoi land partitioning with grid-approximated adjacency.':
    '用 Floyd–Warshall 做军令传递路由并缓存下一跳，覆盖 50+ 个烽火台节点；实现 Voronoi 地块划分，用网格近似判断相邻关系。',
  'Built reusable behavior-tree components, reducing implementation time by approximately 50%.':
    '封装可复用的行为树组件，相关功能的开发时间缩短约 50%。',
  'Mandate Order Steam store page': 'Mandate Order 的 Steam 商店页面',
  'Mandate Order on Steam Early Access': 'Steam 抢先体验中的 Mandate Order',
  'Data Structures & Algorithms Lab, Chengdu University of Information Technology':
    '成都信息工程大学 数据结构与算法实验室',
  Member: '成员',
  'University website': '学校官网',
  'Represented the university at ICPC, CCPC and Lan Qiao Cup, winning multiple medals including an ICPC silver.':
    '代表学校参加 ICPC、CCPC 和蓝桥杯，拿过多枚奖牌，包括 ICPC 银牌。',
  'Mentored new team members on algorithmic approach and contest strategy; prepared daily practice sets, ran mock contests, and taught at winter and summer training camps.':
    '带新队员，讲解题思路和比赛策略；出每日训练题、办模拟赛，寒暑假集训时也上台讲课。',

  // ── Research ─────────────────────────────────────────────────
  'Co-first author': '共同一作',
  'Evaluating articulated objects by the motions their joints induce, rather than comparing joint parameters independently.':
    '不单独比较关节参数，而是看关节带来的运动，以此评估铰接物体。',
  'ArticulateArena-20K: 19,977 articulated objects with verified kinematics':
    'ArticulateArena-20K：19,977 个运动学经过验证的铰接物体',
  'My contributions include joint-motion metric development and multi-model evaluation experiments at UCLA’s Artificial Intelligence & Visual Computing Lab.':
    '我在 UCLA AIVC 实验室主要负责关节运动度量的设计和多模型评测实验。',
  'The collaborative work introduces a representation-invariant metric for joint motion, extends it to kinematic trees, and evaluates reconstruction methods on a shared articulated-object suite.':
    '论文提出了一种不依赖表示方式的关节运动度量，并推广到运动学树，在统一的铰接物体数据集上评测了各类重建方法。',
  'Read paper': '阅读论文',
  'Co-first author. arXiv preprint, September 27, 2026; submitted to ICLR. See the linked paper for the complete author list as published.':
    '共同一作。arXiv 预印本，2026 年 9 月 27 日发布，已投 ICLR。完整作者名单以论文为准。',
  'Fixed, prismatic, revolute, continuous and helical joints with example articulated objects':
    '固定、平移、旋转、连续和螺旋五种关节及对应的铰接物体示例',
  'Five joint types covered by the metric. Figure from ArticulateArena.':
    '该度量覆盖的五种关节类型。图片来自 ArticulateArena 论文。',
  'Articulated Objects': '铰接物体',
  Evaluation: '评测',
  'My contributions: metric and evaluation': '我的贡献：度量与评测',
  'Metric design': '度量设计',
  Experiments: '实验',
  'Representation-invariant joint-motion metric': '不依赖表示方式的关节运动度量',
  'Kinematic trees': '运动学树',

  // ── Project groups ───────────────────────────────────────────
  'Production Work · Digital Sky': '工作项目 · 数字天空',
  'C++ gameplay and engine systems for Mandate Order, released on Steam Early Access.':
    '我在 Mandate Order 里负责的 C++ 玩法和引擎系统，游戏已在 Steam 抢先体验上线。',
  'Engine & Rendering': '引擎与渲染',
  'Rendering pipelines and engine-level systems.': '渲染管线与引擎层系统。',
  'Animation & Simulation': '动画与仿真',
  'Character animation and physical simulation, with the tooling to measure whether they are right.':
    '角色动画和物理仿真，外加验证效果对不对的工具。',
  'Production Systems & Gameplay': '系统与玩法',
  'Navigation, geometry and rendering systems in Unreal Engine 5 projects.':
    'Unreal Engine 5 项目中的导航、几何与渲染系统。',

  // Common project text
  'Code generation': '代码生成',
  'Deep learning': '深度学习',
  'Physics simulation': '物理仿真',
  'Multi-model evaluation': '多模型评测',
  'Source code': '源代码',
  Multithreading: '多线程',

  // ANGLE Graphics SDK
  'ANGLE Graphics SDK & Developer Tools': 'ANGLE 图形 SDK 与开发者工具',
  'A .NET graphics SDK built on ANGLE, connecting a native C++ EGL bridge to managed OpenGL ES APIs and developer tools.':
    '基于 ANGLE 的 .NET 图形 SDK：用原生 C++ EGL 桥接层，把托管的 OpenGL ES API 和开发工具串起来。',
  'GLES 3.0 bindings generated from Khronos XML, with idempotency tests':
    'GLES 3.0 绑定由 Khronos XML 自动生成，带幂等性测试',
  'Deterministic rendering comparisons across native C++ and managed C# demos':
    '原生 C++ 与托管 C# 示例之间的确定性渲染对比',
  'Built a native EGL bridge and dynamically loaded GLES entry points for offscreen rendering with pixel readback and window-surface presentation. The managed SDK exposes context-bound GPU resources with explicit disposal and thread-access checks.':
    '实现原生 EGL 桥接层，动态加载 GLES 入口函数，支持离屏渲染（含像素回读）和窗口显示。托管 SDK 里的 GPU 资源和上下文绑定，需要显式释放，并做线程访问检查。',
  'Generated GLES 3.0 bindings from Khronos XML, preserving existing signatures and testing generator idempotency. Native C++ and managed C# demos produce images for deterministic rendering comparisons.':
    '从 Khronos XML 生成 GLES 3.0 绑定，已有的函数签名保持不变，并测试生成器的幂等性。原生 C++ 和托管 C# 示例都会输出图像，用来做确定性渲染对比。',
  'Added a WinForms demo host with renderer/plugin hot reload, shader recompilation with last-working-shader fallback, and rendering benchmarks to make iteration and validation easier.':
    '做了一个 WinForms 演示程序：渲染器和插件可以热重载，shader 重新编译失败时回退到上一个能用的版本，还带渲染基准测试，方便迭代和验证。',
  'Source code & documentation': '源代码与文档',
  'Built on the upstream ANGLE project; my work is the native bridge, managed SDK, validation, and developer tooling. Windows / .NET 9.':
    '基于上游 ANGLE 项目，我做的是原生桥接层、托管 SDK、验证和开发工具。运行环境：Windows / .NET 9。',
  'Managed C# SDK connected through a native C++ EGL bridge to ANGLE and the GPU':
    '托管 C# SDK 通过原生 C++ EGL 桥接层连接到 ANGLE 和 GPU',
  'SDK architecture: managed resources and API bindings over a native EGL bridge.':
    'SDK 架构：原生 EGL 桥接层之上的托管资源和 API 绑定。',
  'Native EGL bridge and GPU resource API': '原生 EGL 桥接层与 GPU 资源 API',
  'C++ / C# interop': 'C++ / C# 互操作',
  'Resource lifetime': '资源生命周期',
  'Thread safety': '线程安全',
  'Generated GLES bindings': '自动生成 GLES 绑定',
  'Idempotency tests': '幂等性测试',
  'Deterministic tests': '确定性测试',
  'Developer tooling: hot reload and benchmarks': '开发者工具：热重载与基准测试',
  'Failure fallback': '失败回退',
  'ANGLE graphics SDK architecture': 'ANGLE 图形 SDK 架构',

  // Path tracing denoising
  'Pipeline overview': '流程概览',
  'Path Tracing Denoising with Deep Learning': '基于深度学习的路径追踪降噪',
  'Personal project · In progress': '个人项目 · 进行中',
  'An ongoing deep-learning project combining UE5 training-data collection, PyTorch neural denoiser training, and baseline comparisons to study reconstruction quality and temporal stability in low-sample-count path tracing.':
    '正在做的深度学习项目：用 UE5 采集训练数据，用 PyTorch 训练神经网络降噪器，再和基线方法对比，研究低采样路径追踪下的重建质量和时间稳定性。',
  'Built an Unreal Engine 5 data collection pipeline to prepare path-traced rendering data for neural denoiser training.':
    '搭建 UE5 数据采集管线，为降噪器训练准备路径追踪渲染数据。',
  'Implemented an SVGF denoising baseline and integrated NVIDIA DLSS Ray Reconstruction into a comparative benchmarking pipeline.':
    '实现 SVGF 降噪基线，并把 NVIDIA DLSS Ray Reconstruction 接进对比测试流程。',
  'Currently training a neural denoiser in PyTorch to investigate reconstruction quality and temporal stability at low sample counts. The project is ongoing; measured results will be added as experiments are completed.':
    '目前在用 PyTorch 训练神经网络降噪器，看低采样下的重建质量和时间稳定性。项目还在进行中，实验跑完会补上结果。',
  'Personal project, started September 2026. Neural denoiser training and evaluation are ongoing.':
    '个人项目，2026 年 9 月开始，降噪器的训练和评测还在进行中。',
  'UE5 rendering data feeding baseline comparison and neural denoiser training, evaluated for quality and temporal stability':
    'UE5 渲染数据用于基线对比和神经网络降噪器训练，并评估质量和时间稳定性',
  'Project workflow; neural denoiser training is still in progress.':
    '项目流程。降噪器还在训练中。',
  'Path-tracing denoising training and evaluation workflow': '路径追踪降噪的训练与评测流程',
  'UE5 training-data pipeline': 'UE5 训练数据管线',
  'Data pipeline': '数据管线',
  'Baselines and benchmarking harness': '基线与基准测试框架',
  'Neural denoiser training (in progress)': '神经网络降噪器训练（进行中）',
  'Temporal stability': '时间稳定性',

  // Engine subsystems
  'AI-Assisted Developer Tool & Multithreaded ECS Real-Time Engine':
    'AI 辅助开发工具与多线程 ECS 实时引擎',
  'A real-time engine extended with multithreaded ECS simulation, skeletal animation and GPU culling, plus an AI-assisted shader authoring tool that hot-swaps HLSL into the running engine with a safe fallback. Built on the course-provided PrimeEngine framework.':
    '在课程提供的 PrimeEngine 框架上扩展的实时引擎：加了多线程 ECS 仿真、骨骼动画和 GPU 剔除。另外做了一个 AI 辅助的 shader 编写工具，能把 HLSL 热替换进运行中的引擎，出错会安全回退。',
  'Shader changes applied live, with no engine restart': '改 shader 即时生效，不用重启引擎',
  'Failed compiles fall back to the last working shader': '编译失败自动回退到上一个能用的 shader',
  'An external authoring tool connects to a live engine session. Manual controls, presets and natural-language prompts generate editable parameters or HLSL snippets inside fixed templates, which keeps AI output constrained and reviewable.':
    '外部编写工具直接连到运行中的引擎。不管是手动调参、选预设还是写自然语言提示，都只在固定模板里生成可编辑的参数或 HLSL 片段，这样 AI 的输出可控，也方便检查。',
  'Applying a change hot-reloads the shader without restarting the engine. A failed compile keeps the last working shader and reports the error, so a bad edit never takes down the running session.':
    '点应用后 shader 直接热重载，引擎不用重启。编译失败就保留上一个能用的 shader 并报错，改坏了也不会把引擎搞崩。',
  'On the engine side I added multithreaded ECS physics with independent update cycles, layered skeletal animation, and GPU instance culling through the Rendering Hardware Interface.':
    '引擎这边，我加了多线程 ECS 物理（各系统更新周期独立）、分层骨骼动画，以及基于 RHI 的 GPU 实例剔除。',
  'Live shader demo': '实时着色器演示',
  'Course repository': '课程仓库',
  'PrimeEngine is the course framework; the subsystems and tooling described here are my own work.':
    'PrimeEngine 是课程提供的框架，这里介绍的子系统和工具都是我自己做的。',
  'The boss aura changing from orange fireballs to cyan orbs after applying a generated effect':
    '应用生成的效果后，Boss 光环从橙色火球变成青色光球',
  'Before, prompt, after: the boss aura goes from orange fireballs to cyan orbs on Apply, with the engine still running. Tool on the right, live session on the left.':
    '修改前、提示词、修改后：点 Apply 后，Boss 光环从橙色火球变成青色光球，引擎全程没停。右边是工具，左边是引擎画面。',
  'Shader authoring tool interface': 'shader 编写工具界面',
  'The authoring tool: presets, manual parameters, and natural-language input':
    '编写工具：预设、手动参数和自然语言输入',
  'AI-assisted authoring tool for a live engine': '直连运行中引擎的 AI 辅助编写工具',
  'Developer tooling': '开发者工具',
  'LLM integration': 'LLM 集成',
  'Constrained generation': '受约束的生成',
  'Hot reload with safe fallback': '带安全回退的热重载',
  'Hot reload': '热重载',
  'Fault tolerance': '容错',
  'Error handling': '错误处理',
  'Multithreaded ECS engine subsystems': '多线程 ECS 引擎子系统',
  'Skeletal animation': '骨骼动画',
  'GPU culling': 'GPU 剔除',

  // Software rasterizer
  'C++ Software Rasterizer': 'C++ 软光栅渲染器',
  'A CPU software rasterizer written in C++, with a programmable shader pipeline and textured OBJ rendering.':
    '用 C++ 写的 CPU 软光栅渲染器，支持可编程 shader 管线和带纹理的 OBJ 模型。',
  '5M+ fragments/sec': '每秒 5M+ 片元',
  'Renders meshes of 10,000+ vertices': '可渲染 10,000+ 顶点的网格',
  'Implemented rasterization, Z-buffering and a programmable shader pipeline from first principles, with no external graphics API.':
    '不借助任何图形 API，从零实现光栅化、Z-buffer 和可编程 shader 管线。',
  'Added perspective-correct interpolation and Blinn–Phong lighting; compared flat, Gouraud and Phong shading on the same geometry.':
    '加入透视校正插值和 Blinn–Phong 光照，并在同一模型上对比了 Flat、Gouraud 和 Phong 着色。',
  'Flat, Gouraud and Phong shading compared': 'Flat、Gouraud 和 Phong 着色对比',
  'Flat, Gouraud and Phong shading, same geometry and light':
    'Flat、Gouraud 和 Phong 着色，几何体和光照相同',
  'Textured character mesh rendered by the software rasterizer': '软光栅渲染出的带纹理角色模型',
  'Textured OBJ mesh, rasterized and shaded on the CPU':
    '带纹理的 OBJ 网格，在 CPU 上完成光栅化和着色',
  'Rasterization pipeline from first principles': '从零实现的光栅化管线',
  'Programmable shaders': '可编程着色器',
  'Perspective-correct shading': '透视校正着色',
  Interpolation: '插值',
  'Shading models': '着色模型',

  // Mocap
  'Motion Capture Interpolation & Analysis': '动作捕捉插值与分析',
  'ASF/AMC motion reconstruction across four interpolation schemes, with tooling built to see and measure the difference between them.':
    '用四种插值方法重建 ASF/AMC 动捕数据，并做了一套工具，直观对比、量化它们的差别。',
  'Bezier quaternion interpolation costs 21x linear Euler — 1108 ms against 52 ms, averaged over 1000 runs':
    'Bezier 四元数插值耗时是线性欧拉的 21x：跑 1000 次平均 1108 ms vs 52 ms',
  'Reconstructed motion capture frames using linear Euler, Bezier Euler, SLERP quaternion, and Bezier SLERP quaternion interpolation.':
    '分别用线性欧拉、Bezier 欧拉、SLERP 四元数和 Bezier SLERP 四元数插值重建动捕帧。',
  'Built the analysis and visualization tooling alongside it: overlapping playback against the input motion, ghosting trails, motion paths, gimbal lock detection, and benchmarks comparing each scheme on visual quality against runtime cost.':
    '同时做了分析和可视化工具：和原始动作叠加回放、残影轨迹、运动路径、万向节锁检测，还有对比各方法效果和耗时的基准测试。',
  'The comparison quantified what the theory predicts. On root rotation the input peaks near -105 degrees; SLERP tracks it to -117 while linear Euler overshoots past -135, and the cost table shows what that accuracy is worth in milliseconds.':
    '结果和理论预期一致。根节点旋转上，原始数据峰值约 -105 度；SLERP 跟到 -117 度，线性欧拉则冲过了 -135 度。耗时表说明了这点精度要多花多少毫秒。',
  'Input, linear Euler and SLERP quaternion angle curves compared':
    '输入、线性欧拉和 SLERP 四元数的角度曲线对比',
  'Root Z rotation: linear Euler overshoots where SLERP tracks the input':
    '根节点 Z 轴旋转：线性欧拉出现过冲，SLERP 能贴合输入',
  'Computation time per interpolation scheme': '各插值方法的计算耗时',
  'Average time per run over 1000 repeats': '重复 1000 次的平均单次耗时',
  'Input motion played back against SLERP quaternion reconstruction':
    '输入动作与 SLERP 四元数重建结果对比回放',
  'Input motion overlaid with the SLERP quaternion reconstruction':
    '输入动作与 SLERP 四元数重建结果叠加显示',
  'Four interpolation schemes': '四种插值方法',
  Quaternions: '四元数',
  'Bézier curves': '贝塞尔曲线',
  'Analysis and visualization tooling': '分析与可视化工具',
  Visualization: '可视化',
  'Debug tooling': '调试工具',
  'Accuracy measured against cost': '精度和耗时对比',
  'Trade-off analysis': '权衡分析',

  // IK
  'Inverse Kinematics with Skinning': '带蒙皮的逆向运动学',
  'An interactive IK system where dragging a handle solves for joint angles and the mesh deforms in real time — with the Jacobian obtained by automatically differentiating the forward kinematics.':
    '交互式 IK 系统：拖动控制点即可求解关节角度，网格实时变形。雅可比矩阵通过对正向运动学做自动微分得到。',
  'Forward kinematics composes global joint transforms from local Euler angles under Maya conventions (M = T · JO · R) with configurable rotation orders; linear blend skinning drives the mesh from the resulting transforms.':
    '正向运动学按 Maya 的约定（M = T · JO · R），从局部欧拉角算出关节的全局变换，旋转顺序可配；再用线性混合蒙皮驱动网格。',
  'IK solves (JᵀJ + αI)Δθ = JᵀΔb with Tikhonov regularisation, using ADOL-C to differentiate the forward kinematics into the Jacobian and Eigen’s LDLT to solve it. A pseudoinverse solver built on SVD is available at runtime as an alternative, since it degrades more gracefully on rank-deficient configurations.':
    'IK 带 Tikhonov 正则化，求解 (JᵀJ + αI)Δθ = JᵀΔb：用 ADOL-C 对正向运动学自动微分得到雅可比矩阵，再用 Eigen 的 LDLT 求解。运行时也可以切到基于 SVD 的伪逆求解器，遇到秩亏的姿态时更稳。',
  'Dual quaternion skinning can be toggled against LBS, which removes the candy-wrapper volume loss that shows up at the armadillo’s shoulders under large joint rotations.':
    '蒙皮可以在 LBS 和对偶四元数之间切换。犰狳模型的肩膀在大角度旋转时会出现“糖纸扭曲”式的体积塌陷，换成对偶四元数蒙皮就没有这个问题。',
  'Handles can also be placed at mesh vertices rather than joints. There the ADOL-C tape records the entire pipeline — forward kinematics, skinning transforms, blend — so the Jacobian maps joint angles directly to vertex positions.':
    '控制点除了放在关节上，也能放在网格顶点上。这时 ADOL-C 记录的是整条流程（正向运动学、蒙皮变换、混合），雅可比矩阵直接把关节角映射到顶点位置。',
  'Large drags are subdivided into up to three intermediate solves with the per-joint angle change clamped, which converges more reliably than one long step. A scripted stair climb drives four handles at once, with parabolic foot arcs and the root translating to track the body.':
    '大幅拖动会拆成最多三次中间求解，并限制每个关节每步的角度变化，比一步到位收敛得更稳。另外写了一段爬楼梯的脚本动画，同时驱动四个控制点：脚走抛物线，根节点跟着身体平移。',
  'Linear blend skinning compared with dual quaternion skinning':
    '线性混合蒙皮与对偶四元数蒙皮对比',
  'Linear blend skinning, left; dual quaternion skinning, right':
    '左：线性混合蒙皮；右：对偶四元数蒙皮',
  'IK and skinning demo across armadillo, dragon and hand models':
    '在犰狳、龙和手部模型上的 IK 与蒙皮演示',
  'Automated pass over three rigs: IK solvers, skinning modes, vertex handles':
    '在三个骨架上自动演示：IK 求解器、蒙皮模式、顶点控制点',
  'Forward kinematics and skinning': '正向运动学与蒙皮',
  'Linear algebra': '线性代数',
  'Transform hierarchies': '变换层级',
  'Linear blend skinning': '线性混合蒙皮',
  'Jacobian IK solver': '雅可比 IK 求解器',
  'Automatic differentiation': '自动微分',
  'Least squares': '最小二乘',
  'Dual quaternion skinning': '对偶四元数蒙皮',
  'Dual quaternions': '对偶四元数',
  'Volume preservation': '体积保持',
  'Handles on mesh vertices': '网格顶点上的控制点',
  'End-to-end Jacobian': '端到端雅可比矩阵',
  'Stable large drags and scripted motion': '稳定的大幅拖动与脚本动画',
  'Numerical stability': '数值稳定性',
  'Step clamping': '步长限制',

  // Jello
  'Mass-Spring Deformable Simulation': '质点弹簧可变形体仿真',
  'An 8×8×8 mass-spring lattice with structural, shear and bend springs, integrated with Euler or RK4 and colliding against analytic geometry.':
    '8×8×8 的质点弹簧网格，带结构、剪切和弯曲弹簧，可选欧拉或 RK4 积分，能和各种解析几何体碰撞。',
  'Collision response is constraint-based rather than penalty-based. A penalty spring injects energy on fast impacts and eventually explodes; resolving positions against the constraint instead stays stable.':
    '碰撞响应用的是约束，而不是惩罚力。惩罚弹簧在高速撞击时会往系统里注入能量，最后直接炸掉；按约束修正位置就稳定得多。',
  'A volume-conservation pressure force keeps the lattice from collapsing or inverting during high-speed collisions and fast mouse drags. That one force is what made the simulation robust enough to be worth playing with.':
    '加了一个保持体积的压力，高速碰撞或快速拖动时网格不会塌掉或翻面。有了这个力，仿真才真正稳到能拿来玩。',
  'Past the box walls, the cube collides against inclined planes, spheres and cones, and against a second cube through node-to-node repulsion. Force fields are sampled by trilinear interpolation.':
    '除了盒子内壁，立方体还能和斜面、球、圆锥碰撞；两个立方体之间靠节点斥力相互碰撞。力场用三线性插值采样。',
  'A travelling sine wave field with buoyancy and Stokes drift carries the cube along like water. Dragging works both globally, with the force aligned to the camera so the cube moves the way the mouse does, and per-node through a spring anchor that pulls neighbouring points along smoothly.':
    '还有一个带浮力和 Stokes 漂移的正弦波场，立方体会像漂在水上一样被带着走。拖动分两种：整体拖动时力和相机方向对齐，鼠标往哪拖，立方体就往哪走；单点拖动时通过弹簧锚点拉，周围的点会被平滑地带起来。',
  'Deformable cube in a scene with helix, sphere, cone and inclined planes':
    '场景中的可变形立方体，周围有螺旋体、球体、圆锥和斜面',
  'Collision geometry: helix, sphere, cone and inclined planes':
    '碰撞几何体：螺旋体、球体、圆锥和斜面',
  'Mass-spring cube simulation': '质点弹簧立方体仿真',
  'Constraint-based collision response with volume conservation': '基于约束的碰撞响应，带体积守恒',
  'Constraint-based collision response': '基于约束的碰撞响应',
  Constraints: '约束',
  'Volume-preserving pressure': '保持体积的压力',
  Robustness: '鲁棒性',
  'Collisions with analytic geometry': '与解析几何体的碰撞',
  'Collision detection': '碰撞检测',
  'Trilinear interpolation': '三线性插值',
  'Force fields and interaction': '力场与交互',
  'Force fields': '力场',
  'Interaction design': '交互设计',

  // Mandate Order
  'Software Engineer (C++)': '游戏开发（C++）',
  'Algorithms & Data Structures': '算法与数据结构',
  'System Design': '系统设计',
  'Production C++ on a shipped Unreal Engine 5 4X strategy game, intern to full-time over two-plus years. I owned eight systems across graph algorithms, spatial indexing, data-driven gameplay, and input and UI frameworks.':
    '已上线的 UE5 4X 策略游戏。我在项目里写了两年多 C++，从实习做到正式员工，负责八个系统，涉及图算法、空间索引、数据驱动玩法，以及输入和 UI 框架。',
  '85% less connectivity computation at the typical 2,000-unit workload':
    '常见 2,000 单位规模下，连通性计算量降低 85%',
  '2,000+ concurrent agents served by the pathfinding system': '寻路系统支撑 2,000+ 单位同时寻路',
  '8 production systems owned, from algorithms to frameworks':
    '负责 8 个线上系统，从底层算法到框架',
  'Shipped on Steam Early Access, 12 Aug 2026': '2026 年 8 月 12 日 Steam 抢先体验上线',
  'A Warring States 4X strategy game by Chengdu Digital Sky with real-time battles of thousands of units. The engine architecture (a multithreaded ECS with GPU instancing at 10,000+ entities) belonged to the project; the systems below are the ones I designed and owned on top of it.':
    '成都数字天空研发的战国题材 4X 策略游戏，实时战斗动辄数千单位。引擎架构（支持 10,000+ 实体 GPU Instancing 的多线程 ECS）是项目原有的；下面这些系统是我在这套架构上设计并负责的。',
  'Official Site': '官网',
  'Content here complies with the project confidentiality agreement.':
    '以上内容均在项目保密协议允许的范围内。',
  'Ancient chariot': '古代战车',
  'Character portrait': '角色立绘',
  'Siege weapon': '攻城器械',
  'Threat-aware pathfinding service': '威胁感知寻路服务',
  'A road map where a blue route bends around a hatched danger zone while the dashed shortest path cuts through it':
    '道路示意图：蓝色路线绕开了斜线标出的危险区，虚线是直接穿过危险区的最短路',
  'Routes bend around danger, for 2,000+ concurrent agents.':
    '路线会绕开危险区域，支撑 2,000+ 单位同时寻路。',
  'Graph algorithms': '图算法',
  'Priority queue': '优先队列',
  'Message queue': '消息队列',
  'Heap-based multi-source Dijkstra over a road graph that changes at runtime. Edge weights combine distance, road type, ownership and nearby threats, serving 2,000+ concurrent agents.':
    '在运行时会变化的路网上跑基于堆的多源 Dijkstra。边权综合考虑距离、道路类型、归属和附近威胁，支撑 2,000+ 单位同时寻路。',
  'Road updates are batched into commands and handed to the AI thread through a queue instead of sharing state across threads.':
    '道路更新先批量打包成命令，再通过队列交给 AI 线程，避免跨线程共享状态。',
  'Spatial indexing and connectivity': '空间索引与连通性',
  'Spatial hashing': '空间哈希',
  'Uniform grid': '均匀网格',
  'KD-tree': 'KD 树',
  'Union-find': '并查集',
  Profiling: '性能分析',
  'Unit grouping needs connected components of soldiers within a distance threshold, rebuilt in real time for selection, formations and pathfinding.':
    '单位分组要找出一定距离内士兵的连通分量，而且要实时重建，供选兵、阵型和寻路使用。',
  'For the typical 2,000-unit workload I replaced the naive search with spatial hashing on a uniform grid, cutting connectivity computation by 85%. A templated k-dimensional KD-tree (with union-find and DBSCAN) is kept for 5,000–6,000-unit scenes, where it pays off. Both paths are instrumented with stat counters.':
    '针对常见的 2,000 单位规模，我把暴力搜索换成了均匀网格空间哈希，连通性计算量降低 85%。另外保留了一套模板化的 k 维 KD 树（配合并查集和 DBSCAN），专门给 5,000–6,000 单位的场景用，那种规模下它更划算。两条路径都加了 stat 统计。',
  'Connected components computed over unit clusters': '对单位集群计算连通分量',
  'Command relay routing': '军令传递路由',
  'Beacon towers on hills linked into a network; a blue signal hops along the shortest chain from a command tent to distant soldiers':
    '山上的烽火台连成网络，蓝色信号沿最短路径从指挥帐篷一站站传到远处的士兵',
  'Orders hop tower to tower along the shortest chain.':
    '军令沿最短路径，在烽火台之间一站站往下传。',
  Caching: '缓存',
  'Complexity trade-offs': '复杂度权衡',
  'All-pairs shortest paths and next hops per beacon network, cached and rebuilt only when the network changes: an O(V³) rebuild buys constant-time lookups for every order.':
    '每个烽火台网络都预先算好全源最短路和下一跳并缓存，只在网络变化时重建：用一次 O(V³) 的重建，换每条军令 O(1) 的查询。',
  'Command relay through signal beacons': '通过烽火台传递军令',
  'Voronoi land partitioning': 'Voronoi 地块划分',
  'Computational geometry': '计算几何',
  'Grid spatial index': '网格空间索引',
  'Graph traversal': '图遍历',
  Heap: '堆',
  'Imports SVG Voronoi cells as land plots. Because plots have deliberate gaps, adjacency is approximated on a bounded grid (16–64 cells per axis), trading precision for speed.':
    '把 SVG 里的 Voronoi 单元导入成地块。地块之间特意留了缝，所以相邻关系用有界网格近似判断（每个轴 16–64 格），牺牲一点精度换速度。',
  'Construction expands outward from a central building, taking the next plot from a heap ordered by occupancy and distance.':
    '建设从中心建筑往外扩，每次从堆里取下一块地，按占用情况和距离排序。',
  'Voronoi-based plot management': '基于 Voronoi 的地块管理',
  'Dynamic frontline extraction': '动态前线提取',
  'Grid algorithms': '网格算法',
  'Boundary extraction': '边界提取',
  'Real-time updates': '实时更新',
  'Tracks faction ownership per grid cell, collects the edges between opposing cells into continuous border segments, and smooths them with sine offsets.':
    '按格子记录阵营归属，把敌对格子之间的边连成连续的边界线，再用正弦偏移做平滑。',
  'Dynamic battle frontline': '动态战场前线',
  'Input framework and command handling': '输入框架与指令处理',
  'Framework design': '框架设计',
  'API design': 'API 设计',
  'Reference counting': '引用计数',
  'State machine': '状态机',
  'Reusable input APIs on Unreal Enhanced Input: prioritized mapping contexts, reference-counted action monitoring and action allow/deny lists, shared across game modes.':
    '基于 Unreal Enhanced Input 封装可复用的输入 API：带优先级的 Mapping Context、引用计数的 Action 监听、Action 黑白名单，各游戏模式共用。',
  'A configuration-driven instruction manager for selection and command gestures, plus an in-game debug view of firing actions.':
    '配置驱动的指令管理器，负责选兵和下令的手势；另外做了游戏内的调试视图，能实时看到触发了哪些 Action。',
  'UI layer stack and settings system': 'UI 层级栈与设置系统',
  'UI architecture': 'UI 架构',
  'Stack-based navigation': '基于栈的导航',
  'Registry pattern': '注册表模式',
  'Reusable components': '可复用组件',
  'A CommonUI manager with per-player root layouts and tagged layer stacks for predictable screen navigation, and a settings system built on a registry with reusable controls.':
    '基于 CommonUI 的 UI 管理器：每个玩家有自己的根布局，层级栈带 Tag，界面跳转行为可预期。设置系统基于注册表实现，控件可以复用。',
  'Data-driven skill system': '数据驱动的技能系统',
  'Data-driven design': '数据驱动设计',
  'Event-driven architecture': '事件驱动架构',
  Decoupling: '解耦',
  'Configuration-driven system for 100+ abilities across commanders and AI units, with triggers decoupled from execution so abilities are added and tuned in configuration rather than code.':
    '配置驱动的技能系统，覆盖将领和 AI 单位共 100+ 个技能。触发和执行解耦，加技能、调技能都只改配置，不用改代码。',
  'Projectiles run as Mass ECS entities through processors I wrote for initialization, movement, collision and hits.':
    '投射物是 Mass ECS 实体，负责初始化、移动、碰撞和命中的 Processor 都是我写的。',

  // Sight Tour
  'Post-Process Materials': '后处理材质',
  'Stereo Rendering': '立体渲染',
  'Amblyopia rehabilitation built on custom stereo rendering — channel-isolated content and a hand-written anaglyph post-process material that puts a therapeutic target in front of one eye at a time.':
    '一款弱视康复游戏，核心是自定义的立体渲染：按颜色通道隔离内容，再加上手写的红青立体后处理材质，每次只让一只眼睛看到训练目标。',
  'A first-person game supporting vision rehabilitation for children with amblyopia. It is not really a shooter: the weapon solves arithmetic problems, and objects carry grating textures chosen to stimulate the weaker eye. The rendering work is what makes the therapy possible.':
    '帮助弱视儿童做视力康复的第一人称游戏。说是射击游戏，其实武器是用来答算术题的，物体表面的光栅纹理专门用来刺激弱视眼。这套训练能做出来，靠的就是渲染上的处理。',
  'Shape recognition challenge': '形状识别挑战',
  'Collect shape-matching spheres and strike the corresponding target':
    '收集形状匹配的球，并击中对应的目标',
  'Anaglyph 3D effect': '红青立体 3D 效果',
  'Red-cyan stereoscopic view with arithmetic challenges': '带算术挑战的红青立体画面',
  'Fine vision training': '精细视力训练',
  'Objects that demand fine visual attention are drawn in the red channel only (255, 0, 0) — the floating answer above each ball, for instance. Behind red-cyan glasses, only the red lens resolves that text. Placing the amblyopic eye behind the red lens forces it to do the reading, so both eyes stay engaged while the weaker one carries the detail work.':
    '需要仔细看的东西只画在红色通道（255, 0, 0）里，比如球上方漂着的答案。戴上红青眼镜后，只有透过红色镜片才看得清。让弱视眼戴红色镜片，它就必须去读这些内容：两只眼睛都在用，细节则交给较弱的那只眼。',
  'Normal view': '正常视角',
  'Blue lens': '蓝色镜片',
  'Through the blue lens': '透过蓝色镜片',
  'Red lens': '红色镜片',
  'Through the red lens': '透过红色镜片',
  'Stereoscopic training': '立体视觉训练',
  'The stereo effect is produced by a custom post-process material rather than engine stereo support: it shifts each object’s red channel slightly left and the cyan channels (green and blue) slightly right. With the offsets tuned, red-cyan glasses resolve a genuine sense of depth.':
    '立体效果没用引擎自带的立体渲染，而是自己写的后处理材质：把每个物体的红色通道稍微往左移，青色通道（绿和蓝）稍微往右移。偏移量调好后，戴上红青眼镜就能看到真实的纵深。',
  'Not every child with amblyopia has impaired depth perception, so the effect is a settings-menu toggle rather than always-on.':
    '不是每个弱视的孩子深度知觉都有问题，所以这个效果做成了设置里的开关，不会一直开着。',
  'Anaglyph stereoscopic effect': '红青立体效果',
  'Raster vision training': '光栅视觉训练',
  'Quick time events put a rotating black-and-white grating at the centre of the screen with a key prompt in its middle, drawn so that only the red lens resolves it. The amblyopic eye has to focus and respond under time pressure, which turns a standard QTE into targeted training.':
    'QTE 时屏幕中央会出现一个旋转的黑白光栅，中间是按键提示，只有透过红色镜片才看得清。弱视眼得在时间压力下聚焦并做出反应，普通的 QTE 就这样变成了针对性训练。',
  'QTE with red key prompt over a rotating grating': '旋转光栅上带红色按键提示的 QTE',
  'Color-channel isolation': '颜色通道隔离',
  Rendering: '渲染',
  'Post-process shaders': '后处理着色器',
  'Stereo rendering': '立体渲染',
  'Shader effects': '着色器效果',
  'Real-time input': '实时输入',

  // ORCA
  'ORCA Collision Avoidance in UE5': 'UE5 中的 ORCA 避障',
  'Multi-Agent Navigation': '多智能体导航',
  'Unreal’s built-in RVO avoidance degrades as agent count climbs, so I implemented ORCA inside the engine as a reusable subsystem.':
    'Unreal 自带的 RVO 避障在单位一多时效果明显变差，所以我在引擎里实现了 ORCA，做成可复用的子系统。',
  'Stable avoidance for hundreds of simultaneous agents': '几百个单位同时移动也能稳定避障',
  'ORCA (Optimal Reciprocal Collision Avoidance) gives more predictable and stable behaviour than RVO at scale. I implemented optimal velocity computation and reciprocal velocity obstacles as a custom navigation layer, available across projects rather than bolted onto one.':
    'ORCA（最优互惠避障）在大规模场景下比 RVO 更可预期、更稳定。我实现了最优速度计算和互惠速度障碍，做成一个独立的导航层，不同项目都能直接复用，不和某个项目绑死。',
  'ORCA collision avoidance': 'ORCA 避障',
  'ORCA as a reusable navigation layer': '把 ORCA 做成可复用的导航层',
  'Multi-agent systems': '多智能体系统',
  'Collision avoidance': '避障',
  'Reusable subsystem': '可复用子系统',

  // Smaller projects
  'Smaller Projects': '其他小项目',
  'Prototypes exploring different gameplay mechanics and visual styles.':
    '一些原型小项目，尝试不同的玩法机制和美术风格。',
}
