import React, { useEffect, useRef } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText: string;
  speed?: number;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  className?: string;
}

export const CurvedLoop: React.FC<CurvedLoopProps> = ({
  marqueeText,
  speed = 1,
  curveAmount = 300,
  direction = 'right',
  interactive = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;

    const container = containerRef.current;
    const path = pathRef.current;

    // Create curved path
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const pathData = `M 0,${height/2} Q ${width/2},${height/2 - curveAmount} ${width},${height/2}`;
    path.setAttribute('d', pathData);

    // Animation
    const textElement = container.querySelector('.curved-text') as HTMLElement;
    if (textElement) {
      const animationDuration = 10 / speed;
      textElement.style.animationDuration = `${animationDuration}s`;
      textElement.style.animationDirection = direction === 'left' ? 'reverse' : 'normal';
    }
  }, [speed, curveAmount, direction]);

  return (
    <div 
      ref={containerRef}
      className={`curved-loop-container ${className} ${interactive ? 'interactive' : ''}`}
    >
      <svg className="curved-path" viewBox="0 0 400 200">
        <defs>
          <path ref={pathRef} id="curve" />
        </defs>
        <text className="curved-text">
          <textPath href="#curve" startOffset="0%">
            {marqueeText.repeat(3)}
          </textPath>
        </text>
      </svg>
    </div>
  );
};