'use client';

import { useRouter } from 'next/navigation';
import { WindowFrame } from '@/components/window/window-frame';
import { AboutContent } from '@/components/pages/about-content';

export default function AboutWindow() {
  const router = useRouter();

  return (
    <WindowFrame title="About" onClose={() => router.back()}>
      <AboutContent />
    </WindowFrame>
  );
}
