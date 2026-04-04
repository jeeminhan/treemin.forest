'use client';
import { useEffect } from 'react';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const SEASON_CONFIG: Record<Season, { accent: string; accentHover: string; accentSubtle: string }> = {
  spring: { accent: '#D4A0A0', accentHover: '#C48E8E', accentSubtle: 'rgba(212, 160, 160, 0.15)' },
  summer: { accent: '#8BA888', accentHover: '#7A9A77', accentSubtle: 'rgba(139, 168, 136, 0.15)' },
  autumn: { accent: '#C4956A', accentHover: '#B5845A', accentSubtle: 'rgba(196, 149, 106, 0.15)' },
  winter: { accent: '#A0B0C0', accentHover: '#8FA0B2', accentSubtle: 'rgba(160, 176, 192, 0.15)' },
};

function getSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

export function SeasonSetter() {
  useEffect(() => {
    const season = getSeason();
    const config = SEASON_CONFIG[season];
    const root = document.documentElement;
    root.setAttribute('data-season', season);
    root.style.setProperty('--accent', config.accent);
    root.style.setProperty('--accent-hover', config.accentHover);
    root.style.setProperty('--accent-subtle', config.accentSubtle);
  }, []);
  return null;
}

export { getSeason, SEASON_CONFIG };
export type { Season };
