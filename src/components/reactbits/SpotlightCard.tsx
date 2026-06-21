import type { CSSProperties, PropsWithChildren } from 'react';

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
}

type SpotlightStyle = CSSProperties & {
  '--spotlight-x'?: string;
  '--spotlight-y'?: string;
};

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  return (
    <article
      className={`spotlight-card ${className}`}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        event.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
        event.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
      }}
      style={{ '--spotlight-x': '50%', '--spotlight-y': '30%' } as SpotlightStyle}
    >
      {children}
    </article>
  );
}
