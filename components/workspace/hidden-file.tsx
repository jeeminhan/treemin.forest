import Link from 'next/link';

export function HiddenFile() {
  return (
    <Link
      href="/photography"
      className="absolute hidden xl:block"
      style={{ left: '3%', bottom: '8%', width: 8, height: 8, borderRadius: '50%', background: 'var(--text-tertiary)', opacity: 0.08 }}
      aria-label="Hidden file"
    />
  );
}
