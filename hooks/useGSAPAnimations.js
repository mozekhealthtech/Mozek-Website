'use client';
import { useEffect } from 'react';

/**
 * useGSAPAnimations
 * ─────────────────
 * Master hook that powers every scroll-driven animation on the homepage.
 * - Hero text entrance
 * - G1 Band parallax badges + stagger reveals
 * - Stats counter with GSAP
 * - Market cards slide-up stagger
 * - Partners horizontal slide
 * - Testimonials slide-in
 * - Blog cards stagger
 * - Section title reveal animations
 * - Subtle parallax throughout
 *
 * Mobile-optimized: simpler animations, no reverse on scroll-back,
 * no parallax/scrub effects for smooth scrolling on phones.
 */
export default function useGSAPAnimations() {
  useEffect(() => {
    let ctx;
    let cancelled = false;

    async function init() {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;

      // ── Mobile detection ──
      const isMobile = window.innerWidth < 768;
      const toggle = isMobile ? 'play none none none' : 'play none none reverse';

      ctx = gsap.context(() => {

        /* ═══════════════════════════════════════════
           1. HERO TEXT ENTRANCE
           ═══════════════════════════════════════════ */
        const heroContent = document.querySelector('.video-hero-content');
        if (heroContent) {
          const heroH1 = heroContent.querySelector('h1');
          if (heroH1) {
            gsap.fromTo(heroH1,
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 }
            );
          }
          const heroDesc = heroContent.querySelector('.video-hero-desc');
          if (heroDesc) {
            gsap.fromTo(heroDesc,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.35 }
            );
          }
          const heroBtns = heroContent.querySelector('.video-hero-btns');
          if (heroBtns) {
            gsap.fromTo(heroBtns,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.5 }
            );
          }
          const scrollInd = document.querySelector('.scroll-indicator');
          if (scrollInd) {
            gsap.fromTo(scrollInd,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.6, delay: 1, ease: 'power2.out' }
            );
          }
        }

        // Hero parallax — content slides up as you scroll away
        gsap.to('.video-hero-content', {
          y: isMobile ? -40 : -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.video-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        /* ═══════════════════════════════════════════
           2. G1 BAND SECTION — EXPLODE/ASSEMBLE + badges
           ═══════════════════════════════════════════ */
        const g1Section = document.querySelector('.g1-hero');
        if (g1Section) {
          const strapTop = g1Section.querySelector('.band-strap-top');
          const strapBot = g1Section.querySelector('.band-strap-bot');
          const bandBody = g1Section.querySelector('.band-body');
          const bandScreen = g1Section.querySelector('.band-screen');
          const g1Glow = g1Section.querySelector('.g1-glow');

          // EXPLODE TIMELINE: Parts separate → show labels → reassemble
          const explodeTL = gsap.timeline({
            scrollTrigger: {
              trigger: g1Section,
              start: 'top 70%',
              end: 'top 10%',
              scrub: isMobile ? 0.8 : 0.4,
            },
          });

          // Phase 1: Explode — parts fly apart
          if (strapTop) {
            explodeTL.fromTo(strapTop,
              { y: 0, rotation: 0, opacity: 1 },
              { y: isMobile ? -30 : -50, rotation: isMobile ? -4 : -8, opacity: 0.85, duration: 0.4, ease: 'power2.out' },
              0
            );
          }
          if (strapBot) {
            explodeTL.fromTo(strapBot,
              { y: 0, rotation: 0, opacity: 1 },
              { y: isMobile ? 30 : 50, rotation: isMobile ? 4 : 8, opacity: 0.85, duration: 0.4, ease: 'power2.out' },
              0
            );
          }
          if (bandBody) {
            explodeTL.fromTo(bandBody,
              { scale: 1 },
              { scale: 1.08, duration: 0.4, ease: 'power2.out' },
              0
            );
          }
          if (bandScreen) {
            explodeTL.fromTo(bandScreen,
              { opacity: 0.8 },
              { opacity: 1, duration: 0.4, ease: 'power2.out' },
              0
            );
          }

          // Explode labels appear
          gsap.utils.toArray('.explode-label').forEach((label, i) => {
            explodeTL.fromTo(label,
              { opacity: 0, scale: 0.7, y: 10 },
              { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' },
              0.15 + i * 0.06
            );
          });

          // Phase 2: Reassemble — parts come back together
          if (strapTop) {
            explodeTL.to(strapTop,
              { y: 0, rotation: 0, opacity: 1, duration: 0.4, ease: 'power2.inOut' },
              0.55
            );
          }
          if (strapBot) {
            explodeTL.to(strapBot,
              { y: 0, rotation: 0, opacity: 1, duration: 0.4, ease: 'power2.inOut' },
              0.55
            );
          }
          if (bandBody) {
            explodeTL.to(bandBody,
              { scale: 1, duration: 0.4, ease: 'power2.inOut' },
              0.55
            );
          }
          if (bandScreen) {
            explodeTL.to(bandScreen,
              { opacity: 0.8, duration: 0.4, ease: 'power2.inOut' },
              0.55
            );
          }

          // Labels fade out during reassembly
          gsap.utils.toArray('.explode-label').forEach((label) => {
            explodeTL.to(label,
              { opacity: 0, scale: 0.8, duration: 0.25, ease: 'power2.in' },
              0.55
            );
          });

          // Stagger feature badges floating in AFTER reassembly
          gsap.utils.toArray('.g1-float-badge').forEach((badge, i) => {
            gsap.fromTo(badge,
              { opacity: 0, y: isMobile ? 25 : 40, scale: 0.8 },
              {
                opacity: 1, y: 0, scale: 1,
                duration: isMobile ? 0.35 : 0.45,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                  trigger: g1Section,
                  start: 'top 15%',
                  toggleActions: toggle,
                },
                delay: i * (isMobile ? 0.04 : 0.07),
              }
            );
          });

          // G1 band visual subtle parallax — skip on mobile for performance
          if (!isMobile) {
            gsap.to('.g1-band-wrapper', {
              y: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: g1Section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            });
          }

          // G1 content stagger
          gsap.utils.toArray('.g1-content .reveal').forEach((el, i) => {
            gsap.fromTo(el,
              { opacity: 0, y: isMobile ? 20 : 35 },
              {
                opacity: 1, y: 0,
                duration: isMobile ? 0.35 : 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: toggle,
                },
                delay: i * (isMobile ? 0.05 : 0.08),
              }
            );
          });

          // G1 glow — static, no infinite animation for performance
          if (g1Glow) {
            gsap.to(g1Glow, {
              opacity: 0.6,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: g1Section,
                start: 'top 50%',
                toggleActions: toggle,
              },
            });
          }
        }

        /* ═══════════════════════════════════════════
           3. STATS SECTION — animated counters + card stagger
           ═══════════════════════════════════════════ */
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
          gsap.utils.toArray('.stat-card').forEach((card, i) => {
            gsap.fromTo(card,
              { opacity: 0, y: isMobile ? 30 : 50, scale: 0.95 },
              {
                opacity: 1, y: 0, scale: 1,
                duration: isMobile ? 0.35 : 0.45,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: statsSection,
                  start: 'top 75%',
                  toggleActions: toggle,
                },
                delay: i * (isMobile ? 0.04 : 0.07),
              }
            );
          });

          // Icon bounce on enter
          gsap.utils.toArray('.stat-icon').forEach((icon, i) => {
            gsap.fromTo(icon,
              { scale: 0, rotation: isMobile ? 0 : -15 },
              {
                scale: 1, rotation: 0,
                duration: isMobile ? 0.3 : 0.4,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: statsSection,
                  start: 'top 70%',
                  toggleActions: toggle,
                },
                delay: 0.1 + i * (isMobile ? 0.04 : 0.07),
              }
            );
          });
        }

        /* ═══════════════════════════════════════════
           4. MARKET SECTION — card slide + number reveal
           ═══════════════════════════════════════════ */
        const marketSection = document.querySelector('.market-section');
        if (marketSection) {
          // Section header
          const mHeader = marketSection.querySelector('.section-header');
          if (mHeader) {
            gsap.fromTo(mHeader.querySelector('.section-title'),
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
                scrollTrigger: { trigger: mHeader, start: 'top 80%', toggleActions: toggle },
              }
            );
            gsap.fromTo(mHeader.querySelector('.section-subtitle'),
              { opacity: 0, y: 20 },
              {
                opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.1,
                scrollTrigger: { trigger: mHeader, start: 'top 80%', toggleActions: toggle },
              }
            );
          }

          gsap.utils.toArray('.market-card').forEach((card, i) => {
            gsap.fromTo(card,
              { opacity: 0, y: isMobile ? 30 : 50 },
              {
                opacity: 1, y: 0,
                duration: isMobile ? 0.35 : 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: marketSection,
                  start: 'top 65%',
                  toggleActions: toggle,
                },
                delay: i * (isMobile ? 0.06 : 0.1),
              }
            );
          });

          // Market numbers scale in
          gsap.utils.toArray('.market-num').forEach((num, i) => {
            gsap.fromTo(num,
              { scale: 0.5, opacity: 0 },
              {
                scale: 1, opacity: 1,
                duration: 0.4,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                  trigger: marketSection,
                  start: 'top 60%',
                  toggleActions: toggle,
                },
                delay: 0.15 + i * (isMobile ? 0.06 : 0.1),
              }
            );
          });
        }

        /* ═══════════════════════════════════════════
           5. PARTNERS SECTION — horizontal slide-in
           ═══════════════════════════════════════════ */
        gsap.utils.toArray('.partner-pill').forEach((pill, i) => {
          gsap.fromTo(pill,
            { opacity: 0, x: isMobile ? 0 : (i % 2 === 0 ? -40 : 40), y: isMobile ? 20 : 0, scale: 0.9 },
            {
              opacity: 1, x: 0, y: 0, scale: 1,
              duration: isMobile ? 0.3 : 0.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: pill,
                start: 'top 90%',
                toggleActions: toggle,
              },
              delay: i * (isMobile ? 0.03 : 0.05),
            }
          );
        });

        /* ═══════════════════════════════════════════
           6. TESTIMONIALS — slide in from sides with blur
           ═══════════════════════════════════════════ */
        gsap.utils.toArray('.t-card').forEach((card, i) => {
          const xStart = isMobile ? 0 : (i === 0 ? -60 : i === 2 ? 60 : 0);
          gsap.fromTo(card,
            { opacity: 0, x: xStart, y: isMobile ? 30 : 40 },
            {
              opacity: 1, x: 0, y: 0,
              duration: isMobile ? 0.4 : 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: toggle,
              },
              delay: i * (isMobile ? 0.08 : 0.12),
            }
          );
        });

        // Stars appear — simplified, no rotation for performance
        gsap.utils.toArray('.t-stars').forEach((starsContainer) => {
          gsap.fromTo(starsContainer,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1, scale: 1,
              duration: 0.3,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: starsContainer.closest('.t-card'),
                start: 'top 80%',
                toggleActions: toggle,
              },
              delay: 0.15,
            }
          );
        });

        /* ═══════════════════════════════════════════
           7. BLOG CARDS — stagger up with scale
           ═══════════════════════════════════════════ */
        gsap.utils.toArray('.bp-card').forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: isMobile ? 30 : 50, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: isMobile ? 0.4 : 0.55,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: toggle,
              },
              delay: i * (isMobile ? 0.08 : 0.12),
            }
          );
        });

        /* ═══════════════════════════════════════════
           8. ALL SECTION HEADERS — universal title animations
           ═══════════════════════════════════════════ */
        gsap.utils.toArray('.section-header').forEach((header) => {
          const title = header.querySelector('.section-title');
          const subtitle = header.querySelector('.section-subtitle');
          if (title) {
            gsap.fromTo(title,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: header,
                  start: 'top 82%',
                  toggleActions: toggle,
                },
              }
            );
          }
          if (subtitle) {
            gsap.fromTo(subtitle,
              { opacity: 0, y: 20 },
              {
                opacity: 1, y: 0,
                duration: 0.45,
                ease: 'power3.out',
                delay: 0.1,
                scrollTrigger: {
                  trigger: header,
                  start: 'top 82%',
                  toggleActions: toggle,
                },
              }
            );
          }
        });

        /* ═══════════════════════════════════════════
           9. SUBTLE PARALLAX — removed for performance
           ═══════════════════════════════════════════ */

        /* ═══════════════════════════════════════════
           10. FOOTER REVEAL
           ═══════════════════════════════════════════ */
        const footer = document.querySelector('.footer');
        if (footer) {
          gsap.fromTo(footer,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0,
              duration: isMobile ? 0.4 : 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: footer,
                start: 'top 95%',
                toggleActions: toggle,
              },
            }
          );
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
