'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

const timelineItems = [
  {
    text: "Mozek was born from personal pain\u2014our founder\u2019s lived experience with epilepsy and the life-or-death importance of timely intervention.",
    image: '/images/journey/journey-start.jpg',
  },
  {
    text: 'That personal problem revealed a broader care gap, leading us to build solutions for fall detection across high-risk populations.',
    image: '/images/journey/journey-solutions.jpg',
  },
  {
    text: 'From day one, Mozek has been shaped by continuous feedback from care homes, caregivers, and other stakeholders on the front lines of care.',
    image: '/images/journey/journey-zydus.jpg',
  },
  {
    text: 'Beyond building a product, we have actively championed fall detection as an essential assistive need, including advocacy for its inclusion in NLEAP.',
    image: '/images/journey/journey-icmr.jpg',
  },
  {
    text: 'Our early efforts were recognized at Arambh, reinforcing the relevance and urgency of the problem we are solving.',
    image: '/images/journey/journey-arambh.jpg',
  },
  {
    text: 'We have also used platforms like Purple Day to spotlight the need for better monitoring and faster response in vulnerable communities.',
    image: '/images/journey/journey-exhibition.jpg',
  },
  {
    text: 'With our IP now published, Mozek is translating insight into defensible innovation.',
    image: '/images/journey/journey-patent.jpg',
  },
  {
    text: 'As we are raising our pre-seed round, we are focused on partnering with senior care homes to make safety more proactive, reliable, and scalable.',
    image: '/images/journey/journey-start.jpg',
  },
];

const teamMembers = [
  { name: 'Abhishek Bhanushali', role: 'CoFounder & CEO', image: '/images/team/abhishek.jpg' },
  { name: 'Shantanu Pawar', role: 'CoFounder & CTO', image: '/images/team/shantanu.jpg' },
  { name: 'Mayur Chaudhari', role: 'Product Designer', image: '/images/team/mayur.jpg' },
  { name: 'Arijit Patra', role: 'Head of Engineering', image: '/images/team/arijit.png' },
  { name: 'Dr. Arjun Thimmaiah', role: 'Chief Medical Advisor', image: '/images/team/doctor.png' },
  { name: 'Ashish Kanaujia', role: 'Mentor', image: '/images/team/ashish.png' },
];

const btsImages = [
  '/images/journey/journey-start.jpg',
  '/images/journey/journey-solutions.jpg',
  '/images/journey/journey-zydus.jpg',
  '/images/journey/journey-icmr.jpg',
  '/images/journey/journey-arambh.jpg',
  '/images/journey/journey-exhibition.jpg',
  '/images/journey/journey-patent.jpg',
];

export default function AboutPage() {
  useScrollReveal();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayRef = useRef(null);

  const goTo = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % timelineItems.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + timelineItems.length) % timelineItems.length);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isPlaying) return;
    autoplayRef.current = setInterval(goNext, 5000);
    return () => clearInterval(autoplayRef.current);
  }, [goNext, isPlaying]);

  // Reset autoplay on manual navigation
  const handleNav = useCallback((fn) => {
    clearInterval(autoplayRef.current);
    fn();
    if (isPlaying) {
      autoplayRef.current = setInterval(goNext, 5000);
    }
  }, [goNext, isPlaying]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Handle scroll / wheel (horizontal or vertical)
  const wheelCooldown = useRef(false);
  const handleWheel = useCallback((e) => {
    if (wheelCooldown.current) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 30) {
      e.preventDefault();
      wheelCooldown.current = true;
      if (delta > 0) handleNav(goNext);
      else handleNav(goPrev);
      setTimeout(() => { wheelCooldown.current = false; }, 600);
    }
  }, [goNext, goPrev, handleNav]);

  useEffect(() => {
    let ctx;
    let cancelled = false;

    async function initAnimations() {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;

      ctx = gsap.context(() => {
        /* Story section */
        gsap.utils.toArray('.story-text p').forEach((p, i) => {
          gsap.fromTo(p,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: { trigger: p, start: 'top 88%', toggleActions: 'play none none reverse' },
              delay: i * 0.1,
            }
          );
        });

        /* Vision/Mission cards */
        gsap.utils.toArray('.vm-card').forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.92 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
              delay: i * 0.1,
            }
          );
        });

        /* Team cards - all 6 animate together at once */
        const teamGrid = document.querySelector('.team-grid-new');
        gsap.utils.toArray('.team-card-new').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: { trigger: teamGrid, start: 'top 95%', toggleActions: 'play none none none' },
            }
          );
        });

        /* Hero orbs */
        const heroOrb1 = document.querySelector('.hero-orb:first-child');
        const heroOrb2 = document.querySelector('.hero-orb:last-child');
        if (heroOrb1) {
          gsap.to(heroOrb1, { y: -40, x: 20, scale: 1.1, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 } });
        }
        if (heroOrb2) {
          gsap.to(heroOrb2, { y: -25, x: -15, scale: 0.9, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 } });
        }
      });
    }

    initAnimations();
    return () => { cancelled = true; if (ctx) ctx.revert(); };
  }, []);

  return (
    <>
      <Navbar activePage="about" />

      {/* Vision, Mission & Core Values — Side-by-side layout */}
      <section className="vmv-section">
        <div className="vmv-container">
          <div className="vmv-image-col reveal-left">
            <img
              src="/images/about-story.png"
              alt="Mozek HealthTech Team"
              loading="lazy"
            />
          </div>
          <div className="vmv-content-col">
            <div className="vmv-block reveal">
              <h2>Our Mission</h2>
              <p>We are on a mission to revolutionize our critical healthcare ecosystem, especially in neurological diseases and disorders. Our solutions don&apos;t just use cutting-edge technology — we redefine what&apos;s possible, improving life in ways that truly matter.</p>
            </div>
            <div className="vmv-block reveal">
              <h2>Our Vision</h2>
              <p>We are building breakthrough technologies that assist those with brain disorders. Our tech assists people in improving their quality of life. We&apos;re changing lives by creating beautifully designed breakthrough technologies that monitor, heal and assist.</p>
            </div>
            <div className="vmv-block reveal">
              <h2>Core Values</h2>
              <p>We believe digital health will redefine critical healthcare through breakthrough deep-tech innovations, enabling earlier intervention, more proactive and personalized care, improved quality of life, and a future where society is more health-conscious, connected, and empowered.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey - Fullscreen */}
      <section className="journey-showcase" onWheel={handleWheel}>
        <div
          className="journey-showcase-bg"
          style={{ backgroundImage: `url(${timelineItems[activeSlide].image})` }}
          role="img"
          aria-label={`Journey milestone ${activeSlide + 1}`}
        />
        <div className="journey-showcase-overlay" />
        <div className="journey-showcase-content">
          <h2 className="journey-showcase-title">Our Journey</h2>
          <p className="journey-showcase-text">{timelineItems[activeSlide].text}</p>
          <div className="journey-showcase-nav">
            <div className="journey-dots">
              {timelineItems.map((_, i) => (
                <button
                  key={i}
                  className={`journey-dot${i === activeSlide ? ' active' : ''}`}
                  onClick={() => handleNav(() => goTo(i))}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button className="journey-pause-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section section-cream section-bg-team">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">Our Team</h2>
          </div>
          <div className="team-grid-new">
            {teamMembers.map((member, i) => (
              <div className="team-card-new reveal" key={i}>
                <img src={member.image} alt={member.name} loading="lazy" />
                <div className="team-card-overlay">
                  <h4>{member.name}</h4>
                  <div className="role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="memory-lane-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title reveal">Behind the Scenes</h2>
          </div>
        </div>
        <div className="marquee-container">
          <div className="marquee-row marquee-left">
            <div className="marquee-track">
              {btsImages.map((src, i) => (
                <img key={`r1-${i}`} src={src} alt={`Behind the scenes ${i + 1}`} loading="lazy" />
              ))}
              {btsImages.map((src, i) => (
                <img key={`r1d-${i}`} src={src} alt="" aria-hidden="true" loading="lazy" />
              ))}
            </div>
          </div>
          <div className="marquee-row marquee-right">
            <div className="marquee-track">
              {[...btsImages].reverse().map((src, i) => (
                <img key={`r2-${i}`} src={src} alt={`Behind the scenes ${i + 1}`} loading="lazy" />
              ))}
              {[...btsImages].reverse().map((src, i) => (
                <img key={`r2d-${i}`} src={src} alt="" aria-hidden="true" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
