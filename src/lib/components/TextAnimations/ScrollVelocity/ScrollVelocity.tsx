import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useVelocity } from 'framer-motion';
import './ScrollVelocity.css';

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts,
  velocity = 1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  const skewX = useTransform(scrollVelocity, [-1000, 1000], [-10, 10]);
  const scale = useTransform(scrollVelocity, [-1000, 0, 1000], [0.9, 1, 1.1]);

  return (
    <div ref={containerRef} className={`scroll-velocity-container ${className}`}>
      {texts.map((text, index) => (
        <motion.div
          key={index}
          className="velocity-text"
          style={{
            skewX,
            scale,
            x: useTransform(scrollY, [0, 1000], [0, -200 * velocity])
          }}
        >
          {text.repeat(5)}
        </motion.div>
      ))}
    </div>
  );
};