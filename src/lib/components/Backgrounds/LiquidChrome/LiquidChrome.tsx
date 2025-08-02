import React from 'react';
import './LiquidChrome.css';

interface LiquidChromeProps {
  className?: string;
}

export const LiquidChrome: React.FC<LiquidChromeProps> = ({ className = '' }) => {
  return (
    <div 
      className={`liquidChrome-container ${className}`}
      style={{
        background: `
          radial-gradient(circle at 25% 25%, #c0c0c0 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, #e6e6e6 0%, transparent 50%),
          linear-gradient(45deg, #808080, #c0c0c0, #e6e6e6, #c0c0c0, #808080),
          linear-gradient(-45deg, #a0a0a0, #d0d0d0, #f0f0f0, #d0d0d0, #a0a0a0)
        `,
        backgroundSize: '200% 200%, 200% 200%, 400% 400%, 400% 400%',
        animation: 'liquidChrome 8s ease-in-out infinite',
        width: '100%',
        height: '100%',
        filter: 'blur(1px) contrast(1.2) brightness(1.1)'
      }}
    >
      <style jsx>{`
        @keyframes liquidChrome {
          0%, 100% {
            background-position: 0% 0%, 100% 100%, 0% 50%, 100% 50%;
          }
          25% {
            background-position: 100% 0%, 0% 100%, 25% 75%, 75% 25%;
          }
          50% {
            background-position: 100% 100%, 0% 0%, 50% 100%, 50% 0%;
          }
          75% {
            background-position: 0% 100%, 100% 0%, 75% 25%, 25% 75%;
          }
        }
      `}</style>
    </div>
  );
};