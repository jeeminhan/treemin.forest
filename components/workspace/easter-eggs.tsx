'use client';

import { useKonami } from '@/hooks/use-konami';
import { KonamiOverlay } from './konami-overlay';

export function EasterEggs() {
  const konamiActive = useKonami();
  return <KonamiOverlay active={konamiActive} />;
}
