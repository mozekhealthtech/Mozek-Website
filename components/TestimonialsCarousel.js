'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

const TESTIMONIALS = [
  {
    text: `At Kriti Eldercare, our focus is on safety, dignity, and proactive wellbeing for every resident. Bringing the Mozek G1 Band and the Mozek Ecosystem into our day-to-day routine was genuinely seamless. The real-time health monitoring, fall alerts, and centralized dashboard give our caregivers clear visibility—without adding complexity or extra steps. What we value most is how naturally it fits into our workflow: no disruption, just better response readiness. It has improved our ability to act quickly, strengthened our records, and increased family confidence. Mozek isn't just a wearable—it's reliable care infrastructure.`,
    initials: 'SK',
    name: 'Mr. Surendu',
    role: 'Kriti Eldercare',
  },
  {
    text: `Earlier, our care depended heavily on manual rounds and periodic checks. After adopting the Mozek G1 Band with the Mozek Ecosystem, our monitoring became continuous, structured, and far more effective. The band is comfortable for seniors to wear, and the data flows smoothly into the system, making it easy for our team to track trends and respond to alerts in time. Setup and onboarding were straightforward, and the platform is simple enough for staff to use consistently. Overall, Mozek has helped us raise the standard of care while also improving operational efficiency.`,
    initials: 'SS',
    name: 'Mr. Shrinivasa',
    role: 'Sneha Sandha Age Care Foundation',
  },
  {
    text: `In a hospice environment, comfort and timely support matter as much as clinical monitoring. The Mozek G1 Band and the Mozek Ecosystem have blended into our care model with surprising ease. The ability to track key health indicators and receive emergency alerts—without increasing paperwork or staff burden—has been a major advantage. Families value the added transparency and reassurance, while our team trusts the reliability of the system. Mozek has strengthened our ability to deliver attentive, responsive care while keeping the experience calm and respectful for seniors.`,
    initials: 'AG',
    name: 'Ms. Anjita',
    role: 'Ganga Prem Hospice',
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive(index);
  }, []);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  return (
    <section className="section section-cream testimonials-carousel-section">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">Let&apos;s See What Wonderful People Think About Us</h2>
        </div>

        <div
          className="testimonials-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Navigation arrows */}
          <button className="tc-arrow tc-arrow-left" onClick={prev} aria-label="Previous testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="tc-viewport">
            <div
              className="tc-track"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div className="tc-slide" key={i}>
                  <div className="tc-card">
                    <p className="tc-text">{t.text}</p>
                    <div className="t-author">
                      <div className="t-av">{t.initials}</div>
                      <div>
                        <div className="t-name">{t.name}</div>
                        <div className="t-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="tc-arrow tc-arrow-right" onClick={next} aria-label="Next testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="tc-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`tc-dot${active === i ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
