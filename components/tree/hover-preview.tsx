'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

type HoverPreviewProps = {
  project: Project;
  x: number;
  y: number;
  side: 'left' | 'right';
};

export function HoverPreview({ project, x, y, side }: HoverPreviewProps) {
  const offset = side === 'right' ? 20 : -220;

  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{
        left: x + offset,
        top: y - 40,
      }}
      initial={{ opacity: 0, scale: 0.92, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 5 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <div
        className="rounded-lg px-4 py-3 w-[200px]"
        style={{
          background: 'var(--panel-bg)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
          border: '1px solid var(--border-default)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p
          className="text-xs font-medium mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          {project.displayName}
        </p>
        <p
          className="text-[10px] leading-relaxed line-clamp-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {project.techStack.slice(0, 3).map(t => (
              <span
                key={t}
                className="text-[8px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: 'var(--accent-subtle)',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <p className="text-[9px] mt-1.5" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          click to explore →
        </p>
      </div>
    </motion.div>
  );
}
