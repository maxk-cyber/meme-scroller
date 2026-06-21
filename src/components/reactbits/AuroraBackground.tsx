import type { PropsWithChildren } from 'react';

interface AuroraBackgroundProps extends PropsWithChildren {
  intensity?: 'soft' | 'loud';
}

export function AuroraBackground({ children, intensity = 'loud' }: AuroraBackgroundProps) {
  return (
    <div className={`aurora-shell aurora-shell--${intensity}`}>
      <div className="aurora-blob aurora-blob--one" />
      <div className="aurora-blob aurora-blob--two" />
      <div className="aurora-blob aurora-blob--three" />
      <div className="noise-grid" />
      {children}
    </div>
  );
}
