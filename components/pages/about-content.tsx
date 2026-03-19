function MetaGroup({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-[0.625rem] font-medium uppercase tracking-[0.08em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        {label}
      </div>
      <div
        className="text-[0.8125rem] mt-0.5"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
      >
        {value}
      </div>
    </div>
  );
}

export function AboutContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Identity statement */}
      <div>
        <div
          className="text-[0.625rem] font-medium uppercase tracking-[0.08em] mb-2"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
        >
          Identity
        </div>
        <h2
          className="text-lg font-semibold leading-snug"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
        >
          I look at how things currently work, see what they could be, and redesign them.
        </h2>
      </div>

      {/* Bio */}
      <p
        className="text-[0.9375rem] leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        Builder who sees problems as puzzles, learns whatever is needed to solve them, and creates
        tools that help others think, express themselves, and find meaning.
      </p>

      {/* Metadata grid */}
      <div
        className="grid grid-cols-2 gap-4 pt-2 border-t max-sm:grid-cols-1"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <MetaGroup label="LANGUAGES" value="English, Korean (working), Japanese (JLPT N2)" />
        <MetaGroup label="CURRENTLY" value="AI Prototyper at IFI Frontier Commons Innovation Lab" />
        <MetaGroup label="EDUCATION" value="Texas A&M, BS Computer Engineering, Honors, 3.625 GPA, May 2023" />
        <MetaGroup label="CLEARANCE" value="DoD Secret" />
        <MetaGroup label="MAKERSPACE" value="Dallas Makerspace member" />
      </div>
    </div>
  );
}
