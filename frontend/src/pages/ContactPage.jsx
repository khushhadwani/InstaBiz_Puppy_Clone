import React, { useState } from 'react';
import { submitContactLetter } from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    sender_name: '',
    phone: '',
    email: '',
    city: 'Dubai',
    puppy_interest: 'any puppy (not sure yet)',
    letter_text: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await submitContactLetter(formData);
    setLoading(false);

    if (res && (res.success || res.id)) {
      setSubmitted(true);
    } else {
      setError('Could not submit online. Please contact us via WhatsApp below!');
    }
  };

  const puppyOptions = [
    'any puppy (not sure yet)',
    'Max (Maltipoo, boy)',
    'Korean Teacup Maltipoo (girl)',
    'Korean Teacup Poodle (girl)',
    'Maltipoo & Cavapoo (boy)',
    'Toy Poodle (boy & girl)',
    'Maltipoo (girl)',
    'Pomeranian (girl)',
    'Copper (Cavapoo, boy)',
    'Shih Tzu (girl)',
    'Shih Tzu (boy)',
    'Korean Teacup Pomeranian (girl)',
    'Korean Teacup Pomeranian (boy)'
  ];

  return (
    <div className="contact-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="gutter site-container">
        {/* Header */}
        <div style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
          <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>
            say hello
          </span>
          <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)', marginTop: '0.25rem' }}>
            Get in touch with us
          </h1>
          <p className="text-lede" style={{ marginTop: '0.75rem' }}>
            Have questions about our puppies or adoption process? Fill out the letter, and our team will get back to you promptly.
          </p>
        </div>

        {/* The Letter Form */}
        {submitted ? (
          <div className="letter-box" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>💌</div>
            <h2 className="font-plush" style={{ fontSize: '2rem', color: '#1f7a4d' }}>
              Your Letter is on Teddy's Desk!
            </h2>
            <p style={{ marginTop: '1rem', color: 'var(--color-cocoa-soft)', fontSize: '1.15rem' }}>
              Thank you, <strong>{formData.sender_name}</strong>. We have received your message and will reply via WhatsApp or Email within a few hours.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <button 
                type="button" 
                onClick={() => setSubmitted(false)}
                className="btn btn-outline"
              >
                Send Another Note
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="letter-box">
            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#fde8e8', color: '#9b1c1c', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {error}
              </div>
            )}

            <p className="font-plush" style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--color-cocoa)' }}>
              Dear TeddyPups,
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              my name is{' '}
              <input
                type="text"
                required
                className="letter-input"
                placeholder="your full name"
                value={formData.sender_name}
                onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
              />
              , and you can reach me on{' '}
              <input
                type="tel"
                required
                className="letter-input"
                placeholder="phone / WhatsApp"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {' '}or by email at{' '}
              <input
                type="email"
                required
                className="letter-input"
                placeholder="your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              .
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              I live in{' '}
              <input
                type="text"
                required
                className="letter-input"
                placeholder="Dubai, Abu Dhabi, etc."
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              , and I'm curious about{' '}
              <select
                className="letter-select"
                value={formData.puppy_interest}
                onChange={(e) => setFormData({ ...formData, puppy_interest: e.target.value })}
              >
                {puppyOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              .
            </p>

            <div style={{ margin: '1.5rem 0' }}>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-cocoa-soft)', marginBottom: '0.5rem' }}>
                A few extra thoughts or questions:
              </label>
              <textarea
                rows="3"
                value={formData.letter_text}
                onChange={(e) => setFormData({ ...formData, letter_text: e.target.value })}
                placeholder="Tell us about your home, any preferences, or when you would love to visit..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--color-cocoa)',
                  backgroundColor: '#ffffff',
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  resize: 'none'
                }}
              />
            </div>

            <p className="font-scrawl" style={{ fontSize: '1.35rem', color: 'var(--color-toffee)', margin: '1.5rem 0 2rem' }}>
              with love, a future puppy parent
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1.15rem' }}
            >
              {loading ? 'Sending letter...' : 'Send Letter to TeddyPups 💌'}
            </button>
          </form>
        )}

        {/* Showroom Card */}
        <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', backgroundColor: '#ffffff', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: 'clamp(2rem, 5vw, 3.5rem)', boxShadow: 'var(--shadow-hard)' }}>
          <div>
            <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>come say hello</span>
            <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)', marginTop: '0.25rem', marginBottom: '1rem' }}>
              Visit us in Downtown Dubai
            </h2>
            <p style={{ color: 'var(--color-cocoa-soft)', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Step into our Downtown Dubai showroom and experience the joy of meeting our tiny puppies in a warm, relaxed, private environment.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1rem', marginBottom: '2rem' }}>
              <p>📍 <strong>Address:</strong> Downtown Dubai, United Arab Emirates</p>
              <p>🕒 <strong>Hours:</strong> Monday – Sunday: 10:00 AM – 10:00 PM</p>
              <p>📞 <strong>Phone:</strong> +971 54 167 6733</p>
              <p>✉️ <strong>Email:</strong> teddypupsadmin@gmail.com</p>
            </div>

            <a 
              href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20like%20to%20book%20a%20private%20showroom%20viewing." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp"
            >
              Book Showroom Viewing on WhatsApp
            </a>
          </div>

          <div style={{ backgroundColor: 'var(--color-honey-soft)', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
            <h3 className="font-plush" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Downtown Dubai Boutique</h3>
            <p style={{ color: 'var(--color-cocoa-soft)', maxWidth: '320px', lineHeight: 1.5 }}>
              Convenient parking available on site. Please book an appointment before visiting for private bonding time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
