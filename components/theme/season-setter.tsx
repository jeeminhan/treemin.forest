'use client';
import { useEffect } from 'react';

export function SeasonSetter() {
  useEffect(() => {
    const month = new Date().getMonth(); // 0-indexed
    if (month >= 2 && month <= 3) document.documentElement.setAttribute('data-season', 'spring');
    else if (month >= 9 && month <= 10) document.documentElement.setAttribute('data-season', 'autumn');
  }, []);
  return null;
}
