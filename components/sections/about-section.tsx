import { SectionWrapper } from './section-wrapper';

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-[0.625rem] font-medium uppercase tracking-[0.08em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        {label}
      </div>
      <div className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
        {value}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <h2
        className="text-lg font-semibold leading-snug mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
      >
        I look at how things currently work, see what they could be, and redesign them.
      </h2>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
        Builder who sees problems as puzzles, learns whatever is needed to solve them, and creates
        tools that help others think, express themselves, and find meaning.
      </p>
      <div
        className="grid grid-cols-2 gap-4 pt-4 border-t max-sm:grid-cols-1"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <Meta label="Languages" value="English, Korean (working), Japanese (JLPT N2)" />
        <Meta label="Currently" value="AI Prototyper at IFI Frontier Commons Innovation Lab" />
        <Meta label="Education" value="Texas A&M, BS Computer Engineering, Honors" />
        <Meta label="Clearance" value="DoD Secret" />
      </div>
    </SectionWrapper>
  );
}
