'use client';
import { DockItem } from './dock-item';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const dockItems = [
  { id: 'about', label: 'About', icon: '\u{1F464}', href: '/about' },
  { id: 'resume', label: 'Resume', icon: '\u{1F4C4}', href: '/resume' },
  { id: 'creative', label: 'Creative', icon: '\u{1F3A8}', href: '/creative' },
  { id: 'contact', label: 'Contact', icon: '\u{2709}\u{FE0F}', href: '/contact' },
];

export function Dock() {
  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 px-2 py-1.5 rounded-[14px] border border-[var(--border-default)] max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:translate-x-0 max-md:rounded-none max-md:border-x-0 max-md:border-b-0 max-md:justify-around max-md:pb-[calc(0.375rem+env(safe-area-inset-bottom))]"
      style={{
        background: 'var(--bg-dock)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        boxShadow: 'var(--shadow-dock)',
      }}
      aria-label="Main navigation"
    >
      {dockItems.map(item => (
        <DockItem key={item.id} {...item} />
      ))}
      {/* Divider - hidden on mobile */}
      <div className="w-px h-6 mx-1 max-md:hidden" style={{ background: 'var(--border-default)' }} />
      {/* Theme toggle - hidden on mobile */}
      <div className="max-md:hidden">
        <ThemeToggle />
      </div>
    </nav>
  );
}
