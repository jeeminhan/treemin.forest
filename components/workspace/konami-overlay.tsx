'use client';
import { motion, AnimatePresence } from 'framer-motion';

export function KonamiOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[600] flex items-start justify-center pt-8 pointer-events-none"
        >
          <div className="px-6 py-3 rounded-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-window)' }}>
            <p className="text-sm italic" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
              &ldquo;I look at how things currently work, see what they could be, and redesign them.&rdquo;
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
