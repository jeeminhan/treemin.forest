'use client';

import { useRouter } from 'next/navigation';
import { WindowFrame } from '@/components/window/window-frame';
import { ContactContent } from '@/components/pages/contact-content';

export default function ContactWindow() {
  const router = useRouter();

  return (
    <WindowFrame title="Contact" onClose={() => router.back()}>
      <ContactContent />
    </WindowFrame>
  );
}
