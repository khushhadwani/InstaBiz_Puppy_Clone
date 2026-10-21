import React, { useState, useEffect } from 'react';

export default function Curtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="tp-curtain" data-state={visible ? "intro" : "dismissed"} aria-hidden="true">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <svg viewBox="0 0 300 240" style={{ width: '180px', height: '140px', margin: '0 auto', display: 'block' }}>
          <ellipse cx="150" cy="225" rx="80" ry="8" fill="#2a170e" opacity="0.15" />
          <g>
            {/* Mascot dog body */}
            <path d="M80 170 Q130 140 180 150 Q200 170 190 190 Q140 210 90 200 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
            {/* Mascot Head */}
            <circle cx="205" cy="115" r="42" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" />
            <circle cx="175" cy="90" r="16" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
            <circle cx="235" cy="90" r="16" fill="#e4a352" stroke="#2a170e" strokeWidth="3" />
            {/* Face */}
            <ellipse cx="205" cy="125" rx="18" ry="12" fill="#fbe3b4" />
            <circle cx="192" cy="112" r="5" fill="#2a170e" />
            <circle cx="218" cy="112" r="5" fill="#2a170e" />
            <circle cx="194" cy="110" r="1.5" fill="#ffffff" />
            <circle cx="220" cy="110" r="1.5" fill="#ffffff" />
            <ellipse cx="205" cy="122" rx="5" ry="3.5" fill="#2a170e" />
            <path d="M205 125 Q205 130 200 132 M205 125 Q205 130 210 132" stroke="#2a170e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Legs */}
            <path d="M100 190 L95 220 M125 195 L120 225 M160 190 L160 220 M180 185 L180 220" stroke="#2a170e" strokeWidth="7" strokeLinecap="round" />
            <path d="M100 190 L95 220 M125 195 L120 225 M160 190 L160 220 M180 185 L180 220" stroke="#f2be6b" strokeWidth="4" strokeLinecap="round" />
            {/* Wagging Tail */}
            <path d="M80 170 Q60 140 70 120" stroke="#2a170e" strokeWidth="9" strokeLinecap="round" fill="none" />
            <path d="M80 170 Q60 140 70 120" stroke="#f2be6b" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
        <p className="tp-curtain__note font-scrawl">every puppy is family</p>
      </div>
    </div>
  );
}
