const creativeItems = [
  {
    title: 'Psalm 1',
    description: 'Cinematic photography project',
  },
  {
    title: 'Thailand Photobook',
    description: 'Travel photography',
  },
  {
    title: 'Urban Plunge',
    description: 'Reflection video',
  },
  {
    title: 'Student Impact',
    description: 'UI/UX redesign',
  },
  {
    title: 'Film Photography',
    description: 'Utah, California on Kodak 500T',
  },
  {
    title: 'YouTube',
    description: 'Storytelling channel',
  },
  {
    title: 'External Portfolio',
    description: 'Full creative portfolio',
    href: 'https://jeeminjameshan.myportfolio.com',
  },
];

function CreativeCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const inner = (
    <>
      <div
        className="text-[0.9375rem] font-medium"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
        {href && (
          <span
            className="ml-1 text-[0.75rem]"
            style={{ color: 'var(--accent)' }}
            aria-hidden="true"
          >
            &#8599;
          </span>
        )}
      </div>
      <div
        className="text-[0.8125rem] mt-0.5"
        style={{ color: 'var(--text-secondary)' }}
      >
        {description}
      </div>
    </>
  );

  const className =
    'block p-4 rounded-lg border transition-colors hover:bg-[var(--bg-surface-hover)]';
  const style = {
    background: 'var(--bg-surface)',
    borderColor: 'var(--border-default)',
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={className} style={style}>
      {inner}
    </div>
  );
}

export function CreativeContent() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {creativeItems.map((item) => (
          <CreativeCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
