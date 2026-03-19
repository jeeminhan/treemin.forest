'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  'JEEMIN OS v1.0',
  'checking build artifacts... ok',
  'loading projects... ok',
  'mounting creativity... ok',
  '> ready.',
];

export function BootSequence() {
  const [show, setShow] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('jeemin-os-booted', 'true');
      return;
    }
    // Check if already booted this session
    if (sessionStorage.getItem('jeemin-os-booted')) return;

    setShow(true);

    // Stagger lines
    const timers: NodeJS.Timeout[] = [];
    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), (i + 1) * 150));
    });

    // Fade out after all lines
    timers.push(setTimeout(() => setFading(true), bootLines.length * 150 + 500));
    timers.push(setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('jeemin-os-booted', 'true');
    }, bootLines.length * 150 + 800));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!fading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex flex-col justify-center items-start px-8 md:px-16"
          style={{ background: '#0A0A0A' }}
        >
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <p
              key={i}
              className="text-sm md:text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-mono)', color: '#27CA40' }}
            >
              {line}
            </p>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
