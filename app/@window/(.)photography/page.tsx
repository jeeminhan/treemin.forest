'use client';
import { useRouter } from 'next/navigation';
import { WindowFrame } from '@/components/window/window-frame';

export default function PhotographyWindow() {
  const router = useRouter();
  return (
    <WindowFrame title=".hidden" onClose={() => router.back()}>
      <div style={{ background: '#0A0A0A', cursor: 'crosshair' }} className="p-6">
        <h2 className="text-lg font-medium mb-4" style={{ color: '#E5E5E5', fontFamily: 'var(--font-display)' }}>
          Film Photography — Kodak 500T
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/2] rounded border" style={{ background: '#1A1A1A', borderColor: '#333' }} />
          ))}
        </div>
        <p className="mt-4 text-xs" style={{ color: '#5C5C58', fontFamily: 'var(--font-mono)' }}>
          Utah · California · 2024
        </p>
      </div>
    </WindowFrame>
  );
}
