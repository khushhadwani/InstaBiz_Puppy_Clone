import React, { useState, useEffect } from 'react';
import { getFaqs } from '../services/api';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getFaqs();
      setFaqs(data);
    }
    load();
  }, []);

  const toggleFaq = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="gutter site-container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
          <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>
            everything you need to know
          </span>
          <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)', marginTop: '0.25rem' }}>
            Questions &amp; answers
          </h1>
          <p className="text-lede" style={{ marginTop: '0.75rem' }}>
            Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7 to assist with any questions about adoption, travel, or health.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', padding: '0.4rem 1rem', backgroundColor: 'var(--color-honey-soft)', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-cocoa)', fontWeight: 700, fontSize: '0.9rem' }}>
            <span>📌</span>
            <span>9 notes on the board</span>
          </div>
        </div>

        {/* FAQ Pinboard Grid */}
        <div className="faq-board">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedId === faq.id || (expandedId === null && idx === 0);
            return (
              <div
                key={faq.id}
                className="faq-card"
                onClick={() => toggleFaq(faq.id)}
                style={{
                  borderLeft: isExpanded ? '6px solid var(--color-toffee)' : '2px solid var(--color-cocoa)'
                }}
              >
                <div className="faq-question">
                  <h2 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 750, color: 'var(--color-cocoa)', margin: 0 }}>
                    {faq.question}
                  </h2>
                  <span style={{ fontSize: '1.4rem', color: 'var(--color-toffee)', fontWeight: 700, transition: 'transform 0.2s ease', transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </div>

                {isExpanded && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                    <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-toffee)', backgroundColor: 'var(--color-honey-soft)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Assist Banner */}
        <div style={{ marginTop: '4.5rem', textAlign: 'center', backgroundColor: '#ffffff', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-hard)', maxWidth: '680px', margin: '4.5rem auto 0' }}>
          <h3 className="font-plush" style={{ fontSize: '1.6rem', color: 'var(--color-cocoa)', marginBottom: '0.75rem' }}>
            Still have a question?
          </h3>
          <p style={{ color: 'var(--color-cocoa-soft)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Our Downtown Dubai team is available 24/7 on WhatsApp to share puppy videos, consultation details, and viewing bookings.
          </p>
          <a
            href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20have%20a%20question%20about%20adopting%20a%20puppy."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ fontSize: '1.05rem', padding: '0.85rem 2rem' }}
          >
            Chat with our Concierge
          </a>
        </div>
      </div>
    </div>
  );
}
