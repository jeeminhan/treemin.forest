import Link from 'next/link';
import { ResumeContent } from '@/components/pages/resume-content';

export const metadata = {
  title: 'Resume — JEEMIN OS',
  description: 'Resume of Jeemin Han',
};

export default function ResumePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'var(--bg-workspace)' }}
    >
      <div
        className="w-full max-w-[720px] rounded-xl border overflow-hidden"
        style={{
          background: 'var(--bg-elevated)',
          borderColor: 'var(--border-window)',
          boxShadow: 'var(--shadow-window)',
        }}
      >
        <div
          className="h-10 px-3 flex items-center border-b select-none"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-default)',
          }}
        >
          <Link
            href="/"
            className="text-xs font-medium px-2 py-1 rounded hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent)' }}
          >
            &larr; Back to Desktop
          </Link>
          <span
            className="flex-1 text-center text-[0.8125rem] font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            Resume
          </span>
          <div className="w-[80px]" />
        </div>
        <ResumeContent />
      </div>
    </div>
  );
}
