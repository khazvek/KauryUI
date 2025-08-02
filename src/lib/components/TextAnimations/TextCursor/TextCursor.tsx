import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './TextCursor.css';

interface TextCursorProps {
  text: string;
  delay?: number;
  spacing?: number;
  followMouseDirection?: boolean;
  randomFloat?: boolean;
  exitDuration?: number;
  removalInterval?: number;
  maxPoints?: number;
  className?: string;
}

interface TextPoint {
  id: number;
  x: number;
  y: number;
  char: string;
  timestamp: number;
}

export const TextCursor: React.FC<TextCursorProps> = ({
  text,
  delay = 0.05,
  spacing = 50,
  followMouseDirection = true,
  randomFloat = false,
  exitDuration = 0.5,
  removalInterval = 100,
  maxPoints = 20,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [textPoints, setTextPoints] = useState<TextPoint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const charIndexRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePos({ x, y });

      // Add new text point
      const now = Date.now();
      const char = text[charIndexRef.current % text.length];
      charIndexRef.current++;

      setTextPoints(prev => {
        const newPoints = [...prev, {
          id: now,
          x: x + (randomFloat ? (Math.random() - 0.5) * 20 : 0),
          y: y + (randomFloat ? (Math.random() - 0.5) * 20 : 0),
          char,
          timestamp: now
        }];

        // Limit number of points
        return newPoints.slice(-maxPoints);
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [text, randomFloat, maxPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTextPoints(prev => 
        prev.filter(point => now - point.timestamp < removalInterval * 100)
      );
    }, removalInterval);

    return () => clearInterval(interval);
  }, [removalInterval]);

  return (
    <div ref={containerRef} className={`text-cursor-container ${className}`}>
      {textPoints.map((point) => (
        <motion.span
          key={point.id}
          className="cursor-char"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: exitDuration, delay: delay }}
          style={{
            position: 'absolute',
            left: point.x,
            top: point.y,
            pointerEvents: 'none'
          }}
        >
          {point.char}
        </motion.span>
      ))}
    </div>
  );
};