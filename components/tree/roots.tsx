'use client';

import { motion } from 'framer-motion';

const ROOTS = [
  { id: 'about', label: 'About', x: 110, endX: 30, endY: 120 },
  { id: 'resume', label: 'Resume', x: 220, endX: 160, endY: 130 },
  { id: 'projects', label: 'Projects', x: 330, endX: 310, endY: 135 },
  { id: 'ministry', label: 'Ministry', x: 440, endX: 460, endY: 130 },
  { id: 'creative', label: 'Creative', x: 560, endX: 620, endY: 125 },
  { id: 'contact', label: 'Contact', x: 680, endX: 760, endY: 115 },
] as const;

export function Roots() {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="w-full" style={{ maxWidth: 900, margin: '0 auto' }}>
      <svg viewBox="0 0 800 160" className="w-full h-auto">
        {ROOTS.map((root, i) => {
          const startX = 400;
          const startY = 0;
          const midX = (startX + root.endX) / 2;
          const midY = root.endY * 0.6;
          const pathD = `M ${startX} ${startY} Q ${midX} ${midY} ${root.endX} ${root.endY}`;

          return (
            <g key={root.id}>
              <motion.path
                d={pathD}
                fill="none"
                stroke="var(--tree-line)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.25 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
              />

              <motion.g
                role="link"
                tabIndex={0}
                aria-label={`Navigate to ${root.label}`}
                onClick={() => scrollTo(root.id)}
                onKeyDown={(e) => { if (e.key === 'Enter') scrollTo(root.id); }}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <text
                  x={root.endX}
                  y={root.endY + 18}
                  textAnchor="middle"
                  fontSize={12}
                  fontFamily="var(--font-display)"
                  fill="var(--text-primary)"
                  opacity={0.7}
                >
                  {root.label}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
