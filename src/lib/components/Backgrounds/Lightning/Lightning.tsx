import React, { useRef, useEffect } from 'react';
import './Lightning.css';

interface LightningProps {
  className?: string;
}

export const Lightning: React.FC<LightningProps> = ({ className = '' }) => {
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

    const lightningBolts: Array<{
      points: Array<{ x: number; y: number }>;
      opacity: number;
      life: number;
      maxLife: number;
    }> = [];

    const createLightningBolt = (startX: number, startY: number, endX: number, endY: number) => {
      const points = [{ x: startX, y: startY }];
      const segments = 20;
      
      for (let i = 1; i < segments; i++) {
        const progress = i / segments;
        const x = startX + (endX - startX) * progress + (Math.random() - 0.5) * 50;
        const y = startY + (endY - startY) * progress + (Math.random() - 0.5) * 30;
        points.push({ x, y });
      }
      
      points.push({ x: endX, y: endY });
      
      return {
        points,
        opacity: 1,
        life: 0,
        maxLife: 30 + Math.random() * 20
      };
    };

    let lastBoltTime = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Create new lightning bolts occasionally
      if (Date.now() - lastBoltTime > 1000 + Math.random() * 2000) {
        const startX = Math.random() * width;
        const startY = 0;
        const endX = Math.random() * width;
        const endY = height;
        
        lightningBolts.push(createLightningBolt(startX, startY, endX, endY));
        lastBoltTime = Date.now();
      }

      // Draw and update lightning bolts
      lightningBolts.forEach((bolt, index) => {
        bolt.life++;
        bolt.opacity = Math.max(0, 1 - bolt.life / bolt.maxLife);

        if (bolt.opacity > 0) {
          ctx.strokeStyle = `rgba(150, 200, 255, ${bolt.opacity})`;
          ctx.lineWidth = 2 + Math.random() * 3;
          ctx.lineCap = 'round';
          ctx.shadowColor = 'rgba(150, 200, 255, 0.8)';
          ctx.shadowBlur = 10;

          ctx.beginPath();
          bolt.points.forEach((point, i) => {
            if (i === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.stroke();

          ctx.shadowBlur = 0;
        }

        if (bolt.life >= bolt.maxLife) {
          lightningBolts.splice(index, 1);
        }
      });

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
    <div className={`lightning-container ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};