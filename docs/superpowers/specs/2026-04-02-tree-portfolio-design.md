# Tree Portfolio Design Spec

## Overview
Redesign the jeemin-os portfolio from an OS/desktop metaphor to a **literal tree** — a minimal line art tree where projects are nodes on branches and navigation lives in the roots. Japanese ink drawing meets Apple keynote minimalism.

## Page Structure

### Viewport 1: Hero Tree
- **Name** centered at top: "Jeemin Han" (Space Grotesk, clean)
- **Tagline** below: "I look at how things currently work, see what they could be, and redesign them."
- **Tree** fills the viewport center:
  - Single trunk line from bottom-center upward (SVG path, organic curve)
  - 4 main branches alternate left/right, each representing a cluster:
    - Upper-left: **AI & Language** (shaberu, campus-reach, translate-practice, greek-word-explorer, n2-visual-vocab)
    - Upper-right: **Ministry & Community** (halfway, ism-journey-map, common-lore, global-atlas)
    - Lower-left: **ML & Data** (mu-sentiment, workout-buddy, merror)
    - Lower-right: **Creative & Play** (jazz, interview-koro)
  - Project **nodes** are outlined circles sized by tier (Tier 1 largest, Tier 3 smallest)
  - Tier 1 nodes have project name inside; smaller nodes show name on hover
  - Sub-branches connect satellite projects to the main cluster node
- **Sakura petals** falling (CSS animated translucent pink ellipses)
- **"scroll to explore"** hint with thin arrow at bottom
- Background: #FAFAFA off-white

### Viewport 2: Roots
- As user scrolls past the trunk base, **root strands** emerge (scroll-triggered SVG draw animation)
- 4 roots spread outward, each labeled: **About**, **Resume**, **Creative**, **Contact**
- Clicking a root smooth-scrolls to its content section below

### Viewport 3+: Root Content Sections
- **About**: Identity, giftedness pattern, languages, current role, vision
- **Resume**: Clean timeline — IFI → Cru Japan → Raytheon → KCF → Texas A&M
- **Creative**: Grid of visual work — film photography, photobook, videos, UI/UX
- **Contact**: Email, LinkedIn, GitHub, simple and direct

## Interactions

| Interaction | Behavior |
|---|---|
| Node hover | Circle scales up subtly, project name fades in (for smaller nodes), branch thickens |
| Node click | Inline panel expands next to the node on the tree canvas. Other nodes dim. Panel shows: name, subtitle, description, story, tech stack pills, GitHub/live links |
| Panel close | Click × or click another node. Panel collapses, all nodes restore opacity |
| Scroll reveal | Branches draw/grow as they enter viewport (SVG path animation). Roots emerge below the trunk |
| Root click | Smooth-scroll to corresponding content section below |
| Sakura petals | Continuously falling, subtle, translucent. CSS keyframe animations |

## Visual Language

| Element | Value |
|---|---|
| Background | #FAFAFA (light) / #0A0A0A (dark mode, future) |
| Tree lines | Thin organic SVG curves, #1A1A1A at varying opacities. Trunk thicker, sub-branches thinner |
| Project nodes | Outlined circles, not filled. Tier 1: ~48px, Tier 2: ~36px, Tier 3: ~24px |
| Seasonal accent | Spring: #D4A0A0 (muted pink). Summer: #8BA888. Autumn: #C4956A. Winter: #A0B0C0 |
| Falling particles | Spring: sakura petals. Summer: none or subtle light rays. Autumn: falling leaves. Winter: snow |
| Headings font | Space Grotesk |
| Body font | DM Sans |
| Labels/metadata | JetBrains Mono (keep existing) |

## Seasons (Auto-Calendar)

Season determined by client-side `Date`:
- **Spring** (Mar–May): Sakura petals, pink accent, delicate feel
- **Summer** (Jun–Aug): Full canopy suggestion, green accent, warm
- **Autumn** (Sep–Nov): Falling leaf particles, amber accent
- **Winter** (Dec–Feb): Bare branches feel, snow particles, cool gray accent

Season sets CSS custom properties: `--accent`, `--particle-color`, `--particle-type`.

## Components to Build

| Component | Purpose |
|---|---|
| `Tree` | Main SVG tree — trunk, branches, nodes. Responsive via viewBox |
| `TreeNode` | Individual project node — circle, label, hover/click behavior |
| `InlinePanel` | Detail panel that expands next to clicked node |
| `Particles` | Falling petals/leaves/snow — CSS animated |
| `Roots` | SVG root strands with labels, scroll-triggered draw |
| `SeasonProvider` | Detects season, sets CSS variables and particle type |
| `AboutSection` | Root content: identity, bio |
| `ResumeSection` | Root content: timeline |
| `CreativeSection` | Root content: visual grid |
| `ContactSection` | Root content: links |

## Components to Remove

- `BootSequence` — no longer fits
- `Dock` / `DockItem` — replaced by roots navigation
- `Terminal` — doesn't fit organic metaphor
- `OsChrome` — replaced by name at tree crown
- `IconGrid` / `ProjectIcon` / `ClusterWatermark` — replaced by tree nodes
- `ContextMenu` / `EasterEggs` / `HiddenFile` / `KonamiOverlay` — revisit later
- `WindowFrame` — replaced by inline expansion panels

## Components to Keep/Adapt

- `ThemeProvider` → becomes `SeasonProvider`
- `SeasonSetter` → adapt for auto-calendar logic
- `projects.ts` data — keep as-is, add tree coordinates later
- Page content components (about, resume, creative, contact) — keep content, restyle
- `@window` parallel routes — keep for direct URL access / SEO fallbacks

## Technical Approach

- **Tree rendering**: SVG with React components. `viewBox` for responsiveness.
- **Scroll animations**: Framer Motion `useScroll` + `useTransform` for branch draw-in, root reveal, content fade-in.
- **Inline panels**: React state for selected node. Framer Motion `AnimatePresence`. Positioned via SVG node coordinates translated to screen position.
- **Particles**: CSS `@keyframes` on absolutely-positioned elements. ~15-20 particles recycled.
- **Season detection**: `new Date().getMonth()` → season → CSS custom properties.
- **Stack**: Next.js 16, React 19, Tailwind v4, Framer Motion (all existing).
