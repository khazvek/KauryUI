import React, { useRef, useEffect } from 'react';
import './Threads.css';

interface ThreadsProps {
  className?: string;
}

export const Threads: React.FC<ThreadsProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const threads: Array<{
      points: Array<{ x: number; y: number }>;
      color: string;
      width: number;
      speed: number;
    }> = [];

    // Initialize threads
    for (let i = 0; i < 8; i++) {
      const points = [];
      const segments = 20;
      
      for (let j = 0; j <= segments; j++) {
        points.push({
          x: (j / segments) * canvas.width,
          y: canvas.height / 2 + Math.sin(j * 0.5) * 50
        });
      }
      
      threads.push({
        points,
        color: `hsl(${i * 45}, 70%, 60%)`,
        width: 1 + Math.random() * 2,
        speed: 0.5 + Math.random() * 1
      });
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, width, height);

      threads.forEach((thread, threadIndex) => {
        // Update thread points
        thread.points.forEach((point, pointIndex) => {
          const wave1 = Math.sin(time * thread.speed + pointIndex * 0.2 + threadIndex) * 30;
          const wave2 = Math.cos(time * thread.speed * 0.7 + pointIndex * 0.15 + threadIndex) * 20;
          
          point.y = height / 2 + wave1 + wave2 + threadIndex * 15 - 60;
        });

        // Draw thread
        ctx.strokeStyle = thread.color;
        ctx.lineWidth = thread.width;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.7;

        ctx.beginPath();
        thread.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            const prevPoint = thread.points[index - 1];
            const cpx = (prevPoint.x + point.x) / 2;
            const cpy = (prevPoint.y + point.y) / 2;
            ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, cpx, cpy);
          }
        });
        ctx.stroke();
      });

      time += 0.016;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`threads-container ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};