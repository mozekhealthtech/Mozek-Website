'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';
import ProductFeatureGrid from '@/components/ProductFeatureGrid';
import ProductTimeline from '@/components/ProductTimeline';

/* ── How Sathi Works steps ── */
const worksSteps = [
  {
    num: '01',
    title: 'Continuous Radar-Based Monitoring',
    desc: 'Mozek Sathi uses advanced millimetre-wave radar to continuously sense micro-movements, breathing patterns, and presence within a room—without any wearable or camera.',
  },
  {
    num: '02',
    title: 'AI-Powered Event Detection',
    desc: 'Onboard AI models analyse radar signals in real time to identify critical events such as falls, prolonged inactivity, restlessness, and abnormal breathing patterns.',
  },
  {
    num: '03',
    title: 'Adaptive AI Learning',
    desc: 'Sathi learns each resident\u2019s unique patterns over time—sleep rhythms, movement habits, and daily routines—reducing false alarms and surfacing genuine concerns faster.',
  },
  {
    num: '04',
    title: 'Plug-and-Play Setup & Connectivity',
    desc: 'Simply place Sathi in a room and power it on. It connects via Wi-Fi and begins monitoring within minutes, with no complex installation or calibration required.',
  },
  {
    num: '05',
    title: 'Instant Alerts & Intelligent Sync',
    desc: 'When an event is detected, Sathi instantly pushes alerts to caregivers through the Mozek Drishti dashboard and Companion App, providing context-rich notifications for faster response.',
  },
];

/* ── Drishti feature cards ── */
const drishtiFeatures = [
  {
    title: 'Real-Time Resident Monitoring',
    desc: 'View live status of every resident—presence, movement, sleep quality, and vitals—across all rooms from a single dashboard.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 10h2M11 8h2v4h-2zM15 9h2" />
      </svg>
    ),
  },
  {
    title: 'Advanced Care Insights',
    desc: 'AI-generated trends and analytics help identify declining health patterns, sleep disturbances, and behavioural changes before they become emergencies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 21H4.6c-.56 0-.84 0-1.05-.11a1 1 0 01-.44-.44C3 20.24 3 19.96 3 19.4V3" />
        <path d="M7 14l4-4 4 4 6-6" />
      </svg>
    ),
  },
  {
    title: 'Faster Emergency Response',
    desc: 'Automated alerts with event context—type of incident, room location, and timestamp—help caregivers prioritise and respond within seconds, not minutes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

/* ── Ecosystem items ── */
const ecosystemItems = [
  {
    title: 'Mozek Sathi',
    desc: 'Contactless room-level monitoring with radar-based fall and activity detection.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    title: 'G1 Band',
    desc: 'Wearable safety band with fall detection, SOS, and health monitoring on the go.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 7v1M12 16v1" />
      </svg>
    ),
  },
  {
    title: 'Companion App',
    desc: 'Mobile app for caregivers and families—alerts, insights, and medication reminders.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    title: 'Mozek Drishti',
    desc: 'Centralised care dashboard for facility-wide monitoring, analytics, and alerts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

/* ── Timeline data ── */
const timelineItems = [
  {
    date: 'Jun 2024',
    title: 'The Idea',
    desc: 'The concept for Mozek Sathi was born—a contactless safety system using radar technology to protect seniors without wearables or cameras.',
    svg: (
      <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="180" fill="#f3eeff" />
        <circle cx="150" cy="80" r="30" stroke="#7c3aed" strokeWidth="2" fill="none" />
        <path d="M135 80h30M150 65v30" stroke="#a855f7" strokeWidth="2" />
        <circle cx="150" cy="80" r="8" fill="#d8b4fe" />
        <text x="150" y="150" textAnchor="middle" fill="#7c3aed" fontSize="12" fontFamily="sans-serif">Ideation</text>
      </svg>
    ),
  },
  {
    date: 'Oct 2024',
    title: 'Proof of Concept',
    desc: 'Early prototypes validated radar-based fall detection and presence monitoring in controlled environments, confirming technical feasibility.',
    svg: (
      <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="180" fill="#f3eeff" />
        <rect x="110" y="50" width="80" height="60" rx="8" stroke="#7c3aed" strokeWidth="2" fill="none" />
        <circle cx="150" cy="80" r="12" stroke="#a855f7" strokeWidth="2" fill="#ede9fe" />
        <path d="M145 80l4 4 8-8" stroke="#7c3aed" strokeWidth="2" />
        <text x="150" y="150" textAnchor="middle" fill="#7c3aed" fontSize="12" fontFamily="sans-serif">Validation</text>
      </svg>
    ),
  },
  {
    date: 'Sept 2025',
    title: 'Minimum Viable Product',
    desc: 'The first fully functional Sathi device was completed—combining radar hardware, on-device AI, and cloud connectivity into a single unit.',
    svg: (
      <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="180" fill="#f3eeff" />
        <rect x="115" y="45" width="70" height="70" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="150" cy="80" r="15" fill="#d8b4fe" />
        <circle cx="150" cy="80" r="25" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
        <circle cx="150" cy="80" r="35" stroke="#c084fc" strokeWidth="0.8" opacity="0.3" />
        <text x="150" y="150" textAnchor="middle" fill="#7c3aed" fontSize="12" fontFamily="sans-serif">MVP Ready</text>
      </svg>
    ),
  },
];


export default function ProductSathiPage() {
  useScrollReveal();

  return (
    <>
      <Navbar activePage="products" />

      {/* ─── 1. Hero ─── */}
      <section className="sathi-hero">
        <div className="sathi-hero-inner">
          <div className="sathi-hero-text reveal-up">
            <h1>
              <span className="sathi-hero-white">Mozek</span>
              <br />
              <span className="sathi-hero-purple">Sathi</span>
            </h1>
            <p className="sathi-hero-tagline">Contactless senior safety that monitors well-being in real time — without wearables or cameras.</p>
          </div>
          <div className="sathi-hero-visual reveal-up">
            <img src="/images/sathi/sathi-product.png" alt="Mozek Sathi device" className="sathi-hero-product-img" />
          </div>
        </div>
      </section>

      {/* ─── 2. Designed for Modern Care Environments ─── */}
      <section className="sathi-care">
        <div className="sathi-care-inner reveal-up">
          <h2>Designed for Modern Care Environments</h2>
          <div className="sathi-care-pills">
            <div className="sathi-care-pill">
              <div className="sathi-care-pill-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 20a6 6 0 00-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <path d="M2 2l20 20" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
              <span>No Wearables Required.</span>
            </div>
            <div className="sathi-care-pill">
              <div className="sathi-care-pill-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                  <path d="M4 4l18 18" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
              <span>No Cameras. Privacy First.</span>
            </div>
            <div className="sathi-care-pill">
              <div className="sathi-care-pill-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span>Continuous Safety Monitoring.</span>
            </div>
          </div>
          <p className="sathi-care-desc">
            Mozek Sathi brings peace of mind to care environments by providing round-the-clock safety
            monitoring that respects the dignity and privacy of every resident. No wearables to forget,
            no cameras to feel watched by&mdash;just intelligent, silent protection that works in the background.
          </p>
        </div>
      </section>

      {/* ─── 3. How Mozek Sathi Works ─── */}
      <ProductFeatureGrid
        title="How Mozek Sathi Works"
        subtitle="From radar sensing to caregiver alerts — five intelligent layers working together."
        layout="center"
        features={worksSteps.map((s) => ({
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <text x="12" y="16" textAnchor="middle" fill="currentColor" stroke="none" fontSize="10" fontWeight="700">{s.num}</text>
            </svg>
          ),
          title: s.title,
          desc: s.desc,
        }))}
      />

      {/* ─── 4. Powered by Mozek Drishti ─── */}
      <section className="sathi-drishti">
        <div className="sathi-drishti-inner">
          <div className="sathi-drishti-header reveal-up">
            <h2>Intelligence Powered by Mozek Drishti</h2>
            <p className="sathi-drishti-tagline">The Command Center for Modern Care Environments</p>
            <p className="sathi-drishti-desc">
              Every Mozek Sathi device feeds into Drishti&mdash;a centralised care dashboard that gives
              facility managers and caregivers a complete, real-time view of resident safety and well-being
              across every room.
            </p>
          </div>

          <div className="sathi-drishti-cards reveal-up">
            {drishtiFeatures.map((feat, i) => (
              <div className="sathi-drishti-card" key={i}>
                <div className="sathi-drishti-card-icon">{feat.icon}</div>
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Connected Care Ecosystem ─── */}
      <section className="sathi-ecosystem">
        <div className="sathi-ecosystem-inner">
          <div className="sathi-ecosystem-header reveal-up">
            <h2>Connected Care Ecosystem</h2>
            <p className="sathi-ecosystem-subtitle">
              Mozek Sathi is part of a connected ecosystem of devices and platforms designed to provide
              comprehensive, layered care for seniors.
            </p>
          </div>

          <div className="sathi-ecosystem-flow reveal-up">
            {ecosystemItems.map((item, i) => (
              <div className="sathi-ecosystem-item-wrap" key={i}>
                <div className="sathi-ecosystem-item">
                  <div className="sathi-ecosystem-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                {i < ecosystemItems.length - 1 && (
                  <div className="sathi-ecosystem-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Making of Mozek Sathi ─── */}
      <ProductTimeline title="Making of Mozek Sathi" items={timelineItems} />

      <Footer />
    </>
  );
}
