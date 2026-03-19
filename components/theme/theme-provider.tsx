'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { ThemeCtx, type Theme, type Resolved } from '@/hooks/use-theme';

function resolveTheme(theme: Theme, systemDark: boolean): Resolved {
  if (theme === 'system') return systemDark ? 'dark' : 'light';
  return theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemDark, setSystemDark] = useState(false);

  // Read persisted theme and system preference on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setThemeState(stored);
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mq.matches);

    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Keep data-theme attribute in sync
  const resolved = resolveTheme(theme, systemDark);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved);
  }, [resolved]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
  }, []);

  return (
    <ThemeCtx value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeCtx>
  );
}
