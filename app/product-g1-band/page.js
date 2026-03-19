'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';
import ProductFeatureGrid from '@/components/ProductFeatureGrid';
import ScrollFrameAnimation from '@/components/ScrollFrameAnimation';
import ProductTimeline from '@/components/ProductTimeline';

/* ── Local image paths ── */
const IMG = {
  main:    '/images/g1/g1-main.png',
  finish:  '/images/g1/g1-finish.png',
  heart:   '/images/g1/g1-heart.png',
  motion:  '/images/g1/g1-motion.jpg',
  fall:    '/images/g1/g1-band-fall.png',
  battery: '/images/g1/g1-battery.png',
  sos:     '/images/g1/g1-sos.png',
  appDash: '/images/g1/app-dash.png',
  idea:    '/images/g1/g1-idea.jpg',
  poc:     '/images/g1/g1-poc.jpg',
  antenna: '/images/g1/g1-antenna.jpg',
  parents: '/images/g1/g1-parents.png',
};

/* ── Closer Look features ── */
const closerFeatures = [
  {
    id: 'finish',
    title: 'Finishes',
    desc: 'The ABS plastic case is available in a stunning matt finish.',
    image: IMG.finish,
  },
  {
    id: 'health',
    title: 'Health Sensor',
    desc: 'Mozek G1 uses innovative sensors \u2014 including a heart sensor and blood oxygen sensing \u2014 to stay on the pulse of your health.',
    image: IMG.heart,
  },
  {
    id: 'motion',
    title: 'Motion Sensors',
    desc: 'A gyroscope, an accelerometer work together to track your activity, deliver accurate metrics and enable safety features.',
    image: IMG.motion,
  },
  {
    id: 'durable',
    title: 'Durable Design',
    desc: 'With the toughest plastic in the industry encasing the essentials, you get a durable design to withstand most of the falls.',
    image: IMG.fall,
  },
  {
    id: 'battery',
    title: 'All-Day Battery Life',
    desc: 'A high-capacity Li-Po battery delivers up to 24 hours of use. Fast charging restores full power in about 2 hours.',
    image: IMG.battery,
  },
];

/* ── Timeline data ── */
const timelineItems = [
  { date: 'Dec 2022', title: 'The Idea', desc: 'The concept for Mozek G1 Band was born: a wearable designed to detect falls and instantly notify caregivers, helping elderly individuals live independently with greater safety.', image: IMG.idea },
  { date: 'Mar 2023', title: 'Proof of Concept', desc: 'Initial prototypes validated the core idea. Early testing confirmed that fall detection through motion sensors and data patterns was technically feasible.', image: IMG.poc },
  { date: 'Nov 2023', title: 'Antenna Development', desc: 'Custom antenna design enabled reliable connectivity, ensuring alerts and data transmission could reach caregivers without interruption.', image: IMG.antenna },
  { date: 'May 2024', title: 'Detection Algorithm', desc: 'Advanced motion analysis algorithms were developed to accurately distinguish real falls from everyday movements, improving reliability and reducing false alarms.', video: '/videos/g1-algo-detection.mp4' },
  { date: 'Aug 2024', title: 'Battery Optimization', desc: 'Power management and battery design were optimized to support long-lasting daily use while maintaining continuous monitoring.', image: IMG.battery },
  { date: 'Dec 2024', title: 'MVP', desc: 'The first fully functional Mozek G1 Band prototype was completed, combining hardware, firmware, and the fall detection system into a working device.', image: IMG.poc },
  { date: 'Oct 2025', title: 'Real-World Testing', desc: 'Extensive testing began to validate fall detection accuracy, device durability, and reliability in real-world environments.', image: IMG.antenna },
  { date: 'Present', title: 'Pre-Seed Stage', desc: 'Mozek is preparing for its pre-seed funding round to scale development, expand testing, and bring the G1 Band to market.', image: IMG.main },
];

/* ── Safety features ── */
const safetyFeatures = [
  {
    title: 'Emergency SOS. Instantly.',
    desc: 'Need urgent help? Simply press and hold the side button on your Mozek G1 Band to instantly alert your loved ones and emergency contacts, sharing your real-time location.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  },
  {
    title: 'Fall Detection. Always Watching.',
    desc: 'If Mozek G1 detects a hard fall, it automatically sends alerts to your trusted contacts along with your current location, helping them respond quickly when you need assistance.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
  {
    title: 'Seizure Detection. Continuous Protection.',
    desc: 'Mozek G1 intelligently monitors motion patterns and can detect potential epileptic seizures. When detected, it automatically notifies your loved ones and shares your location so help can reach you faster.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    title: 'Seamless Connectivity',
    desc: 'Mozek G1 connects seamlessly with the Mozek Companion App, enabling advanced safety alerts, emergency notifications, and continuous monitoring for greater peace of mind.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></svg>,
  },
];

/* ── Companion features ── */
const companionFeatures = [
  { title: 'Seamless Band Connectivity', desc: 'Pair your Mozek G1 Band with the Companion App in seconds. Once connected, the app keeps your band synced, ensuring alerts, updates, and safety features always stay active.' },
  { title: 'Instant Emergency Support', desc: 'When an emergency is detected or triggered, the app immediately notifies your trusted contacts and shares your real-time location\u2014helping them respond quickly when it matters most.' },
  { title: 'Smart Pill Reminders', desc: 'Never miss an important medication. The Companion App sends timely reminders to help users stay consistent with their prescribed routines.' },
  { title: 'Automatic Health Logs & Insights', desc: 'The app continuously records important activity data and events, turning them into clear logs and easy-to-understand insights that caregivers and families can review anytime.' },
  { title: 'Part of the Mozek Ecosystem', desc: 'The Companion App works seamlessly with the entire Mozek ecosystem, bringing devices, monitoring, and care features together in one connected platform.' },
];


export default function ProductG1BandPage() {
  useScrollReveal();

  /* ── Closer Look state ── */
  const [activeCloser, setActiveCloser] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const closerIntervalRef = useRef(null);
  const scrollRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  /* ── Helper: scroll container to center a card without moving page ── */
  const scrollContainerToCard = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index];
    if (!card) return;
    const target = card.offsetLeft - (el.offsetWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  const startCloserAutoplay = useCallback(() => {
    closerIntervalRef.current = setInterval(() => {
      setActiveCloser(prev => {
        const next = prev === closerFeatures.length - 1 ? 0 : prev + 1;
        scrollContainerToCard(next);
        return next;
      });
    }, 4000);
  }, [scrollContainerToCard]);

  /* ── Auto-advance Closer Look every 4 seconds ── */
  useEffect(() => {
    if (isPlaying) {
      startCloserAutoplay();
    }
    return () => clearInterval(closerIntervalRef.current);
  }, [isPlaying, startCloserAutoplay]);

  const toggleCloserPlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  /* ── Sync active dot on scroll ── */
  const handleScroll = useCallback(() => {
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      const cards = el.children;
      const scrollCenter = el.scrollLeft + el.offsetWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const cardCenter = cards[i].offsetLeft + cards[i].offsetWidth / 2;
        const dist = Math.abs(scrollCenter - cardCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      }
      setActiveCloser(closest);
    }, 80);
  }, []);

  const scrollToCard = useCallback((index) => {
    setActiveCloser(index);
    scrollContainerToCard(index);
  }, [scrollContainerToCard]);


  return (
    <>
      <Navbar activePage="products" />

      {/* ─── 1. G1 Hero + Scroll Frame Animation ─── */}
      <section className="g1-band-hero">
        <h1><span className="g1-hero-white">Mozek</span> <span className="g1-hero-purple">G1 Band</span></h1>
        <p className="g1-band-hero-sub">Intelligent wearable safety for the ones who matter most.</p>
        <div className="scroll-indicator"><div className="mouse"></div>Scroll</div>
      </section>
      <ScrollFrameAnimation showCTA={false} />

      {/* ─── 2. Take a Closer Look — Scroll Carousel ─── */}
      <section className="g1-closer">
        <div className="g1-closer-inner">
          <h2 className="g1-closer-title reveal-up">Take a closer look.</h2>

          <div className="g1-closer-scroll" ref={scrollRef} onScroll={handleScroll}>
            {closerFeatures.map((feat) => (
              <div className="g1-closer-card" key={feat.id}>
                <img src={feat.image} alt={feat.title} className="g1-closer-card-img" />
                <div className="g1-closer-card-gradient" />
                <div className="g1-closer-card-body">
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="g1-closer-controls">
            <div className="g1-closer-dots">
              {closerFeatures.map((feat, i) => (
                <button
                  key={feat.id}
                  className={`g1-closer-dot${activeCloser === i ? ' active' : ''}`}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to ${feat.title}`}
                />
              ))}
            </div>
            <button className="g1-closer-pause" onClick={toggleCloserPlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ─── 3. Safety That Stays With You ─── */}
      <section className="g1-safety-v2">
        <div className="g1-safety-v2-inner">
          <div className="g1-safety-v2-header reveal-up">
            <h2>Safety That Stays With You</h2>
            <p className="g1-safety-v2-subtitle">Mozek G1 Band is designed with safety at its core. Always ready to respond when it matters most, it helps ensure that help can be reached quickly&mdash;giving you confidence and your loved ones greater peace of mind.</p>
          </div>

          <div className="g1-safety-v2-layout reveal-up">
            <div className="g1-safety-v2-img">
              <img src={IMG.sos} alt="Mozek G1 Band SOS" />
            </div>
            <div className="g1-safety-v2-grid">
              {safetyFeatures.map((feat, i) => (
                <div className="g1-safety-v2-card" key={i}>
                  <div className="g1-safety-v2-icon">{feat.icon}</div>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Powered by the Mozek Companion App ─── */}
      <ProductFeatureGrid
        title="Powered by the Mozek Companion App"
        subtitle="Your control center for safety, care, and insights."
        layout="side"
        image={IMG.appDash}
        imageAlt="Mozek Companion App Dashboard"
        features={companionFeatures.map((f, i) => ({
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <text x="12" y="16" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontWeight="700">0{i + 1}</text>
            </svg>
          ),
          title: f.title,
          desc: f.desc,
        }))}
      />

      {/* ─── 5. From Concept to Reality ─── */}
      <ProductTimeline title="From Concept to Reality" items={timelineItems} />

      {/* ─── 6. Band For Your Parents ─── */}
      <section className="g1-parents">
        <div className="g1-parents-inner reveal-up">
          <div className="g1-parents-text">
            <h2>Band For Your Parents</h2>
            <p>With intelligent fall detection and real-time alerts, the band instantly notifies you if a fall occurs, so you can act quickly when it matters most.</p>
            <p className="g1-parents-highlight">Whether they&rsquo;re walking at home, stepping outside, or living independently, Mozek G1 adds a silent layer of protection&mdash;Giving them Freedom and Giving you Peace of Mind.</p>
          </div>
          <div className="g1-parents-img">
            <img src={IMG.parents} alt="Band for your parents" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
