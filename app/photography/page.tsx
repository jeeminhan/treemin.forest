export default function PhotographyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0A0A0A', cursor: 'crosshair' }}>
      <div className="w-full max-w-[720px] p-6">
        <h2 className="text-lg font-medium mb-4" style={{ color: '#E5E5E5', fontFamily: 'var(--font-display)' }}>
          Film Photography — Kodak 500T
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/2] rounded border" style={{ background: '#1A1A1A', borderColor: '#333' }} />
          ))}
        </div>
        <p className="mt-4 text-xs" style={{ color: '#5C5C58', fontFamily: 'var(--font-mono)' }}>
          Utah · California · 2024
        </p>
      </div>
    </div>
  );
}
