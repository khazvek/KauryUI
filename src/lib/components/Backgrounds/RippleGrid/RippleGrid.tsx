import React, { useRef, useEffect } from 'react';
import './RippleGrid.css';

interface RippleGridProps {
  className?: string;
}

export const RippleGrid: React.FC<RippleGridProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 150,
        opacity: 1
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('click', handleClick);

    // Auto-generate ripples
    const autoRipple = () => {
      const rect = container.getBoundingClientRect();
      ripples.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        radius: 0,
        maxRadius: 100 + Math.random() * 100,
        opacity: 1
      });
    };

    const autoRippleInterval = setInterval(autoRipple, 2000);

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Background grid
      const gridSize = 20;
      ctx.strokeStyle = 'rgba(100, 100, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw ripples
      ripples.forEach((ripple, index) => {
        ripple.radius += 2;
        ripple.opacity = Math.max(0, 1 - ripple.radius / ripple.maxRadius);

        if (ripple.opacity > 0) {
          ctx.strokeStyle = `rgba(100, 200, 255, ${ripple.opacity})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (ripple.radius >= ripple.maxRadius) {
          ripples.splice(index, 1);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('click', handleClick);
      clearInterval(autoRippleInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`ripple-grid-container ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};