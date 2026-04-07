'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { NodePosition } from '@/lib/tree-layout';
import type { Project } from '@/data/projects';

type TreeNodeProps = {
  node: NodePosition;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (id: string) => void;
  onHover: (project: Project, cx: number, cy: number) => void;
  onLeave: () => void;
};

export function TreeNode({ node, isSelected, isDimmed, onSelect, onHover, onLeave }: TreeNodeProps) {
  const { project, cx, cy, radius } = node;
  const showLabel = project.tier <= 2;

  return (
    <motion.g
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.displayName}`}
      onClick={(e) => { e.stopPropagation(); onSelect(project.id); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(project.id); }}
      onMouseEnter={() => onHover(project, cx, cy)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
      animate={{
        opacity: isDimmed ? 0.15 : 1,
        scale: isSelected ? 1.12 : 1,
      }}
      whileHover={{ scale: 1.18 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow ring on selected */}
      <AnimatePresence>
        {isSelected && (
          <motion.circle
            cx={cx}
            cy={cy}
            r={radius + 6}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Main circle — filled with surface color, accent tint on hover */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={isSelected ? 'var(--accent-subtle)' : 'var(--bg-surface)'}
        stroke="var(--tree-line)"
        strokeWidth={project.tier === 1 ? 1.2 : 0.8}
        opacity={isSelected ? 1 : 0.7}
      />

      {/* Icon inside node */}
      <image
        href={project.icon}
        x={cx - radius * 0.55}
        y={cy - radius * 0.55}
        width={radius * 1.1}
        height={radius * 1.1}
        opacity={isSelected ? 0.9 : 0.6}
        style={{ pointerEvents: 'none' }}
      />

      {/* Label below node */}
      {showLabel && (
        <text
          x={cx}
          y={cy + radius + 9}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={project.tier === 1 ? 8 : 6.5}
          fontFamily="var(--font-display)"
          fill="var(--text-primary)"
          opacity={0.75}
          style={{ pointerEvents: 'none' }}
        >
          {project.displayName}
        </text>
      )}

      {/* Subtitle below label for tier 1 */}
      {project.tier === 1 && project.subtitle && (
        <text
          x={cx}
          y={cy + radius + 18}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={5.5}
          fontFamily="var(--font-body)"
          fill="var(--text-tertiary)"
          style={{ pointerEvents: 'none' }}
        >
          {project.subtitle}
        </text>
      )}
    </motion.g>
  );
}
