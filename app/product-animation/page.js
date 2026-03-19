"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import "./animation.css";

export default function ProductAnimationPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [watchRotation, setWatchRotation] = useState(0);
  const [screenOn, setScreenOn] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState([]);
  const [pulseActive, setPulseActive] = useState(false);
  const containerRef = useRef(null);
  const totalSections = 8;

  // Section titles for navigation dots
  const sectionNames = [
    "Introduction",
    "Heartbeat Monitor",
    "Inside the Watch",
    "Design & Ports",
    "SOS Emergency",
    "Smart Display",
    "Features",
    "Lifestyle",
  ];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setPulseActive(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = window.scrollY;
    const docHeight =
      containerRef.current.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);

    const sectionIndex = Math.min(
      Math.floor(progress * totalSections),
      totalSections - 1
    );
    setCurrentSection(sectionIndex);

    // Watch rotation based on scroll
    setWatchRotation(progress * 360);

    // Screen turns on in section 5+
    setScreenOn(sectionIndex >= 5);

    // SOS active in section 4
    setSosActive(sectionIndex === 4);

    // Features appear progressively in section 6
    if (sectionIndex >= 6) {
      const featureProgress = (progress - 6 / totalSections) / (1 / totalSections);
      const numFeatures = Math.min(
        Math.floor(featureProgress * 7) + 1,
        6
      );
      setFeaturesVisible(Array.from({ length: numFeatures }, (_, i) => i));
    } else {
      setFeaturesVisible([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // IntersectionObserver for scroll-triggered section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll(".anim-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (index) => {
    if (!containerRef.current) return;
    const docHeight =
      containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = (index / totalSections) * docHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="watch-animation-page">
      {/* Fixed Navigation */}
      <nav className="anim-nav">
        <Link href="/" className="anim-nav-logo">
          MOZEK
        </Link>
        <div className="anim-nav-dots">
          {sectionNames.map((name, i) => (
            <button
              key={i}
              className={`anim-dot ${currentSection === i ? "active" : ""}`}
              onClick={() => scrollToSection(i)}
              title={name}
            >
              <span className="dot-tooltip">{name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="anim-progress">
        <div
          className="anim-progress-fill"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* ============================================ */}
      {/* SECTION 1 - Hero Introduction */}
      {/* ============================================ */}
      <section className="anim-section anim-hero">
        <div className="anim-hero-content">
          <div className={`anim-hero-text ${isLoaded ? "visible" : ""}`}>
            <span className="anim-overline">INTRODUCING</span>
            <h1 className="anim-title">
              MOZEK <span className="anim-gradient-text">G1 BAND</span>
            </h1>
            <p className="anim-subtitle">
              Intelligent Healthcare Wearable
            </p>
            <div className="anim-hero-tags">
              <span className="anim-tag">AI-Powered</span>
              <span className="anim-tag">Seizure Detection</span>
              <span className="anim-tag">Fall Detection</span>
              <span className="anim-tag">SOS Alert</span>
            </div>
            <div className="anim-scroll-hint">
              <span>Scroll to explore</span>
              <div className="anim-scroll-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4v16m0 0l-6-6m6 6l6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={`anim-hero-watch ${isLoaded ? "visible" : ""}`}>
            <div className="watch-glow" />
            <img
              src="/images/watch-animation/slide1_colored.png"
              alt="Mozek G1 Band - Back View"
              className="watch-image-hero"
            />
            <div className={`watch-particles ${pulseActive ? "active" : ""}`}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="particle" style={{ "--i": i }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2 - Heartbeat Monitor */}
      {/* ============================================ */}
      <section className="anim-section anim-heartbeat">
        <div className="heartbeat-bg">
          <img
            loading="lazy" src="/images/watch-animation/slide2_colored.png"
            alt="Heartbeat Monitoring"
            className="heartbeat-img"
          />
          <div className="heartbeat-overlay" />
        </div>
        <div className="heartbeat-content">
          <h2 className="anim-section-title">
            ALWAYS <span className="text-red">MONITORING</span>
          </h2>
          <div className="heartbeat-line">
            <svg viewBox="0 0 800 100" className="ecg-line">
              <polyline
                points="0,50 100,50 130,50 145,20 160,80 175,10 190,90 205,50 250,50 350,50 380,50 395,20 410,80 425,10 440,90 455,50 500,50 600,50 630,50 645,20 660,80 675,10 690,90 705,50 800,50"
                fill="none"
                stroke="#ff3333"
                strokeWidth="2"
                className="ecg-path"
              />
            </svg>
          </div>
          <div className="heartbeat-features">
            <div className="hb-feature">
              <div className="hb-icon" style={{ borderColor: "#7b2cbf" }}>
                <span>EEG</span>
              </div>
              <span>EEG Monitoring</span>
            </div>
            <div className="hb-feature">
              <div className="hb-icon" style={{ borderColor: "#ff3333" }}>
                <span>HR</span>
              </div>
              <span>Heart Rate</span>
            </div>
            <div className="hb-feature">
              <div className="hb-icon" style={{ borderColor: "#00c8b4" }}>
                <span>O2</span>
              </div>
              <span>SpO2 Tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3 - Exploded / Internal View */}
      {/* ============================================ */}
      <section className="anim-section anim-exploded">
        <div className="exploded-content">
          <div className="exploded-text">
            <h2 className="anim-section-title">
              ENGINEERED{" "}
              <span className="anim-gradient-text">INSIDE OUT</span>
            </h2>
            <div className="component-list">
              {[
                {
                  name: "Protective Case",
                  desc: "Medical-grade polycarbonate shell",
                  color: "#7b2cbf",
                },
                {
                  name: "Smart Sensor Array",
                  desc: "EEG, PPG, SpO2, accelerometer",
                  color: "#00c8b4",
                },
                {
                  name: "Long-life Battery",
                  desc: "7-day battery with fast USB-C charge",
                  color: "#ff3333",
                },
                {
                  name: "Medical-Grade PCB",
                  desc: "Custom designed for precision monitoring",
                  color: "#a777e3",
                },
              ].map((comp, i) => (
                <div key={i} className="component-item">
                  <div
                    className="comp-dot"
                    style={{ backgroundColor: comp.color }}
                  />
                  <div>
                    <h4>{comp.name}</h4>
                    <p>{comp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="exploded-image">
            <img
              loading="lazy" src="/images/watch-animation/slide3_colored.png"
              alt="Internal Components"
              className="watch-exploded"
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4 - Design & Ports */}
      {/* ============================================ */}
      <section className="anim-section anim-design">
        <div className="design-content">
          <div className="design-left">
            <h3>SLEEK DESIGN</h3>
            <div className="design-accent" />
            <ul className="design-features">
              <li>Compact form factor</li>
              <li>Water-resistant IP67</li>
              <li>Hypoallergenic materials</li>
              <li>Lightweight 38g</li>
            </ul>
          </div>
          <div className="design-center">
            <img
              loading="lazy" src="/images/watch-animation/slide4_colored.png"
              alt="Side View - USB-C Port"
              className="watch-side"
            />
          </div>
          <div className="design-right">
            <h3>USB-C CHARGING</h3>
            <div className="design-accent teal" />
            <ul className="design-features">
              <li>Fast charging via USB-C</li>
              <li>2-hour full charge</li>
              <li>7-day battery life</li>
              <li>Wireless data sync</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5 - SOS Emergency */}
      {/* ============================================ */}
      <section className="anim-section anim-sos">
        <div className="sos-content">
          <div className="sos-image-container">
            <img
              loading="lazy" src="/images/watch-animation/slide5_colored.png"
              alt="SOS Emergency Button"
              className="watch-sos"
            />
            <div className={`sos-pulse-ring ${sosActive ? "active" : ""}`} />
            <div
              className={`sos-pulse-ring ring2 ${sosActive ? "active" : ""}`}
            />
            <div
              className={`sos-pulse-ring ring3 ${sosActive ? "active" : ""}`}
            />
          </div>
          <div className="sos-text">
            <h2 className="sos-title">
              SOS<br />
              <span className="text-red">EMERGENCY</span>
            </h2>
            <div className="sos-accent" />
            <h3 className="sos-sub">ONE-TOUCH EMERGENCY ALERT</h3>
            <div className="sos-features">
              {[
                "Instant SOS alert to emergency contacts",
                "GPS location sharing in real-time",
                "Automatic fall detection trigger",
                "Direct connection to medical services",
                "Works even without phone nearby",
              ].map((feat, i) => (
                <div key={i} className="sos-feat">
                  <span className="sos-star">✦</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6 - Smart Display */}
      {/* ============================================ */}
      <section className="anim-section anim-display">
        <div className="display-content">
          <div className="display-left-features">
            {[
              { title: "Real-time Clock", desc: "Always visible time display" },
              { title: "Heart Rate", desc: "Continuous BPM monitoring" },
              { title: "Step Counter", desc: "Daily activity tracking" },
            ].map((feat, i) => (
              <div key={i} className="display-feat left">
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
          <div className="display-watch-container">
            <div className={`screen-glow ${screenOn ? "on" : ""}`} />
            <img
              loading="lazy" src="/images/watch-animation/slide6_colored.png"
              alt="Smart Display"
              className="watch-display"
            />
          </div>
          <div className="display-right-features">
            {[
              { title: "Seizure Alerts", desc: "AI-powered EEG analysis" },
              { title: "SpO2 Level", desc: "Blood oxygen monitoring" },
              { title: "MOZEK G1", desc: "Your health companion" },
            ].map((feat, i) => (
              <div key={i} className="display-feat right">
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="display-tagline">
          Everything you need, right on your wrist
        </p>
      </section>

      {/* ============================================ */}
      {/* SECTION 7 - Complete Ecosystem */}
      {/* ============================================ */}
      <section className="anim-section anim-ecosystem">
        <h2 className="anim-section-title center">
          COMPLETE HEALTH{" "}
          <span className="anim-gradient-text">ECOSYSTEM</span>
        </h2>
        <div className="eco-grid">
          <div className="eco-left">
            {[
              {
                icon: "🧠",
                title: "EEG Monitoring",
                desc: "Real-time brain activity analysis",
              },
              {
                icon: "❤️",
                title: "Heart Rate",
                desc: "Medical-grade PPG sensor",
              },
              {
                icon: "🫁",
                title: "SpO2 Tracking",
                desc: "Continuous blood oxygen",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className={`eco-card ${featuresVisible.includes(i) ? "visible" : ""}`}
              >
                <span className="eco-icon">{feat.icon}</span>
                <div>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="eco-center">
            <img
              loading="lazy" src="/images/watch-animation/slide7_colored.png"
              alt="Feature Ecosystem"
              className="watch-eco"
            />
          </div>
          <div className="eco-right">
            {[
              {
                icon: "🆘",
                title: "SOS Alert",
                desc: "One-touch emergency response",
              },
              {
                icon: "📱",
                title: "App Connected",
                desc: "Sync with Mozek companion app",
              },
              {
                icon: "🔋",
                title: "7-Day Battery",
                desc: "Long-lasting with USB-C charge",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className={`eco-card ${featuresVisible.includes(i + 3) ? "visible" : ""}`}
              >
                <span className="eco-icon">{feat.icon}</span>
                <div>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 8 - Lifestyle / CTA */}
      {/* ============================================ */}
      <section className="anim-section anim-lifestyle">
        <div className="lifestyle-bg">
          <img
            loading="lazy" src="/images/watch-animation/slide8_colored.png"
            alt="Mozek G1 Band Lifestyle"
            className="lifestyle-img"
          />
          <div className="lifestyle-overlay" />
        </div>
        <div className="lifestyle-content">
          <h2 className="lifestyle-title">MOZEK G1 BAND</h2>
          <p className="lifestyle-subtitle">
            Your Intelligent Health Guardian
          </p>
          <div className="lifestyle-cta-group">
            <Link href="/product-g1-band" className="lifestyle-cta primary">
              Learn More
            </Link>
            <Link href="/contact" className="lifestyle-cta secondary">
              Contact Us
            </Link>
          </div>
          <p className="lifestyle-url">www.mozekhealthtech.com</p>
        </div>
      </section>
    </div>
  );
}
