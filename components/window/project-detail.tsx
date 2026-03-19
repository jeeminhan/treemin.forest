import Image from 'next/image';
import type { Project } from '@/data/projects';

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div>
      {/* Hero area — placeholder for screenshots */}
      <div
        className="w-full aspect-video flex items-center justify-center"
        style={{ background: 'var(--bg-surface-hover)' }}
      >
        <Image
          src={project.icon}
          alt={project.name}
          width={128}
          height={128}
          style={{ imageRendering: 'pixelated', opacity: 0.3 }}
        />
      </div>

      <div className="p-6 grid grid-cols-[1fr_200px] gap-6 max-sm:grid-cols-1">
        {/* Main content */}
        <div>
          {project.story && (
            <blockquote
              className="text-[0.9375rem] italic mb-4 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              &ldquo;{project.story}&rdquo;
            </blockquote>
          )}
          <p
            className="text-[0.9375rem] leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.description}
          </p>
        </div>

        {/* Metadata sidebar */}
        <div className="space-y-4">
          <MetaGroup label="YEAR" value={String(project.year)} />
          {project.commits && <MetaGroup label="COMMITS" value={String(project.commits)} />}

          {project.techStack.length > 0 && (
            <div>
              <div
                className="text-[0.625rem] font-medium uppercase tracking-[0.08em] mb-1.5"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
              >
                STACK
              </div>
              <div className="flex flex-wrap gap-1">
                {project.techStack.map(t => (
                  <span
                    key={t}
                    className="inline-flex px-2 py-0.5 rounded border transition-colors hover:bg-[var(--accent-subtle)] hover:border-[var(--accent)]"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      background: 'var(--bg-surface-hover)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.8125rem] font-medium underline underline-offset-2"
                style={{ color: 'var(--accent)' }}
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.8125rem] font-medium underline underline-offset-2"
                style={{ color: 'var(--accent)' }}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaGroup({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-[0.625rem] font-medium uppercase tracking-[0.08em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        {label}
      </div>
      <div
        className="text-[0.6875rem]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
      >
        {value}
      </div>
    </div>
  );
}
