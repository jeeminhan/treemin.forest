'use client';

import { motion } from 'framer-motion';
import { TreeNode } from './tree-node';
import type { BranchLayout } from '@/lib/tree-layout';
import type { Project } from '@/data/projects';

type TreeBranchProps = {
  branch: BranchLayout;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNodeHover: (project: Project, cx: number, cy: number) => void;
  onNodeLeave: () => void;
};

export function TreeBranch({ branch, selectedId, onSelect, onNodeHover, onNodeLeave }: TreeBranchProps) {
  const isDimmedBranch = selectedId !== null && !branch.subBranches.some(sb => sb.node.project.id === selectedId);

  return (
    <g>
      {/* Main branch */}
      <motion.path
        d={branch.mainPathD}
        fill="none"
        stroke="var(--tree-line)"
        strokeWidth={1.8}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: isDimmedBranch ? 0.08 : 0.35 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Sub-branches connecting to nodes */}
      {branch.subBranches.map((sb, i) => (
        <motion.path
          key={`sub-${sb.node.project.id}`}
          d={sb.pathD}
          fill="none"
          stroke="var(--tree-line)"
          strokeWidth={0.7}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: isDimmedBranch ? 0.04 : 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 + i * 0.08, ease: 'easeOut' }}
        />
      ))}

      {/* Cluster label — at branch tip */}
      <motion.text
        x={branch.labelX}
        y={branch.labelY}
        textAnchor={branch.side === 'left' ? 'end' : 'start'}
        fontSize={9}
        fontFamily="var(--font-mono)"
        fill="var(--text-tertiary)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: isDimmedBranch ? 0.05 : 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {branch.label}
      </motion.text>

      {branch.labelJa && (
        <motion.text
          x={branch.labelX}
          y={branch.labelY + 13}
          textAnchor={branch.side === 'left' ? 'end' : 'start'}
          fontSize={7}
          fontFamily="var(--font-body)"
          fill="var(--text-tertiary)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: isDimmedBranch ? 0.03 : 0.25 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {branch.labelJa}
        </motion.text>
      )}

      {/* Nodes */}
      {branch.subBranches.map((sb) => (
        <TreeNode
          key={sb.node.project.id}
          node={sb.node}
          isSelected={selectedId === sb.node.project.id}
          isDimmed={selectedId !== null && selectedId !== sb.node.project.id}
          onSelect={onSelect}
          onHover={onNodeHover}
          onLeave={onNodeLeave}
        />
      ))}
    </g>
  );
}
