import { projects, clusters, type Project, type Cluster } from '@/data/projects';

export type NodePosition = {
  project: Project;
  cx: number;
  cy: number;
  radius: number;
};

export type SubBranch = {
  pathD: string;
  node: NodePosition;
};

export type BranchLayout = {
  cluster: Cluster;
  label: string;
  labelJa?: string;
  side: 'left' | 'right';
  mainPathD: string;
  labelX: number;
  labelY: number;
  subBranches: SubBranch[];
};

const VIEWBOX_W = 900;
const VIEWBOX_H = 800;
const TRUNK_X = VIEWBOX_W / 2;
const TRUNK_TOP = 40;
const TRUNK_BOTTOM = 720;

const TIER_RADIUS: Record<1 | 2 | 3, number> = { 1: 26, 2: 18, 3: 12 };

/** Evaluate a cubic bezier at parameter t */
function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

export function computeTreeLayout(): { branches: BranchLayout[]; trunkPath: string; trunkWidth: { top: number; bottom: number } } {
  // Organic trunk — slight S-curve
  const trunkPath = `M ${TRUNK_X} ${TRUNK_BOTTOM} C ${TRUNK_X + 3} ${TRUNK_BOTTOM - 200} ${TRUNK_X - 3} ${TRUNK_TOP + 200} ${TRUNK_X} ${TRUNK_TOP}`;

  const branches: BranchLayout[] = [];

  for (const [clusterKey, config] of Object.entries(clusters)) {
    const cluster = clusterKey as Cluster;
    const clusterProjects = projects.filter(p => p.cluster === cluster);
    const sorted = [...clusterProjects].sort((a, b) => a.tier - b.tier);

    const branchY = TRUNK_TOP + config.trunkY * (TRUNK_BOTTOM - TRUNK_TOP);
    const dir = config.side === 'left' ? -1 : 1;

    // Main branch — organic curve reaching out
    const branchLen = 220;
    const endX = TRUNK_X + dir * branchLen;
    const endY = branchY - 20;
    const cp1x = TRUNK_X + dir * 60;
    const cp1y = branchY - 8;
    const cp2x = TRUNK_X + dir * 140;
    const cp2y = branchY - 25;
    const mainPathD = `M ${TRUNK_X} ${branchY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`;

    // Place nodes as sub-branches forking off the main branch
    const count = sorted.length;
    const subBranches: SubBranch[] = sorted.map((project, i) => {
      // Spread t values along the branch (0.25 to 0.95)
      const t = 0.25 + (i * 0.7) / Math.max(count - 1, 1);

      // Point on the main branch curve
      const bx = cubicBezier(t, TRUNK_X, cp1x, cp2x, endX);
      const by = cubicBezier(t, branchY, cp1y, cp2y, endY);

      // Sub-branch direction: alternate above/below, with tier affecting distance
      const tierDist = project.tier === 1 ? 55 : project.tier === 2 ? 40 : 28;
      const above = i % 2 === 0;
      const angle = above ? -1 : 1;
      // Add some horizontal spread too
      const spreadX = dir * (10 + i * 5);

      const cx = bx + spreadX;
      const cy = by + angle * tierDist;
      const radius = TIER_RADIUS[project.tier];

      // Sub-branch path from main branch point to node
      const subMidX = bx + spreadX * 0.4;
      const subMidY = by + angle * tierDist * 0.3;
      const subPathD = `M ${bx} ${by} Q ${subMidX} ${subMidY} ${cx} ${cy}`;

      return {
        pathD: subPathD,
        node: { project, cx, cy, radius },
      };
    });

    // Label position: at the end of the main branch
    const labelX = endX + dir * 15;
    const labelY = endY - 8;

    branches.push({
      cluster,
      label: config.label,
      labelJa: config.labelJa,
      side: config.side,
      mainPathD,
      labelX,
      labelY,
      subBranches,
    });
  }

  return { branches, trunkPath, trunkWidth: { top: 2, bottom: 5 } };
}

export { VIEWBOX_W, VIEWBOX_H, TRUNK_X, TRUNK_TOP, TRUNK_BOTTOM };
