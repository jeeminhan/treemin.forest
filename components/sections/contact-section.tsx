import { SectionWrapper } from './section-wrapper';

const links = [
  { label: 'Email', href: 'mailto:Jeeminjameshan@gmail.com', display: 'Jeeminjameshan@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jeemin', display: 'linkedin.com/in/jeemin' },
  { label: 'GitHub', href: 'https://github.com/jeeminhan', display: 'github.com/jeeminhan' },
];

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <h2
        className="text-sm font-medium uppercase tracking-[0.08em] mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        Contact
      </h2>
      <div className="space-y-0">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="flex items-baseline gap-3 py-3 border-b last:border-b-0 rounded -mx-2 px-2 transition-colors hover:bg-[var(--bg-surface-hover)]"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <span
              className="text-[0.625rem] font-medium uppercase tracking-[0.08em] w-16 shrink-0"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
            >
              {link.label}
            </span>
            <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
              {link.display}
            </span>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
