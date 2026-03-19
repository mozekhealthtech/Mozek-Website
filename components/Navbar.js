'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

const productItems = [
  { label: 'Mozek G1 Band', href: '/product-g1-band' },
  { label: 'Mozek Sathi', href: '/product-sathi' },
  { label: 'NeuroLink Elix', href: '/product-neurolink' },
];


export default function Navbar({ activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef(null);
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const rafIdRef = useRef(null);

  // Use requestAnimationFrame + direct DOM updates instead of setState on scroll
  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      if (rafIdRef.current) return; // Skip if a frame is already queued
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const s = window.scrollY;
        const isScrolled = s > 50;
        // Only touch DOM when value actually changes
        if (isScrolled !== lastScrolled) {
          lastScrolled = isScrolled;
          if (navRef.current) {
            navRef.current.classList.toggle('scrolled', isScrolled);
          }
        }
        // Update progress bar directly via DOM
        if (progressRef.current) {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          progressRef.current.style.width = h > 0 ? `${(s / h) * 100}%` : '0%';
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const toggleProducts = useCallback((e) => {
    e.preventDefault();
    setProductsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ width: '0%' }}
      />
      <nav ref={navRef} className="nav" id="navbar">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" onClick={(e) => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            {!logoError ? (
              <img
                src="/logos/logo.svg"
                alt="Mozek HealthTech"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  setLogoError(true);
                }}
              />
            ) : null}
            <span
              className="nav-logo-fallback"
              style={logoError ? { display: 'flex' } : undefined}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--purple-700)"
                strokeWidth="2.5"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Mozek
            </span>
          </Link>

          {/* === NAVIGATION COMMENTED OUT — Only logo visible ===

          {/* Full-screen mobile menu overlay */}
          {/*
          <div className={`mobile-menu-overlay${menuOpen ? ' active' : ''}`}>
            <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l16 16M22 6L6 22" />
              </svg>
            </button>
            <div className="mobile-menu-logo">
              {!logoError ? (
                <img
                  src="/logos/logo.svg"
                  alt="Mozek HealthTech"
                  style={{ height: '60px', width: 'auto' }}
                />
              ) : (
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--purple-700)' }}>
                  Mozek
                </span>
              )}
            </div>
            <ul className="mobile-menu-links">
              <li>
                <Link
                  href="/"
                  className={activePage === 'home' ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-dropdown" ref={productsRef}>
                <a
                  href="#"
                  className={`nav-dropdown-trigger${activePage === 'products' ? ' active' : ''}${productsOpen ? ' open' : ''}`}
                  onClick={toggleProducts}
                >
                  Products
                  <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 4l3 3 3-3" />
                  </svg>
                </a>
                <ul className={`nav-dropdown-menu${productsOpen ? ' show' : ''}`}>
                  {productItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={closeMenu}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={activePage === 'blog' ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={activePage === 'about' ? 'active' : ''}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li className="mobile-menu-cta">
                <Link
                  href="/contact"
                  className="nav-cta-btn"
                  onClick={closeMenu}
                >
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
          */}

          {/* Desktop menu (hidden on mobile) */}
          {/*
          <ul className="nav-menu" id="navMenu">
            <li>
              <Link
                href="/"
                className={activePage === 'home' ? 'active' : ''}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li
              className="nav-dropdown"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <a
                href="#"
                className={`nav-dropdown-trigger${activePage === 'products' ? ' active' : ''}${productsOpen ? ' open' : ''}`}
                onClick={(e) => e.preventDefault()}
              >
                Products
                <svg className="dropdown-arrow" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 4l3 3 3-3" />
                </svg>
              </a>
              <ul className={`nav-dropdown-menu${productsOpen ? ' show' : ''}`}>
                {productItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                href="/blog"
                className={activePage === 'blog' ? 'active' : ''}
                onClick={closeMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={activePage === 'about' ? 'active' : ''}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="nav-cta-btn"
                onClick={closeMenu}
              >
                Get in Touch
              </Link>
            </li>
          </ul>
          */}

          {/* Hamburger button */}
          {/*
          <div
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          */}

          {/* === END NAVIGATION COMMENTED OUT === */}
        </div>
      </nav>
    </>
  );
}
