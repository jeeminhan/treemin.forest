import Link from 'next/link';

type Props = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

export function DockItem({ label, icon, href }: Props) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-0 px-3 py-1.5 rounded-lg transition-all duration-150 hover:bg-[var(--bg-surface-hover)] active:scale-95 group"
    >
      <span className="flex items-center justify-center w-7 h-7 text-lg transition-transform duration-150 group-hover:scale-110 group-hover:-translate-y-0.5">
        {icon}
      </span>
      <span
        className="text-[0.625rem] font-medium mt-0.5"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </span>
    </Link>
  );
}
