import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPuppyBySlug } from '../services/api';
import InquiryModal from '../components/common/InquiryModal';

export default function PuppyDetailPage() {
  const { slug } = useParams();
  const [puppy, setPuppy] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getPuppyBySlug(slug);
      setPuppy(data);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0' }}>
        <p className="font-plush" style={{ fontSize: '1.6rem' }}>Opening puppy dossier...</p>
      </div>
    );
  }

  if (!puppy) {
    return (
      <div className="gutter site-container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h1 className="font-plush text-title">Puppy Not Found</h1>
        <p style={{ marginTop: '1rem', color: 'var(--color-cocoa-soft)' }}>
          This puppy listing may have moved or been adopted.
        </p>
        <Link to="/puppies" className="btn btn-primary" style={{ marginTop: '2rem' }}>
          Back to Available Puppies
        </Link>
      </div>
    );
  }

  const mediaList = puppy.media && puppy.media.length > 0 
    ? puppy.media 
    : [puppy.cover || { url: '/brand/logo.png', kind: 'image' }];

  const currentMedia = mediaList[activeMediaIndex] || mediaList[0];
  const isBoy = puppy.gender === 'male' || puppy.genderLabel?.toLowerCase() === 'boy';

  const waText = encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}, ${puppy.genderLabel || puppy.gender}). Is this puppy still available?`
  );
  const waUrl = `https://wa.me/971541676733?text=${waText}`;

  return (
    <div className="puppy-detail-page" style={{ padding: '2rem 0 5rem' }}>
      <div className="gutter site-container">
        {/* Breadcrumbs */}
        <nav style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--color-cocoa-soft)' }}>
          <Link to="/" style={{ color: 'var(--color-toffee)', fontWeight: 600 }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to="/puppies" style={{ color: 'var(--color-toffee)', fontWeight: 600 }}>Puppies</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--color-cocoa)', fontWeight: 700 }}>{puppy.name}</span>
        </nav>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left Column: Media Gallery */}
          <div>
            <div style={{ backgroundColor: '#ffffff', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-hard)', position: 'relative' }}>
              {currentMedia.kind === 'video' || currentMedia.url?.endsWith('.mp4') ? (
                <video 
                  src={currentMedia.url} 
                  controls 
                  autoPlay 
                  loop 
                  muted 
                  style={{ width: '100%', maxHeight: '550px', objectFit: 'cover' }}
                />
              ) : (
                <img 
                  src={currentMedia.url} 
                  alt={puppy.name} 
                  style={{ width: '100%', maxHeight: '550px', objectFit: 'cover', display: 'block' }}
                />
              )}
            </div>

            {/* Thumbnails */}
            {mediaList.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {mediaList.map((m, idx) => (
                  <button
                    key={m.id || idx}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: activeMediaIndex === idx ? '3px solid var(--color-toffee)' : '2px solid var(--color-cocoa)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      opacity: activeMediaIndex === idx ? 1 : 0.65,
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {m.kind === 'video' || m.url?.endsWith('.mp4') ? (
                      <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-honey-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                        ▶
                      </div>
                    ) : (
                      <img src={m.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Puppy Details & Inquiry */}
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className={`badge ${isBoy ? 'badge-boy' : 'badge-girl'}`} style={{ fontSize: '0.9rem', padding: '0.35rem 0.9rem' }}>
                {puppy.genderLabel || (isBoy ? 'Boy' : 'Girl')}
              </span>
              <span className={`badge ${puppy.status === 'available' ? 'badge-available' : 'badge-reserved'}`} style={{ fontSize: '0.9rem', padding: '0.35rem 0.9rem' }}>
                {puppy.status === 'available' ? 'Available' : 'Reserved'}
              </span>
              {puppy.featured && (
                <span className="badge badge-imported" style={{ fontSize: '0.9rem', padding: '0.35rem 0.9rem' }}>Rare Import</span>
              )}
            </div>

            <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)', marginBottom: '0.5rem' }}>
              {puppy.name}
            </h1>
            <p className="font-scrawl" style={{ fontSize: '1.35rem', color: 'var(--color-toffee)', marginBottom: '1.5rem' }}>
              {puppy.breed}
            </p>

            {/* Specs Table */}
            <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: '3px 4px 0px var(--color-cocoa)', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-cocoa-soft)', fontWeight: 600 }}>Age</span>
                  <p style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.15rem' }}>{puppy.age}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-cocoa-soft)', fontWeight: 600 }}>Gender</span>
                  <p style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.15rem' }}>{puppy.genderLabel || (isBoy ? 'Boy (Male)' : 'Girl (Female)')}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-cocoa-soft)', fontWeight: 600 }}>Origin</span>
                  <p style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.15rem' }}>{puppy.featured ? 'South Korea (Import)' : 'Downtown Dubai Showroom'}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-cocoa-soft)', fontWeight: 600 }}>Health Check</span>
                  <p style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.15rem', color: '#1f7a4d' }}>✓ 100% Verified</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              <button 
                type="button" 
                onClick={() => setModalOpen(true)}
                className="btn btn-primary"
                style={{ fontSize: '1.15rem', padding: '1rem', width: '100%' }}
              >
                Inquire or Book Viewing for {puppy.name}
              </button>

              <a 
                href={waUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp"
                style={{ fontSize: '1.15rem', padding: '1rem', width: '100%' }}
              >
                Reserve on WhatsApp Instantly
              </a>
            </div>

            {/* Health & Package Guarantee */}
            <div style={{ borderTop: '2px dashed #ede7dc', paddingTop: '1.75rem' }}>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                Every Teddy Pup comes with:
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ color: '#1f7a4d', fontWeight: 800 }}>✓</span>
                  <span>Licensed UAE Veterinary Health Certificate</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ color: '#1f7a4d', fontWeight: 800 }}>✓</span>
                  <span>Up-to-date vaccinations and comprehensive deworming</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ color: '#1f7a4d', fontWeight: 800 }}>✓</span>
                  <span>ISO International Microchip &amp; Pet Passport</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ color: '#1f7a4d', fontWeight: 800 }}>✓</span>
                  <span>24/7 Concierge Puppy Care Guidance via WhatsApp</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal 
        puppy={puppy} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}
