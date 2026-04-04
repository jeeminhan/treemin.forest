'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import type { NodePosition } from '@/lib/tree-layout';

type InlinePanelProps = {
  project: Project;
  node: NodePosition;
  svgWidth: number;
  svgHeight: number;
  onClose: () => void;
};

export function InlinePanel({ project, node, svgWidth, svgHeight, onClose }: InlinePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const nodeXPercent = (node.cx / svgWidth) * 100;
  const panelSide = nodeXPercent > 50 ? 'left' : 'right';
  const panelStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${(node.cy / svgHeight) * 100}%`,
    ...(panelSide === 'right'
      ? { left: `${nodeXPercent + 5}%` }
      : { right: `${100 - nodeXPercent + 5}%` }),
    maxWidth: 360,
    width: '42%',
    minWidth: 280,
    transform: 'translateY(-50%)',
  };

  const previewUrl = project.liveUrl || project.githubUrl;

  return (
    <motion.div
      ref={panelRef}
      style={panelStyle}
      initial={{ opacity: 0, scale: 0.95, x: panelSide === 'right' ? -12 : 12 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: panelSide === 'right' ? -12 : 12 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="z-10"
      role="dialog"
      aria-label={`Project details: ${project.displayName}`}
      aria-modal="false"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      tabIndex={-1}
    >
      <div
        className="rounded-xl p-5 relative"
        style={{
          background: 'var(--panel-bg)',
          boxShadow: 'var(--panel-shadow)',
          border: '1px solid var(--border-default)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-sm hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-tertiary)', background: 'var(--accent-subtle)' }}
          aria-label="Close panel"
        >
          ×
        </button>

        <h3
          className="text-base font-semibold mb-0.5 pr-6"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          {project.displayName}
        </h3>
        {project.subtitle && (
          <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>
            {project.subtitle}
          </div>
        )}

        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {project.story && (
          <blockquote
            className="text-xs italic leading-relaxed mb-3 pl-3 border-l-2"
            style={{ color: 'var(--text-tertiary)', borderColor: 'var(--accent)' }}
          >
            {project.story}
          </blockquote>
        )}

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

        {/* Iframe preview toggle */}
        {previewUrl && (
          <div className="mt-3">
            {!showIframe ? (
              <button
                onClick={() => setShowIframe(true)}
                className="w-full py-2 rounded-lg text-xs transition-all hover:opacity-80"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--accent-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-default)',
                }}
              >
                ▶ Open preview
              </button>
            ) : (
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    live preview
                  </span>
                  <div className="flex gap-1.5">
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] underline underline-offset-2 hover:opacity-70"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                    >
                      open full ↗
                    </a>
                    <button
                      onClick={() => setShowIframe(false)}
                      className="text-[10px] hover:opacity-70"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ border: '1px solid var(--border-default)' }}
                >
                  <iframe
                    src={previewUrl}
                    title={`Preview of ${project.displayName}`}
                    className="w-full bg-white"
                    style={{ height: 240, border: 'none' }}
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
