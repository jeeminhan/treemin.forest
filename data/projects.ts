export type Cluster =
  | 'ai-language'
  | 'ministry-community'
  | 'ml-data'
  | 'creative-play';

export type Project = {
  id: string;
  name: string;
  displayName: string;
  cluster: Cluster;
  position: { x: number; y: number };
  tier: 1 | 2 | 3;
  icon: string;
  subtitle?: string;
  techStack: string[];
  year: number;
  commits?: number;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  story: string;
};

export const clusters: Record<Cluster, { label: string; labelJa?: string }> = {
  'ai-language': { label: 'AI & Language', labelJa: 'AI\u30FB\u8A00\u8A9E' },
  'ministry-community': {
    label: 'Ministry & Community',
    labelJa: '\u5BA3\u6559\u30FB\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3',
  },
  'ml-data': {
    label: 'ML & Data',
    labelJa: '\u6A5F\u68B0\u5B66\u7FD2\u30FB\u30C7\u30FC\u30BF',
  },
  'creative-play': {
    label: 'Creative & Play',
    labelJa: '\u5275\u4F5C\u30FB\u904A\u3073',
  },
};

export const projects: Project[] = [
  // ── AI & Language (upper-left) ──────────────────────────────────────
  {
    id: 'shaberu',
    name: 'shaberu',
    displayName: 'shaberu.app',
    cluster: 'ai-language',
    position: { x: 15, y: 18 },
    tier: 1,
    icon: '/icons/shaberu.svg',
    subtitle: '\u3057\u3083\u3079\u308B',
    techStack: ['Next.js', 'Gemini', 'PWA'],
    year: 2026,
    commits: 47,
    githubUrl: 'https://github.com/jeeminhan/shaberu',
    description:
      'Japanese speaking practice PWA \u2014 Gemini Live API, tool use, live audio, AI corrections.',
    story:
      'I was learning Japanese on my own and saw a gap \u2014 no tool that let you practice speaking with real-time AI feedback tuned to your actual vocabulary level. So I built one.',
  },
  {
    id: 'campus-reach',
    name: 'campus-reach',
    displayName: 'campus-reach.app',
    cluster: 'ai-language',
    position: { x: 8, y: 35 },
    tier: 2,
    icon: '/icons/campus-reach.svg',
    techStack: ['Next.js', 'Joshua Project API'],
    year: 2026,
    githubUrl: 'https://github.com/jeeminhan/Campus-Reach',
    description:
      'Explore international student origins \u00D7 unreached people groups.',
    story:
      'International students come from everywhere \u2014 but some come from places with almost no access to the gospel. I built a tool to make that visible.',
  },
  {
    id: 'translate-practice',
    name: 'translate-practice',
    displayName: 'translate-practice.app',
    cluster: 'ai-language',
    position: { x: 22, y: 32 },
    tier: 3,
    icon: '/icons/translate-practice.svg',
    techStack: ['Next.js'],
    year: 2026,
    description: 'Translation practice app.',
    story: '',
  },
  {
    id: 'greek-word-explorer',
    name: 'greek-word-explorer',
    displayName: 'greek-word-explorer.app',
    cluster: 'ai-language',
    position: { x: 12, y: 48 },
    tier: 3,
    icon: '/icons/greek-word-explorer.svg',
    techStack: ['React', 'Supabase'],
    year: 2025,
    description: 'Greek vocabulary exploration.',
    story: '',
  },
  {
    id: 'n2-visual-vocab',
    name: 'n2-visual-vocab',
    displayName: 'n2-visual-vocab.app',
    cluster: 'ai-language',
    position: { x: 25, y: 46 },
    tier: 3,
    icon: '/icons/n2-visual-vocab.svg',
    techStack: ['SRS Algorithm', 'Supabase'],
    year: 2025,
    description: 'Spaced repetition for Japanese N2.',
    story: '',
  },

  // ── Ministry & Community (upper-right) ──────────────────────────────
  {
    id: 'halfway',
    name: 'halfway',
    displayName: 'halfway.app',
    cluster: 'ministry-community',
    position: { x: 72, y: 15 },
    tier: 1,
    icon: '/icons/halfway.svg',
    techStack: ['Next.js'],
    year: 2026,
    commits: 83,
    description:
      'Philosophical reflection app \u2014 encounter capture, keepsakes, prompts.',
    story:
      'People in ministry have meaningful encounters every day that just disappear. I wanted to give them a way to capture and reflect on those moments.',
  },
  {
    id: 'ism-journey-map',
    name: 'ism-journey-map',
    displayName: 'ism-journey-map.app',
    cluster: 'ministry-community',
    position: { x: 82, y: 28 },
    tier: 2,
    icon: '/icons/ism-journey-map.svg',
    techStack: ['Next.js'],
    year: 2025,
    description: 'Journey mapping for International Student Ministry.',
    story: '',
  },
  {
    id: 'common-lore',
    name: 'common-lore',
    displayName: 'common-lore.app',
    cluster: 'ministry-community',
    position: { x: 68, y: 32 },
    tier: 3,
    icon: '/icons/common-lore.svg',
    techStack: [],
    year: 2025,
    description:
      'Card game viewer for ISM \u2014 suit-based organization.',
    story: '',
  },
  {
    id: 'global-atlas',
    name: 'global-atlas',
    displayName: 'global-atlas.app',
    cluster: 'ministry-community',
    position: { x: 78, y: 42 },
    tier: 3,
    icon: '/icons/global-atlas.svg',
    techStack: [],
    year: 2025,
    description:
      'Dice game with map navigation \u2014 endless scrolling maps.',
    story: '',
  },

  // ── ML & Data (lower-left) ─────────────────────────────────────────
  {
    id: 'workout-buddy',
    name: 'workout-buddy',
    displayName: 'workout-buddy.data',
    cluster: 'ml-data',
    position: { x: 14, y: 68 },
    tier: 2,
    icon: '/icons/workout-buddy.svg',
    techStack: ['Python', 'MediaPipe', 'OpenCV', 'Raspberry Pi'],
    year: 2023,
    commits: 81,
    description:
      'ML workout form critique \u2014 MediaPipe/OpenCV pose detection on Raspberry Pi.',
    story: '',
  },
  {
    id: 'mu-sentiment',
    name: 'mu-sentiment',
    displayName: 'mu-sentiment.data',
    cluster: 'ml-data',
    position: { x: 8, y: 80 },
    tier: 1,
    icon: '/icons/mu-sentiment.svg',
    techStack: ['NLP', 'NLTK', 'scikit-learn'],
    year: 2023,
    description:
      'Music sentiment \u00D7 CDC depression data \u2014 Datathon 2nd Place.',
    story:
      'At a datathon, I saw a puzzle: could you measure whether music sentiment tracks with national mental health data? 2nd place said yes.',
  },
  {
    id: 'merror',
    name: 'merror',
    displayName: 'merror.app',
    cluster: 'ml-data',
    position: { x: 24, y: 78 },
    tier: 3,
    icon: '/icons/merror.svg',
    techStack: ['Django', 'OpenCV'],
    year: 2022,
    description:
      'Django app with OpenCV face detection + Weather/News/Calendar APIs.',
    story: '',
  },

  // ── Creative & Play (lower-right) ──────────────────────────────────
  {
    id: 'jazz',
    name: 'jazz',
    displayName: 'jazz.app',
    cluster: 'creative-play',
    position: { x: 76, y: 72 },
    tier: 2,
    icon: '/icons/jazz.svg',
    techStack: [],
    year: 2025,
    description:
      'Jazz Quest \u2014 guitar trainer and chord progression analyzer.',
    story: '',
  },
  {
    id: 'interview-koro',
    name: 'interview-koro',
    displayName: 'interview-koro.app',
    cluster: 'creative-play',
    position: { x: 84, y: 82 },
    tier: 3,
    icon: '/icons/interview-koro.svg',
    techStack: [],
    year: 2025,
    description:
      'WaniKani-style interview prep with leveling system.',
    story: '',
  },
];
