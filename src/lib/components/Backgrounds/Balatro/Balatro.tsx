import React, { useRef, useEffect } from 'react';
import './Balatro.css';

interface BalatroProps {
  className?: string;
}

export const Balatro: React.FC<BalatroProps> = ({ className = '' }) => {
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
    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      rotation: number;
    }> = [];

    // Initialize shapes
    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 20 + Math.random() * 60,
        speed: 0.5 + Math.random() * 1.5,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        rotation: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f3460');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.x += Math.sin(time * shape.speed + index) * 2;
        shape.y += Math.cos(time * shape.speed + index) * 1.5;
        shape.rotation += 0.01;

        // Wrap around edges
        if (shape.x > width + shape.size) shape.x = -shape.size;
        if (shape.x < -shape.size) shape.x = width + shape.size;
        if (shape.y > height + shape.size) shape.y = -shape.size;
        if (shape.y < -shape.size) shape.y = height + shape.size;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = shape.color;
        ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        ctx.restore();
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
    <div className={`balatro-container ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};