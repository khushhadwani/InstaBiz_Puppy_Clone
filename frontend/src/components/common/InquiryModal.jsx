import React, { useState } from 'react';
import { submitInquiry } from '../../services/api';

export default function InquiryModal({ puppy, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    city: 'Dubai',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !puppy) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      puppy_id: puppy.id,
      puppy_name: puppy.name,
      ...formData
    };

    const result = await submitInquiry(payload);
    setLoading(false);

    if (result && (result.success || result.id)) {
      setSuccess(true);
    } else {
      setError('Could not submit inquiry online. Please use WhatsApp below!');
    }
  };

  const waText = encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}, ${puppy.genderLabel || puppy.gender}). Is this puppy available for viewing?`
  );
  const waUrl = `https://wa.me/971541676733?text=${waText}`;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        backgroundColor: 'rgba(42, 23, 14, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '3px solid var(--color-cocoa)',
          maxWidth: '520px',
          width: '100%',
          padding: '2rem',
          boxShadow: 'var(--shadow-hard)',
          position: 'relative'
        }}
      >
        <button 
          type="button" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-honey-soft)',
            border: '2px solid var(--color-cocoa)',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <h2 className="font-plush" style={{ fontSize: '1.85rem', color: 'var(--color-cocoa)', marginBottom: '0.25rem' }}>
          Ask about {puppy.name}
        </h2>
        <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          {puppy.breed} • {puppy.age} • {puppy.genderLabel || puppy.gender}
        </p>

        {success ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
            <h3 className="font-plush" style={{ fontSize: '1.45rem', color: '#1f7a4d' }}>
              Inquiry Sent!
            </h3>
            <p style={{ marginTop: '0.5rem', color: 'var(--color-cocoa-soft)', lineHeight: 1.5 }}>
              Thank you! Our concierge team has received your inquiry for <strong>{puppy.name}</strong> and will contact you via WhatsApp/Email shortly.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%' }}>
                Instant WhatsApp Chat
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{ padding: '0.75rem', backgroundColor: '#fde8e8', color: '#9b1c1c', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Your Full Name *
              </label>
              <input 
                type="text" 
                required 
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                placeholder="e.g. Maryam Al Zaabi"
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--color-cocoa)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Phone / WhatsApp *
                </label>
                <input 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--color-cocoa)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--color-cocoa)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Message or Question (Optional)
              </label>
              <textarea 
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Can I schedule a showroom viewing this weekend?"
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--color-cocoa)',
                  fontSize: '0.95rem',
                  resize: 'none'
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
            >
              {loading ? 'Submitting...' : `Submit Inquiry for ${puppy.name}`}
            </button>

            <div style={{ textAlign: 'center', margin: '0.5rem 0', color: 'var(--color-cocoa-soft)', fontSize: '0.85rem' }}>
              — OR CHAT DIRECTLY —
            </div>

            <a 
              href={waUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Ask on WhatsApp Instantly
            </a>
          </form>
        )}
      </div>
    </div>
  );
}
