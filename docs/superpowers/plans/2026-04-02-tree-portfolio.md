# Tree Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the OS/desktop portfolio with a minimal line-art tree where projects are interactive nodes on branches and navigation lives in the roots.

**Architecture:** Single-page scroll experience. Hero SVG tree fills the viewport with interactive project nodes. Scrolling reveals root strands that serve as navigation to content sections below. Season auto-detected from calendar, sets accent color and particle type.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Framer Motion 12, SVG

---

### Task 1: Update Season System & CSS Tokens

**Files:**
- Modify: `components/theme/season-setter.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update SeasonSetter to cover all 4 seasons and set accent colors**

Replace `components/theme/season-setter.tsx` with:

```tsx
'use client';
import { useEffect } from 'react';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const SEASON_CONFIG: Record<Season, { accent: string; accentHover: string; accentSubtle: string }> = {
  spring: { accent: '#D4A0A0', accentHover: '#C48E8E', accentSubtle: 'rgba(212, 160, 160, 0.15)' },
  summer: { accent: '#8BA888', accentHover: '#7A9A77', accentSubtle: 'rgba(139, 168, 136, 0.15)' },
  autumn: { accent: '#C4956A', accentHover: '#B5845A', accentSubtle: 'rgba(196, 149, 106, 0.15)' },
  winter: { accent: '#A0B0C0', accentHover: '#8FA0B2', accentSubtle: 'rgba(160, 176, 192, 0.15)' },
};

function getSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

export function SeasonSetter() {
  useEffect(() => {
    const season = getSeason();
    const config = SEASON_CONFIG[season];
    const root = document.documentElement;
    root.setAttribute('data-season', season);
    root.style.setProperty('--accent', config.accent);
    root.style.setProperty('--accent-hover', config.accentHover);
    root.style.setProperty('--accent-subtle', config.accentSubtle);
  }, []);
  return null;
}

export { getSeason, SEASON_CONFIG };
export type { Season };
```

- [ ] **Step 2: Update globals.css — replace OS tokens with tree tokens**

Replace the full `globals.css` with:

```css
@import "tailwindcss";

/* ===== Design Tokens ===== */

:root {
  --bg-workspace: #FAFAFA;
  --bg-surface: #FFFFFF;
  --bg-surface-hover: #F5F4F1;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-tertiary: #9E9E9E;
  --accent: #D4A0A0;
  --accent-hover: #C48E8E;
  --accent-subtle: rgba(212, 160, 160, 0.15);
  --border-default: #E5E4E1;
  --border-hover: #D4D3CF;
  --tree-line: #1A1A1A;
  --tree-line-opacity: 0.4;
  --panel-bg: rgba(255, 255, 255, 0.95);
  --panel-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
}

/* ===== Tailwind v4 Theme Extension ===== */

@theme inline {
  --color-bg-workspace: var(--bg-workspace);
  --color-bg-surface: var(--bg-surface);
  --color-bg-surface-hover: var(--bg-surface-hover);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-tertiary: var(--text-tertiary);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-subtle: var(--accent-subtle);
  --color-border-default: var(--border-default);
  --color-border-hover: var(--border-hover);
  --font-body: var(--font-body);
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}

/* ===== Base Styles ===== */

body {
  background-color: var(--bg-workspace);
  color: var(--text-primary);
  font-family: var(--font-body);
}

/* Focus visible */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ===== Sakura / Particle Animations ===== */

@keyframes petal-fall {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(110vh) translateX(80px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes petal-sway {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(30px); }
}
```

- [ ] **Step 3: Verify the app still builds**

Run: `cd /Users/jeeminhan/Code/personal-site-research/jeemin-os && npm run build`
Expected: Build may fail due to removed CSS variables referenced by old components — that's OK, we'll remove those components in later tasks.

- [ ] **Step 4: Commit**

```bash
git add components/theme/season-setter.tsx app/globals.css
git commit -m "refactor: update season system for all 4 seasons, simplify CSS tokens for tree design"
```

---

### Task 2: Update Project Data with Tree Coordinates

**Files:**
- Modify: `data/projects.ts`

- [ ] **Step 1: Add tree coordinate data to projects**

Replace the `position` field values and add `branchSide` to the type. Replace `data/projects.ts` with:

```ts
export type Cluster =
  | 'ai-language'
  | 'ministry-community'
  | 'ml-data'
  | 'creative-play';

export type BranchSide = 'left' | 'right';

export type Project = {
  id: string;
  name: string;
  displayName: string;
  cluster: Cluster;
  tier: 1 | 2 | 3;
  icon: string;
  subtitle?: string;
  techStack: string[];
  year: number;
  commits?: number;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  story: string;
};

export const clusters: Record<Cluster, { label: string; labelJa?: string; side: BranchSide; trunkY: number }> = {
  'ai-language': { label: 'AI & Language', labelJa: 'AI・言語', side: 'left', trunkY: 0.22 },
  'ministry-community': { label: 'Ministry & Community', labelJa: '宣教・コミュニティ', side: 'right', trunkY: 0.32 },
  'ml-data': { label: 'ML & Data', labelJa: '機械学習・データ', side: 'left', trunkY: 0.48 },
  'creative-play': { label: 'Creative & Play', labelJa: '創作・遊び', side: 'right', trunkY: 0.58 },
};

export const projects: Project[] = [
  // ── AI & Language (upper-left) ──────────────────────────────────────
  {
    id: 'shaberu',
    name: 'shaberu',
    displayName: 'shaberu',
    cluster: 'ai-language',
    tier: 1,
    icon: '/icons/shaberu.svg',
    subtitle: 'しゃべる',
    techStack: ['Next.js', 'Gemini', 'PWA'],
    year: 2026,
    commits: 47,
    githubUrl: 'https://github.com/jeeminhan/shaberu',
    description: 'Japanese speaking practice PWA — Gemini Live API, tool use, live audio, AI corrections.',
    story: 'I was learning Japanese on my own and saw a gap — no tool that let you practice speaking with real-time AI feedback tuned to your actual vocabulary level. So I built one.',
  },
  {
    id: 'campus-reach',
    name: 'campus-reach',
    displayName: 'Campus Reach',
    cluster: 'ai-language',
    tier: 2,
    icon: '/icons/campus-reach.svg',
    techStack: ['Next.js', 'Joshua Project API'],
    year: 2026,
    githubUrl: 'https://github.com/jeeminhan/Campus-Reach',
    description: 'Explore international student origins × unreached people groups.',
    story: 'International students come from everywhere — but some come from places with almost no access to the gospel. I built a tool to make that visible.',
  },
  {
    id: 'translate-practice',
    name: 'translate-practice',
    displayName: 'Translate Practice',
    cluster: 'ai-language',
    tier: 3,
    icon: '/icons/translate-practice.svg',
    techStack: ['Next.js'],
    year: 2026,
    description: 'Translation practice app.',
    story: '',
  },
  {
    id: 'greek-word-explorer',
    name: 'greek-word-explorer',
    displayName: 'Greek Explorer',
    cluster: 'ai-language',
    tier: 3,
    icon: '/icons/greek-word-explorer.svg',
    techStack: ['React', 'Supabase'],
    year: 2025,
    description: 'Greek vocabulary exploration.',
    story: '',
  },
  {
    id: 'n2-visual-vocab',
    name: 'n2-visual-vocab',
    displayName: 'N2 Vocab',
    cluster: 'ai-language',
    tier: 3,
    icon: '/icons/n2-visual-vocab.svg',
    techStack: ['SRS Algorithm', 'Supabase'],
    year: 2025,
    description: 'Spaced repetition for Japanese N2.',
    story: '',
  },

  // ── Ministry & Community (upper-right) ──────────────────────────────
  {
    id: 'halfway',
    name: 'halfway',
    displayName: 'halfway',
    cluster: 'ministry-community',
    tier: 1,
    icon: '/icons/halfway.svg',
    techStack: ['Next.js'],
    year: 2026,
    commits: 83,
    description: 'Philosophical reflection app — encounter capture, keepsakes, prompts.',
    story: 'People in ministry have meaningful encounters every day that just disappear. I wanted to give them a way to capture and reflect on those moments.',
  },
  {
    id: 'ism-journey-map',
    name: 'ism-journey-map',
    displayName: 'ISM Journey Map',
    cluster: 'ministry-community',
    tier: 2,
    icon: '/icons/ism-journey-map.svg',
    techStack: ['Next.js'],
    year: 2025,
    description: 'Journey mapping for International Student Ministry.',
    story: '',
  },
  {
    id: 'common-lore',
    name: 'common-lore',
    displayName: 'Common Lore',
    cluster: 'ministry-community',
    tier: 3,
    icon: '/icons/common-lore.svg',
    techStack: [],
    year: 2025,
    description: 'Card game viewer for ISM — suit-based organization.',
    story: '',
  },
  {
    id: 'global-atlas',
    name: 'global-atlas',
    displayName: 'Global Atlas',
    cluster: 'ministry-community',
    tier: 3,
    icon: '/icons/global-atlas.svg',
    techStack: [],
    year: 2025,
    description: 'Dice game with map navigation — endless scrolling maps.',
    story: '',
  },

  // ── ML & Data (lower-left) ─────────────────────────────────────────
  {
    id: 'workout-buddy',
    name: 'workout-buddy',
    displayName: 'Workout Buddy',
    cluster: 'ml-data',
    tier: 2,
    icon: '/icons/workout-buddy.svg',
    techStack: ['Python', 'MediaPipe', 'OpenCV', 'Raspberry Pi'],
    year: 2023,
    commits: 81,
    description: 'ML workout form critique — MediaPipe/OpenCV pose detection on Raspberry Pi.',
    story: '',
  },
  {
    id: 'mu-sentiment',
    name: 'mu-sentiment',
    displayName: 'MuSentiment',
    cluster: 'ml-data',
    tier: 1,
    icon: '/icons/mu-sentiment.svg',
    techStack: ['NLP', 'NLTK', 'scikit-learn'],
    year: 2023,
    description: 'Music sentiment × CDC depression data — Datathon 2nd Place.',
    story: 'At a datathon, I saw a puzzle: could you measure whether music sentiment tracks with national mental health data? 2nd place said yes.',
  },
  {
    id: 'merror',
    name: 'merror',
    displayName: 'MError',
    cluster: 'ml-data',
    tier: 3,
    icon: '/icons/merror.svg',
    techStack: ['Django', 'OpenCV'],
    year: 2022,
    description: 'Django app with OpenCV face detection + Weather/News/Calendar APIs.',
    story: '',
  },

  // ── Creative & Play (lower-right) ──────────────────────────────────
  {
    id: 'jazz',
    name: 'jazz',
    displayName: 'Jazz Quest',
    cluster: 'creative-play',
    tier: 2,
    icon: '/icons/jazz.svg',
    techStack: [],
    year: 2025,
    description: 'Jazz Quest — guitar trainer and chord progression analyzer.',
    story: '',
  },
  {
    id: 'interview-koro',
    name: 'interview-koro',
    displayName: 'Interview Koro',
    cluster: 'creative-play',
    tier: 3,
    icon: '/icons/interview-koro.svg',
    techStack: [],
    year: 2025,
    description: 'WaniKani-style interview prep with leveling system.',
    story: '',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add data/projects.ts
git commit -m "refactor: update project data — add branch sides/positions to clusters, clean up displayNames"
```

---

### Task 3: Build the SVG Tree Component

**Files:**
- Create: `components/tree/tree.tsx`
- Create: `components/tree/tree-branch.tsx`
- Create: `components/tree/tree-node.tsx`
- Create: `lib/tree-layout.ts`

- [ ] **Step 1: Create tree layout utility**

Create `lib/tree-layout.ts` — computes SVG coordinates for branches and nodes from project data:

```ts
import { projects, clusters, type Project, type Cluster } from '@/data/projects';

export type NodePosition = {
  project: Project;
  cx: number;
  cy: number;
  radius: number;
};

export type BranchLayout = {
  cluster: Cluster;
  label: string;
  labelJa?: string;
  side: 'left' | 'right';
  /** Where the branch meets the trunk (0-1 of viewBox height) */
  trunkY: number;
  /** SVG path d for the main branch curve */
  pathD: string;
  /** Label position */
  labelX: number;
  labelY: number;
  nodes: NodePosition[];
};

const VIEWBOX_W = 800;
const VIEWBOX_H = 600;
const TRUNK_X = VIEWBOX_W / 2;
const TRUNK_TOP = 80;
const TRUNK_BOTTOM = 520;

const TIER_RADIUS: Record<1 | 2 | 3, number> = { 1: 32, 2: 24, 3: 16 };

/**
 * Compute positions for all branches and nodes.
 * Branch extends left or right from the trunk. 
 * Nodes are spaced along the branch with the tier-1 node furthest out.
 */
export function computeTreeLayout(): { branches: BranchLayout[]; trunkPath: string } {
  const trunkPath = `M ${TRUNK_X} ${TRUNK_BOTTOM} C ${TRUNK_X} ${TRUNK_BOTTOM - 60} ${TRUNK_X - 2} ${TRUNK_TOP + 60} ${TRUNK_X} ${TRUNK_TOP}`;

  const branches: BranchLayout[] = [];

  for (const [clusterKey, config] of Object.entries(clusters)) {
    const cluster = clusterKey as Cluster;
    const clusterProjects = projects.filter(p => p.cluster === cluster);
    // Sort: tier 1 first (goes furthest out), then tier 2, then tier 3
    const sorted = [...clusterProjects].sort((a, b) => a.tier - b.tier);

    const branchY = TRUNK_TOP + config.trunkY * (TRUNK_BOTTOM - TRUNK_TOP);
    const direction = config.side === 'left' ? -1 : 1;
    const branchEndX = TRUNK_X + direction * 280;
    const branchMidX = TRUNK_X + direction * 140;

    // Organic curve for the branch
    const cp1x = TRUNK_X + direction * 60;
    const cp1y = branchY - 15;
    const cp2x = branchMidX;
    const cp2y = branchY - 10;
    const pathD = `M ${TRUNK_X} ${branchY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${branchEndX} ${branchY + 5}`;

    // Place nodes along the branch
    const nodes: NodePosition[] = sorted.map((project, i) => {
      const t = 0.4 + (i * 0.5) / Math.max(sorted.length - 1, 1);
      // Point along the cubic bezier (approximation — linear interp is fine for layout)
      const cx = TRUNK_X + direction * (280 * t);
      // Stagger vertically so nodes don't overlap
      const yOffset = (i % 2 === 0 ? -1 : 1) * (15 + i * 8);
      const cy = branchY + yOffset;
      const radius = TIER_RADIUS[project.tier];

      return { project, cx, cy, radius };
    });

    const labelX = config.side === 'left' ? TRUNK_X - 290 : TRUNK_X + 210;
    const labelY = branchY - 20;

    branches.push({
      cluster,
      label: config.label,
      labelJa: config.labelJa,
      side: config.side,
      trunkY: config.trunkY,
      pathD,
      labelX,
      labelY,
      nodes,
    });
  }

  return { branches, trunkPath };
}

export { VIEWBOX_W, VIEWBOX_H, TRUNK_X, TRUNK_TOP, TRUNK_BOTTOM };
```

- [ ] **Step 2: Create TreeNode component**

Create `components/tree/tree-node.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import type { NodePosition } from '@/lib/tree-layout';

type TreeNodeProps = {
  node: NodePosition;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (id: string) => void;
};

export function TreeNode({ node, isSelected, isDimmed, onSelect }: TreeNodeProps) {
  const { project, cx, cy, radius } = node;
  const showLabel = project.tier <= 2;

  return (
    <motion.g
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.displayName}`}
      onClick={() => onSelect(project.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(project.id); }}
      style={{ cursor: 'pointer' }}
      animate={{
        opacity: isDimmed ? 0.2 : 1,
        scale: isSelected ? 1.1 : 1,
      }}
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.2 }}
    >
      {/* Node circle */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="var(--tree-line)"
        strokeWidth={isSelected ? 1.5 : 0.8}
        opacity={isSelected ? 0.8 : 0.5}
      />

      {/* Project name */}
      {showLabel && (
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={project.tier === 1 ? 11 : 9}
          fontFamily="var(--font-display)"
          fill="var(--text-primary)"
          opacity={0.8}
        >
          {project.displayName}
        </text>
      )}

      {/* Subtitle for tier 1 */}
      {project.tier === 1 && project.subtitle && (
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={7}
          fontFamily="var(--font-body)"
          fill="var(--text-tertiary)"
        >
          {project.subtitle}
        </text>
      )}
    </motion.g>
  );
}
```

- [ ] **Step 3: Create TreeBranch component**

Create `components/tree/tree-branch.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { TreeNode } from './tree-node';
import type { BranchLayout } from '@/lib/tree-layout';

type TreeBranchProps = {
  branch: BranchLayout;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function TreeBranch({ branch, selectedId, onSelect }: TreeBranchProps) {
  const isDimmedBranch = selectedId !== null && !branch.nodes.some(n => n.project.id === selectedId);

  return (
    <g>
      {/* Branch line */}
      <motion.path
        d={branch.pathD}
        fill="none"
        stroke="var(--tree-line)"
        strokeWidth={1.2}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: isDimmedBranch ? 0.1 : 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Cluster label */}
      <motion.text
        x={branch.labelX}
        y={branch.labelY}
        textAnchor={branch.side === 'left' ? 'start' : 'end'}
        fontSize={10}
        fontFamily="var(--font-mono)"
        fill="var(--text-tertiary)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: isDimmedBranch ? 0.1 : 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {branch.label}
      </motion.text>

      {/* Sub-branch lines connecting nodes to the main branch */}
      {branch.nodes.map((node) => (
        <motion.line
          key={`line-${node.project.id}`}
          x1={node.cx}
          y1={node.cy}
          x2={node.cx + (branch.side === 'left' ? 20 : -20)}
          y2={node.cy + (node.cy > branch.nodes[0].cy ? -10 : 10)}
          stroke="var(--tree-line)"
          strokeWidth={0.6}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: isDimmedBranch ? 0.05 : 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        />
      ))}

      {/* Project nodes */}
      {branch.nodes.map((node) => (
        <TreeNode
          key={node.project.id}
          node={node}
          isSelected={selectedId === node.project.id}
          isDimmed={selectedId !== null && selectedId !== node.project.id}
          onSelect={onSelect}
        />
      ))}
    </g>
  );
}
```

- [ ] **Step 4: Create main Tree component**

Create `components/tree/tree.tsx`:

```tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeBranch } from './tree-branch';
import { InlinePanel } from './inline-panel';
import { computeTreeLayout, VIEWBOX_W, VIEWBOX_H } from '@/lib/tree-layout';
import { projects } from '@/data/projects';

export function Tree() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { branches, trunkPath } = useMemo(() => computeTreeLayout(), []);

  const selectedProject = selectedId ? projects.find(p => p.id === selectedId) : null;
  const selectedNode = selectedId
    ? branches.flatMap(b => b.nodes).find(n => n.project.id === selectedId)
    : null;

  function handleSelect(id: string) {
    setSelectedId(prev => prev === id ? null : id);
  }

  return (
    <div className="relative w-full" style={{ maxWidth: 900, margin: '0 auto' }}>
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="w-full h-auto"
        aria-label="Project tree — click a node to view project details"
      >
        {/* Trunk */}
        <motion.path
          d={trunkPath}
          fill="none"
          stroke="var(--tree-line)"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          opacity={0.5}
        />

        {/* Branches */}
        {branches.map((branch) => (
          <TreeBranch
            key={branch.cluster}
            branch={branch}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        ))}
      </svg>

      {/* Inline detail panel — positioned over the SVG */}
      <AnimatePresence>
        {selectedProject && selectedNode && (
          <InlinePanel
            project={selectedProject}
            node={selectedNode}
            svgWidth={VIEWBOX_W}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add lib/tree-layout.ts components/tree/tree-node.tsx components/tree/tree-branch.tsx components/tree/tree.tsx
git commit -m "feat: add SVG tree component with interactive project nodes and branch animations"
```

---

### Task 4: Build the Inline Detail Panel

**Files:**
- Create: `components/tree/inline-panel.tsx`

- [ ] **Step 1: Create InlinePanel component**

Create `components/tree/inline-panel.tsx`:

```tsx
'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import type { NodePosition } from '@/lib/tree-layout';

type InlinePanelProps = {
  project: Project;
  node: NodePosition;
  svgWidth: number;
  onClose: () => void;
};

export function InlinePanel({ project, node, svgWidth, onClose }: InlinePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Position: panel appears to the side of the node
  const nodeXPercent = (node.cx / svgWidth) * 100;
  const panelSide = nodeXPercent > 50 ? 'left' : 'right';
  const panelStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${(node.cy / 600) * 100}%`,
    ...(panelSide === 'right'
      ? { left: `${nodeXPercent + 6}%` }
      : { right: `${100 - nodeXPercent + 6}%` }),
    maxWidth: 320,
    width: '40%',
    minWidth: 260,
    transform: 'translateY(-50%)',
  };

  return (
    <motion.div
      ref={panelRef}
      style={panelStyle}
      initial={{ opacity: 0, scale: 0.95, x: panelSide === 'right' ? -10 : 10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: panelSide === 'right' ? -10 : 10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-lg border p-5 z-10"
      role="dialog"
      aria-label={`Project details: ${project.displayName}`}
      aria-modal="false"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      tabIndex={-1}
      style-bg="var(--panel-bg)"
    >
      {/* Inline styles for bg/shadow since CSS vars */}
      <div
        className="absolute inset-0 rounded-lg -z-10"
        style={{
          background: 'var(--panel-bg)',
          boxShadow: 'var(--panel-shadow)',
          borderColor: 'var(--border-default)',
          border: '1px solid var(--border-default)',
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-sm hover:opacity-70 transition-opacity"
        style={{ color: 'var(--text-tertiary)' }}
        aria-label="Close panel"
      >
        ×
      </button>

      {/* Title */}
      <h3
        className="text-base font-semibold mb-0.5"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
      >
        {project.displayName}
      </h3>
      {project.subtitle && (
        <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>
          {project.subtitle}
        </div>
      )}

      {/* Description */}
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
        {project.description}
      </p>

      {/* Story */}
      {project.story && (
        <blockquote
          className="text-xs italic leading-relaxed mb-3 pl-3 border-l-2"
          style={{ color: 'var(--text-tertiary)', borderColor: 'var(--accent)' }}
        >
          {project.story}
        </blockquote>
      )}

      {/* Tech stack pills */}
      {project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.map(t => (
            <span
              key={t}
              className="inline-flex px-2 py-0.5 rounded-full text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                background: 'var(--accent-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Meta + Links */}
      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
        <span>{project.year}</span>
        {project.commits && <span>{project.commits} commits</span>}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            GitHub ↗
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            Live ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/tree/inline-panel.tsx
git commit -m "feat: add inline detail panel for project nodes"
```

---

### Task 5: Build the Particles Component

**Files:**
- Create: `components/tree/particles.tsx`

- [ ] **Step 1: Create Particles component**

Create `components/tree/particles.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import type { Season } from '@/components/theme/season-setter';

type Particle = {
  id: number;
  left: number;     // % from left
  delay: number;    // animation-delay in seconds
  duration: number;  // animation-duration in seconds
  size: number;     // px
  rotation: number;  // initial rotation
};

const PARTICLE_COUNT = 18;

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 8,
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));
}

const SEASON_STYLES: Record<Season, { color: string; borderRadius: string; opacity: number }> = {
  spring: { color: '#D4A0A0', borderRadius: '50% 0 50% 50%', opacity: 0.4 },
  summer: { color: '#8BA888', borderRadius: '50%', opacity: 0.15 },
  autumn: { color: '#C4956A', borderRadius: '2px', opacity: 0.5 },
  winter: { color: '#A0B0C0', borderRadius: '50%', opacity: 0.6 },
};

export function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [season, setSeason] = useState<Season>('spring');

  useEffect(() => {
    setParticles(generateParticles());
    const s = document.documentElement.getAttribute('data-season') as Season | null;
    if (s) setSeason(s);
  }, []);

  if (particles.length === 0) return null;

  const style = SEASON_STYLES[season];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-10px',
            width: p.size,
            height: p.size * 1.3,
            backgroundColor: style.color,
            borderRadius: style.borderRadius,
            opacity: style.opacity,
            transform: `rotate(${p.rotation}deg)`,
            animation: `petal-fall ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/tree/particles.tsx
git commit -m "feat: add seasonal falling particles (sakura, leaves, snow)"
```

---

### Task 6: Build the Roots Navigation

**Files:**
- Create: `components/tree/roots.tsx`

- [ ] **Step 1: Create Roots component**

Create `components/tree/roots.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

const ROOTS = [
  { id: 'about', label: 'About', x: 180, endX: 80, endY: 120 },
  { id: 'resume', label: 'Resume', x: 280, endX: 220, endY: 130 },
  { id: 'creative', label: 'Creative', x: 520, endX: 580, endY: 125 },
  { id: 'contact', label: 'Contact', x: 620, endX: 720, endY: 115 },
] as const;

export function Roots() {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="w-full" style={{ maxWidth: 900, margin: '0 auto' }}>
      <svg viewBox="0 0 800 160" className="w-full h-auto">
        {ROOTS.map((root, i) => {
          const startX = 400;
          const startY = 0;
          const midX = (startX + root.endX) / 2;
          const midY = root.endY * 0.6;
          const pathD = `M ${startX} ${startY} Q ${midX} ${midY} ${root.endX} ${root.endY}`;

          return (
            <g key={root.id}>
              {/* Root line */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="var(--tree-line)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.25 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
              />

              {/* Root label */}
              <motion.g
                role="link"
                tabIndex={0}
                aria-label={`Navigate to ${root.label}`}
                onClick={() => scrollTo(root.id)}
                onKeyDown={(e) => { if (e.key === 'Enter') scrollTo(root.id); }}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <text
                  x={root.endX}
                  y={root.endY + 18}
                  textAnchor="middle"
                  fontSize={12}
                  fontFamily="var(--font-display)"
                  fill="var(--text-primary)"
                  opacity={0.7}
                >
                  {root.label}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/tree/roots.tsx
git commit -m "feat: add roots navigation component with scroll-to-section"
```

---

### Task 7: Build Root Content Sections

**Files:**
- Create: `components/sections/section-wrapper.tsx`
- Create: `components/sections/about-section.tsx`
- Create: `components/sections/resume-section.tsx`
- Create: `components/sections/creative-section.tsx`
- Create: `components/sections/contact-section.tsx`

- [ ] **Step 1: Create SectionWrapper**

Create `components/sections/section-wrapper.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

export function SectionWrapper({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="max-w-2xl mx-auto px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 2: Create AboutSection**

Create `components/sections/about-section.tsx`:

```tsx
import { SectionWrapper } from './section-wrapper';

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-[0.625rem] font-medium uppercase tracking-[0.08em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        {label}
      </div>
      <div className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
        {value}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <h2
        className="text-lg font-semibold leading-snug mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
      >
        I look at how things currently work, see what they could be, and redesign them.
      </h2>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
        Builder who sees problems as puzzles, learns whatever is needed to solve them, and creates
        tools that help others think, express themselves, and find meaning.
      </p>
      <div
        className="grid grid-cols-2 gap-4 pt-4 border-t max-sm:grid-cols-1"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <Meta label="Languages" value="English, Korean (working), Japanese (JLPT N2)" />
        <Meta label="Currently" value="AI Prototyper at IFI Frontier Commons Innovation Lab" />
        <Meta label="Education" value="Texas A&M, BS Computer Engineering, Honors" />
        <Meta label="Clearance" value="DoD Secret" />
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Create ResumeSection**

Create `components/sections/resume-section.tsx`:

```tsx
import { SectionWrapper } from './section-wrapper';

const experience = [
  { date: 'Dec 2025–Present', role: 'AI Prototyper', company: 'IFI Frontier Commons', desc: 'AI-powered prototypes, workflow automation, technical onboarding' },
  { date: '2023–2025', role: 'Digital Strategies', company: 'Cru Japan', desc: 'Tokyo then Kyoto' },
  { date: 'Summer 2022', role: 'SWE Intern', company: 'Raytheon I&S', desc: 'DevSecOps, Jenkins pipelines' },
  { date: '2021', role: 'Software Engineer', company: 'KCF Technologies', desc: 'Python SDK testing, .NET backend' },
];

export function ResumeSection() {
  return (
    <SectionWrapper id="resume">
      <h2
        className="text-sm font-medium uppercase tracking-[0.08em] mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        Experience
      </h2>
      <div className="space-y-0">
        {experience.map((e) => (
          <div
            key={e.date}
            className="grid grid-cols-[120px_1fr] gap-4 py-3 border-b last:border-b-0 max-sm:grid-cols-1 max-sm:gap-1"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
              {e.date}
            </div>
            <div>
              <div className="text-sm" style={{ color: 'var(--text-primary)' }}>
                {e.role} <span style={{ color: 'var(--text-tertiary)' }}>at</span> {e.company}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                {e.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <div className="text-sm" style={{ color: 'var(--text-primary)' }}>Texas A&M University</div>
        <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          BS Computer Engineering, Honors, 3.625 GPA, May 2023
        </div>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 4: Create CreativeSection**

Create `components/sections/creative-section.tsx`:

```tsx
import { SectionWrapper } from './section-wrapper';

const items = [
  { title: 'Psalm 1', desc: 'Cinematic photography project' },
  { title: 'Thailand Photobook', desc: 'Travel photography' },
  { title: 'Urban Plunge', desc: 'Reflection video' },
  { title: 'Student Impact', desc: 'UI/UX redesign' },
  { title: 'Film Photography', desc: 'Utah, California on Kodak 500T' },
  { title: 'YouTube', desc: 'Storytelling channel' },
  { title: 'Full Portfolio', desc: 'jeeminjameshan.myportfolio.com', href: 'https://jeeminjameshan.myportfolio.com' },
];

export function CreativeSection() {
  return (
    <SectionWrapper id="creative">
      <h2
        className="text-sm font-medium uppercase tracking-[0.08em] mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        Creative
      </h2>
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {items.map((item) => {
          const inner = (
            <>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {item.title}
                {item.href && <span className="ml-1 text-xs" style={{ color: 'var(--accent)' }}>↗</span>}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.desc}</div>
            </>
          );
          const cls = "block p-4 rounded border transition-colors hover:bg-[var(--bg-surface-hover)]";
          const s = { background: 'var(--bg-surface)', borderColor: 'var(--border-default)' };

          return item.href ? (
            <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={cls} style={s}>{inner}</a>
          ) : (
            <div key={item.title} className={cls} style={s}>{inner}</div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 5: Create ContactSection**

Create `components/sections/contact-section.tsx`:

```tsx
import { SectionWrapper } from './section-wrapper';

const links = [
  { label: 'Email', href: 'mailto:Jeeminjameshan@gmail.com', display: 'Jeeminjameshan@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jeemin', display: 'linkedin.com/in/jeemin' },
  { label: 'GitHub', href: 'https://github.com/jeeminhan', display: 'github.com/jeeminhan' },
];

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <h2
        className="text-sm font-medium uppercase tracking-[0.08em] mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        Contact
      </h2>
      <div className="space-y-0">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="flex items-baseline gap-3 py-3 border-b last:border-b-0 rounded -mx-2 px-2 transition-colors hover:bg-[var(--bg-surface-hover)]"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <span
              className="text-[0.625rem] font-medium uppercase tracking-[0.08em] w-16 shrink-0"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
            >
              {link.label}
            </span>
            <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
              {link.display}
            </span>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/sections/
git commit -m "feat: add root content sections — about, resume, creative, contact"
```

---

### Task 8: Rewire the Homepage

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace page.tsx with tree layout**

Replace `app/page.tsx` with:

```tsx
import { Tree } from '@/components/tree/tree';
import { Roots } from '@/components/tree/roots';
import { Particles } from '@/components/tree/particles';
import { AboutSection } from '@/components/sections/about-section';
import { ResumeSection } from '@/components/sections/resume-section';
import { CreativeSection } from '@/components/sections/creative-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  return (
    <main>
      <Particles />

      {/* Hero: Tree */}
      <section className="min-h-svh flex flex-col items-center justify-center px-4 relative z-1">
        {/* Name & tagline */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Jeemin Han
          </h1>
          <p
            className="text-sm mt-2 max-w-md mx-auto"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-body)' }}
          >
            I look at how things currently work, see what they could be, and redesign them.
          </p>
        </div>

        {/* Tree */}
        <Tree />

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            scroll to explore
          </span>
          <span className="text-lg" style={{ color: 'var(--text-tertiary)' }}>↓</span>
        </div>
      </section>

      {/* Roots navigation */}
      <Roots />

      {/* Root content sections */}
      <div className="relative z-1">
        <AboutSection />
        <ResumeSection />
        <CreativeSection />
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="text-center py-12">
        <p className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          © {new Date().getFullYear()} Jeemin Han
        </p>
      </footer>
    </main>
  );
}
```

- [ ] **Step 2: Simplify layout.tsx — remove @window slot for now**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SeasonSetter } from "@/components/theme/season-setter";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Jeemin Han",
  description: "Builder, learner, puzzle-solver. Portfolio of Jeemin Han.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceMono.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SeasonSetter />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Run dev server and verify**

Run: `cd /Users/jeeminhan/Code/personal-site-research/jeemin-os && npm run dev`

Open http://localhost:3000. Verify:
- Name and tagline visible at top
- SVG tree renders with branches and project nodes
- Clicking a node opens the inline panel
- Scrolling reveals roots and content sections
- Sakura petals are falling
- "scroll to explore" hint at bottom of hero

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: rewire homepage to tree layout — hero tree, roots nav, content sections"
```

---

### Task 9: Clean Up Old Components

**Files:**
- Delete: `components/boot/boot-sequence.tsx`
- Delete: `components/dock/dock.tsx`
- Delete: `components/dock/dock-item.tsx`
- Delete: `components/icons/icon-grid.tsx`
- Delete: `components/icons/project-icon.tsx`
- Delete: `components/icons/cluster-watermark.tsx`
- Delete: `components/terminal/terminal.tsx`
- Delete: `components/workspace/context-menu.tsx`
- Delete: `components/workspace/easter-eggs.tsx`
- Delete: `components/workspace/hidden-file.tsx`
- Delete: `components/workspace/identity-hub.tsx`
- Delete: `components/workspace/konami-overlay.tsx`
- Delete: `components/workspace/os-chrome.tsx`
- Delete: `components/workspace/workspace.tsx`
- Delete: `components/window/window-frame.tsx`
- Delete: `app/@window/` directory (all files)

- [ ] **Step 1: Delete old component files**

```bash
cd /Users/jeeminhan/Code/personal-site-research/jeemin-os
rm components/boot/boot-sequence.tsx
rm components/dock/dock.tsx components/dock/dock-item.tsx
rm components/icons/icon-grid.tsx components/icons/project-icon.tsx components/icons/cluster-watermark.tsx
rm components/terminal/terminal.tsx
rm components/workspace/context-menu.tsx components/workspace/easter-eggs.tsx components/workspace/hidden-file.tsx components/workspace/identity-hub.tsx components/workspace/konami-overlay.tsx components/workspace/os-chrome.tsx components/workspace/workspace.tsx
rm components/window/window-frame.tsx
rm -rf app/@window/
rmdir components/boot components/dock components/icons components/terminal components/workspace components/window 2>/dev/null || true
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Clean build with no references to deleted components.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove OS-themed components — boot, dock, terminal, window frames, icons"
```

---

### Task 10: Polish & Verify

- [ ] **Step 1: Run dev server and do a full visual check**

Run: `npm run dev`

Check:
- Hero tree is centered and responsive
- All 15 project nodes render on correct branches
- Clicking nodes opens/closes panels correctly
- Panel content is complete (title, description, story, tech stack, links)
- Roots animate on scroll
- Clicking root labels scrolls to correct section
- About/Resume/Creative/Contact sections display correctly
- Sakura petals fall smoothly
- No console errors
- Mobile viewport (resize browser to 375px) — tree scales down, panels don't overflow

- [ ] **Step 2: Fix any issues found during visual check**

Address layout, positioning, or animation issues. Common adjustments:
- Tree node positions may need tweaking in `lib/tree-layout.ts`
- Panel positioning may clip on edges — add bounds checking
- Particle count may be too many/few

- [ ] **Step 3: Final build check**

Run: `npm run build`
Expected: Clean build, no warnings.

- [ ] **Step 4: Commit any polish fixes**

```bash
git add -A
git commit -m "polish: adjust tree layout, panel positioning, and particle timing"
```
