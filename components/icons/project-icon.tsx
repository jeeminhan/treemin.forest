'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';

const tierSizes = { 1: 64, 2: 48, 3: 40 } as const;

type Props = {
  project: Project;
  index: number;
};

export function ProjectIcon({ project, index }: Props) {
  const size = tierSizes[project.tier];

  return (
    <Link
      href={`/project/${project.id}`}
      className="absolute flex flex-col items-center gap-1.5 group"
      style={{
        left: `${project.position.x}%`,
        top: `${project.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-label={`Open ${project.name}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.4, ease: [0.2, 0, 0, 1] }}
        whileHover={{ y: -2 }}
        className="flex flex-col items-center gap-1.5"
      >
        <div
          className="rounded-[14px] border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden flex items-center justify-center transition-shadow duration-200 group-hover:shadow-[var(--shadow-tile-hover)] group-hover:border-[var(--border-hover)]"
          style={{ width: size, height: size, imageRendering: 'pixelated', boxShadow: 'var(--shadow-tile)' }}
        >
          <Image
            src={project.icon}
            alt={project.name}
            width={size}
            height={size}
            className="object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <span
          className="text-[0.8125rem] font-medium text-center max-w-[88px] leading-tight opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
        >
          {project.displayName}
        </span>
        {project.subtitle && (
          <span className="text-[0.625rem] opacity-0 group-hover:opacity-40 transition-opacity" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            {project.subtitle}
          </span>
        )}
      </motion.div>
    </Link>
  );
}
