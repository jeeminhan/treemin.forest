'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { WindowFrame } from '@/components/window/window-frame';
import { ProjectDetail } from '@/components/window/project-detail';
import { projects } from '@/data/projects';

export default function ProjectWindow({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const project = projects.find((p) => p.id === id);

  if (!project) return null;

  return (
    <WindowFrame title={project.displayName} onClose={() => router.back()}>
      <ProjectDetail project={project} />
    </WindowFrame>
  );
}
