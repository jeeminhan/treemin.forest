import { SectionWrapper } from './section-wrapper';

const experience = [
  { date: 'Dec 2025–Present', role: 'AI Prototyper', company: 'IFI Frontier Commons', desc: 'AI-powered prototypes, workflow automation, technical onboarding' },
  { date: '2023–2025', role: 'Digital Strategies', company: 'Cru Japan', desc: 'Tokyo then Kyoto' },
  { date: 'Summer 2022', role: 'SWE Intern', company: 'Raytheon I&S', desc: 'DevSecOps, Jenkins pipelines' },
  { date: '2021', role: 'Software Engineer', company: 'KCF Technologies', desc: 'Python SDK testing, .NET backend' },
];

export function ResumeSection() {
  return (
    <SectionWrapper id="resume">
      <h2
        className="text-sm font-medium uppercase tracking-[0.08em] mb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        Experience
      </h2>
      <div className="space-y-0">
        {experience.map((e) => (
          <div
            key={e.date}
            className="grid grid-cols-[120px_1fr] gap-4 py-3 border-b last:border-b-0 max-sm:grid-cols-1 max-sm:gap-1"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
              {e.date}
            </div>
            <div>
              <div className="text-sm" style={{ color: 'var(--text-primary)' }}>
                {e.role} <span style={{ color: 'var(--text-tertiary)' }}>at</span> {e.company}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                {e.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <div className="text-sm" style={{ color: 'var(--text-primary)' }}>Texas A&M University</div>
        <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          BS Computer Engineering, Honors, 3.625 GPA, May 2023
        </div>
      </div>
    </SectionWrapper>
  );
}
