'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type HistoryEntry = {
  type: 'input' | 'output';
  text: string;
};

const commands: Record<string, (args: string) => string | string[]> = {
  whoami: () => 'Jeemin Han \u2014 engineer, prototyper, creative',
  help: () => [
    'Available commands:',
    '  whoami          Who am I?',
    '  ls projects/    List portfolio projects',
    '  cat vision.txt  Read the vision statement',
    '  cd tokyo        Travel to Tokyo',
    '  cd kyoto        Travel to Kyoto',
    '  manga --list    Browse the collection',
    '  locale          Show system locale',
    '  clear           Clear terminal',
    '  exit            Close terminal',
    '  sudo rm -rf /   Nice try',
  ],
  'ls projects/': () => [
    'shaberu.app        campus-reach.app   translate-practice.app',
    'greek-explorer.app n2-vocab.app       halfway.app',
    'ism-journey.app    common-lore.app    global-atlas.app',
    'workout-buddy.data mu-sentiment.data  merror.data',
    'jazz.app           interview-koro.app',
  ],
  'cat vision.txt': () => [
    'A life devoted to tangibly helping others',
    'discover meaning and express themselves creatively.',
    '',
    'Creating spaces where people can explore',
    'identity, culture, and purpose.',
    '',
    '"I\'m not wandering. I know what I\'m trying to do.',
    'What exactly it will end up being,',
    'I\'m waiting on Him to open those doors."',
  ],
  'cd tokyo': () => [
    '~changed directory to ~/tokyo',
    '',
    'Lived here 2023-2024 with Cru Japan.',
    'Digital strategies, language study, ramen exploration.',
  ],
  'cd kyoto': () => [
    '~changed directory to ~/kyoto',
    '',
    'Moved here 2024-2025.',
    'Temple runs, film photography, deeper roots.',
  ],
  'manga --list': () => [
    'installing memories...',
    '',
    '\u{1F4E6} one-piece@1056        \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 complete',
    '\u{1F4E6} slam-dunk@31          \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 complete',
    '\u{1F4E6} haikyuu@45            \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 complete',
    '\u{1F4E6} blue-period@14        \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591 ongoing',
    '\u{1F4E6} chainsaw-man@17       \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591 ongoing',
    '',
    '5 packages installed. 0 vulnerabilities.',
  ],
  locale: () => 'ja_JP.UTF-8 / en_US.UTF-8',
  'sudo rm -rf /': () => 'Permission denied. This portfolio is immutable.',
  clear: () => '__CLEAR__',
  exit: () => '__EXIT__',
};

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getPrompt = useCallback(() => {
    return `jeemin@han ${currentDir} $`;
  }, [currentDir]);

  // Cmd+K / Ctrl+K toggle and Escape close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to let animation start before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, currentInput]);

  function executeCommand(input: string) {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add input to history
    const newHistory: HistoryEntry[] = [
      ...history,
      { type: 'input', text: `${getPrompt()} ${trimmed}` },
    ];

    // Look up command - try exact match first, then first word
    let handler = commands[trimmed];
    if (!handler) {
      // Try matching just the command name for simple commands
      const firstWord = trimmed.split(' ')[0];
      if (firstWord === 'clear') handler = commands.clear;
      else if (firstWord === 'exit') handler = commands.exit;
    }

    if (handler) {
      const result = handler(trimmed);

      if (result === '__CLEAR__') {
        setHistory([]);
        setCurrentInput('');
        return;
      }

      if (result === '__EXIT__') {
        setIsOpen(false);
        setCurrentInput('');
        return;
      }

      // Update directory for cd commands
      if (trimmed === 'cd tokyo') {
        setCurrentDir('~/tokyo');
      } else if (trimmed === 'cd kyoto') {
        setCurrentDir('~/kyoto');
      } else if (trimmed === 'cd ~' || trimmed === 'cd') {
        setCurrentDir('~');
      }

      const lines = Array.isArray(result) ? result : [result];
      lines.forEach((line) => {
        newHistory.push({ type: 'output', text: line });
      });
    } else {
      newHistory.push({
        type: 'output',
        text: `command not found: ${trimmed}. Type 'help' for available commands.`,
      });
    }

    setHistory(newHistory);
    setCurrentInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(currentInput);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-[500] flex flex-col"
          style={{ background: '#0A0A0A' }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Scanline overlay for premium feel */}
          <div
            className="pointer-events-none absolute inset-0 z-[501]"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
              mixBlendMode: 'multiply',
            }}
          />

          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4 py-2 border-b select-none shrink-0"
            style={{
              borderColor: 'rgba(39, 202, 64, 0.2)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span
              className="text-xs tracking-wider uppercase"
              style={{ color: 'rgba(39, 202, 64, 0.5)' }}
            >
              JEEMIN OS Terminal
            </span>
            <div className="flex items-center gap-3">
              <span
                className="text-xs"
                style={{ color: 'rgba(39, 202, 64, 0.3)' }}
              >
                ESC to close
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="w-3 h-3 rounded-full hover:brightness-125 transition-all"
                style={{ background: '#FF5F57' }}
                aria-label="Close terminal"
              />
            </div>
          </div>

          {/* Scrollable content */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 md:px-6 py-4"
            style={{
              fontFamily: 'var(--font-mono)',
              color: '#27CA40',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            {/* Welcome message */}
            {history.length === 0 && (
              <div className="mb-4" style={{ color: 'rgba(39, 202, 64, 0.5)' }}>
                <p>Welcome to JEEMIN OS Terminal v1.0</p>
                <p>Type &apos;help&apos; for available commands.</p>
                <p className="mt-1">&mdash;&mdash;&mdash;</p>
              </div>
            )}

            {/* Command history */}
            {history.map((entry, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {entry.type === 'input' ? (
                  <span style={{ color: '#27CA40' }}>{entry.text}</span>
                ) : (
                  <span
                    style={{
                      color: entry.text === '' ? 'transparent' : 'rgba(39, 202, 64, 0.8)',
                    }}
                  >
                    {entry.text || '\u00A0'}
                  </span>
                )}
              </div>
            ))}

            {/* Current input line */}
            <div className="flex items-center">
              <span className="shrink-0" style={{ color: '#27CA40' }}>
                {getPrompt()}{' '}
              </span>
              <span className="relative">
                <span style={{ color: '#27CA40' }}>{currentInput}</span>
                {/* Blinking block cursor */}
                <span
                  className="inline-block w-[8px] h-[16px] align-middle ml-px"
                  style={{
                    background: '#27CA40',
                    animation: 'terminal-blink 1s step-end infinite',
                  }}
                />
              </span>
              {/* Hidden input for capturing keystrokes */}
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 w-0 h-0"
                style={{ pointerEvents: 'none' }}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
