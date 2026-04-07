import { ProjectsSection } from '@/components/sections/projects-section';

export default function ProjectsPage() {
  return (
    <main className="min-h-svh py-16">
      <div className="max-w-4xl mx-auto px-4">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs mb-8 transition-opacity hover:opacity-70"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
        >
          ← back to tree
        </a>
        <ProjectsSection />
      </div>
    </main>
  );
}
