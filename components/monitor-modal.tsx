'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/projects';

type MonitorModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function MonitorModal({ project, onClose }: MonitorModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [project, handleEscape]);

  const previewUrl = project?.liveUrl || project?.githubUrl;
  const displayUrl = previewUrl
    ? previewUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : '';

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Monitor frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-5xl flex flex-col overflow-hidden"
            style={{
              height: 'min(85vh, 720px)',
              border: '2px solid #000',
              boxShadow: '4px 4px 0px 0px var(--accent), 8px 8px 0px 0px rgba(0,0,0,0.15)',
              borderRadius: 8,
            }}
          >
            <div className="bg-black flex flex-col flex-1 min-h-0 overflow-hidden" style={{ borderRadius: 6 }}>
              {/* Title bar */}
              <div
                className="flex items-center justify-between px-3 py-2 shrink-0"
                style={{
                  background: '#1c1917',
                  borderBottom: '2px solid #000',
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full border transition-opacity hover:opacity-80"
                      style={{ background: '#ef4444', borderColor: '#b91c1c' }}
                      aria-label="Close"
                    />
                    <div
                      className="w-3 h-3 rounded-full border"
                      style={{ background: '#eab308', borderColor: '#a16207' }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border"
                      style={{ background: '#22c55e', borderColor: '#15803d' }}
                    />
                  </div>

                  {/* URL bar */}
                  <div
                    className="flex items-center gap-2 px-3 py-1 ml-1 min-w-0"
                    style={{
                      background: '#292524',
                      border: '2px solid #000',
                      borderRadius: 4,
                    }}
                  >
                    <span className="text-sm shrink-0" style={{ color: '#78716c' }}>
                      🔒
                    </span>
                    <span
                      className="text-[11px] truncate"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: '#a8a29e',
                        maxWidth: 260,
                      }}
                    >
                      {displayUrl}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {previewUrl && (
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs transition-colors hover:text-white"
                      style={{ color: '#78716c', fontFamily: 'var(--font-mono)' }}
                      title="Open full site"
                    >
                      ↗
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="text-lg leading-none transition-colors hover:text-white"
                    style={{ color: '#78716c' }}
                    title="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Info bar */}
              <div
                className="flex items-center justify-between px-3 sm:px-4 py-2 shrink-0 overflow-x-auto"
                style={{
                  background: '#0c0a09',
                  borderBottom: '2px solid #000',
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.icon}
                    alt=""
                    className="shrink-0"
                    style={{ width: 18, height: 18, opacity: 0.7, filter: 'invert(1)' }}
                  />
                  <span
                    className="text-xs font-semibold truncate"
                    style={{ color: '#e7e5e4', fontFamily: 'var(--font-display)' }}
                  >
                    {project.displayName}
                  </span>
                  {project.subtitle && (
                    <span className="text-[10px] hidden sm:inline" style={{ color: '#78716c' }}>
                      {project.subtitle}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold shrink-0 hidden sm:inline-flex"
                      style={{
                        background: 'rgba(91, 140, 90, 0.15)',
                        color: '#a8a29e',
                        border: '1px solid #44403c',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  <span
                    className="text-[10px]"
                    style={{ color: '#78716c', fontFamily: 'var(--font-mono)' }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 shrink-0"
                style={{ background: '#0c0a09', borderBottom: '1px solid #292524' }}
              >
                <div
                  className="flex-1 h-1 rounded-full overflow-hidden"
                  style={{ background: '#292524' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${project.progress}%`,
                      background: project.progress < 30
                        ? 'var(--growth-seed)'
                        : project.progress < 60
                          ? 'var(--growth-sprout)'
                          : project.progress < 85
                            ? 'var(--growth-growing)'
                            : 'var(--growth-mature)',
                    }}
                  />
                </div>
                <span
                  className="text-[9px] shrink-0"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: project.progress < 30
                      ? 'var(--growth-seed)'
                      : project.progress < 60
                        ? 'var(--growth-sprout)'
                        : project.progress < 85
                          ? 'var(--growth-growing)'
                          : 'var(--growth-mature)',
                  }}
                >
                  {project.progress}%
                </span>
              </div>

              {/* Content area */}
              {previewUrl ? (
                <iframe
                  src={previewUrl}
                  title={`Preview of ${project.displayName}`}
                  className="flex-1 w-full border-0 bg-white"
                  style={{ minHeight: 0 }}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center"
                  style={{ background: '#1c1917' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.icon}
                    alt=""
                    style={{ width: 48, height: 48, opacity: 0.4, filter: 'invert(1)' }}
                  />
                  <div>
                    <h3
                      className="text-lg font-semibold mb-1"
                      style={{ color: '#e7e5e4', fontFamily: 'var(--font-display)' }}
                    >
                      {project.displayName}
                    </h3>
                    <p
                      className="text-sm max-w-md mx-auto leading-relaxed"
                      style={{ color: '#a8a29e' }}
                    >
                      {project.description}
                    </p>
                  </div>
                  {project.story && (
                    <blockquote
                      className="text-xs italic max-w-sm mx-auto leading-relaxed pl-3 border-l-2"
                      style={{ color: '#78716c', borderColor: 'var(--accent)' }}
                    >
                      {project.story}
                    </blockquote>
                  )}
                  <div
                    className="flex items-center gap-4 text-xs mt-2"
                    style={{ fontFamily: 'var(--font-mono)', color: '#78716c' }}
                  >
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-white transition-colors"
                        style={{ color: 'var(--accent)' }}
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.commits && <span>{project.commits} commits</span>}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
