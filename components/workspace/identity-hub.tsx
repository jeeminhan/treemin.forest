export function IdentityHub() {
  return (
    <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-center z-10 select-none">
      <h1
        className="text-[2.5rem] tracking-tight leading-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
      >
        Jeemin Han
      </h1>
      <p
        className="mt-2 text-[0.9375rem] max-w-[400px]"
        style={{ color: 'var(--text-secondary)' }}
      >
        I look at how things currently work, see what they could be, and redesign them.
      </p>
      <p
        className="mt-2 text-[0.6875rem]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
      >
        AI Prototyper @ IFI Frontier Commons
      </p>
    </div>
  );
}
