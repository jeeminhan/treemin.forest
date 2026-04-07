'use client';

import { motion } from 'framer-motion';

function getGrowthColor(progress: number): string {
  if (progress < 30) return 'var(--growth-seed)';
  if (progress < 60) return 'var(--growth-sprout)';
  if (progress < 85) return 'var(--growth-growing)';
  return 'var(--growth-mature)';
}

function getGrowthLabel(progress: number): string {
  if (progress < 30) return 'seedling';
  if (progress < 60) return 'sprouting';
  if (progress < 85) return 'growing';
  return 'mature';
}

export function ProgressBar({ progress }: { progress: number }) {
  const color = getGrowthColor(progress);
  const label = getGrowthLabel(progress);

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--accent-subtle)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
      <span
        className="text-[0.5625rem] shrink-0"
        style={{ fontFamily: 'var(--font-mono)', color }}
      >
        {progress}% · {label}
      </span>
    </div>
  );
}
