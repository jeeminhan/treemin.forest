'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from './section-wrapper';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

const ministryProjects = projects
  .filter((p) => p.cluster === 'ministry-community')
  .sort((a, b) => a.tier - b.tier);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const previewUrl = project.liveUrl || project.githubUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
      }}
    >
      {/* Auto-visible iframe preview */}
      {previewUrl && (
        <div
          className="relative w-full overflow-hidden"
          style={{ background: '#f8f8f8' }}
        >
          <iframe
            src={previewUrl}
            title={`Preview of ${project.displayName}`}
            className="w-full border-none"
            style={{ height: 280 }}
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 70%, var(--bg-surface) 100%)',
            }}
          />
        </div>
      )}

      {/* Project info */}
      <div className="px-5 pb-5 pt-3">
        <div className="flex items-start justify-between gap-2 mb-1.5">
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
          className="flex items-center gap-3 text-[0.625rem]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
        >
          {project.story && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="hover:opacity-70 transition-opacity"
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
              className="underline underline-offset-2 hover:opacity-70"
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
              className="underline underline-offset-2 hover:opacity-70"
              style={{ color: 'var(--accent)' }}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function MinistrySection() {
  return (
    <SectionWrapper id="ministry">
      <h2
        className="text-sm font-medium uppercase tracking-[0.08em] mb-2"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        Ministry & Community
      </h2>
      <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
        Tools built for people in ministry — reflection, accountability, journey mapping, and gospel storytelling.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ministryProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
