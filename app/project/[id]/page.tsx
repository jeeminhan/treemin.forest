import { ProjectDetail } from '@/components/window/project-detail';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: 'Not Found' };
  return {
    title: `${project.displayName} — JEEMIN OS`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'var(--bg-workspace)' }}
    >
      <div
        className="w-full max-w-[720px] rounded-xl border overflow-hidden"
        style={{
          background: 'var(--bg-elevated)',
          borderColor: 'var(--border-window)',
          boxShadow: 'var(--shadow-window)',
        }}
      >
        {/* Title bar */}
        <div
          className="h-10 px-3 flex items-center border-b select-none"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-default)',
          }}
        >
          <Link
            href="/"
            className="text-xs font-medium px-2 py-1 rounded hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent)' }}
          >
            &larr; Back to Desktop
          </Link>
          <span
            className="flex-1 text-center text-[0.8125rem] font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {project.displayName}
          </span>
          <div className="w-[80px]" />
        </div>
        <ProjectDetail project={project} />
      </div>
    </div>
  );
}
