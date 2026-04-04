import { SectionWrapper } from './section-wrapper';

const items = [
  { title: 'Psalm 1', desc: 'Cinematic photography project' },
  { title: 'Thailand Photobook', desc: 'Travel photography' },
  { title: 'Urban Plunge', desc: 'Reflection video' },
  { title: 'Student Impact', desc: 'UI/UX redesign' },
  { title: 'Film Photography', desc: 'Utah, California on Kodak 500T' },
  { title: 'YouTube', desc: 'Storytelling channel' },
  { title: 'Full Portfolio', desc: 'jeeminjameshan.myportfolio.com', href: 'https://jeeminjameshan.myportfolio.com' },
];

export function CreativeSection() {
  return (
    <SectionWrapper id="creative">
      <h2
        className="text-sm font-medium uppercase tracking-[0.08em] mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        Creative
      </h2>
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {items.map((item) => {
          const inner = (
            <>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {item.title}
                {item.href && <span className="ml-1 text-xs" style={{ color: 'var(--accent)' }}>↗</span>}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.desc}</div>
            </>
          );
          const cls = "block p-4 rounded border transition-colors hover:bg-[var(--bg-surface-hover)]";
          const s = { background: 'var(--bg-surface)', borderColor: 'var(--border-default)' };

          return item.href ? (
            <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={cls} style={s}>{inner}</a>
          ) : (
            <div key={item.title} className={cls} style={s}>{inner}</div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
