import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
}

interface ClickSparkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ClickSpark({ children, className = '', onPointerDown, ...buttonProps }: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  return (
    <button
      type="button"
      className={`click-spark ${className}`}
      onPointerDown={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const spark = {
          id: Date.now(),
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };

        setSparks((current) => [...current.slice(-4), spark]);
        onPointerDown?.(event);
      }}
      {...buttonProps}
    >
      {children}
      {sparks.map((spark) => (
        <span
          aria-hidden="true"
          className="spark"
          key={spark.id}
          style={{ left: spark.x, top: spark.y }}
          onAnimationEnd={() => setSparks((current) => current.filter((item) => item.id !== spark.id))}
        />
      ))}
    </button>
  );
}
