import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGoneHomePuppies } from '../services/api';

export default function GoneHomePage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getGoneHomePuppies();
      setTickets(data);
    }
    load();
  }, []);

  const tilts = ['-1.4deg', '1.1deg', '-0.8deg', '1.3deg', '-1.2deg', '0.9deg'];

  return (
    <div className="gone-home-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="gutter site-container">
        {/* Booth Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span>Gone home</span>
              <span style={{ color: 'var(--color-toffee)', fontSize: '0.75em' }}>♥</span>
            </h1>
            <p className="text-lede" style={{ marginTop: '1rem' }}>
              Every puppy here has already joined a loving family in the UAE. Looking for a tiny companion just like them? Tell us — we'll help you find your dream match.
            </p>
            <div style={{ marginTop: '1.75rem' }}>
              <Link to="/puppies" className="btn btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
                See available puppies
              </Link>
            </div>
          </div>

          {/* Ticket Booth Mascot */}
          <div style={{ backgroundColor: 'var(--color-honey-soft)', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '1.5rem 2.25rem', textAlign: 'center', boxShadow: 'var(--shadow-hard)' }}>
            <svg viewBox="0 0 300 240" style={{ width: '160px', height: '120px', margin: '0 auto', display: 'block' }}>
              {/* Mascot Behind Booth */}
              <circle cx="150" cy="90" r="45" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
              <circle cx="118" cy="65" r="16" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
              <circle cx="182" cy="65" r="16" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
              <ellipse cx="150" cy="100" rx="18" ry="12" fill="#fbe3b4" />
              <circle cx="138" cy="88" r="5" fill="#2a170e" />
              <circle cx="162" cy="88" r="5" fill="#2a170e" />
              <ellipse cx="150" cy="98" rx="5" ry="3.5" fill="#2a170e" />
              {/* Booth Ledge */}
              <path d="M50 140 H250 V200 H50 Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" />
              <path d="M40 140 H260" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
              <text x="150" y="175" textAnchor="middle" fill="#2a170e" fontFamily="Fraunces, serif" fontWeight="800" fontSize="18">
                TICKETS
              </text>
            </svg>
            <span className="font-plush" style={{ display: 'block', marginTop: '0.5rem', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-cocoa)' }}>
              tickets home
            </span>
          </div>
        </div>

        {/* Tickets Grid */}
        <ul className="tp-tickets">
          {tickets.map((t, idx) => {
            const tilt = tilts[idx % tilts.length];
            return (
              <li 
                key={t.slug || idx} 
                className="tp-ticket"
                style={{ '--tilt': tilt }}
              >
                <img 
                  src={t.coverUrl} 
                  alt={`${t.name}, ${t.breed}`} 
                  className="tp-ticket__photo"
                  loading="lazy" 
                />

                <div style={{ flex: 1 }}>
                  <span className="font-scrawl" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-toffee)' }}>
                    one ticket home
                  </span>
                  <span className="font-plush" style={{ display: 'block', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-cocoa)' }}>
                    {t.name}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-cocoa-soft)' }}>
                    {t.breed}, {t.gender}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.65rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-cocoa)' }}>
                    <span>TeddyPups</span>
                    <span style={{ color: 'var(--color-toffee)' }}>→</span>
                    <span style={{ color: 'var(--color-toffee-deep)' }}>home ♥</span>
                  </div>
                </div>

                <div className="tp-ticket__stub font-plush">
                  admit one
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
