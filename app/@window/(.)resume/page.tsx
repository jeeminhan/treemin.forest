'use client';

import { useRouter } from 'next/navigation';
import { WindowFrame } from '@/components/window/window-frame';

export default function ResumeWindow() {
  const router = useRouter();

  return (
    <WindowFrame title="Resume" onClose={() => router.back()}>
      <div className="p-6">
        <h2
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Resume
        </h2>
        <p
          className="text-[0.9375rem] leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Full content coming soon. This is a placeholder for the Resume page.
        </p>
      </div>
    </WindowFrame>
  );
}
