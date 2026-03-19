'use client';

import { useRouter } from 'next/navigation';
import { WindowFrame } from '@/components/window/window-frame';
import { CreativeContent } from '@/components/pages/creative-content';

export default function CreativeWindow() {
  const router = useRouter();

  return (
    <WindowFrame title="Creative" onClose={() => router.back()}>
      <CreativeContent />
    </WindowFrame>
  );
}
