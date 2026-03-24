"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useScrollReveal from "@/hooks/useScrollReveal";
import useGSAPAnimations from "@/hooks/useGSAPAnimations";
import ScrollFrameAnimation from "@/components/ScrollFrameAnimation";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

// ── Moved outside component to prevent re-creation on every render ──
const VIDEOS = [
  "/videos/6130550-hd_1920_1080_30fps.mp4",
  "/videos/7017913-uhd_3840_2160_24fps.mp4",
  "/videos/7423530-uhd_3840_2160_30fps.mp4",
  "/videos/8375448-uhd_4096_2160_25fps.mp4",
];

export default function HomePage() {
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRefs = useRef([]);

  // Fix scroll jump on refresh
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useScrollReveal();
  useGSAPAnimations();

  // Stable callback to advance to next video
  const advanceVideo = useCallback(() => {
    setVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  useEffect(() => {
    // ── Video cycling logic ──
    const currentVideoEl = videoRefs.current[videoIndex];
    if (!currentVideoEl) return;

    currentVideoEl.play();

    // Preload NEXT video so transition is seamless
    const nextIndex = (videoIndex + 1) % VIDEOS.length;
    const nextVideoEl = videoRefs.current[nextIndex];
    if (nextVideoEl && nextVideoEl.preload === "none") {
      nextVideoEl.preload = "auto";
    }

    currentVideoEl.addEventListener("ended", advanceVideo);
    return () => {
      currentVideoEl.removeEventListener("ended", advanceVideo);
    };
  }, [videoIndex, advanceVideo]);

  useEffect(() => {
    // ── Counter animation — optimized with single rAF loop ──
    function animateCounters() {
      const elements = document.querySelectorAll("[data-count]");
      if (!elements.length) return;
      const counters = Array.from(elements).map((el) => ({
        el,
        target: parseFloat(el.dataset.count),
        suffix: el.dataset.suffix || "",
        isDecimal: el.dataset.decimal === "true",
      }));
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        for (const c of counters) {
          const current = eased * c.target;
          c.el.textContent = (c.isDecimal ? current.toFixed(1) : Math.floor(current)) + c.suffix;
        }
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    // ── Counter trigger ──
    const statsEl = document.querySelector(".stats-section");
    let statsObs;
    if (statsEl) {
      statsObs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            statsObs.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      statsObs.observe(statsEl);
    }

    // ── Video fallback: hide gradient if video loads ──
    const firstVideo = document.querySelector(".video-hero video");
    const handleCanPlay = () => {
      const fallback = document.querySelector(".video-fallback");
      if (fallback) fallback.style.opacity = "0";
    };
    if (firstVideo) {
      firstVideo.addEventListener("canplay", handleCanPlay, { once: true });
    }

    return () => {
      if (statsObs) statsObs.disconnect();
      if (firstVideo) firstVideo.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <>
      <Navbar activePage="home" />

      {/* ═══════ VIDEO HERO ═══════ */}
      <section className="video-hero">
        {/* Background Video Cycling Container */}
        <div className="video-fallback"></div>
        <div
          className="video-container"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {VIDEOS.map((videoSrc, index) => (
            <video
              key={videoSrc}
              ref={(el) => {
                if (el) videoRefs.current[index] = el;
              }}
              muted
              playsInline
              preload={index === 0 ? "auto" : "none"}
              poster=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: videoIndex === index ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                willChange: videoIndex === index || videoIndex === (index - 1 + VIDEOS.length) % VIDEOS.length ? "opacity" : "auto",
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ))}
        </div>
        <div className="hero-mesh"></div>
        <div className="hero-grid"></div>
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="video-overlay"></div>

        <div className="video-hero-content hero-text-reveal">
          <h1>Building <span className="highlight">Deeptech Products</span><br />for Digital Health</h1>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
          Scroll
        </div>
      </section>

      {/* ═══════ SCROLL FRAME ANIMATION ═══════ */}
      <ScrollFrameAnimation />

      {/* ═══════ STATISTICS ═══════ */}
      <section className="stats-section">
        <div className="stats-strip">
          <div className="stats-strip-item reveal">
            <div className="stats-strip-number" data-count="3">0</div>
            <div className="stats-strip-label">Products</div>
          </div>
          <div className="stats-strip-divider"></div>
          <div className="stats-strip-item reveal">
            <div className="stats-strip-number" data-count="5">0</div>
            <div className="stats-strip-label">Clients</div>
          </div>
          <div className="stats-strip-divider"></div>
          <div className="stats-strip-item reveal">
            <div className="stats-strip-number" data-count="1000" data-suffix="+">0</div>
            <div className="stats-strip-label">Lives Impacted</div>
          </div>
        </div>
      </section>

      {/* ═══════ INDUSTRY ═══════ */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Potential Markets</h2>
          </div>
          <div className="industry-grid stagger-children">
            <div className="industry-card reveal">
              <div className="industry-card-img">
                <img src="/images/markets/assisted-living.jpg" alt="Assisted Living" loading="lazy" decoding="async" />
              </div>
              <h3>Assisted Living</h3>
            </div>
            <div className="industry-card reveal">
              <div className="industry-card-img">
                <img src="/images/markets/home-health.png" alt="Home Health" loading="lazy" decoding="async" />
              </div>
              <h3>Home Health</h3>
            </div>
            <div className="industry-card reveal">
              <div className="industry-card-img">
                <img src="/images/markets/rehabilitation-center.jpg" alt="Rehabilitation Center" loading="lazy" decoding="async" />
              </div>
              <h3>Rehabilitation Center</h3>
            </div>
            <div className="industry-card reveal">
              <div className="industry-card-img">
                <img src="/images/markets/hospitals.jpg" alt="Hospitals" loading="lazy" decoding="async" />
              </div>
              <h3>Hospitals</h3>
            </div>
            <div className="industry-card reveal">
              <div className="industry-card-img">
                <img src="/images/markets/dementia-care.png" alt="Dementia Care Homes" loading="lazy" decoding="async" />
              </div>
              <h3>Dementia Care Homes</h3>
            </div>
            <div className="industry-card reveal">
              <div className="industry-card-img">
                <img src="/images/markets/hospice-dialysis.jpg" alt="Hospice / Dialysis Centers" loading="lazy" decoding="async" />
              </div>
              <h3>Hospice / Dialysis Centers</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS CAROUSEL ═══════ */}
      <TestimonialsCarousel />

      {/* ═══════ BLOG PREVIEW ═══════ */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Latest Insights</h2>
          </div>
          <div className="blog-preview-grid stagger-children">
            <Link
              href="/blog-hospital-data-stream"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="bp-card reveal">
                <div className="bp-img">
                  <img
                    src="/images/blog/blog-1.png"
                    alt="Hospital Data Stream Digital Health"
                    loading="lazy"
                  />
                </div>
                <div className="bp-body">
                  <div className="bp-title">
                    The Hospital Is No Longer a Place. It{"'"}s a Data Stream.
                  </div>
                  <p className="bp-excerpt">
                    Healthcare is moving from place-based intervention to
                    time-based visibility. Continuous monitoring is inevitable.
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/blog-wearables-clinical"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="bp-card reveal">
                <div className="bp-img">
                  <img
                    src="/images/blog/blog-2.png"
                    alt="Wearables Clinical Grade"
                    loading="lazy"
                  />
                </div>
                <div className="bp-body">
                  <div className="bp-title">
                    Why Most Wearables Will Never Be Clinical
                  </div>
                  <p className="bp-excerpt">
                    Consumer wearables and clinical tools are different species
                    with different survival requirements.
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/blog-abdm-rpm-india"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="bp-card reveal">
                <div className="bp-img">
                  <img
                    src="/images/blog/blog-3.png"
                    alt="ABDM RPM India Advantage"
                    loading="lazy"
                  />
                </div>
                <div className="bp-body">
                  <div className="bp-title">
                    ABDM + RPM: India{"'"}s Unfair Advantage in Digital Health
                  </div>
                  <p className="bp-excerpt">
                    India{"'"}s digital rails and massive demand create a rare
                    window for leapfrogging in digital health.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
