import React from 'react';

export default function SignatureBadge({
  fixed = true,
  href,
}: {
  fixed?: boolean;
  href?: string;
}) {
  const containerClass = fixed ? 'uchi-sign uchi-sign--fixed' : 'uchi-sign';

  const body = (
    <div className={containerClass} aria-label="Yanouzla & TheUchiwa signature">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .uchi-sign {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          user-select: none;
          text-align: right;
          pointer-events: none; /* don't block UI */
        }
        .uchi-sign--fixed {
          position: fixed;
          right: 20px;
          bottom: 16px;
          z-index: 9999;
        }
        .sig-font { font-family: 'Great Vibes', cursive; }
        .sig-gold {
          background: linear-gradient(90deg, #d4af37, #ffd700, #b8860b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 6px rgba(255, 215, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.4);
          animation: glow 3s ease-in-out infinite;
          white-space: nowrap;
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 6px rgba(255, 215, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.4); }
          50% { text-shadow: 0 0 14px rgba(255, 215, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.8); }
        }
        .sig-top { font-size: 28px; line-height: 1; position: relative; }
        .sig-bottom { font-size: 22px; line-height: 1; position: relative; }
        @media (min-width: 768px) {
          .sig-top { font-size: 36px; }
          .sig-bottom { font-size: 28px; }
        }
        .sig-underline::after {
          content: "";
          position: absolute;
          left: 5%; right: 5%; bottom: -6px;
          height: 2px;
          background: linear-gradient(90deg, #b8860b, #ffd700, #b8860b);
          animation: draw 2s ease forwards;
        }
        @keyframes draw {
          from { transform: scaleX(0); transform-origin: left; }
          to { transform: scaleX(1); transform-origin: left; }
        }
        .uchi-link { text-decoration: none; pointer-events: auto; }
      `}</style>

      <div className="sig-top">
        <span className="sig-font sig-gold">Yanouzla</span>
      </div>

      <div className="sig-bottom sig-underline">
        <span className="sig-font sig-gold">TheUchiwa</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="uchi-link" aria-label="Visit signature link">
        {body}
      </a>
    );
  }
  return body;
}


