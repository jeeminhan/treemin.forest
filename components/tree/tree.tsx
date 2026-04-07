'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeBranch } from './tree-branch';
import { HoverPreview } from './hover-preview';
import { MobileTree } from './mobile-tree';
import { MonitorModal } from '@/components/monitor-modal';
import { computeTreeLayout, VIEWBOX_W, VIEWBOX_H } from '@/lib/tree-layout';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

type HoverState = {
  project: Project;
  x: number;
  y: number;
  side: 'left' | 'right';
};

export function Tree() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverState, setHoverState] = useState<HoverState | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { branches, trunkPath, trunkWidth } = useMemo(() => computeTreeLayout(), []);

  const selectedProject = selectedId ? projects.find(p => p.id === selectedId) ?? null : null;

  function handleSelect(id: string) {
    setSelectedId(prev => prev === id ? null : id);
    setHoverState(null);
  }

  const handleNodeHover = useCallback((project: Project, cx: number, cy: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    // Convert SVG coords to pixel coords
    const scaleX = rect.width / VIEWBOX_W;
    const scaleY = rect.height / VIEWBOX_H;
    const x = cx * scaleX;
    const y = cy * scaleY;
    const side = cx > VIEWBOX_W / 2 ? 'left' : 'right';
    setHoverState({ project, x, y, side });
  }, []);

  const handleNodeLeave = useCallback(() => {
    setHoverState(null);
  }, []);

  return (
    <div className="relative w-full" style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Mobile: cluster-based horizontal scroll layout */}
      <div className="sm:hidden">
        <MobileTree />
      </div>

      {/* Desktop: SVG tree */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="hidden sm:block w-full h-auto"
        aria-label="Project tree — click a node to view project details"
        onClick={() => { if (selectedId) setSelectedId(null); }}
      >
        {/* Trunk — tapered via two parallel paths */}
        <motion.path
          d={trunkPath}
          fill="none"
          stroke="var(--tree-line)"
          strokeWidth={trunkWidth.bottom}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          opacity={0.4}
          style={{
            strokeDashoffset: 0,
          }}
        />
        {/* Lighter inner trunk line for taper illusion */}
        <motion.path
          d={trunkPath}
          fill="none"
          stroke="var(--bg-workspace)"
          strokeWidth={trunkWidth.bottom - 2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          opacity={0.6}
        />
        <motion.path
          d={trunkPath}
          fill="none"
          stroke="var(--tree-line)"
          strokeWidth={trunkWidth.top}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          opacity={0.35}
        />

        {branches.map((branch) => (
          <TreeBranch
            key={branch.cluster}
            branch={branch}
            selectedId={selectedId}
            onSelect={handleSelect}
            onNodeHover={handleNodeHover}
            onNodeLeave={handleNodeLeave}
          />
        ))}
      </svg>

      {/* Hover preview card */}
      <AnimatePresence>
        {hoverState && !selectedId && (
          <HoverPreview
            key={hoverState.project.id}
            project={hoverState.project}
            x={hoverState.x}
            y={hoverState.y}
            side={hoverState.side}
          />
        )}
      </AnimatePresence>

      {/* Monitor modal on click */}
      <MonitorModal
        project={selectedProject}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
