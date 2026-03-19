'use client';
import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function ContactPage() {
  useScrollReveal();
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value;
    const message = form.message.value.trim();
    if (!name || !email || !subject || !message) {
      setFormMessage({ text: 'Please fill in all required fields.', type: 'error' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    setFormMessage({ text: "Thank you for your message! We'll get back to you within 24 hours.", type: 'success' });
    form.reset();
    setTimeout(() => setFormMessage({ text: '', type: '' }), 5000);
  };

  return (
    <>
      <Navbar activePage="contact" />

      <section className="contact-page">
        <div className="contact-page-inner">
          {/* Left Column */}
          <div className="contact-left">
            <h1 className="contact-page-title reveal-up">Contact Us</h1>

            <div className="contact-info-grid">
              {/* Write to us */}
              <div className="contact-info-block reveal-up">
                <h2>Write to us</h2>
                <p className="contact-info-subtitle">Email us or use the form</p>
                <a href="mailto:sales@mozekhealthtech.com" className="contact-info-link">sales@mozekhealthtech.com</a>
                <a href="mailto:support@mozekhealthtech.com" className="contact-info-link">support@mozekhealthtech.com</a>
              </div>

              {/* Visit us */}
              <div className="contact-info-block reveal-up">
                <h2>Visit us</h2>
                <p className="contact-info-subtitle">Our office</p>
                <p className="contact-info-address">
                  Mozek HealthTech<br />
                  F239, Sumel Business Park 6<br />
                  Dudheshwar, Ahmedabad<br />
                  Gujarat 380004, India
                </p>
                <a href="https://maps.google.com/?q=Sumel+Business+Park+6+Ahmedabad" target="_blank" rel="noopener noreferrer" className="contact-map-btn">
                  Map
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="contact-social reveal-up">
              <h2>Social</h2>
              <div className="contact-social-icons">
                <a href="https://www.linkedin.com/company/mozekhealthtech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/mozekhealthtech" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.facebook.com/mozekhealthtech" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://x.com/mozekhealthtech" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column — Form */}
          <div className="contact-right reveal-up">
            <div className="contact-form-card">
              <h2>Send us a Message</h2>
              <form id="contactForm" ref={formRef} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                  <input type="text" id="fullName" name="fullName" className="form-input" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input type="email" id="email" name="email" className="form-input" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="form-input" placeholder="+91 XXX XXX XXXX" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject <span className="required">*</span></label>
                  <select id="subject" name="subject" className="form-select" required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="demo">Request a Demo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <textarea id="message" name="message" className="form-input" placeholder="Tell us more about your inquiry..." required></textarea>
                </div>
                {formMessage.text && (
                  <div className={`form-message ${formMessage.type}`}>{formMessage.text}</div>
                )}
                <button type="submit" className="form-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
