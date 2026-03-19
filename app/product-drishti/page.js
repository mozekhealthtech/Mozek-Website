'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';
import useProductPageAnimations from '@/hooks/useProductPageAnimations';

export default function ProductDrishtiPage() {
  useScrollReveal();
  useProductPageAnimations();

  return (
    <>
      <Navbar activePage="products" />

      {/* Hero Section */}
      <section className="pd-hero">
        <div className="hero-dots"></div>
        <div className="pd-hero-inner">
          <div className="pd-hero-content">
            <div className="pd-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>
              {' '}Healthcare Portal — Institutional Monitoring
            </div>
            <h1>Drishti <span>Portal</span></h1>
            <p className="pd-hero-desc">A centralized monitoring and management platform built for institutions, care facilities, and organized caregiver networks. Designed to deliver real-time visibility across multiple users and devices, transforming distributed health data into structured, actionable intelligence.</p>
            <div className="pd-hero-btns">
              <Link href="/contact" className="pd-btn-primary">
                Request Access
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
          <div className="pd-hero-visual">
            <div className="pd-hero-card">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="35" width="140" height="95" rx="8" fill="#fae8ff" stroke="#e879f9" strokeWidth="2" />
                <rect x="38" y="43" width="124" height="75" rx="4" fill="#3B1A88" />
                <rect x="45" y="50" width="50" height="25" rx="3" fill="#7c3aed" opacity=".5" />
                <rect x="100" y="50" width="55" height="25" rx="3" fill="#a855f7" opacity=".4" />
                <rect x="48" y="82" width="8" height="20" rx="2" fill="#c084fc" /><rect x="60" y="88" width="8" height="14" rx="2" fill="#c084fc" /><rect x="72" y="78" width="8" height="24" rx="2" fill="#c084fc" /><rect x="84" y="84" width="8" height="18" rx="2" fill="#c084fc" />
                <circle cx="108" cy="86" r="3" fill="#10b981" /><rect x="114" y="84" width="30" height="4" rx="2" fill="#c084fc" opacity=".4" />
                <circle cx="108" cy="96" r="3" fill="#fbbf24" /><rect x="114" y="94" width="25" height="4" rx="2" fill="#c084fc" opacity=".4" />
                <circle cx="108" cy="106" r="3" fill="#60a5fa" /><rect x="114" y="104" width="35" height="4" rx="2" fill="#c084fc" opacity=".4" />
                <rect x="85" y="130" width="30" height="8" rx="2" fill="#e879f9" opacity=".7" /><rect x="75" y="136" width="50" height="6" rx="3" fill="#e879f9" opacity=".5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Product */}
      <section className="pd-about">
        <div className="pd-about-inner">
          <h2>Strengthening Institutional Oversight</h2>
          <p>Drishti provides administrators with a comprehensive dashboard to oversee alerts, review health trends, monitor adherence, and coordinate responses efficiently. By consolidating device data, event logs, and user insights into one secure environment, it enables informed decision-making and proactive care management.</p>
          <p>Engineered for scale, clarity, and reliability, Mozek Drishti strengthens institutional oversight — ensuring that no critical event goes unnoticed and that care delivery remains timely, coordinated, and accountable.</p>
        </div>
      </section>

      {/* Features */}
      <section className="pd-features">
        <div className="pd-features-inner">
          <div className="pd-section-header">
            <h2>Key Features</h2>
            <p>Enterprise-grade monitoring built for care institutions</p>
          </div>
          <div className="pd-features-grid">
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg></div>
              <h3>Universal Wearable Integration</h3>
              <p>Connects with Mozek G1 Band and other wearable devices to aggregate health data from across multiple users and devices.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div>
              <h3>Live Resident Monitoring Dashboard</h3>
              <p>Real-time dashboard displaying health metrics, activity status, and alert conditions for all monitored residents.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg></div>
              <h3>Real-Time Multi-Device Monitoring</h3>
              <p>Track data from multiple devices simultaneously with centralized visibility into all connected health monitoring equipment.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg></div>
              <h3>Cross-Platform Alert Engine</h3>
              <p>Smart alerting system that delivers notifications across web, mobile, and email when critical events are detected.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg></div>
              <h3>AI-Enabled Incident Management</h3>
              <p>Automated incident classification, escalation workflows, and resolution tracking for efficient emergency response.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg></div>
              <h3>Role-Based Access & Control</h3>
              <p>Granular access control with distinct roles for administrators, doctors, caregivers, and family members.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
              <h3>Advanced Health Analytics</h3>
              <p>AI-driven analytics engine that identifies trends, generates insights, and supports clinical decision-making.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div>
              <h3>Compliance-Ready Reporting</h3>
              <p>Automated reports generated in compliance-ready formats for regulatory requirements and quality auditing.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
              <h3>Secure Cloud Infrastructure</h3>
              <p>Enterprise-grade cloud security with encrypted data storage, ensuring patient information is protected at all times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pd-timeline">
        <div className="pd-timeline-inner">
          <div className="pd-section-header">
            <h2>Product Timeline</h2>
            <p>The Drishti Portal development journey</p>
          </div>
          <div className="timeline-track">
            <div className="tl-item">
              <div className="tl-content">
                <div className="tl-date">Phase 1</div>
                <div className="tl-title">Idea & Research</div>
                <div className="tl-desc">Identified the need for centralized monitoring platforms in care facilities and institutional healthcare settings.</div>
              </div>
              <div className="tl-dot"></div>
              <div className="tl-spacer"></div>
            </div>
            <div className="tl-item">
              <div className="tl-content">
                <div className="tl-date">Phase 2</div>
                <div className="tl-title">Proof of Concept</div>
                <div className="tl-desc">Validated core dashboard functionality with real-time data aggregation from multiple Mozek devices.</div>
              </div>
              <div className="tl-dot"></div>
              <div className="tl-spacer"></div>
            </div>
            <div className="tl-item active">
              <div className="tl-content">
                <div className="tl-date">Phase 3</div>
                <div className="tl-title">Active Development</div>
                <div className="tl-desc">Building out the full platform with analytics, incident management, role-based access, and compliance reporting.</div>
              </div>
              <div className="tl-dot"></div>
              <div className="tl-spacer"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
