'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';
import useProductPageAnimations from '@/hooks/useProductPageAnimations';

export default function ProductCompanionAppPage() {
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="3" /></svg>
              {' '}Mobile App — Your Health Hub
            </div>
            <h1>Companion <span>App</span></h1>
            <p className="pd-hero-desc">A unified health and safety platform designed to bring clarity, connection, and control to personal monitoring devices. Built to integrate with the Mozek G1 Band and a wide range of wearables, it transforms scattered device data into meaningful, actionable insights.</p>
            <div className="pd-hero-btns">
              <Link href="/contact" className="pd-btn-primary">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
          <div className="pd-hero-visual">
            <div className="pd-hero-card">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="60" y="25" width="80" height="150" rx="16" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                <rect x="68" y="40" width="64" height="118" rx="8" fill="#0f172a" />
                <rect x="75" y="45" width="50" height="4" rx="2" fill="#475569" opacity=".4" />
                <rect x="74" y="55" width="52" height="30" rx="5" fill="#7c3aed" opacity=".7" />
                <text x="100" y="68" textAnchor="middle" fontFamily="Arial" fontSize="7" fill="white">Heart Rate</text>
                <text x="100" y="80" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="white" fontWeight="bold">72 bpm</text>
                <circle cx="87" cy="107" r="10" fill="none" stroke="#7c3aed" strokeWidth="3" opacity=".6" />
                <circle cx="87" cy="107" r="10" fill="none" stroke="#a78bfa" strokeWidth="3" strokeDasharray="30 70" />
                <circle cx="113" cy="107" r="10" fill="none" stroke="#6366f1" strokeWidth="3" opacity=".6" />
                <circle cx="113" cy="107" r="10" fill="none" stroke="#818cf8" strokeWidth="3" strokeDasharray="45 55" />
                <rect x="74" y="127" width="52" height="6" rx="3" fill="#475569" opacity=".3" />
                <rect x="74" y="137" width="40" height="6" rx="3" fill="#475569" opacity=".2" />
                <rect x="90" y="150" width="20" height="3" rx="1.5" fill="#475569" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Product */}
      <section className="pd-about">
        <div className="pd-about-inner">
          <h2>Your Central Command Hub for Connected Health</h2>
          <p>The app acts as a central command hub — managing alerts, tracking health metrics, and enabling seamless communication between users, caregivers, and family members. With intelligent data interpretation and structured event logging, it ensures that critical information is never lost in raw numbers.</p>
          <p>Designed for reliability and simplicity, Mozek Companion empowers users and care networks with real-time awareness, improved coordination, and a smarter approach to connected health.</p>
        </div>
      </section>

      {/* Features */}
      <section className="pd-features">
        <div className="pd-features-inner">
          <div className="pd-section-header">
            <h2>Key Features</h2>
            <p>Everything you need to stay connected and informed</p>
          </div>
          <div className="pd-features-grid">
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
              <h3>Live Health Dashboard</h3>
              <p>Real-time display of heart rate, SpO2, temperature, and activity data from connected Mozek wearable devices.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg></div>
              <h3>Instant Emergency Alerts</h3>
              <p>Push notifications delivered instantly when falls, seizures, or abnormal health patterns are detected.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg></div>
              <h3>Health Trend Analysis</h3>
              <p>AI-powered insights from historical health data to identify patterns and provide proactive health recommendations.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></div>
              <h3>Smart Medication Reminders</h3>
              <p>Customizable pill reminders and medication schedule management to ensure consistent health regimen adherence.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div>
              <h3>Incident Timeline & Logs</h3>
              <p>Comprehensive event logging with timestamps, creating a complete health history for review by caregivers and doctors.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg></div>
              <h3>Universal Wearable Connectivity</h3>
              <p>Connects with Mozek G1 Band and compatible wearables from across the market for comprehensive data aggregation.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg></div>
              <h3>Multi-User Access Control</h3>
              <p>Role-based access for patients, caregivers, and family members — everyone gets the right level of information and control.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
              <h3>Secure & Encrypted Data</h3>
              <p>End-to-end encryption ensures all health data is securely stored and transmitted, protecting patient privacy.</p>
            </div>
            <div className="pd-feat-card">
              <div className="pd-feat-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg></div>
              <h3>Simple & Elder-Friendly Design</h3>
              <p>Large fonts, intuitive navigation, and simplified interface designed for accessibility by elderly users and their families.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pd-timeline">
        <div className="pd-timeline-inner">
          <div className="pd-section-header">
            <h2>Product Timeline</h2>
            <p>The Companion App development journey</p>
          </div>
          <div className="timeline-track">
            <div className="tl-item">
              <div className="tl-content">
                <div className="tl-date">Phase 1</div>
                <div className="tl-title">Idea & Design</div>
                <div className="tl-desc">Conceptualized a unified health platform that integrates seamlessly with the Mozek ecosystem and third-party wearables.</div>
              </div>
              <div className="tl-dot"></div>
              <div className="tl-spacer"></div>
            </div>
            <div className="tl-item">
              <div className="tl-content">
                <div className="tl-date">Phase 2</div>
                <div className="tl-title">Proof of Concept</div>
                <div className="tl-desc">Demonstrated core functionality — real-time data sync with G1 Band, alert delivery, and caregiver dashboard.</div>
              </div>
              <div className="tl-dot"></div>
              <div className="tl-spacer"></div>
            </div>
            <div className="tl-item active">
              <div className="tl-content">
                <div className="tl-date">Phase 3</div>
                <div className="tl-title">Active Development</div>
                <div className="tl-desc">Building advanced features including health trend analysis, medication management, and universal wearable connectivity.</div>
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
