'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import './ScrollFrameAnimation.css';

// ─── Configuration ───────────────────────────────────────────────────────────
// ─── Animation Configuration ───
const TOTAL_FRAMES = 349;
const MOBILE_FRAMES = 175;
const MOBILE_BREAKPOINT = 768;
const PRELOAD_BATCH_SIZE = 40;
const PRELOAD_AHEAD = 150;
const PRELOAD_BEHIND = 30;
const MAX_DPR = 2;
const CRITICAL_FRAMES_COUNT = 60;

// Scroll multiplier: 6.5 = leisurely pace for comfortable viewing
const SCROLL_MULTIPLIER = 6.5;

// Easing factor: 0.10 provides very smooth, languid frame transitions
const EASING_FACTOR = 0.10;

// Frame locking threshold: 0.08 for pixel-perfect final frame
const FRAME_LOCK_THRESHOLD = 0.08;


function getFramePath(index) {
  const padded = String(index + 1).padStart(3, '0');
  return `/frames2-webp/frame-${padded}.webp`;
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    img.onload = () => {
      if (typeof createImageBitmap === 'function') {
        createImageBitmap(img)
          .then((bitmap) => resolve(bitmap))
          .catch(() => resolve(img));
      } else {
        resolve(img);
      }
    };
    img.onerror = () => resolve(null);
  });
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ScrollFrameAnimation({ showCTA = true }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const totalFramesRef = useRef(TOTAL_FRAMES);
  const rafRef = useRef(null);
  const loadedSetRef = useRef(new Set());
  const loadingSetRef = useRef(new Set());
  const isMobileRef = useRef(false);
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const targetFrameRef = useRef(0);
  const smoothFrameRef = useRef(0);
  const animatingRef = useRef(false);
  const lastRenderedImgRef = useRef(null);
  const prefersReducedMotionRef = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const ctaRef = useRef(null);
  const scrollThumbRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ── Determine frame count ──
  useEffect(() => {
    const mobile = window.innerWidth < MOBILE_BREAKPOINT;
    isMobileRef.current = mobile;
    const count = mobile ? MOBILE_FRAMES : TOTAL_FRAMES;
    totalFramesRef.current = count;
    imagesRef.current = new Array(count).fill(null);
  }, []);

  // ── Load a single frame ──
  const loadFrame = useCallback((index) => {
    if (loadedSetRef.current.has(index) && imagesRef.current[index]) {
      return Promise.resolve(imagesRef.current[index]);
    }
    if (loadingSetRef.current.has(index)) {
      return new Promise((resolve) => {
        const check = () => {
          if (loadedSetRef.current.has(index)) resolve(imagesRef.current[index]);
          else requestAnimationFrame(check);
        };
        check();
      });
    }

    loadingSetRef.current.add(index);
    const realIndex = isMobileRef.current ? index * 2 : index;
    const src = getFramePath(realIndex);

    return loadImage(src).then((result) => {
      loadingSetRef.current.delete(index);
      if (result) {
        imagesRef.current[index] = result;
        loadedSetRef.current.add(index);
      }
      return result;
    });
  }, []);

  // ── Render frame to canvas (contain-fit) — never shows blank ──
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    let img = imagesRef.current[index];

    // Fallback: find nearest loaded frame
    if (!img) {
      for (let off = 1; off < totalFramesRef.current; off++) {
        if (index - off >= 0 && imagesRef.current[index - off]) {
          img = imagesRef.current[index - off];
          break;
        }
        if (index + off < totalFramesRef.current && imagesRef.current[index + off]) {
          img = imagesRef.current[index + off];
          break;
        }
      }
    }

    // Ultimate fallback: use last successfully rendered image
    if (!img && lastRenderedImgRef.current) {
      img = lastRenderedImgRef.current;
    }

    if (!canvas || !img) return;

    // Track last good image to prevent blank frames
    lastRenderedImgRef.current = img;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    const maxDpr = isMobileRef.current ? 1.5 : MAX_DPR;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const targetW = cw * dpr;
    const targetH = ch * dpr;

    if (canvasSizeRef.current.w !== targetW || canvasSizeRef.current.h !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      canvasSizeRef.current = { w: targetW, h: targetH };
    }

    const w = canvas.width;
    const h = canvas.height;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    const imgRatio = imgW / imgH;
    const canvasRatio = w / h;

    ctx.fillStyle = '#f5f5f7';
    ctx.fillRect(0, 0, w, h);

    let dw, dh, dx, dy;
    if (canvasRatio > imgRatio) {
      dh = h;
      dw = h * imgRatio;
      dx = (w - dw) / 2;
      dy = 0;
    } else {
      dw = w;
      dh = w / imgRatio;
      dx = 0;
      dy = (h - dh) / 2;
    }
    ctx.drawImage(img, 0, 0, imgW, imgH, dx, dy, dw, dh);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maxDpr = isMobileRef.current ? 1.5 : MAX_DPR;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    canvasSizeRef.current = { w: canvas.width, h: canvas.height };
    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  const preloadAround = useCallback((centerIndex) => {
    const total = totalFramesRef.current;
    const end = Math.min(total - 1, centerIndex + PRELOAD_AHEAD);
    const start = Math.max(0, centerIndex - PRELOAD_BEHIND);
    for (let i = centerIndex; i <= end; i++) {
      if (!loadedSetRef.current.has(i) && !loadingSetRef.current.has(i)) loadFrame(i);
    }
    for (let i = centerIndex - 1; i >= start; i--) {
      if (!loadedSetRef.current.has(i) && !loadingSetRef.current.has(i)) loadFrame(i);
    }
  }, [loadFrame]);

  // ── Initial preload ──
  useEffect(() => {
    const total = totalFramesRef.current;
    let isCancelled = false;

    async function initialLoad() {
      await loadFrame(0);
      if (isCancelled) return;
      // Store frame 0 as the fallback before first render to prevent blank canvas
      if (imagesRef.current[0]) {
        lastRenderedImgRef.current = imagesRef.current[0];
      }
      renderFrame(0);

      const criticalEnd = Math.min(CRITICAL_FRAMES_COUNT, total);
      const criticalPromises = [];
      for (let i = 1; i < criticalEnd; i++) criticalPromises.push(loadFrame(i));
      await Promise.all(criticalPromises);
      if (isCancelled) return;
      setLoadProgress(1);
      setIsReady(true);

      for (let batch = Math.ceil(criticalEnd / PRELOAD_BATCH_SIZE); batch < Math.ceil(total / PRELOAD_BATCH_SIZE); batch++) {
        if (isCancelled) return;
        const bStart = batch * PRELOAD_BATCH_SIZE;
        const bEnd = Math.min(bStart + PRELOAD_BATCH_SIZE, total);
        const promises = [];
        for (let i = bStart; i < bEnd; i++) {
          if (!loadedSetRef.current.has(i)) promises.push(loadFrame(i));
        }
        await Promise.all(promises);
        if (isCancelled) return;
        setLoadProgress(loadedSetRef.current.size / total);
      }
      if (!isCancelled) setLoadProgress(1);
    }

    initialLoad();

    let resizeTimer;
    const handleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeCanvas, 100); };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      isCancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [loadFrame, renderFrame, resizeCanvas]);

  // ── Manual pin + smooth frame interpolation ──
  useEffect(() => {
    if (!isReady) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) return;

    const navbar = document.querySelector('#navbar');
    const scrollProgressBar = document.querySelector('.scroll-progress');
    const total = totalFramesRef.current;
    // Reset current frame to -1 so the first smoothAnimate always renders
    currentFrameRef.current = -1;

    // Smooth animation loop for frame interpolation
    function smoothAnimate() {
      const diff = targetFrameRef.current - smoothFrameRef.current;

      if (Math.abs(diff) < FRAME_LOCK_THRESHOLD) {
        smoothFrameRef.current = targetFrameRef.current;
        animatingRef.current = false;
      } else {
        const easing = prefersReducedMotionRef.current ? 0.4 : EASING_FACTOR;
        smoothFrameRef.current += diff * easing;
        animatingRef.current = true;
        requestAnimationFrame(smoothAnimate);
      }

      const frameIndex = Math.round(smoothFrameRef.current);
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        renderFrame(frameIndex);
        preloadAround(frameIndex);
      }
    }

    function updateUI(progress) {
      const ctaEl = ctaRef.current;
      if (ctaEl) {
        const ctaOp = progress > 0.88 ? Math.min((progress - 0.88) / 0.06, 1) : 0;
        ctaEl.style.opacity = ctaOp;
        ctaEl.style.transform = `translateX(-50%) translateY(${ctaOp > 0 ? 0 : 20}px)`;
        ctaEl.style.pointerEvents = ctaOp > 0.5 ? 'auto' : 'none';
      }
      const thumbEl = scrollThumbRef.current;
      if (thumbEl) {
        thumbEl.style.transform = `scaleY(${progress})`;
      }
    }

    let lastNavHidden = false;

    function onScroll() {
      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const vh = window.innerHeight;
      const scrollDistance = vh * SCROLL_MULTIPLIER;
      const sectionHeight = vh + scrollDistance;

      section.style.height = sectionHeight + 'px';

      const scrollStart = sectionTop;
      const scrollEnd = sectionTop + scrollDistance;

      if (scrollY >= scrollStart && scrollY <= scrollEnd) {
        // ── PINNED: fix the viewport to screen top ──
        viewport.style.position = 'fixed';
        viewport.style.top = '0px';
        viewport.style.left = '0px';
        viewport.style.width = '100%';
        viewport.style.zIndex = '10';

        const progress = Math.max(0, Math.min(1, (scrollY - scrollStart) / scrollDistance));
        const newTarget = progress * (total - 1);
        targetFrameRef.current = newTarget;
        updateUI(progress);

        if (!animatingRef.current) {
          animatingRef.current = true;
          requestAnimationFrame(smoothAnimate);
        }

        // Hide navbar during animation
        if (navbar && !lastNavHidden) {
          navbar.style.transition = 'transform 0.3s ease';
          navbar.style.transform = 'translateY(-100%)';
          lastNavHidden = true;
        }
        if (scrollProgressBar) {
          scrollProgressBar.style.transition = 'opacity 0.2s ease';
          scrollProgressBar.style.opacity = '0';
        }

      } else if (scrollY > scrollEnd) {
        // ── PAST: position at the bottom of the section ──
        viewport.style.position = 'absolute';
        viewport.style.top = scrollDistance + 'px';
        viewport.style.left = '0px';
        viewport.style.width = '100%';
        viewport.style.zIndex = '';

        // Show navbar after animation
        if (navbar && lastNavHidden) {
          navbar.style.transform = 'translateY(0)';
          lastNavHidden = false;
        }
        if (scrollProgressBar) scrollProgressBar.style.opacity = '1';

      } else {
        // ── BEFORE: normal flow ──
        viewport.style.position = 'relative';
        viewport.style.top = '';
        viewport.style.left = '';
        viewport.style.width = '';
        viewport.style.zIndex = '';

        // Show navbar before animation
        if (navbar && lastNavHidden) {
          navbar.style.transform = 'translateY(0)';
          lastNavHidden = false;
        }
        if (scrollProgressBar) scrollProgressBar.style.opacity = '1';
      }
    }

    // Set initial section height and run once
    const vh = window.innerHeight;
    section.style.height = (vh + vh * SCROLL_MULTIPLIER) + 'px';
    // Force render frame 0 before first scroll to prevent blank canvas
    renderFrame(0);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      prefersReducedMotionRef.current = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      motionQuery.removeEventListener('change', handleMotionChange);
      viewport.style.position = '';
      viewport.style.top = '';
      viewport.style.left = '';
      viewport.style.width = '';
      viewport.style.zIndex = '';
      section.style.height = '';
      if (navbar) {
        navbar.style.transform = '';
        navbar.style.transition = '';
      }
      if (scrollProgressBar) {
        scrollProgressBar.style.opacity = '';
        scrollProgressBar.style.transition = '';
      }
    };
  }, [isReady, renderFrame, preloadAround]);

  return (
    <section ref={sectionRef} className="sfa-section">
      <div ref={viewportRef} className="sfa-canvas-viewport">
        <canvas ref={canvasRef} className="sfa-canvas" />

        {showCTA && (
          <div
            ref={ctaRef}
            className="sfa-bottom-cta"
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <Link href="/product-g1-band" className="sfa-cta-btn">
              Explore G1 Band
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        )}

        <div className="sfa-scroll-hint">
          <div className="sfa-scroll-track">
            <div
              ref={scrollThumbRef}
              className="sfa-scroll-thumb"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>
        </div>

        {!isReady && (
          <div className="sfa-loader">
            <div className="sfa-loader-ring">
              <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(126,77,238,0.15)" strokeWidth="2" />
                <circle
                  cx="25" cy="25" r="20" fill="none" stroke="url(#loaderGrad)" strokeWidth="2"
                  strokeDasharray={`${loadProgress * 126} 126`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.2s ease-out' }}
                />
                <defs>
                  <linearGradient id="loaderGrad" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7E4DEE" />
                    <stop offset="1" stopColor="#9B73F5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="sfa-loader-text">{Math.round(loadProgress * 100)}%</span>
          </div>
        )}
      </div>
    </section>
  );
}
