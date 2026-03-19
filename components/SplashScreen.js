'use client';

import { useState, useEffect } from 'react';

export default function SplashScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay to trigger the CSS fade-in transition
      requestAnimationFrame(() => setShowContent(true));
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx>{`
        .splash-container {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: linear-gradient(135deg, #0a0118 0%, #1a0033 50%, #0d0520 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 99999;
          transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
          overflow: hidden;
        }
        .splash-container.done {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .splash-container::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .splash-logo-wrap {
          position: relative;
          margin-bottom: 40px;
          animation: logoIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .splash-logo-wrap img {
          height: 120px;
          width: auto;
          object-fit: contain;
          animation: logoBeat 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s both;
        }
        @keyframes logoBeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .splash-ecg-wrap {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 1.5rem;
        }
        .splash-ecg-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 16px rgba(124,58,237,0.5));
        }
        .ecg-main {
          stroke: #7c3aed;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: ecgDraw 1s ease-in-out 0.2s forwards;
        }
        .ecg-glow-line {
          stroke: rgba(167,139,250,0.35);
          stroke-width: 6;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: ecgGlowDraw 1s ease-in-out 0.2s forwards;
        }
        @keyframes ecgDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ecgGlowDraw {
          0% { stroke-dashoffset: 1200; opacity: 0.8; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        .splash-tagline {
          margin-top: 28px;
          font-size: 11px;
          color: rgba(196,181,253,0.5);
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0;
          animation: tagIn 0.4s ease-out 0.5s forwards;
        }
        @keyframes tagIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .splash-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd);
          animation: progressFill 1.5s ease-out forwards;
          border-radius: 0 2px 2px 0;
        }
        @keyframes progressFill {
          from { width: 0; }
          to { width: 100%; }
        }

        .splash-content-wrapper {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s;
        }
        .splash-content-wrapper.visible {
          opacity: 1;
          visibility: visible;
        }
      `}</style>

      <div className={`splash-container${!isLoading ? ' done' : ''}`}>
        <div className="splash-logo-wrap">
          <img
            src="https://mozekhealthtech.com/assets/imgs/logo/mozek_4.png"
            alt="Mozek HealthTech"
          />
        </div>

        <div className="splash-ecg-wrap">
          <svg viewBox="0 0 600 120" className="splash-ecg-svg" preserveAspectRatio="none">
            <path
              d="M 0,60 L 60,60 70,55 75,60 80,60 85,45 90,20 95,80 100,60 110,57 120,60 180,60 240,60 250,55 255,60 260,60 265,45 270,20 275,80 280,60 290,57 300,60 360,60 420,60 430,55 435,60 440,60 445,45 450,20 455,80 460,60 470,57 480,60 540,60 600,60"
              className="ecg-glow-line"
            />
            <path
              d="M 0,60 L 60,60 70,55 75,60 80,60 85,45 90,20 95,80 100,60 110,57 120,60 180,60 240,60 250,55 255,60 260,60 265,45 270,20 275,80 280,60 290,57 300,60 360,60 420,60 430,55 435,60 440,60 445,45 450,20 455,80 460,60 470,57 480,60 540,60 600,60"
              className="ecg-main"
            />
          </svg>
        </div>

        <div className="splash-tagline">Intelligent Health Monitoring</div>
        <div className="splash-progress"></div>
      </div>

      <div className={`splash-content-wrapper${showContent ? ' visible' : ''}`}>
        {children}
      </div>
    </>
  );
}
