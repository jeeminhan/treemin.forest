'use client';

import { useState, useEffect } from 'react';

function WifiIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.86a10 10 0 0 1 14 0" />
      <path d="M8.5 16.43a5 5 0 0 1 7 0" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 24 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="1" width="18" height="12" rx="2" />
      <rect x="3" y="3" width="14" height="8" rx="1" fill="currentColor" opacity="0.4" />
      <path d="M21 5v4" strokeWidth="2" />
    </svg>
  );
}

const cstFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Chicago',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

const cstDayFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Chicago',
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

const jstDateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
});

const jstTimeFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function formatCST(date: Date): string {
  const time = cstFormatter.format(date);
  const day = cstDayFormatter.format(date);
  return `${time} · ${day}`;
}

function formatJST(date: Date): string {
  const dateStr = jstDateFormatter.format(date);
  const timeStr = jstTimeFormatter.format(date);
  return `${dateStr} ${timeStr}`;
}

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const cstText = formatCST(now);
  const jstText = formatJST(now);

  return (
    <span
      className="relative cursor-default pointer-events-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="inline-block transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        {cstText}
      </span>
      <span
        className="absolute inset-0 inline-block transition-opacity duration-300 whitespace-nowrap"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        {jstText}
      </span>
    </span>
  );
}

export function OsChrome() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2 pointer-events-none"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-tertiary)',
      }}
    >
      <span>jeemin@han ~</span>

      <div className="flex items-center gap-3">
        <Clock />

        <span className="flex items-center gap-1 pointer-events-auto">
          <WifiIcon />
          <span>han-network-5G</span>
        </span>

        <span className="flex items-center gap-1 pointer-events-auto">
          <BatteryIcon />
          <span>100%</span>
        </span>
      </div>
    </div>
  );
}
