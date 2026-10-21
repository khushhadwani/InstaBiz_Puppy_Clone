import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';

export default function SiteHeader() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/puppies', label: 'Puppies' },
    { to: '/happy-families', label: 'Happy families' },
    { to: '/how-it-works', label: 'How it works' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Visit & contact' }
  ];

  return (
    <>
      <header id="site-header" className="tp-header" data-scrolled={scrolled}>
        <div className="tp-header__bar gutter">
          <Link to="/" className="tp-header__brand" aria-label="TeddyPups U.A.E. — home">
            <img 
              src="/brand/logo.png" 
              alt="TeddyPups Logo" 
              className="tp-header__logo" 
              width="52" 
              height="52" 
            />
            <span className="font-plush tp-header__name">TeddyPups</span>
          </Link>

          <nav aria-label="Main" className="tp-header__nav">
            <ul>
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link to={item.to} className="tp-nav-link" data-active={isActive}>
                      <span>{item.label}</span>
                      <svg viewBox="0 0 64 64" className="tp-nav-link__paw" aria-hidden="true">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp"
            >
              WhatsApp us
            </a>

            <button 
              type="button" 
              className="btn btn-outline"
              style={{ display: 'none' }}
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Decorative Scalloped Hem SVG Pattern */}
        <svg aria-hidden="true" className="tp-hem" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-hem-pattern" width="44" height="14" patternUnits="userSpaceOnUse">
              <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill" />
              <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line" />
            </pattern>
          </defs>
          <rect width="100%" height="14" fill="url(#tp-hem-pattern)" />
        </svg>
      </header>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        currentPath={location.pathname} 
      />

      <style>{`
        @media (max-width: 1024px) {
          #mobile-nav-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
