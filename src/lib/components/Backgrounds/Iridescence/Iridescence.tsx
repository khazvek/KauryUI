import React from 'react';
import './Iridescence.css';

interface IridescenceProps {
  className?: string;
}

export const Iridescence: React.FC<IridescenceProps> = ({ className = '' }) => {
  return (
    <div 
      className={`iridescence-container ${className}`}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(119, 255, 198, 0.3) 0%, transparent 50%),
          conic-gradient(from 0deg at 50% 50%, 
            #ff006e, #fb5607, #ffbe0b, #8338ec, #3a86ff, #ff006e)
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 200% 200%',
        animation: 'iridescence 10s ease-in-out infinite',
        width: '100%',
        height: '100%'
      }}
    >
      <style jsx>{`
        @keyframes iridescence {
          0%, 100% {
            background-position: 0% 0%, 0% 0%, 0% 0%, 0% 50%;
          }
          25% {
            background-position: 100% 100%, 0% 0%, 0% 0%, 25% 75%;
          }
          50% {
            background-position: 100% 100%, 100% 100%, 0% 0%, 50% 100%;
          }
          75% {
            background-position: 0% 0%, 100% 100%, 100% 100%, 75% 25%;
          }
        }
      `}</style>
    </div>
  );
};