import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="tp-footer" style={{ marginTop: 'auto', paddingTop: '3rem' }}>
      {/* Hill SVG Silhouette */}
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="tp-footer__hill">
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
      </svg>

      {/* Night Sky with Twinkling Stars */}
      <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '3rem' }}>
        <div className="gutter site-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', paddingTop: '2.5rem' }}>
          <div>
            <p className="font-plush" style={{ fontSize: '2.25rem', color: 'var(--color-honey-soft)', fontWeight: 700 }}>
              Home, at last.
            </p>
            <p style={{ marginTop: '1rem', color: 'rgba(255, 253, 248, 0.85)', lineHeight: 1.6, maxWidth: '420px' }}>
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <a 
                href="https://wa.me/971541676733" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp"
                style={{ fontSize: '0.95rem', padding: '0.65rem 1.25rem' }}
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-plush" style={{ fontSize: '1.35rem', color: 'var(--color-honey)', marginBottom: '1.25rem' }}>
              Explore
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/puppies" style={{ color: 'rgba(255, 253, 248, 0.85)' }}>Available Puppies</Link></li>
              <li><Link to="/gone-home" style={{ color: 'rgba(255, 253, 248, 0.85)' }}>Gone Home (Adopted)</Link></li>
              <li><Link to="/happy-families" style={{ color: 'rgba(255, 253, 248, 0.85)' }}>Happy Families Wall</Link></li>
              <li><Link to="/how-it-works" style={{ color: 'rgba(255, 253, 248, 0.85)' }}>Adoption Process</Link></li>
              <li><Link to="/faq" style={{ color: 'rgba(255, 253, 248, 0.85)' }}>Frequently Asked Questions</Link></li>
              <li><Link to="/contact" style={{ color: 'rgba(255, 253, 248, 0.85)' }}>Visit Showroom</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-plush" style={{ fontSize: '1.35rem', color: 'var(--color-honey)', marginBottom: '1.25rem' }}>
              Downtown Showroom
            </h3>
            <p style={{ color: 'rgba(255, 253, 248, 0.85)', lineHeight: 1.6 }}>
              Downtown Dubai, United Arab Emirates
            </p>
            <p style={{ marginTop: '0.5rem', color: 'rgba(255, 253, 248, 0.85)' }}>
              Visiting Hours: 10:00 AM – 10:00 PM (Daily)
            </p>
            <p style={{ marginTop: '0.5rem', color: 'rgba(255, 253, 248, 0.85)' }}>
              Phone: +971 54 167 6733
            </p>
            <p style={{ marginTop: '0.25rem', color: 'rgba(255, 253, 248, 0.85)' }}>
              Email: teddypupsadmin@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="gutter site-container" style={{ marginTop: '3.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'rgba(255, 253, 248, 0.6)' }}>
          <p>© {new Date().getFullYear()} TeddyPups U.A.E. All rights reserved.</p>
          <p className="font-scrawl" style={{ fontSize: '1.05rem', color: 'var(--color-honey-soft)' }}>every puppy is family</p>
        </div>
      </div>
    </footer>
  );
}
