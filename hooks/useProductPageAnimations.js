'use client';
import { useEffect } from 'react';

/**
 * useProductPageAnimations
 * ────────────────────────
 * GSAP-powered scroll animations for all product pages.
 * Animates: hero, about, feature cards, timeline items, CTA.
 *
 * Mobile-optimized: simpler animations, correct timeline directions,
 * no reverse on scroll-back, no heavy 3D transforms.
 */
export default function useProductPageAnimations() {
  useEffect(() => {
    let ctx;
    let cancelled = false;

    async function init() {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;

      // ── Mobile detection ──
      const isMobile = window.innerWidth <= 768;
      const toggle = isMobile ? 'play none none none' : 'play none none reverse';

      ctx = gsap.context(() => {

        /* ═══════════════════════════════════════════
           1. HERO SECTION — staggered entrance
           ═══════════════════════════════════════════ */
        const hero = document.querySelector('.pd-hero');
        if (hero) {
          const badge = hero.querySelector('.pd-badge');
          const h1 = hero.querySelector('h1');
          const desc = hero.querySelector('.pd-hero-desc');
          const btns = hero.querySelector('.pd-hero-btns');
          const visual = hero.querySelector('.pd-hero-visual');

          const heroElements = [badge, h1, desc, btns].filter(Boolean);
          heroElements.forEach((el, i) => {
            gsap.fromTo(el,
              { opacity: 0, y: isMobile ? 25 : 40, filter: isMobile ? 'none' : 'blur(4px)' },
              {
                opacity: 1, y: 0, filter: isMobile ? 'none' : 'blur(0px)',
                duration: isMobile ? 0.4 : 0.55,
                ease: 'power3.out',
                delay: 0.1 + i * 0.1,
              }
            );
          });

          if (visual) {
            gsap.fromTo(visual,
              { opacity: 0, scale: 0.85, rotateY: isMobile ? 0 : 8 },
              {
                opacity: 1, scale: 1, rotateY: 0,
                duration: 0.7,
                ease: 'power3.out',
                delay: 0.25,
              }
            );
          }

          // Hero parallax on scroll — skip on mobile for performance
          if (!isMobile) {
            gsap.to('.pd-hero-content', {
              y: -50,
              opacity: 0.3,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            });
          }
        }

        /* ═══════════════════════════════════════════
           2. ABOUT SECTION — paragraph stagger
           ═══════════════════════════════════════════ */
        const about = document.querySelector('.pd-about');
        if (about) {
          const aboutH2 = about.querySelector('h2');
          const aboutPs = about.querySelectorAll('p');

          if (aboutH2) {
            gsap.fromTo(aboutH2,
              { opacity: 0, y: isMobile ? 25 : 40, clipPath: isMobile ? 'none' : 'inset(0 0 100% 0)' },
              {
                opacity: 1, y: 0, clipPath: isMobile ? 'none' : 'inset(0 0 0% 0)',
                duration: 0.55,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: about,
                  start: 'top 80%',
                  toggleActions: toggle,
                },
              }
            );
          }

          aboutPs.forEach((p, i) => {
            gsap.fromTo(p,
              { opacity: 0, y: isMobile ? 20 : 30 },
              {
                opacity: 1, y: 0,
                duration: isMobile ? 0.35 : 0.45,
                ease: 'power3.out',
                delay: 0.1 + i * 0.08,
                scrollTrigger: {
                  trigger: about,
                  start: 'top 75%',
                  toggleActions: toggle,
                },
              }
            );
          });
        }

        /* ═══════════════════════════════════════════
           3. FEATURES SECTION — header + card stagger
           ═══════════════════════════════════════════ */
        const features = document.querySelector('.pd-features');
        if (features) {
          // Section header
          const featHeader = features.querySelector('.pd-section-header');
          if (featHeader) {
            const fh2 = featHeader.querySelector('h2');
            const fp = featHeader.querySelector('p');
            if (fh2) {
              gsap.fromTo(fh2,
                { opacity: 0, y: 30, clipPath: isMobile ? 'none' : 'inset(0 0 100% 0)' },
                {
                  opacity: 1, y: 0, clipPath: isMobile ? 'none' : 'inset(0 0 0% 0)',
                  duration: 0.55,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: features,
                    start: 'top 80%',
                    toggleActions: toggle,
                  },
                }
              );
            }
            if (fp) {
              gsap.fromTo(fp,
                { opacity: 0, y: 20 },
                {
                  opacity: 1, y: 0,
                  duration: 0.45,
                  ease: 'power3.out',
                  delay: 0.1,
                  scrollTrigger: {
                    trigger: features,
                    start: 'top 80%',
                    toggleActions: toggle,
                  },
                }
              );
            }
          }

          // Feature cards — simplified on mobile
          gsap.utils.toArray('.pd-feat-card').forEach((card, i) => {
            gsap.fromTo(card,
              { opacity: 0, y: isMobile ? 25 : 60, scale: isMobile ? 1 : 0.92, rotateX: isMobile ? 0 : 6 },
              {
                opacity: 1, y: 0, scale: 1, rotateX: 0,
                duration: isMobile ? 0.35 : 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  toggleActions: toggle,
                },
                delay: (i % 3) * 0.07,
              }
            );
          });

          // Feature card icons — simplified on mobile
          gsap.utils.toArray('.pd-feat-icon').forEach((icon, i) => {
            gsap.fromTo(icon,
              { scale: 0, rotation: isMobile ? 0 : -20 },
              {
                scale: 1, rotation: 0,
                duration: isMobile ? 0.3 : 0.4,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: icon.closest('.pd-feat-card'),
                  start: 'top 85%',
                  toggleActions: toggle,
                },
                delay: 0.1 + (i % 3) * 0.05,
              }
            );
          });
        }

        /* ═══════════════════════════════════════════
           4. TIMELINE SECTION — progressive reveal
           ═══════════════════════════════════════════ */
        const timeline = document.querySelector('.pd-timeline');
        if (timeline) {
          // Timeline header
          const tlHeader = timeline.querySelector('.pd-section-header');
          if (tlHeader) {
            const th2 = tlHeader.querySelector('h2');
            const tp = tlHeader.querySelector('p');
            if (th2) {
              gsap.fromTo(th2,
                { opacity: 0, y: 30 },
                {
                  opacity: 1, y: 0,
                  duration: 0.5,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: timeline,
                    start: 'top 80%',
                    toggleActions: toggle,
                  },
                }
              );
            }
            if (tp) {
              gsap.fromTo(tp,
                { opacity: 0, y: 20 },
                {
                  opacity: 1, y: 0,
                  duration: 0.45,
                  ease: 'power3.out',
                  delay: 0.08,
                  scrollTrigger: {
                    trigger: timeline,
                    start: 'top 80%',
                    toggleActions: toggle,
                  },
                }
              );
            }
          }

          // Timeline progress line
          const track = timeline.querySelector('.timeline-track');
          if (track) {
            let progressLine = track.querySelector('.tl-progress-line');
            if (!progressLine) {
              progressLine = document.createElement('div');
              progressLine.className = 'tl-progress-line';
              track.prepend(progressLine);
            }

            gsap.fromTo(progressLine,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: track,
                  start: 'top 70%',
                  end: 'bottom 60%',
                  scrub: isMobile ? 1 : 0.3, // smoother on mobile
                },
              }
            );
          }

          // Timeline items — fixed direction for mobile
          gsap.utils.toArray('.tl-item').forEach((item, i) => {
            const isOdd = i % 2 === 0;
            // On mobile: all items are left-aligned, so animate from left
            // On desktop: alternate left/right
            const fromX = isMobile ? -30 : (isOdd ? -60 : 60);

            gsap.fromTo(item,
              {
                opacity: 0,
                x: fromX,
                y: 20,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: isMobile ? 0.4 : 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 85%',
                  toggleActions: toggle,
                },
              }
            );

            // Dot scale animation
            const dot = item.querySelector('.tl-dot');
            if (dot) {
              gsap.fromTo(dot,
                { scale: 0 },
                {
                  scale: 1,
                  duration: isMobile ? 0.25 : 0.3,
                  ease: 'back.out(2)',
                  scrollTrigger: {
                    trigger: item,
                    start: 'top 82%',
                    toggleActions: toggle,
                  },
                  delay: 0.1,
                }
              );
            }
          });
        }

        /* ═══════════════════════════════════════════
           5. SPECS SECTION — if present
           ═══════════════════════════════════════════ */
        const specs = document.querySelector('.pd-specs');
        if (specs) {
          gsap.utils.toArray('.pd-spec-item').forEach((item, i) => {
            gsap.fromTo(item,
              { opacity: 0, x: isMobile ? 0 : (i % 2 === 0 ? -30 : 30), y: isMobile ? 20 : 0 },
              {
                opacity: 1, x: 0, y: 0,
                duration: isMobile ? 0.35 : 0.45,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 88%',
                  toggleActions: toggle,
                },
                delay: i * 0.05,
              }
            );
          });
        }

      }); // end gsap.context
    }

    init();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);
}
