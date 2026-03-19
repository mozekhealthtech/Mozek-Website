'use client';
import { useState, useCallback } from 'react';

export default function ProductTimeline({ title, items }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const goPrev = useCallback(() => {
    setActiveSlide(prev => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % items.length);
  }, [items.length]);

  const item = items[activeSlide];

  return (
    <section className="ptl-section">
      <div className="ptl-inner">
        <h2 className="ptl-title reveal-up">{title}</h2>

        <div className="ptl-container">
          {/* Background image or video */}
          <div className="ptl-bg">
            {item.video ? (
              <video
                key={`vid-${activeSlide}`}
                className="ptl-bg-img"
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : item.image ? (
              <img src={item.image} alt={item.title} key={activeSlide} className="ptl-bg-img" />
            ) : item.svg ? (
              <div className="ptl-bg-svg" key={activeSlide}>{item.svg}</div>
            ) : null}
          </div>

          {/* Floating pills on left side */}
          <div className="ptl-pills">
            {items.map((it, i) => (
              <div
                key={i}
                className={`ptl-pill ${activeSlide === i ? 'active' : ''}`}
                onClick={() => setActiveSlide(i)}
              >
                {activeSlide === i ? (
                  <>
                    <div className="ptl-pill-title">{it.title}</div>
                    <span className="ptl-pill-date">{it.date}</span>
                    <p className="ptl-pill-desc">{it.desc}</p>
                  </>
                ) : (
                  <div className="ptl-pill-title">
                    <span className="ptl-pill-icon">+</span>
                    {it.title}
                  </div>
                )}
              </div>
            ))}

            <div className="ptl-nav-row">
              <button className="ptl-arrow" onClick={goPrev} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
              </button>
              <button className="ptl-arrow" onClick={goNext} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
