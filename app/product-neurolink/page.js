'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';
import ProductFeatureGrid from '@/components/ProductFeatureGrid';
import ProductTimeline from '@/components/ProductTimeline';

/* ── Local image paths ── */
const IMG = {
  main:          '/images/elix/elix-main.jpg',
  dummy1:        '/images/elix/elix-dummy-1.png',
  dummy2:        '/images/elix/elix-dummy-2.png',
  open:          '/images/elix/elix-open.png',
  carry:         '/images/elix/elix-carry.png',
  carryCloseup:  '/images/elix/elix-carry-closeup.png',
};

/* ── Neuromodulation features (Apple Watch SE style accordion) ── */
const neuroFeatures = [
  {
    id: 'gentle',
    title: 'Gentle Brain Stimulation',
    desc: 'NeuroLink Elix uses transcranial direct current stimulation (tDCS), a clinically studied neuromodulation approach that delivers low-intensity electrical stimulation to targeted brain regions associated with emotional regulation.',
    image: IMG.open,
  },
  {
    id: 'guided',
    title: 'Guided Therapy Sessions',
    desc: 'Predefined stimulation protocols guide each session, helping ensure consistency, safety, and ease of use across both personal and supervised care environments.',
    image: IMG.dummy1,
  },
  {
    id: 'precision',
    title: 'Precision Electrode Placement',
    desc: 'A thoughtfully designed electrode placement system enables accurate and comfortable positioning, supporting reliable and repeatable sessions.',
    image: IMG.dummy2,
  },
  {
    id: 'safety',
    title: 'Built-in Safety & Session Control',
    desc: 'Integrated safety mechanisms and session tracking ensure stimulation remains within controlled parameters while supporting structured and responsible use.',
    image: IMG.main,
  },
];

/* ── Timeline data ── */
const timelineItems = [
  { date: 'Oct 2025', title: 'The Idea', desc: 'NeuroLink Elix was conceived as a home-compatible neuromodulation solution designed to make clinically studied brain stimulation more accessible for individuals navigating depression and mood-related challenges.', image: IMG.main },
  { date: 'Jan 2026', title: 'Proof of Concept', desc: 'Initial prototypes validated the core tDCS stimulation system, demonstrating the ability to deliver controlled, low-intensity electrical stimulation safely and consistently through a compact, guided device design.', image: IMG.open },
];


export default function ProductNeurolinkPage() {
  useScrollReveal();

  /* ── Accordion state ── */
  const [activeFeature, setActiveFeature] = useState(0);

  /* ── Accordion navigation ── */
  const goFeaturePrev = useCallback(() => {
    setActiveFeature(prev => (prev === 0 ? neuroFeatures.length - 1 : prev - 1));
  }, []);
  const goFeatureNext = useCallback(() => {
    setActiveFeature(prev => (prev === neuroFeatures.length - 1 ? 0 : prev + 1));
  }, []);

  /* ── Auto-advance accordion every 4 seconds ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev === neuroFeatures.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar activePage="products" />

      {/* ─── 1. Hero ─── */}
      <section className="elix-hero">
        <div className="elix-hero-inner">
          <div className="elix-hero-text reveal-up">
            <h1><span className="elix-hero-white">NeuroLink</span><br /><span className="elix-hero-purple">Elix</span></h1>
            <p className="elix-hero-tagline">Modern brain stimulation for emotional wellness. Safe, guided tDCS sessions designed for everyday life.</p>
          </div>
          <div className="elix-hero-img reveal-up">
            <img src={IMG.dummy1} alt="NeuroLink Elix device" draggable="false" />
          </div>
        </div>
      </section>

      {/* ─── 2. Designed for Everyday Mental Wellness ─── */}
      <section className="elix-wellness">
        <div className="elix-wellness-inner">
          <div className="elix-wellness-img reveal-up">
            <img src={IMG.open} alt="NeuroLink Elix open" draggable="false" />
          </div>
          <div className="elix-wellness-text reveal-up">
            <h2>Designed for Everyday Mental Wellness</h2>
            <p>Mental health support is no longer confined to clinics and appointments. NeuroLink Elix is designed for a world where consistent emotional wellness support needs to be accessible, structured, and easy to integrate into everyday life.</p>
          </div>
        </div>
      </section>

      {/* ─── 3. Built on Proven Neuromodulation Principles ─── */}
      <ProductFeatureGrid
        title="Built on Proven Neuromodulation Principles"
        subtitle="Clinically studied brain stimulation technology made accessible."
        layout="side"
        video="/videos/elix-tdcs.mp4"
        imageAlt="NeuroLink Elix tDCS demonstration"
        features={neuroFeatures.map((f) => ({
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          ),
          title: f.title,
          desc: f.desc,
        }))}
      />

      {/* ─── 4. Portable Therapy, Simplified ─── */}
      <section className="elix-portable">
        <div className="elix-portable-inner">
          <div className="elix-portable-text reveal-up">
            <h2>Portable Therapy, Simplified.</h2>
            <p>NeuroLink Elix is designed for portability and simplicity. Housed in a structured carry case, the system keeps every component organized and ready—making it easy to transport, set up, and begin guided sessions in home or care environments.</p>
          </div>
          <div className="elix-portable-img reveal-up">
            <img src={IMG.carry} alt="NeuroLink Elix carry case" draggable="false" />
          </div>
        </div>
      </section>

      {/* ─── 5. Making of the Elix (Timeline) ─── */}
      <ProductTimeline title="Making of the Elix" items={timelineItems} />

      <Footer />
    </>
  );
}
