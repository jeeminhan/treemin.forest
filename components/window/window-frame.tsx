'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useCallback, useState } from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
};

export function WindowFrame({ title, children, onClose, isOpen = true }: Props) {
  const [titleBarHovered, setTitleBarHovered] = useState(false);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* No backdrop dimming -- desktop stays visible */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            className="relative w-[90vw] max-w-[720px] max-h-[85vh] rounded-xl border overflow-hidden"
            style={{
              background: 'var(--bg-elevated)',
              borderColor: 'var(--border-window)',
              boxShadow: 'var(--shadow-window)',
            }}
          >
            {/* Title bar */}
            <div
              className="h-10 px-3 flex items-center border-b select-none shrink-0"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
              }}
              onMouseEnter={() => setTitleBarHovered(true)}
              onMouseLeave={() => setTitleBarHovered(false)}
            >
              {/* Traffic lights */}
              <div className="flex gap-1.5 items-center">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full transition-colors duration-150 hover:brightness-90"
                  style={{
                    background: titleBarHovered ? '#FF5F57' : 'var(--border-default)',
                  }}
                  aria-label="Close window"
                />
                <div
                  className="w-3 h-3 rounded-full transition-colors duration-150"
                  style={{
                    background: titleBarHovered ? '#FFBD2E' : 'var(--border-default)',
                  }}
                />
                <div
                  className="w-3 h-3 rounded-full transition-colors duration-150"
                  style={{
                    background: titleBarHovered ? '#27CA40' : 'var(--border-default)',
                  }}
                />
              </div>

              {/* Title centered */}
              <span
                className="flex-1 text-center text-[0.8125rem] font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {title}
              </span>

              {/* Spacer to balance traffic lights */}
              <div className="w-[54px]" />
            </div>

            {/* Content */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: 'calc(85vh - 40px)' }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
