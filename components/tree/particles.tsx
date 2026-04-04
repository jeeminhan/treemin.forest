'use client';

import { useEffect, useState } from 'react';
import type { Season } from '@/components/theme/season-setter';

type Particle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
};

const PARTICLE_COUNT = 18;

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 8,
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));
}

const SEASON_STYLES: Record<Season, { color: string; borderRadius: string; opacity: number }> = {
  spring: { color: '#D4A0A0', borderRadius: '50% 0 50% 50%', opacity: 0.4 },
  summer: { color: '#8BA888', borderRadius: '50%', opacity: 0.15 },
  autumn: { color: '#C4956A', borderRadius: '2px', opacity: 0.5 },
  winter: { color: '#A0B0C0', borderRadius: '50%', opacity: 0.6 },
};

export function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [season, setSeason] = useState<Season>('spring');

  useEffect(() => {
    setParticles(generateParticles());
    const s = document.documentElement.getAttribute('data-season') as Season | null;
    if (s) setSeason(s);
  }, []);

  if (particles.length === 0) return null;

  const style = SEASON_STYLES[season];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-10px',
            width: p.size,
            height: p.size * 1.3,
            backgroundColor: style.color,
            borderRadius: style.borderRadius,
            opacity: style.opacity,
            transform: `rotate(${p.rotation}deg)`,
            animation: `petal-fall ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}
