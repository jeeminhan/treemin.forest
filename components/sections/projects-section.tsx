'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from './section-wrapper';
import { projects, clusters, type Cluster, type Project } from '@/data/projects';

type Tab = 'all' | Cluster;

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ai-language', label: 'AI & Language' },
  { key: 'ministry-community', label: 'Ministry' },
  { key: 'ml-data', label: 'ML & Data' },
  { key: 'creative-play', label: 'Creative' },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewUrl = project.liveUrl || project.githubUrl;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
      }}
    >
      {/* Header with icon */}
      <div className="px-4 pt-4 pb-3 sm:px-5 sm:pt-5">
        <div className="flex items-start gap-3 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.icon}
            alt=""
            className="shrink-0 mt-0.5"
            style={{ width: 28, height: 28, opacity: 0.6 }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3
                className="text-sm font-semibold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                {project.displayName}
              </h3>
              <span
                className="text-[0.625rem] shrink-0 mt-0.5"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
              >
                {project.year}
              </span>
            </div>
            {project.subtitle && (
              <div className="text-[0.625rem] -mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                {project.subtitle}
              </div>
            )}
          </div>
        </div>

        <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="inline-flex px-2 py-0.5 rounded-full"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.575rem',
                  background: 'var(--accent-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Story expand */}
        <AnimatePresence>
          {expanded && project.story && (
            <motion.blockquote
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs italic leading-relaxed mb-3 pl-3 border-l-2 overflow-hidden"
              style={{ color: 'var(--text-tertiary)', borderColor: 'var(--accent)' }}
            >
              {project.story}
            </motion.blockquote>
          )}
        </AnimatePresence>

        {/* Actions row */}
        <div
          className="flex items-center gap-3 text-[0.625rem] max-sm:gap-4 max-sm:text-xs"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
        >
          {project.story && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="hover:opacity-70 active:opacity-50 transition-opacity"
              style={{ color: 'var(--accent)' }}
            >
              {expanded ? '— less' : '+ story'}
            </button>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70 active:opacity-50"
              style={{ color: 'var(--accent)' }}
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-70 active:opacity-50"
              style={{ color: 'var(--accent)' }}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* Iframe preview (tap to load) */}
      {previewUrl && (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          {!showPreview ? (
            <button
              onClick={() => setShowPreview(true)}
              className="w-full py-2 rounded-lg text-xs transition-all hover:opacity-80 active:opacity-60"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--accent-subtle)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-default)',
              }}
            >
              ▶ Preview
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
                    className="text-[10px] underline underline-offset-2 hover:opacity-70"
                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                  >
                    open full ↗
                  </a>
                  <button
                    onClick={() => setShowPreview(false)}
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
                  style={{ height: 220, border: 'none' }}
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered = activeTab === 'all'
    ? [...projects].sort((a, b) => a.tier - b.tier || b.year - a.year)
    : projects
        .filter((p) => p.cluster === activeTab)
        .sort((a, b) => a.tier - b.tier || b.year - a.year);

  return (
    <SectionWrapper id="projects">
      <h2
        className="text-sm font-medium uppercase tracking-[0.08em] mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        All Projects
      </h2>

      {/* Tabs */}
      <div
        className="flex gap-1 mb-6 overflow-x-auto scrollbar-none pb-1"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tab.key === 'all'
            ? projects.length
            : projects.filter((p) => p.cluster === tab.key).length;

          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs transition-all"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                background: isActive ? 'var(--accent)' : 'var(--accent-subtle)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--accent)' : '1px solid transparent',
              }}
            >
              {tab.label}
              <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Project cards grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeTab}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
