'use client';
import { useEffect, useState, useRef } from 'react';

/* Full logo paths extracted from /logos/logo.svg */
const M_POINTS = "387.47 281.06 352.33 0 288.39 0 241.6 310.9 234.27 124.92 175.74 124.92 147.11 282.36 0 282.36 0 324.36 182.16 324.36 196.91 243.29 204.31 431.06 265.99 431.06 319.47 75.72 350.39 323.06 864.05 323.06 864.05 281.06 387.47 281.06";

/* "ozek" text + brain paths — all use transform translate(-63.4 -289.76) */
const OZEK_PATHS = [
  // "o" circle with brain
  "M525.14,414.64a64.09,64.09,0,1,0,64.08,64.08A64.08,64.08,0,0,0,525.14,414.64ZM558.4,500c2.43,13.49-11.16,12.17-11.16,12.17-14.19,15.21-21.33-4.46-21.33-4.46v-.18l-1.55-.13v.31s-7.14,19.67-21.33,4.46c0,0-13.59,1.32-11.15-12.17,0,0-7.24-5.27-2-13.18,0,0-7-11.22,3.51-16.69,0,0-5.3-11.49,5.41-14.74.71-6.89,3.38-9.16,6.16-9.53l-.09-.29s9.5-14.21,19.52,1.1v.06l1.55.3v-.36c10-15.31,19.52-1.1,19.52-1.1l-.09.29c2.78.37,5.45,2.64,6.16,9.53,10.71,3.25,5.41,14.74,5.41,14.74,10.49,5.47,3.51,16.69,3.51,16.69C565.63,494.7,558.4,500,558.4,500Z",
  // "z"
  "M593.49,529.44l51.94-75.94c5-6.93,9.72-13.06,14.94-20V433H598.23V414.06h87.51l-.24,14.65-51.22,74.88c-4.74,7.19-9.49,13.59-14.7,20.25v.53h67.11V543h-93.2Z",
  // "e"
  "M718,482.76c.47,30.38,18.49,42.9,39.36,42.9,14.94,0,23.95-2.81,31.78-6.39l3.56,16.09c-7.35,3.58-19.92,7.66-38.18,7.66-35.34,0-56.45-25-56.45-62.31s20.4-66.65,53.84-66.65c37.47,0,47.43,35.5,47.43,58.23a93.06,93.06,0,0,1-.71,10.47Zm61.18-16.09c.24-14.3-5.45-36.52-28.93-36.52-21.11,0-30.36,20.94-32,36.52Z",
  // "k"
  "M845.82,473.29h.47c2.85-4.52,6.88-10.11,10.2-14.63l33.67-44.45H915.3l-44.35,53L921.47,543H896.09l-39.6-61.74-10.67,13.31V543H825.18v-192h20.64Z",
];

export default function PageLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const minDuration = 1400;
    let rafId;
    let resourcesLoaded = false;
    let minTimeElapsed = false;

    function checkComplete() {
      if (resourcesLoaded && minTimeElapsed) {
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 350);
      }
    }

    function animateProgress() {
      const elapsed = Date.now() - startTimeRef.current;
      const target = resourcesLoaded ? 100 : Math.min(90, (elapsed / minDuration) * 90);
      setProgress(prev => Math.min(prev + (target - prev) * 0.1, 100));
      if (!isDone) rafId = requestAnimationFrame(animateProgress);
    }
    rafId = requestAnimationFrame(animateProgress);

    function onResourcesReady() {
      resourcesLoaded = true;
      checkComplete();
    }

    if (document.readyState === 'complete') onResourcesReady();
    else window.addEventListener('load', onResourcesReady);

    const timer = setTimeout(() => { minTimeElapsed = true; checkComplete(); }, minDuration);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('load', onResourcesReady);
    };
  }, [onComplete, isDone]);

  if (isDone) return null;

  const fill = Math.min(progress, 100);
  // Use the FULL original logo viewBox that includes the ozek text area
  const vbW = 921.47;
  const vbH = 543 - 289.76; // ≈253.24 for text bottom after transform
  // Actually use a viewBox that encompasses both the M and the ozek text
  // M goes from y=0 to y=431. ozek after transform goes to about y=253.
  // Full original viewBox works: 0 0 864.05 431.06 — but ozek is at y=60-253 which IS within it.

  return (
    <div className="page-loader">
      <div className="page-loader-logo">
        {/* Layer 1: M outline (light gray) */}
        <svg className="page-loader-svg" viewBox="0 0 864.05 431.06" xmlns="http://www.w3.org/2000/svg">
          <polygon points={M_POINTS} fill="none" stroke="#e0e0e0" strokeWidth="3" />
        </svg>

        {/* Layer 2: M fill — animates bottom to top */}
        <svg className="page-loader-svg page-loader-svg-fill" viewBox="0 0 864.05 431.06" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="loader-grad" x1="432" y1="431" x2="432" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#7121ce" />
              <stop offset="1" stopColor="#2f0059" />
            </linearGradient>
            <clipPath id="loader-clip">
              <rect x="0" y={431.06 - (431.06 * fill / 100)} width="864.05" height={431.06 * fill / 100} />
            </clipPath>
          </defs>
          <polygon points={M_POINTS} fill="url(#loader-grad)" clipPath="url(#loader-clip)" />
        </svg>

        {/* Layer 3: Static "ozek" text + brain — always dark, sits ON the M line */}
        <svg className="page-loader-svg page-loader-svg-fill" viewBox="0 0 864.05 431.06" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(-63.4 -289.76)">
            {OZEK_PATHS.map((d, i) => (
              <path key={i} d={d} fill="#1c1c1c" />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
