import React, { useRef, useEffect } from 'react';
import './Dither.css';

interface DitherProps {
  className?: string;
}

export const Dither: React.FC<DitherProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create dither pattern
    const createDitherPattern = () => {
      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          
          // Create a gradient from top-left to bottom-right
          const gradient = (x + y) / (width + height);
          
          // Apply dithering
          const threshold = ((x % 2) + (y % 2)) / 2;
          const value = gradient > threshold ? 255 : 0;
          
          // Add some color variation
          const hue = (x + y) % 360;
          const color = hslToRgb(hue / 360, 0.5, value / 255);
          
          data[index] = color.r;     // Red
          data[index + 1] = color.g; // Green
          data[index + 2] = color.b; // Blue
          data[index + 3] = 255;     // Alpha
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // HSL to RGB conversion
    const hslToRgb = (h: number, s: number, l: number) => {
      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      };
    };

    createDitherPattern();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className={`dither-container ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};