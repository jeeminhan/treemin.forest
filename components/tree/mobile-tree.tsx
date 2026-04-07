'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, clusters, type Cluster, type Project } from '@/data/projects';

const clusterOrder: Cluster[] = ['ai-language', 'ministry-community', 'ml-data', 'creative-play'];

function MobileProjectCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const size = project.tier === 1 ? 56 : project.tier === 2 ? 44 : 34;

  return (
    <motion.button
      onClick={() => onSelect(project)}
      className="flex flex-col items-center gap-1 shrink-0"
      style={{ width: size + 16 }}
      whileTap={{ scale: 0.92 }}
      aria-label={`View project: ${project.displayName}`}
    >
      <div
        className="rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: size,
          height: size,
          background: 'var(--bg-surface)',
          border: `${project.tier === 1 ? 1.5 : 1}px solid var(--tree-line)`,
          opacity: project.tier === 1 ? 1 : 0.7,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.icon}
          alt=""
          className="pointer-events-none"
          style={{
            width: size * 0.6,
            height: size * 0.6,
            opacity: 0.65,
          }}
        />
      </div>
      {project.tier <= 2 && (
        <span
          className="text-center leading-tight"
          style={{
            fontSize: project.tier === 1 ? '0.625rem' : '0.5625rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)',
            opacity: 0.8,
          }}
        >
          {project.displayName}
        </span>
      )}
    </motion.button>
  );
}

function MobileDetailPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  const [showIframe, setShowIframe] = useState(false);
  const previewUrl = project.liveUrl || project.githubUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.2 }}
      className="mx-4 mt-4 rounded-xl overflow-hidden"
      style={{
        background: 'var(--panel-bg)',
        boxShadow: 'var(--panel-shadow)',
        border: '1px solid var(--border-default)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-sm"
          style={{ color: 'var(--text-tertiary)', background: 'var(--accent-subtle)' }}
          aria-label="Close panel"
        >
          ×
        </button>

        <h3
          className="text-base font-semibold mb-0.5 pr-8"
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
                className="inline-flex px-2 py-0.5 rounded-full"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  background: 'var(--accent-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div
          className="flex items-center gap-4 text-xs py-1"
          style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
        >
          <span>{project.year}</span>
          {project.commits && <span>{project.commits} commits</span>}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 active:opacity-50"
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
              className="underline underline-offset-2 active:opacity-50"
              style={{ color: 'var(--accent)' }}
            >
              Live ↗
            </a>
          )}
        </div>

        {/* Iframe preview */}
        {previewUrl && (
          <div className="mt-3">
            {!showIframe ? (
              <button
                onClick={() => setShowIframe(true)}
                className="w-full py-2.5 rounded-lg text-xs transition-all active:opacity-70"
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
                  <div className="flex gap-2">
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] underline underline-offset-2"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                    >
                      open full ↗
                    </a>
                    <button
                      onClick={() => setShowIframe(false)}
                      className="text-[10px]"
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
                    style={{ height: 220, border: 'none' }}
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

export function MobileTree() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="w-full">
      {clusterOrder.map((cluster, ci) => {
        const config = clusters[cluster];
        const clusterProjects = projects
          .filter(p => p.cluster === cluster)
          .sort((a, b) => a.tier - b.tier);

        return (
          <motion.div
            key={cluster}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: ci * 0.1 }}
            className="mb-6"
          >
            {/* Cluster label */}
            <div className="px-4 mb-2">
              <span
                className="text-[0.625rem] font-medium uppercase tracking-[0.08em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
              >
                {config.label}
              </span>
              {config.labelJa && (
                <span
                  className="ml-2 text-[0.5625rem]"
                  style={{ color: 'var(--text-tertiary)', opacity: 0.6 }}
                >
                  {config.labelJa}
                </span>
              )}
            </div>

            {/* Horizontal scroll of project nodes */}
            <div
              className="flex gap-3 px-4 pb-2 overflow-x-auto scrollbar-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {clusterProjects.map(project => (
                <MobileProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>

            {/* Connecting line */}
            {ci < clusterOrder.length - 1 && (
              <div className="flex justify-center py-1">
                <div
                  className="w-px h-6"
                  style={{ background: 'var(--tree-line)', opacity: 0.15 }}
                />
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Selected project detail panel */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.2)' }}
              onClick={() => setSelectedProject(null)}
            />
            <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto pb-safe">
              <MobileDetailPanel
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
              {/* Bottom safe area padding */}
              <div className="h-6" />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
