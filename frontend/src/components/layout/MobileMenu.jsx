import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose, currentPath }) {
  if (!isOpen) return null;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/puppies', label: 'Puppies' },
    { to: '/happy-families', label: 'Happy families' },
    { to: '/how-it-works', label: 'How it works' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Visit & contact' }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'var(--color-honey)',
        color: 'var(--color-cocoa)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="font-scrawl" style={{ fontSize: '1.25rem' }}>where to, friend?</span>
        <button 
          type="button" 
          onClick={onClose}
          style={{
            height: '2.75rem',
            padding: '0 1.25rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-cocoa)',
            color: 'var(--color-milk)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>

      <nav style={{ margin: '2.5rem 0', flex: 1 }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {links.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="font-plush"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 'clamp(2.2rem, 9vw, 3.2rem)',
                    fontWeight: 700,
                    padding: '0.5rem 0',
                    color: isActive ? 'var(--color-toffee-deep)' : 'var(--color-cocoa)'
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <svg viewBox="0 0 64 64" style={{ width: '2rem', height: '2rem', fill: 'currentColor' }}>
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
        <a 
          href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-whatsapp"
          style={{ width: '100%', fontSize: '1.1rem', padding: '0.9rem' }}
        >
          WhatsApp us
        </a>
        <p style={{ textAlign: 'center', fontWeight: 600 }}>+971 54 167 6733</p>
      </div>
    </div>
  );
}
