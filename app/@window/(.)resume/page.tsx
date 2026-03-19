'use client';

import { useRouter } from 'next/navigation';
import { WindowFrame } from '@/components/window/window-frame';
import { ResumeContent } from '@/components/pages/resume-content';

export default function ResumeWindow() {
  const router = useRouter();

  return (
    <WindowFrame title="Resume" onClose={() => router.back()}>
      <ResumeContent />
    </WindowFrame>
  );
}
