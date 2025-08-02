import React, { useRef, useEffect } from 'react';
import './Beams.css';

interface BeamsProps {
  className?: string;
}

export const Beams: React.FC<BeamsProps> = ({ className = '' }) => {
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
    const beams: Array<{
      x: number;
      y: number;
      angle: number;
      length: number;
      width: number;
      speed: number;
      color: string;
    }> = [];

    // Initialize beams
    for (let i = 0; i < 6; i++) {
      beams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        length: 100 + Math.random() * 200,
        width: 2 + Math.random() * 4,
        speed: 0.5 + Math.random() * 1,
        color: `hsl(${180 + Math.random() * 60}, 80%, 70%)`
      });
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Draw beams
      beams.forEach((beam, index) => {
        const x1 = beam.x;
        const y1 = beam.y;
        const x2 = x1 + Math.cos(beam.angle + time * beam.speed) * beam.length;
        const y2 = y1 + Math.sin(beam.angle + time * beam.speed) * beam.length;

        // Create gradient for beam
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, beam.color.replace(')', ', 0)'));
        gradient.addColorStop(0.5, beam.color);
        gradient.addColorStop(1, beam.color.replace(')', ', 0)'));

        ctx.strokeStyle = gradient;
        ctx.lineWidth = beam.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Update beam position
        beam.x += Math.cos(time * 0.5 + index) * 0.5;
        beam.y += Math.sin(time * 0.5 + index) * 0.5;

        // Wrap around
        if (beam.x > width + 100) beam.x = -100;
        if (beam.x < -100) beam.x = width + 100;
        if (beam.y > height + 100) beam.y = -100;
        if (beam.y < -100) beam.y = height + 100;
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
    <div className={`beams-container ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};