import { clusters, type Cluster } from '@/data/projects';

type WatermarkPosition = {
  cluster: Cluster;
  style: React.CSSProperties;
};

const watermarkPositions: WatermarkPosition[] = [
  {
    cluster: 'ai-language',
    style: { left: '5%', top: '10%' },
  },
  {
    cluster: 'ministry-community',
    style: { right: '5%', top: '10%' },
  },
  {
    cluster: 'ml-data',
    style: { left: '5%', bottom: '15%' },
  },
  {
    cluster: 'creative-play',
    style: { right: '5%', bottom: '15%' },
  },
];

export function ClusterWatermarks() {
  return (
    <>
      {watermarkPositions.map(({ cluster, style }) => (
        <span
          key={cluster}
          className="absolute select-none pointer-events-none whitespace-nowrap"
          style={{
            ...style,
            fontFamily: 'var(--font-display)',
            fontSize: '4.5rem',
            color: 'var(--text-primary)',
            opacity: 0.06,
            transition: 'opacity 0.3s ease',
            lineHeight: 1,
          }}
        >
          {clusters[cluster].label}
        </span>
      ))}
    </>
  );
}
