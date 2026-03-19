'use client';
import Link from 'next/link';
import Image from 'next/image';
import { projects, clusters, type Cluster } from '@/data/projects';
import { ProjectIcon } from './project-icon';

const clusterOrder: Cluster[] = ['ai-language', 'ministry-community', 'ml-data', 'creative-play'];

/** Sort projects by cluster order, then tier ascending for logical tab order */
const sortedProjects = [...projects].sort((a, b) => {
  const clusterDiff = clusterOrder.indexOf(a.cluster) - clusterOrder.indexOf(b.cluster);
  if (clusterDiff !== 0) return clusterDiff;
  return a.tier - b.tier;
});

export function IconGrid() {
  return (
    <>
      {/* Desktop 1280px+: full scatter */}
      <div id="project-grid" className="hidden 2xl:block absolute inset-0">
        {sortedProjects.map((project, i) => (
          <ProjectIcon key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Laptop 1024-1279px: tightened scatter */}
      <div className="hidden xl:block 2xl:hidden absolute inset-0">
        {sortedProjects.map((project, i) => (
          <ProjectIcon
            key={project.id}
            project={{
              ...project,
              position: {
                x: project.position.x * 0.85 + 7.5,
                y: project.position.y * 0.85 + 7.5,
              },
            }}
            index={i}
          />
        ))}
      </div>

      {/* Tablet 768-1023px: cluster rows with horizontal scroll */}
      <div className="hidden md:block xl:hidden px-4 pt-48 pb-24 space-y-8">
        {clusterOrder.map(clusterId => (
          <div key={clusterId}>
            <h3
              className="text-[0.625rem] uppercase tracking-[0.08em] mb-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
            >
              {clusters[clusterId].label}
            </h3>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {projects.filter(p => p.cluster === clusterId).sort((a, b) => a.tier - b.tier).map(project => (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5 w-20"
                  aria-label={`Open ${project.name}`}
                >
                  <div
                    className="w-14 h-14 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden"
                    style={{ imageRendering: 'pixelated' }}
                  >
                    <Image src={project.icon} alt={project.name} width={56} height={56} className="w-full h-full object-contain" style={{ imageRendering: 'pixelated' }} />
                  </div>
                  <span className="text-xs font-medium text-center" style={{ color: 'var(--text-primary)' }}>
                    {project.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile <768px: stacked list */}
      <div className="md:hidden px-4 pt-48 pb-24 space-y-8">
        {clusterOrder.map(clusterId => (
          <div key={clusterId}>
            <h3
              className="text-[0.625rem] uppercase tracking-[0.08em] mb-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
            >
              {clusters[clusterId].label}
            </h3>
            <div className="space-y-1">
              {projects.filter(p => p.cluster === clusterId).sort((a, b) => a.tier - b.tier).map(project => (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="flex items-center gap-3 w-full py-3 border-b border-[var(--border-default)]"
                  aria-label={`Open ${project.name}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden flex-shrink-0"
                    style={{ imageRendering: 'pixelated' }}
                  >
                    <Image src={project.icon} alt="" width={40} height={40} className="w-full h-full object-contain" style={{ imageRendering: 'pixelated' }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{project.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{project.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
