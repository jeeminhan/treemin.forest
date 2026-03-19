const experience = [
  {
    date: 'Dec 2025–Present',
    role: 'AI Prototyper',
    company: 'IFI Frontier Commons',
    description: 'AI-powered prototypes, workflow automation, technical onboarding',
  },
  {
    date: '2023–2025',
    role: 'Digital Strategies',
    company: 'Cru Japan',
    description: 'Tokyo then Kyoto',
  },
  {
    date: 'Summer 2022',
    role: 'SWE Intern',
    company: 'Raytheon I&S',
    description: 'DevSecOps, Jenkins pipelines',
  },
  {
    date: '2021',
    role: 'Software Engineer',
    company: 'KCF Technologies',
    description: 'Python SDK testing, .NET backend',
  },
];

function TimelineEntry({
  date,
  role,
  company,
  description,
}: {
  date: string;
  role: string;
  company: string;
  description: string;
}) {
  return (
    <div
      className="grid grid-cols-[140px_1fr] gap-4 py-3 border-b last:border-b-0 max-sm:grid-cols-1 max-sm:gap-1"
      style={{ borderColor: 'var(--border-default)' }}
    >
      <div
        className="text-[0.75rem] text-right max-sm:text-left"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        {date}
      </div>
      <div>
        <div
          className="text-[0.9375rem]"
          style={{ color: 'var(--text-primary)' }}
        >
          {role} <span style={{ color: 'var(--text-tertiary)' }}>at</span> {company}
        </div>
        <div
          className="text-[0.8125rem] mt-0.5"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

export function ResumeContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Experience */}
      <div>
        <div
          className="text-[0.625rem] font-medium uppercase tracking-[0.08em] mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
        >
          Experience
        </div>
        <div>
          {experience.map((entry) => (
            <TimelineEntry key={entry.date} {...entry} />
          ))}
        </div>
      </div>

      {/* Education */}
      <div
        className="pt-2 border-t"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div
          className="text-[0.625rem] font-medium uppercase tracking-[0.08em] mb-2"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
        >
          Education
        </div>
        <div
          className="text-[0.9375rem]"
          style={{ color: 'var(--text-primary)' }}
        >
          Texas A&amp;M University
        </div>
        <div
          className="text-[0.8125rem] mt-0.5"
          style={{ color: 'var(--text-secondary)' }}
        >
          BS Computer Engineering, Honors, 3.625 GPA, May 2023
        </div>
      </div>

      {/* Download PDF */}
      <div>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[0.8125rem] font-medium transition-opacity hover:opacity-80"
          style={{
            background: 'var(--accent)',
            color: 'var(--bg-elevated)',
          }}
        >
          Download PDF
          <span aria-hidden="true">&darr;</span>
        </a>
      </div>
    </div>
  );
}
