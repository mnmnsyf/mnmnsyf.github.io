<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <h2>{{ currentLanguage === 'zh' ? '佘泳霏' : 'Yongfei She' }}</h2>
        </div>
        <div class="nav-links">
          <a href="#about" class="nav-link">{{
            currentLanguage === 'zh' ? '关于我' : 'About Me'
          }}</a>
          <a href="#education" class="nav-link">{{
            currentLanguage === 'zh' ? '教育经历' : 'Education'
          }}</a>
          <a href="#projects" class="nav-link">{{
            currentLanguage === 'zh' ? '项目经验' : 'Projects'
          }}</a>
          <a href="#competitions" class="nav-link">{{
            currentLanguage === 'zh' ? '获奖情况' : 'Awards'
          }}</a>
          <a href="#work" class="nav-link">{{
            currentLanguage === 'zh' ? '工作经验' : 'Work Experience'
          }}</a>
          <a href="#skills" class="nav-link">{{ currentLanguage === 'zh' ? '技能' : 'Skills' }}</a>
          <a href="#interests" class="nav-link">{{
            currentLanguage === 'zh' ? '兴趣爱好' : 'Interests'
          }}</a>
        </div>
        <div class="language-switch">
          <button
            class="lang-btn"
            :class="{ active: currentLanguage === 'en' }"
            @click="switchLanguage('en')"
          >
            EN
          </button>
          <span class="lang-divider">|</span>
          <button
            class="lang-btn"
            :class="{ active: currentLanguage === 'zh' }"
            @click="switchLanguage('zh')"
          >
            中文
          </button>
        </div>
        <div class="nav-toggle" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: isMobileMenuOpen }">
      <div class="mobile-menu-container">
        <div class="mobile-menu-header">
          <div class="mobile-language-switch">
            <button
              class="lang-btn"
              :class="{ active: currentLanguage === 'en' }"
              @click="switchLanguage('en')"
            >
              EN
            </button>
            <span class="lang-divider">|</span>
            <button
              class="lang-btn"
              :class="{ active: currentLanguage === 'zh' }"
              @click="switchLanguage('zh')"
            >
              中文
            </button>
          </div>
        </div>
        <div class="mobile-menu-links">
          <a href="#about" class="mobile-nav-link" @click="toggleMobileMenu">{{
            currentLanguage === 'zh' ? '关于我' : 'About Me'
          }}</a>
          <a href="#education" class="mobile-nav-link" @click="toggleMobileMenu">{{
            currentLanguage === 'zh' ? '教育经历' : 'Education'
          }}</a>
          <a href="#projects" class="mobile-nav-link" @click="toggleMobileMenu">{{
            currentLanguage === 'zh' ? '项目经验' : 'Projects'
          }}</a>
          <a href="#competitions" class="mobile-nav-link" @click="toggleMobileMenu">{{
            currentLanguage === 'zh' ? '获奖情况' : 'Awards'
          }}</a>
          <a href="#work" class="mobile-nav-link" @click="toggleMobileMenu">{{
            currentLanguage === 'zh' ? '工作经验' : 'Work Experience'
          }}</a>
          <a href="#skills" class="mobile-nav-link" @click="toggleMobileMenu">{{
            currentLanguage === 'zh' ? '技能' : 'Skills'
          }}</a>
          <a href="#interests" class="mobile-nav-link" @click="toggleMobileMenu">{{
            currentLanguage === 'zh' ? '兴趣爱好' : 'Interests'
          }}</a>
        </div>
      </div>
      <div class="mobile-menu-backdrop" @click="toggleMobileMenu"></div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h2 class="hero-title">
            {{ currentLanguage === 'zh' ? '佘泳霏' : 'Yongfei She (佘泳霏)' }}
          </h2>
          <h2 class="hero-subtitle">
            {{ currentLanguage === 'zh' ? '游戏开发工程师' : 'Game Development Engineer' }}
          </h2>
          <p class="hero-description" v-if="currentLanguage === 'zh'">
            热衷于游戏开发的工程师，拥有扎实的C++、数据结构和算法基础。
            具有虚幻引擎5开发和竞赛编程经验，专注于创建高效的游戏玩法系统和优化实时应用程序的性能。
          </p>
          <p class="hero-description" v-else>
            Passionate game development engineer with strong foundation in C++, data structures, and
            algorithms. Experienced in Unreal Engine 5 development and competitive programming, I
            focus on creating efficient gameplay systems and optimizing performance for real-time
            applications.
          </p>
          <div class="hero-buttons">
            <a href="#projects" class="btn btn-primary">{{
              currentLanguage === 'zh' ? '查看我的作品' : 'View My Work'
            }}</a>
            <a href="#contact" class="btn btn-secondary">{{
              currentLanguage === 'zh' ? '联系我' : 'Contact Me'
            }}</a>
          </div>
        </div>
        <!-- 移除了圆形头像 -->
      </div>
    </section>

    <!-- About Me Section -->
    <section id="about" class="section">
      <div class="container">
        <h2 class="section-title">{{ currentLanguage === 'zh' ? '关于我' : 'About Me' }}</h2>
        <div class="about-content">
          <div class="about-text">
            <p v-if="currentLanguage === 'zh'">
              我是一名游戏开发工程师，拥有扎实的C++、数据结构和算法基础。
              我在成都信息工程大学的学术背景为我提供了坚实的计算机科学基础，而我的竞赛编程经验则帮助我培养了强大的问题解决能力和算法思维能力。
            </p>
            <p v-else>
              I am a game development engineer with a strong foundation in C++, data structures, and
              algorithms. My academic background at Chengdu University of Information Technology has
              provided me with solid computer science fundamentals, while my competitive programming
              experience has helped me develop strong problem-solving and algorithmic thinking
              skills.
            </p>
            <p v-if="currentLanguage === 'zh'">
              我的竞赛编程背景，包括多个ICPC奖牌和国家级奖项，使我精通高级算法和数据结构。这些知识帮助我为复杂问题开发高效解决方案，特别是在游戏开发中重要的寻路算法、空间数据结构和优化技术方面。
            </p>
            <p v-else>
              My competitive programming background, including multiple ICPC medals and national
              awards, has given me proficiency in advanced algorithms and data structures. This
              knowledge helps me develop efficient solutions for complex problems, particularly in
              pathfinding algorithms, spatial data structures, and optimization techniques that are
              important in game development.
            </p>
          </div>
          <div class="about-image">
            <div class="profile-image-container">
              <img
                src="/syf1.jpg"
                alt="Yongfei She Profile Photo"
                loading="lazy"
                class="profile-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="section">
      <div class="container">
        <h2 class="section-title">{{ currentLanguage === 'zh' ? '教育经历' : 'Education' }}</h2>
        <div class="education-grid">
          <div class="education-card">
            <div class="education-header">
              <h3>
                {{
                  currentLanguage === 'zh'
                    ? '成都信息工程大学'
                    : 'Chengdu University of Information Technology'
                }}
              </h3>
              <span class="education-period">2020 - 2024</span>
            </div>
            <p class="education-degree">
              {{ currentLanguage === 'zh' ? '工学学士' : 'Bachelor of Engineering (BEng)' }}
            </p>
            <p class="education-major">
              {{ currentLanguage === 'zh' ? '计算机学院' : 'School of Computer Science' }}
            </p>
            <p class="education-gpa">GPA: 3.7</p>
            <div class="education-details">
              <h4>{{ currentLanguage === 'zh' ? '奖项与荣誉：' : 'Awards & Honors:' }}</h4>
              <ul>
                <li>
                  {{
                    currentLanguage === 'zh'
                      ? '国家奖学金（2023，学院第一）'
                      : 'National Scholarship (2023, 1st in college)'
                  }}
                </li>
                <li>
                  {{
                    currentLanguage === 'zh'
                      ? '特等奖学金（2021-2023，年级第一）'
                      : 'Special Scholarship (2021-2023, 1st in grade)'
                  }}
                </li>
              </ul>
              <h4>{{ currentLanguage === 'zh' ? '相关课程：' : 'Relevant Coursework:' }}</h4>
              <p v-if="currentLanguage === 'zh'">
                C语言程序设计、Java程序设计、计算机图形学、离散数学、数据结构、
                概率论、数据库、软件工程、网络游戏编程、虚幻引擎游戏编程
              </p>
              <p v-else>
                C Programming, Java Programming, Computer Graphics, Discrete Mathematics, Data
                Structures, Probability Theory, Databases, Software Engineering, Network Game
                Programming, UE Game Programming
              </p>
            </div>
          </div>
          <!-- Add more education cards as needed -->
        </div>
      </div>
    </section>

    <!-- Projects & Implementations Section -->
    <section id="projects" class="section">
      <div class="container">
        <h2 class="section-title">{{ currentLanguage === 'zh' ? '项目经验' : 'Projects' }}</h2>
        <div class="projects-list">
          <!-- Project 1: Sight Tour -->
          <div class="project-item">
            <div class="project-header">
              <h3 class="project-title">Sight Tour</h3>
              <div class="project-tech">
                <span class="tech-tag">Unreal Engine 5</span>
                <span class="tech-tag">C++</span>
                <span class="tech-tag">Computer Graphics</span>
                <span class="tech-tag">Medical Gaming</span>
              </div>
            </div>
            <div class="project-description">
              <div class="project-intro">
                <div class="project-screenshots">
                  <div class="screenshot-grid">
                    <div class="screenshot-item">
                      <div class="screenshot-image">
                        <img
                          src="/sight-tour-arena.png"
                          alt="Sight Tour - Shape Recognition Challenge"
                          loading="lazy"
                        />
                      </div>
                      <div class="screenshot-caption">
                        <span class="caption-title">Shape Recognition Challenge</span>
                        <span class="caption-desc"
                          >Collect shape-matching spheres and hit corresponding target shapes</span
                        >
                      </div>
                    </div>
                    <div class="screenshot-item">
                      <div class="screenshot-image">
                        <img
                          src="/sight-tour-anaglyph.png"
                          alt="Sight Tour - Anaglyph 3D Effect"
                          loading="lazy"
                        />
                      </div>
                      <div class="screenshot-caption">
                        <span class="caption-title">Anaglyph 3D Effect</span>
                        <span class="caption-desc"
                          >Red-cyan stereoscopic vision training with mathematical challenges</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="project-text">
                  <p>
                    This game supports the rehabilitation of children with amblyopia. Using a
                    first-person perspective, it's not a typical shooting game — the player's weapon
                    can solve simple maths problems, and objects with grating textures are designed
                    to stimulate the amblyopic eye.
                  </p>
                </div>
              </div>
            </div>

            <!-- Module A: Fine vision training -->
            <div class="project-module">
              <h4 class="module-title">a. Fine vision training</h4>
              <div class="module-content">
                <div class="module-text">
                  <p>
                    Objects requiring fine visual attention are shown using only the red channel
                    (RGB: 255, 0, 0). As illustrated on the right, the floating answer above each
                    ball is displayed in red text. When wearing red-blue anaglyph glasses, only the
                    red lens can clearly see the text. By placing the amblyopic eye behind the red
                    lens, the child is encouraged to use that eye to read the text in detail. This
                    enables simultaneous binocular training with additional focus on the weaker eye.
                  </p>
                </div>
                <div class="module-images">
                  <div class="fine-vision-interactive">
                    <div class="screenshot-item">
                      <div class="screenshot-image main-image">
                        <img
                          :src="currentGlassesView"
                          alt="Fine Vision Training - Interactive View"
                          loading="lazy"
                        />
                        <div
                          class="glasses-overlay"
                          v-if="currentGlassesView !== '/fine-vision-main.png'"
                        >
                          <div class="glasses-indicator">
                            <span class="glasses-text">{{ glassesViewText }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="screenshot-caption">
                        <span class="caption-title">{{ currentCaption }}</span>
                      </div>
                      <div class="glasses-buttons">
                        <button
                          class="glasses-btn normal-btn"
                          :class="{ active: currentGlassesView === '/fine-vision-main.png' }"
                          @click="switchToMainView"
                        >
                          <span class="btn-text">Normal View</span>
                        </button>
                        <button
                          class="glasses-btn blue-btn"
                          :class="{
                            active: currentGlassesView === '/fine-vision-blue-glasses.png',
                          }"
                          @click="switchToBlueGlasses"
                        >
                          <span class="btn-text">Blue Lens</span>
                        </button>
                        <button
                          class="glasses-btn red-btn"
                          :class="{ active: currentGlassesView === '/fine-vision-red-glasses.png' }"
                          @click="switchToRedGlasses"
                        >
                          <span class="btn-text">Red Lens</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Module B: Stereoscopic training -->
            <div class="project-module">
              <h4 class="module-title">b. Stereoscopic training</h4>
              <div class="module-content">
                <div class="module-text">
                  <p>
                    The game innovatively recreates the stereoscopic effect of 3D films by applying
                    the principle of red-cyan colour separation. A custom post-processing material
                    was developed to shift the red channel of each object slightly to the left, and
                    the cyan channels (green and blue) to the right. With fine-tuned parameters,
                    wearing red-cyan glasses produces a strong 3D visual effect.
                  </p>
                  <p>
                    As not all children with amblyopia have issues with depth perception, this
                    feature can be enabled as needed via the settings menu.
                  </p>
                </div>
                <div class="module-image">
                  <div class="screenshot-item">
                    <div class="screenshot-image">
                      <img
                        src="/stereoscopic-training.png"
                        alt="Stereoscopic Training - Anaglyph 3D Effect"
                        loading="lazy"
                      />
                    </div>
                    <div class="screenshot-caption">
                      <span class="caption-title">Anaglyph 3D Stereoscopic Effect</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Module C: Raster vision training -->
            <div class="project-module">
              <h4 class="module-title">c. Raster vision training</h4>
              <div class="module-content">
                <div class="module-text">
                  <p>
                    The game includes Quick Time Events (QTEs), where players must respond to brief
                    on-screen prompts. The outcome varies depending on whether the correct input is
                    given.
                  </p>
                  <p>
                    As shown on the right, during a QTE, a rotating black-and-white grating appears
                    at the centre of the screen with a red key prompt in the middle. Only the red
                    lens of red-cyan glasses can clearly reveal the key, encouraging the amblyopic
                    eye to focus and respond — providing targeted visual training.
                  </p>
                </div>
                <div class="module-image">
                  <div class="screenshot-item">
                    <div class="screenshot-image">
                      <img
                        src="/raster-vision-training.png"
                        alt="Raster Vision Training - QTE with Red Key Prompt"
                        loading="lazy"
                      />
                    </div>
                    <div class="screenshot-caption">
                      <span class="caption-title">QTE with Red Key Prompt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Project 2: Project Mo -->
          <div class="project-item">
            <div class="project-header">
              <h3 class="project-title">Project Mo</h3>
              <div class="project-tech">
                <span class="tech-tag">Unreal Engine 5</span>
                <span class="tech-tag">C++</span>
                <span class="tech-tag">Gameplay Programming</span>
                <span class="tech-tag">Strategy Game</span>
              </div>
            </div>
            <div class="project-description">
              <div class="project-intro">
                <div class="project-text">
                  <p>
                    This project is an in-development historical strategy game set in the Spring and
                    Autumn and Warring States periods of ancient China, developed using Unreal
                    Engine 5. I am working on the project as a gameplay programmer. Next I will
                    introduce my main job description.
                  </p>
                  <p>
                    <strong>Game official website:</strong>
                    <a href="https://www.digisky.com/product/mo" target="_blank"
                      >https://www.digisky.com/product/mo</a
                    >
                  </p>
                  <p>
                    <em
                      >Note: The content of the document complies with the confidentiality
                      agreement.</em
                    >
                  </p>
                </div>
                <div class="project-screenshots">
                  <div
                    class="project-mo-carousel"
                    @mouseenter="stopProjectMoCarousel"
                    @mouseleave="startProjectMoCarousel"
                  >
                    <div class="main-image-container">
                      <div class="screenshot-item">
                        <div class="screenshot-image project-mo-main-image">
                          <img
                            :src="currentProjectMoImage"
                            alt="Project Mo - Current View"
                            loading="lazy"
                            :key="currentProjectMoIndex"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="thumbnail-container">
                      <div
                        class="thumbnail-item"
                        :class="{ active: currentProjectMoIndex === 0 }"
                        @click="switchToProjectMoImage(0)"
                      >
                        <img
                          src="/project-mo-chariot.png"
                          alt="Project Mo - Ancient Chariot"
                          loading="lazy"
                        />
                      </div>
                      <div
                        class="thumbnail-item"
                        :class="{ active: currentProjectMoIndex === 1 }"
                        @click="switchToProjectMoImage(1)"
                      >
                        <img
                          src="/project-mo-character.png"
                          alt="Project Mo - Character Portrait"
                          loading="lazy"
                        />
                      </div>
                      <div
                        class="thumbnail-item"
                        :class="{ active: currentProjectMoIndex === 2 }"
                        @click="switchToProjectMoImage(2)"
                      >
                        <img
                          src="/project-mo-siege.png"
                          alt="Project Mo - Siege Weapon"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Module A: Optimising Maximum Connected Component Computation -->
            <div class="project-module">
              <h4 class="module-title">a. Optimising Maximum Connected Component Computation</h4>
              <div class="module-content">
                <div class="module-text">
                  <p>
                    Convex hulls of unit clusters are widely used in the project—for example, to
                    determine squad averages, mouse selection, pathfinding, and dynamic faction
                    alignment. Since convex hulls need to be updated frequently and in real time,
                    performance is critical. Computing the maximum connected component is a
                    necessary step before calculating the convex hull. I improved performance by
                    applying a kd-tree algorithm. When handling 120 unit clusters, the computation
                    time was reduced to around 25% of the original. The more units there are, the
                    greater the performance gain.
                  </p>
                </div>
                <div class="module-video">
                  <div class="plyr-container">
                    <video
                      ref="connectedComponentVideo"
                      id="connected-component-video"
                      poster="/connected-component-poster.png"
                      preload="metadata"
                    >
                      <source src="/connected-component-optimization.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>

            <!-- Module B: Flag Command Dispatch -->
            <div class="project-module">
              <h4 class="module-title">b. Flag Command Dispatch</h4>
              <div class="module-content">
                <div class="module-text">
                  <p>
                    Flag Command Dispatch allows the player to remotely issue orders to multiple
                    units via signal towers. Signals are transmitted along paths with the shortest
                    time cost. Since the final target location may change dynamically during
                    transmission, the system must continuously recalculate the shortest paths from
                    all units that have received the message to the new target. This turns the
                    problem into a multi-source shortest path problem.
                  </p>
                  <p>
                    To implement this mechanic, I used the Floyd algorithm to compute multi-source
                    shortest paths.
                  </p>
                </div>
                <div class="module-video">
                  <div class="plyr-container">
                    <video
                      ref="flagCommandVideo"
                      id="flag-command-video"
                      poster="/flag-command-poster.png"
                      preload="metadata"
                    >
                      <source src="/flag-command.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>

            <!-- Module C: Dynamic Battle Frontline -->
            <div class="project-module dynamic-battle-module">
              <h4 class="module-title">c. Dynamic Battle Frontline</h4>
              <div class="module-content">
                <div class="module-images">
                  <div class="image-grid">
                    <div class="image-item">
                      <img
                        src="/dynamic-battle-frontline-1.png"
                        alt="Dynamic Battle Frontline Screenshot 1"
                        loading="lazy"
                      />
                    </div>
                    <div class="image-item">
                      <img
                        src="/dynamic-battle-frontline-2.png"
                        alt="Dynamic Battle Frontline Screenshot 2"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div class="module-text">
                  <p>
                    A dynamic battle frontline refers to the shifting boundary formed as multiple
                    armies engage in battle. As unit positions change, the frontline evolves
                    accordingly. I implemented this by dividing the terrain into a grid and
                    determining which areas are occupied by each force. The borders between adjacent
                    grid cells occupied by different units are extracted and ordered into a series
                    of line segments.
                  </p>
                  <p>
                    To give the frontline a wave-like effect, I applied a sine function to sample
                    the endpoints of each segment.
                  </p>
                </div>
              </div>
            </div>

            <!-- Module D: Voronoi-Based Plot Management System -->
            <div class="project-module voronoi-tile-module">
              <h4 class="module-title">Voronoi-Based Plot Management System</h4>
              <div class="module-content">
                <div class="module-video">
                  <div class="plyr-container">
                    <video
                      ref="voronoiTileVideo"
                      id="voronoi-tile-video"
                      poster="/voronoi-tile-management-poster.png"
                      preload="metadata"
                    >
                      <source src="/voronoi-tile-management.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div class="module-text">
                  <p>
                    I designed and implemented a Voronoi-based plot management system to dynamically
                    calculate adjacency relationships and manage plot construction around buildings.
                    The system begins by importing SVG-format Voronoi assets—created via a web
                    tool—into the engine, where each SVG encodes the polygonal boundaries of
                    individual plots. These polygons are then programmatically attached to their
                    corresponding buildings, representing the plots owned by each structure.
                  </p>
                  <p>
                    To ensure seamless integration with the 3D map, I developed a feature that
                    proportionally scales and rotates the 2D Voronoi diagrams to match the
                    building's orientation in the 3D world.
                  </p>
                  <p>
                    In construction mode, when a central building initiates the construction of
                    auxiliary structures, the system can automatically identify and traverse
                    adjacent plots in a specified order (clockwise, counterclockwise, or by
                    distance), expanding outward layer by layer until reaching the map's edge. The
                    algorithm intelligently excludes special terrain types such as roads and
                    pre-existing buildings.
                  </p>
                  <p>
                    To address the unique requirements of this project, I developed a custom
                    grid-based algorithm to optimize the traditionally high time complexity of
                    Voronoi edge searches. Unlike standard Voronoi implementations—which assume
                    fully connected plot edges—our game's design introduces gaps between plots,
                    complicating adjacency calculations. My solution divides the Voronoi diagram
                    into grids of configurable size, treating plot vertices within the same grid as
                    adjacent. This approach dramatically accelerates adjacency computations while
                    maintaining high accuracy. By tuning the grid size, the system flexibly balances
                    precision and performance, enabling real-time dynamic calculations during
                    gameplay.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Project 3: ORCA algorithm -->
          <div class="project-item">
            <div class="project-header">
              <h3 class="project-title">ORCA Algorithm</h3>
              <div class="project-tech">
                <span class="tech-tag">Unreal Engine 5</span>
                <span class="tech-tag">C++</span>
                <span class="tech-tag">AI Navigation</span>
                <span class="tech-tag">Algorithm Implementation</span>
              </div>
            </div>
            <div class="project-description">
              <p>
                Unreal Engine's built-in avoidance system uses the RVO algorithm, but when the
                number of agents increases, it often produces unexpected behaviour. To address this,
                I implemented the ORCA algorithm within Unreal Engine, making it available for use
                across all relevant projects.
              </p>
            </div>
            <div class="project-module">
              <div class="module-content">
                <div class="module-text">
                  <p>
                    The ORCA (Optimal Reciprocal Collision Avoidance) algorithm provides more
                    predictable and stable behavior for large numbers of agents compared to RVO. I
                    implemented this algorithm in Unreal Engine 5, creating a custom navigation
                    system that handles complex multi-agent scenarios with improved performance and
                    reliability.
                  </p>
                  <p>
                    Key features include optimal velocity computation, reciprocal velocity obstacles
                    calculation, and efficient collision avoidance for hundreds of simultaneous
                    agents.
                  </p>
                </div>
                <div class="module-video">
                  <div class="plyr-container">
                    <video
                      ref="orcaVideo"
                      id="orca-video"
                      poster="/orca-poster.png"
                      preload="metadata"
                    >
                      <source src="/orca-algorithm.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Project 4: Others -->
          <div class="project-item">
            <div class="project-header">
              <h3 class="project-title">Others</h3>
              <div class="project-tech">
                <span class="tech-tag">Unreal Engine 5</span>
                <span class="tech-tag">C++</span>
                <span class="tech-tag">Game Development</span>
              </div>
            </div>
            <div class="project-description">
              <p>
                A collection of additional game development projects showcasing various gameplay
                mechanics and visual styles.
              </p>
            </div>
            <div class="others-gallery">
              <div class="gallery-grid">
                <div class="gallery-item">
                  <img
                    src="/jumping-party.png"
                    alt="Jumping Party - Platformer Game"
                    loading="lazy"
                  />
                  <div class="gallery-caption">
                    <span>Jumping Party</span>
                  </div>
                </div>
                <div class="gallery-item">
                  <img
                    src="/tavern-adventure.png"
                    alt="Tavern and Adventure - RPG Game"
                    loading="lazy"
                  />
                  <div class="gallery-caption">
                    <span>Tavern and Adventure</span>
                  </div>
                </div>
                <div class="gallery-item">
                  <img
                    src="/little-adventure.png"
                    alt="Little Adventure - RPG Game"
                    loading="lazy"
                  />
                  <div class="gallery-caption">
                    <span>Little Adventure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Competitions & Awards Section -->
    <section id="competitions" class="section">
      <div class="container">
        <h2 class="section-title">{{ currentLanguage === 'zh' ? '获奖情况' : 'Awards' }}</h2>
        <div class="awards-grid">
          <div class="award-card">
            <div class="award-icon">🥈</div>
            <div class="award-content">
              <h3 class="award-title">
                Silver Medal, ICPC National Invitation Contest - Shaanxi Regional
              </h3>
              <p class="award-organization">ICPC Asia Regional Contest</p>
              <p class="award-date">May 2023</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon">🥉</div>
            <div class="award-content">
              <h3 class="award-title">
                Bronze Medal, ICPC National Invitation Contest - Nanjing Regional
              </h3>
              <p class="award-organization">ICPC Asia Regional Contest</p>
              <p class="award-date">December 2022</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon">🥉</div>
            <div class="award-content">
              <h3 class="award-title">Bronze Medal, CCPC "Women's Division" National Finals</h3>
              <p class="award-organization">CCPC National Finals</p>
              <p class="award-date">October 2022</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon">🥈</div>
            <div class="award-content">
              <h3 class="award-title">Silver Medal, Sichuan Provincial Programming Contest</h3>
              <p class="award-organization">Sichuan Provincial Programming Contest</p>
              <p class="award-date">June 2023</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon">🏅</div>
            <div class="award-content">
              <h3 class="award-title">
                Gold Award, National Undergraduate Algorithm Design & Programming Challenge
              </h3>
              <p class="award-organization">National Algorithm Challenge</p>
              <p class="award-date">July 2022</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon">🥉</div>
            <div class="award-content">
              <h3 class="award-title">
                3rd Prize, RoboCom Robot Developer Contest (Programming Track)
              </h3>
              <p class="award-organization">RoboCom Robot Developer Contest</p>
              <p class="award-date">August 2022</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon">🥇</div>
            <div class="award-content">
              <h3 class="award-title">
                First Prize, Baidu Star Programming Contest (C/C++ Division)
              </h3>
              <p class="award-organization">Baidu Star Programming Contest</p>
              <p class="award-date">August 2022</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon">🥉</div>
            <div class="award-content">
              <h3 class="award-title">
                Third Prize, Lan Qiao Cup National Programming Competition
              </h3>
              <p class="award-organization">Lan Qiao Cup National Programming Competition</p>
              <p class="award-date">June 2022</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon">🥈</div>
            <div class="award-content">
              <h3 class="award-title">
                2nd Prize (Provincial) & 3rd Prize (National), Group Programming Ladder Tournament
              </h3>
              <p class="award-organization">Group Programming Ladder Tournament</p>
              <p class="award-date">May 2022</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Work Experience Section -->
    <section id="work" class="section">
      <div class="container">
        <h2 class="section-title">
          {{ currentLanguage === 'zh' ? '工作经验' : 'Work Experience' }}
        </h2>
        <div class="experience-timeline">
          <div class="experience-item">
            <div class="experience-header">
              <h3 class="job-title">UE5 Gameplay Engineer</h3>
              <span class="company-name">Chengdu Digital Sky Technology Co., Ltd.</span>
              <span class="job-period">Jul 2024 - Present</span>
            </div>
            <div class="job-description">
              <ul>
                <li>
                  Extended UE spline module to implement dynamic navigation system supporting
                  single-source and multi-source shortest path algorithms
                </li>
                <li>
                  Built supply transportation system on navigation mesh, automating strategic
                  resource routing for large-scale battles
                </li>
                <li>
                  Designed multi-mode input and UI system using Enhanced Input, supporting layered,
                  context-aware interactions
                </li>
                <li>
                  Implemented hierarchical state machine architecture supporting narrative, command,
                  and sandbox gameplay modes
                </li>
                <li>
                  Created modular skill and buff framework with decoupled triggers and effectors for
                  designer-driven ability configuration
                </li>
                <li>
                  Used Voronoi diagrams to partition terrain into regions and developed custom
                  optimization algorithms for adjacent area identification in building systems
                </li>
              </ul>
            </div>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <h3 class="job-title">UE5 Gameplay Engineer Intern</h3>
              <span class="company-name">Chengdu Digital Sky Technology Co., Ltd.</span>
              <span class="job-period">Sep 2023 - Jun 2024</span>
            </div>
            <div class="job-description">
              <ul>
                <li>
                  Participated in developing a tavern management and farm leisure game, delivering
                  playable prototype within one month
                </li>
                <li>
                  Optimized legion connectivity calculations using KD-Tree and refactored into
                  reusable C++ templates; achieved 85% performance improvement with over 2,000 units
                </li>
                <li>
                  Implemented multi-source shortest path routing through Floyd-Warshall algorithm,
                  enabling chain transmission of flag tower commands between connected outposts
                </li>
                <li>
                  Built universal AI behavior trees for non-combat levels, extending Sequence tracks
                  and Flow Graph nodes to simplify collaboration between narrative and engineering
                  teams
                </li>
              </ul>
            </div>
          </div>
          <!-- Add more experience items -->
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
      <div class="container">
        <h2 class="section-title">{{ currentLanguage === 'zh' ? '技能' : 'Skills' }}</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <h3 class="skill-category-title">Programming Languages</h3>
            <div class="skill-tags">
              <span class="skill-tag">C</span>
              <span class="skill-tag">C++</span>
              <span class="skill-tag">C#</span>
              <span class="skill-tag">Java</span>
              <span class="skill-tag">MySQL</span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="skill-category-title">Game Engines</h3>
            <div class="skill-tags">
              <span class="skill-tag">Unity</span>
              <span class="skill-tag">Unreal Engine</span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="skill-category-title">Computer Graphics & Tools</h3>
            <div class="skill-tags">
              <span class="skill-tag">OpenGL</span>
              <span class="skill-tag">Computer Graphics</span>
              <span class="skill-tag">Real-time Rendering</span>
              <span class="skill-tag">Visual Computing</span>
              <span class="skill-tag">Git</span>
              <span class="skill-tag">Visual Studio</span>
              <span class="skill-tag">Photoshop</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interests Section -->
    <section id="interests" class="section">
      <div class="container">
        <h2 class="section-title">{{ currentLanguage === 'zh' ? '兴趣爱好' : 'Interests' }}</h2>
        <div class="interests-grid">
          <div class="interest-card">
            <div class="interest-icon">🎮</div>
            <h3 class="interest-title">Game Mechanics & Prototyping</h3>
            <p class="interest-description">
              Passionate about exploring innovative game mechanics and rapid prototyping, with a
              focus on computer graphics for gaming applications.
            </p>
          </div>

          <div class="interest-card">
            <div class="interest-icon">🎯</div>
            <h3 class="interest-title">Strategy Games</h3>
            <p class="interest-description">
              Deep interest in strategy games that influence my approach to designing complex
              gameplay systems and AI behavior trees.
            </p>
          </div>

          <div class="interest-card">
            <div class="interest-icon">📚</div>
            <h3 class="interest-title">Sci-fi & Mystery Novels</h3>
            <p class="interest-description">
              Reading sci-fi and mystery novels helps develop creative thinking and narrative design
              skills for immersive gaming experiences.
            </p>
          </div>

          <div class="interest-card">
            <div class="interest-icon">🌍</div>
            <h3 class="interest-title">Travel</h3>
            <p class="interest-description">
              Exploring different cultures and environments provides inspiration for diverse game
              worlds and storytelling elements.
            </p>
          </div>
          <!-- Add more interest cards -->
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>{{ currentLanguage === 'zh' ? '佘泳霏' : 'Yongfei She (佘泳霏)' }}</h3>
            <p>{{ currentLanguage === 'zh' ? '游戏开发工程师' : 'Game Development Engineer' }}</p>
          </div>
          <div class="footer-section">
            <h4>{{ currentLanguage === 'zh' ? '联系方式' : 'Contact' }}</h4>
            <p>Email: sheyfff@gmail.com</p>
            <p>{{ currentLanguage === 'zh' ? '电话' : 'Phone' }}: +86 15815966990</p>
            <p>
              GitHub: <a href="https://github.com/mnmnsyf" target="_blank">github.com/mnmnsyf</a>
            </p>
          </div>
          <div class="footer-section">
            <h4>{{ currentLanguage === 'zh' ? '快速链接' : 'Quick Links' }}</h4>
            <a href="#about">{{ currentLanguage === 'zh' ? '关于我' : 'About' }}</a>
            <a href="#projects">{{ currentLanguage === 'zh' ? '项目' : 'Projects' }}</a>
            <a href="#contact">{{ currentLanguage === 'zh' ? '联系' : 'Contact' }}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>
            &copy; 2024 {{ currentLanguage === 'zh' ? '佘泳霏' : 'Yongfei She' }}.
            {{ currentLanguage === 'zh' ? '版权所有' : 'All rights reserved' }}.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const isMobileMenuOpen = ref(false)
const currentGlassesView = ref('/fine-vision-main.png')
const currentLanguage = ref('en')

// 默认使用英文界面
onMounted(() => {
  // 不再根据浏览器语言自动切换到中文
  // 保持英文作为默认语言
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  // 当菜单打开时，禁止页面滚动
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 切换语言
const switchLanguage = (lang: string) => {
  currentLanguage.value = lang
}

const currentCaption = computed(() => {
  switch (currentGlassesView.value) {
    case '/fine-vision-main.png':
      return 'Main Training View'
    case '/fine-vision-blue-glasses.png':
      return 'Blue Glasses View'
    case '/fine-vision-red-glasses.png':
      return 'Red Glasses View'
    default:
      return 'Main Training View'
  }
})

const glassesViewText = computed(() => {
  switch (currentGlassesView.value) {
    case '/fine-vision-blue-glasses.png':
      return 'Blue Lens Active'
    case '/fine-vision-red-glasses.png':
      return 'Red Lens Active'
    default:
      return ''
  }
})

const switchToMainView = () => {
  currentGlassesView.value = '/fine-vision-main.png'
}

const switchToBlueGlasses = () => {
  currentGlassesView.value = '/fine-vision-blue-glasses.png'
}

const switchToRedGlasses = () => {
  currentGlassesView.value = '/fine-vision-red-glasses.png'
}

// Project Mo Carousel
const currentProjectMoIndex = ref(0)

const projectMoImages = [
  '/project-mo-chariot.png',
  '/project-mo-character.png',
  '/project-mo-siege.png',
]

const projectMoCaptions = ['Ancient Chariot', 'Character Portrait', 'Siege Weapon']

const currentProjectMoImage = computed(() => {
  return projectMoImages[currentProjectMoIndex.value]
})

const currentProjectMoCaption = computed(() => {
  return projectMoCaptions[currentProjectMoIndex.value]
})

const switchToProjectMoImage = (index: number) => {
  currentProjectMoIndex.value = index
}

// Auto carousel for Project Mo
let projectMoInterval: number | null = null

const startProjectMoCarousel = () => {
  projectMoInterval = setInterval(() => {
    currentProjectMoIndex.value = (currentProjectMoIndex.value + 1) % projectMoImages.length
  }, 3000)
}

const stopProjectMoCarousel = () => {
  if (projectMoInterval) {
    clearInterval(projectMoInterval)
    projectMoInterval = null
  }
}

// Start carousel when component mounts
startProjectMoCarousel()

// Video Player with Plyr
const connectedComponentVideo = ref<HTMLVideoElement | null>(null)
const flagCommandVideo = ref<HTMLVideoElement | null>(null)
const orcaVideo = ref<HTMLVideoElement | null>(null)
const voronoiTileVideo = ref<HTMLVideoElement | null>(null)
let plyrPlayer1: any = null
let plyrPlayer2: any = null
let plyrPlayer3: any = null
let plyrPlayer4: any = null

onMounted(() => {
  // Initialize Plyr players
  if (typeof window !== 'undefined' && (window as any).Plyr) {
    // First video player - Connected Component
    const videoElement1 = document.getElementById('connected-component-video')
    if (videoElement1) {
      plyrPlayer1 = new (window as any).Plyr(videoElement1, {
        controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen'],
        width: '100%',
        height: 'auto',
        ratio: '16:9',
        hideControls: true,
        clickToPlay: true,
        keyboard: { focused: true, global: false },
        tooltips: { controls: true, seek: true },
        captions: { active: false, language: 'auto', update: false },
      })
    }

    // Second video player - Flag Command Dispatch
    const videoElement2 = document.getElementById('flag-command-video')
    if (videoElement2) {
      plyrPlayer2 = new (window as any).Plyr(videoElement2, {
        controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen'],
        width: '100%',
        height: 'auto',
        ratio: '16:9',
        hideControls: true,
        clickToPlay: true,
        keyboard: { focused: true, global: false },
        tooltips: { controls: true, seek: true },
        captions: { active: false, language: 'auto', update: false },
      })
    }

    // Third video player - ORCA Algorithm
    const videoElement3 = document.getElementById('orca-video')
    if (videoElement3) {
      plyrPlayer3 = new (window as any).Plyr(videoElement3, {
        controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen'],
        width: '100%',
        height: 'auto',
        ratio: '16:9',
        hideControls: true,
        clickToPlay: true,
        keyboard: { focused: true, global: false },
        tooltips: { controls: true, seek: true },
        captions: { active: false, language: 'auto', update: false },
      })
    }

    // Fourth video player - Voronoi Tile Management
    const videoElement4 = document.getElementById('voronoi-tile-video')
    if (videoElement4) {
      plyrPlayer4 = new (window as any).Plyr(videoElement4, {
        controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen'],
        width: '100%',
        height: 'auto',
        ratio: '16:9',
        hideControls: true,
        clickToPlay: true,
        keyboard: { focused: true, global: false },
        tooltips: { controls: true, seek: true },
        captions: { active: false, language: 'auto', update: false },
      })
    }
  }
})
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* CSS Variables */
:root {
  --primary-color: #1e40af;
  --secondary-color: #f59e0b;
  --background-color: #f8fafc;
  --text-color: #1e293b;
  --text-light: #64748b;
  --border-color: #e2e8f0;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

#app {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo h2 {
  color: var(--primary-color);
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: var(--text-color);
  margin: 3px 0;
  transition: var(--transition);
}

/* Hero Section */
.hero {
  padding: 120px 0 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
  color: white;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.7;
}

.hero-content {
  max-width: 800px;
  text-align: center;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  display: inline-block;
}

.btn-primary {
  background: var(--secondary-color);
  color: white;
}

.btn-primary:hover {
  background: #d97706;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: var(--primary-color);
}

/* 移除了profile-placeholder样式 */

/* Sections */
.section {
  padding: 80px 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-color);
}

/* About Section */
.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: var(--text-light);
}

/* About Me Profile Image */
.profile-image-container {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
}

.profile-image-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.profile-image {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 3/4;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 300px;
  background: var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 1.1rem;
}

/* Education Section */
.education-grid {
  display: grid;
  gap: 2rem;
}

.education-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.education-header h3 {
  color: var(--primary-color);
  font-size: 1.3rem;
  font-weight: 600;
}

.education-period {
  color: var(--text-light);
  font-size: 0.9rem;
}

.education-degree {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.education-major {
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.education-gpa {
  font-weight: 500;
  margin-bottom: 1rem;
}

/* Projects Section */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.project-item {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.project-item:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-description {
  margin-bottom: 2rem;
}

.project-description p {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Project Intro with Screenshots */
.project-intro {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.project-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-text p {
  color: var(--text-light);
  line-height: 1.7;
  font-size: 1.05rem;
  margin: 0;
}

.project-screenshots {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.screenshot-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.screenshot-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.screenshot-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.screenshot-image {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */
  overflow: hidden;
  position: relative;
}

.screenshot-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  background: linear-gradient(135deg, var(--border-color) 0%, #e2e8f0 100%);
}

.screenshot-image img:not([src]),
.screenshot-image img[src=''] {
  display: none;
}

.screenshot-item:hover .screenshot-image img {
  transform: scale(1.05);
}

.screenshot-caption {
  padding: 1rem;
  background: var(--background-color);
}

.caption-title {
  display: block;
  font-weight: 600;
  color: var(--text-color);
  font-size: 1rem;
  margin-bottom: 0;
  text-align: center;
}

.project-description a {
  color: var(--primary-color);
  text-decoration: none;
}

.project-description a:hover {
  text-decoration: underline;
}

.project-module {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--background-color);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.module-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.module-content {
  display: grid;
  grid-template-columns: 1fr 9fr;
  gap: 2rem;
  align-items: start;
}

.module-text p {
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 0;
  font-size: 1.05rem;
}

.module-image {
  flex-shrink: 0;
}

.module-image .image-placeholder {
  width: 100%;
  height: 200px;
  background: var(--border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Fine Vision Training Grid Layout */
.module-images {
  flex-shrink: 0;
}

/* Dynamic Battle Frontline Grid Layout */
.dynamic-battle-module .module-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
}

.image-item {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
}

.image-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 16/9;
  object-fit: cover;
}

/* Others Project Gallery */
.others-gallery {
  margin-top: 2rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.gallery-item {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
}

.fine-vision-grid {
  display: grid;
  grid-template-areas:
    'main main'
    'left right';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
  width: 100%;
}

.fine-vision-main {
  grid-area: main;
}

.fine-vision-secondary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  grid-area: left / left / right / right;
}

.fine-vision-main .screenshot-item {
  width: 100%;
}

.fine-vision-secondary .screenshot-item {
  width: 100%;
}

/* Interactive Fine Vision Layout */
.fine-vision-interactive {
  width: 100%;
}

/* Custom aspect ratios for different image types */
.main-image {
  height: 0;
  padding-bottom: 75%; /* 4:3 aspect ratio (3/4 = 0.75) */
}

.glasses-image {
  height: 0;
  padding-bottom: 133.33%; /* 3:4 aspect ratio (4/3 = 1.333) */
}

/* Glasses Overlay */
.glasses-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 1rem;
  pointer-events: none;
}

.glasses-indicator {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

/* Glasses Buttons */
.glasses-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.glasses-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

/* Button background colors - light and low contrast */
.normal-btn {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.blue-btn {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.red-btn {
  background: #fef2f2;
  border-color: #fecaca;
}

.glasses-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.normal-btn:hover {
  border-color: #cbd5e1;
  background: #f1f5f9;
}

.blue-btn:hover {
  border-color: #93c5fd;
  background: #dbeafe;
}

.red-btn:hover {
  border-color: #fca5a5;
  background: #fee2e2;
}

.glasses-btn.active {
  color: var(--primary-color);
  font-weight: 600;
  border-color: transparent;
}

.normal-btn.active {
  background: #f1f5f9;
  border-color: transparent;
}

.blue-btn.active {
  background: #dbeafe;
  border-color: transparent;
}

.red-btn.active {
  background: #fee2e2;
  border-color: transparent;
}

.btn-text {
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
}

/* Project Mo Carousel */
.project-mo-carousel {
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 1.5rem;
  width: 100%;
  align-items: start;
}

.main-image-container {
  width: 100%;
}

.thumbnail-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: flex-start;
  height: auto;
  max-width: 160px;
}

.thumbnail-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
  background: white;
}

.thumbnail-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.thumbnail-item:active {
  transform: translateY(0) scale(0.95);
  transition: transform 0.1s ease;
}

.thumbnail-item.active {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color);
}

.thumbnail-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
  background: white;
  aspect-ratio: 1; /* 1:1 aspect ratio */
  width: 100%;
  max-width: 158px;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Project Mo 16:9 aspect ratio */
.project-mo-main-image {
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */
}

.project-mo-main-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: fadeInScale 0.5s ease-out;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Optimize module layout for better balance */
.module-content {
  display: grid;
  grid-template-columns: 0.8fr 1.4fr;
  gap: 2rem;
  align-items: start;
}

/* Responsive design for projects */
@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .module-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .module-image .image-placeholder {
    height: 150px;
  }

  .glasses-buttons {
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .glasses-btn {
    min-width: 70px;
    padding: 0.6rem 0.8rem;
  }

  .btn-text {
    font-size: 0.8rem;
  }

  .project-mo-carousel {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .thumbnail-container {
    flex-direction: row;
    gap: 0.5rem;
    height: auto;
    max-width: none;
  }

  .thumbnail-item {
    aspect-ratio: 1;
    min-width: 50px;
    max-width: 60px;
  }

  /* Video Player Styles - Plyr */
  .module-video {
    width: 100% !important;
    max-width: none !important;
    min-width: auto !important;
    flex-shrink: 0 !important;
  }

  .plyr-container {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16/9 !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
    background: #000 !important;
  }

  /* Plyr 自定义样式 */
  .plyr {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16/9 !important;
    border-radius: 16px !important;
  }

  .plyr__video-wrapper {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16/9 !important;
    border-radius: 16px !important;
  }

  .plyr__video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 16px !important;
  }

  /* Plyr 播放按钮居中 */
  .plyr__control--overlaid {
    width: 80px !important;
    height: 80px !important;
    border-radius: 50% !important;
    background: rgba(0, 0, 0, 0.7) !important;
    border: 3px solid white !important;
    font-size: 2rem !important;
    transition: all 0.3s ease !important;
  }

  .plyr__control--overlaid:hover {
    background: rgba(0, 0, 0, 0.9) !important;
    transform: scale(1.1) !important;
  }

  .plyr__control--overlaid svg {
    width: 2rem !important;
    height: 2rem !important;
    fill: white !important;
  }

  .project-intro {
    gap: 1.5rem;
  }

  .screenshot-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .screenshot-image {
    padding-bottom: 56.25%; /* 保持16:9比例 */
  }
}

/* Awards Section */
.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.award-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.award-icon {
  font-size: 2rem;
  flex-shrink: 0;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.award-icon:hover {
  animation: medalWiggle 0.6s ease-in-out;
}

@keyframes medalWiggle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-8deg);
  }
  75% {
    transform: rotate(8deg);
  }
}

.award-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.award-organization {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.award-date {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.award-description {
  color: var(--text-light);
  line-height: 1.6;
}

/* Work Experience Section */
.experience-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.experience-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
  position: relative;
}

.experience-item::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 2rem;
  width: 12px;
  height: 12px;
  background: var(--primary-color);
  border-radius: 50%;
}

.experience-header {
  margin-bottom: 1.5rem;
}

.job-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.company-name {
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: block;
}

.job-period {
  color: var(--text-light);
  font-size: 0.9rem;
}

.job-description ul {
  list-style: none;
  padding-left: 0;
}

.job-description li {
  padding: 0.5rem 0;
  color: var(--text-light);
  position: relative;
  padding-left: 1.5rem;
}

.job-description li::before {
  content: '•';
  color: var(--primary-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
}

.skill-category-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-align: center;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
}

.skill-tag {
  background: var(--background-color);
  color: var(--text-color);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.skill-tag:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

/* Interests Section */
.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.interest-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: var(--transition);
}

.interest-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.interest-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.interest-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.interest-description {
  color: var(--text-light);
  line-height: 1.6;
}

/* Footer */
.footer {
  background: var(--text-color);
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: var(--secondary-color);
}

.footer-section a {
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: var(--transition);
}

.footer-section a:hover {
  color: var(--secondary-color);
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
  color: #9ca3af;
}

/* Language Switch */
.language-switch {
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
}

.lang-btn {
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: var(--transition);
}

.lang-btn.active {
  color: var(--primary-color);
  font-weight: 600;
}

.lang-btn:hover {
  color: var(--primary-color);
}

.lang-divider {
  color: var(--text-light);
  margin: 0 0.25rem;
}

/* Mobile Menu Styles */
.mobile-menu {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.mobile-menu.open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-menu-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-menu.open .mobile-menu-backdrop {
  opacity: 1;
}

.mobile-menu-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 320px;
  height: 100%;
  background: white;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  z-index: 2000;
}

.mobile-menu.open .mobile-menu-container {
  transform: translateX(0);
  animation: fadeInMenu 0.3s ease forwards;
}

@keyframes fadeInMenu {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.mobile-language-switch {
  display: flex;
  align-items: center;
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-nav-link {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-color);
  text-decoration: none;
  transition: var(--transition);
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
}

.mobile-nav-link:hover {
  color: var(--primary-color);
  transform: translateX(5px);
}

/* Hamburger Menu Animation */
.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 2001;
  position: relative;
}

.nav-toggle span {
  display: block;
  width: 100%;
  height: 3px;
  background: var(--text-color);
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.nav-toggle.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
  background: var(--primary-color);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.nav-toggle.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
  background: var(--primary-color);
}

/* Add a ripple effect when clicked */
.nav-toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(var(--primary-color-rgb), 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s ease,
    height 0.3s ease;
}

.nav-toggle.active::after {
  width: 40px;
  height: 40px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-image {
    display: flex;
    justify-content: center;
    order: -1;
  }

  .hero-buttons {
    justify-content: center;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-mo-carousel {
    grid-template-columns: 1fr;
  }

  .thumbnail-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .thumbnail-item {
    width: 80px;
    height: 60px;
  }

  .education-grid {
    grid-template-columns: 1fr;
  }

  .awards-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .interests-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .nav-links,
  .language-switch {
    display: none;
  }

  .nav-toggle {
    display: flex;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .project-item {
    padding: 1.5rem;
  }

  .project-intro {
    flex-direction: column;
    gap: 1.5rem;
  }

  .project-screenshots {
    width: 100%;
  }

  .project-text {
    width: 100%;
  }

  .module-content {
    flex-direction: column;
  }

  .module-text,
  .module-image,
  .module-images,
  .module-video {
    width: 100%;
  }

  .screenshot-grid {
    grid-template-columns: 1fr;
  }

  .image-grid {
    grid-template-columns: 1fr;
  }

  .interests-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

@media (min-width: 769px) {
  .mobile-menu {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .hero {
    padding: 80px 0 40px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }

  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .award-card,
  .experience-item,
  .education-card {
    padding: 1.25rem;
  }

  .award-title,
  .job-title {
    font-size: 1.1rem;
  }

  .skill-category-title,
  .interest-title {
    font-size: 1.1rem;
  }

  .skill-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .section {
    padding: 60px 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .education-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .education-period {
    margin-top: 0.5rem;
  }

  .skills-grid,
  .interests-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

/* Voronoi Tile Management System Layout */
.voronoi-tile-module .module-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.voronoi-tile-module .module-video {
  width: 66%;
  min-width: 320px;
  max-width: 900px;
  align-self: flex-start;
}

@media (max-width: 900px) {
  .voronoi-tile-module .module-video {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    align-self: stretch;
  }
}
</style>
