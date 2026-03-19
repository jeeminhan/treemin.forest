'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/use-theme';

type Position = { x: number; y: number };

export function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { resolved, setTheme } = useTheme();

  const close = useCallback(() => setVisible(false), []);

  // Right-click handler — only fires on the workspace background
  useEffect(() => {
    function handleContextMenu(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Only show on the workspace background div itself,
      // not on interactive children (icons, windows, dock, etc.)
      const isWorkspaceBg = target.closest('[data-workspace-bg]');
      const isInteractive = target.closest(
        'a, button, [data-no-context-menu], [role="dialog"], nav'
      );

      if (!isWorkspaceBg || isInteractive) return;

      e.preventDefault();

      // Clamp position so the menu doesn't overflow the viewport
      const menuWidth = 220;
      const menuHeight = 200;
      const x = Math.min(e.clientX, window.innerWidth - menuWidth);
      const y = Math.min(e.clientY, window.innerHeight - menuHeight);

      setPosition({ x, y });
      setVisible(true);
    }

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // Close on click outside or Escape
  useEffect(() => {
    if (!visible) return;

    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, close]);

  function handleChangeWallpaper() {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
    close();
  }

  function handleGetInfo() {
    router.push('/about');
    close();
  }

  function handleOpenTerminal() {
    console.log('[JEEMIN OS] Terminal opened (placeholder)');
    close();
  }

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      className="fixed z-[9999] min-w-[200px] py-1 animate-context-menu-in"
      style={{
        top: position.y,
        left: position.x,
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        borderRadius: '8px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Group 1: Wallpaper */}
      <MenuItem onClick={handleChangeWallpaper}>Change Wallpaper</MenuItem>

      <Separator />

      {/* Group 2: File operations */}
      <MenuItem disabled>New Folder</MenuItem>

      <Separator />

      {/* Group 3: Info & Tools */}
      <MenuItem onClick={handleGetInfo}>Get Info</MenuItem>
      <MenuItem onClick={handleOpenTerminal}>Open Terminal</MenuItem>
    </div>
  );
}

function MenuItem({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      role="menuitem"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className="w-full text-left block select-none"
      style={{
        padding: '8px 12px',
        fontSize: '13px',
        fontFamily: 'var(--font-body)',
        color: 'var(--text-primary)',
        cursor: disabled ? 'not-allowed' : 'default',
        opacity: disabled ? 0.4 : 1,
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        margin: '0 4px',
        width: 'calc(100% - 8px)',
        transition: 'background-color 0.1s ease',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            'var(--bg-surface-hover)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      {children}
    </button>
  );
}

function Separator() {
  return (
    <div
      style={{
        height: '1px',
        backgroundColor: 'var(--border-default)',
        margin: '4px 0',
      }}
    />
  );
}
