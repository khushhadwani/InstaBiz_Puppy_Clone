import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPuppies, getPuppyBySlug } from '../services/api';
import InquiryModal from '../components/common/InquiryModal';

export default function PuppyDetailPage() {
  const { slug } = useParams();
  const [puppy, setPuppy] = useState(null);
  const [allPuppies, setAllPuppies] = useState([]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [data, list] = await Promise.all([
        getPuppyBySlug(slug),
        getPuppies()
      ]);
      setPuppy(data);
      setAllPuppies(Array.isArray(list) ? list.filter(p => p && p.slug) : []);
      setActiveMediaIndex(0);
      setLoading(false);
      window.scrollTo(0, 0);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0' }}>
        <p className="font-plush" style={{ fontSize: '1.6rem', color: 'var(--color-cocoa)' }}>
          Opening Teddy's sketchbook...
        </p>
      </div>
    );
  }

  if (!puppy) {
    return (
      <div className="gutter site-container" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)' }}>Puppy Not Found</h1>
        <p style={{ marginTop: '1rem', color: 'var(--color-cocoa-soft)', fontSize: '1.1rem' }}>
          This puppy listing may have moved or been adopted into a loving home.
        </p>
        <Link to="/puppies" className="btn btn-primary" style={{ marginTop: '2rem' }}>
          Back to Available Puppies
        </Link>
      </div>
    );
  }

  // Calculate previous and next puppy
  const currentIndex = allPuppies.findIndex(p => p.slug === puppy.slug);
  const prevPup = currentIndex > 0 ? allPuppies[currentIndex - 1] : allPuppies[allPuppies.length - 1];
  const nextPup = currentIndex >= 0 && currentIndex < allPuppies.length - 1 ? allPuppies[currentIndex + 1] : allPuppies[0];

  const mediaList = puppy.media && puppy.media.length > 0 
    ? puppy.media 
    : [puppy.cover || { url: '/brand/logo.png', kind: 'image' }];

  const currentMedia = mediaList[activeMediaIndex] || mediaList[0];
  const isBoy = puppy.gender === 'male' || (puppy.genderLabel && puppy.genderLabel.toLowerCase() === 'boy');
  const puppyName = puppy.name || puppy.displayName || puppy.slug || 'Teddy Puppy';
  const puppyBreed = puppy.breed || 'Teacup Puppy';

  const waText = encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppyName} (${puppyBreed}, ${puppy.genderLabel || (isBoy ? 'Boy' : 'Girl')}): https://puppy.instabizweb.com/puppies/${puppy.slug}`
  );
  const waUrl = `https://wa.me/971541676733?text=${waText}`;

  return (
    <article className="tp-storybook" style={{ padding: '2rem 0 6rem' }}>
      <div className="gutter site-container">
        {/* Breadcrumb Navigation */}
        <nav style={{ marginBottom: '2rem', fontSize: '0.95rem', color: 'var(--color-cocoa-soft)', fontWeight: 600 }}>
          <Link to="/" style={{ color: 'var(--color-toffee)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to="/puppies" style={{ color: 'var(--color-toffee)', textDecoration: 'none' }}>Available puppies</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--color-cocoa)', fontWeight: 700 }}>{puppyName}</span>
        </nav>

        {/* Chapter 1: hello, it's me */}
        <div style={{ marginBottom: '1rem' }}>
          <p className="tp-chapter" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span className="tp-chapter__n font-plush" style={{ fontSize: '1.6rem', color: 'var(--color-toffee)', fontWeight: 700 }}>1</span>
            <span className="font-scrawl" style={{ fontSize: '1.4rem', color: 'var(--color-toffee)' }}>hello, it's me</span>
          </p>
        </div>

        {/* Main 2-column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
          
          {/* Gallery Column */}
          <div>
            <div style={{ 
              backgroundColor: '#ffffff', 
              border: '3px solid var(--color-cocoa)', 
              borderRadius: 'var(--radius-xl)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-hard)', 
              position: 'relative' 
            }}>
              {currentMedia.kind === 'video' || currentMedia.url?.endsWith('.mp4') ? (
                <video 
                  src={currentMedia.url} 
                  controls 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ width: '100%', maxHeight: '580px', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <img 
                  src={currentMedia.url} 
                  alt={`${puppyName}, ${puppyBreed}`} 
                  style={{ width: '100%', maxHeight: '580px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    if (e.target.src !== '/brand/logo.png') {
                      e.target.src = '/brand/logo.png';
                    }
                  }}
                />
              )}
            </div>

            {/* Media Thumbnails */}
            {mediaList.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {mediaList.map((m, idx) => (
                  <button
                    key={m.id || idx}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: activeMediaIndex === idx ? '3px solid var(--color-toffee)' : '2px solid var(--color-cocoa)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      opacity: activeMediaIndex === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease',
                      backgroundColor: '#f6f2ea'
                    }}
                  >
                    {m.kind === 'video' || m.url?.endsWith('.mp4') ? (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--color-toffee)' }}>
                        ▶
                      </div>
                    ) : (
                      <img 
                        src={m.url} 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                        onError={(e) => {
                          if (e.target.src !== '/brand/logo.png') {
                            e.target.src = '/brand/logo.png';
                          }
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Board Column */}
          <div>
            <div style={{
              backgroundColor: '#ffffff',
              border: '3px solid var(--color-cocoa)',
              borderRadius: '2.2rem 2.2rem 2.2rem 0.6rem',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-hard)',
              position: 'relative'
            }}>
              {/* Teddy peek illustration / logo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={`badge ${isBoy ? 'badge-boy' : 'badge-girl'}`}>
                    {puppy.genderLabel || (isBoy ? 'Boy' : 'Girl')}
                  </span>
                  <span className={`badge ${puppy.status === 'available' ? 'badge-available' : 'badge-reserved'}`}>
                    {puppy.status === 'available' ? 'Available' : 'Reserved'}
                  </span>
                  {puppy.featured && (
                    <span className="badge badge-imported">Rare Import</span>
                  )}
                </div>
                <img 
                  src="/brand/logo.png" 
                  alt="Teddy" 
                  style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                />
              </div>

              <h1 className="font-plush" style={{ fontSize: '2.8rem', color: 'var(--color-cocoa)', marginTop: '1rem', lineHeight: 1.1 }}>
                {puppyName}
              </h1>
              <p className="font-scrawl" style={{ fontSize: '1.4rem', color: 'var(--color-toffee)', marginTop: '0.25rem' }}>
                {puppyBreed}
              </p>

              {/* Data List */}
              <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.75rem', borderTop: '2px dashed #ede7dc', paddingTop: '1.5rem' }}>
                <div>
                  <dt className="font-scrawl" style={{ fontSize: '0.95rem', color: 'var(--color-cocoa-soft)' }}>Breed</dt>
                  <dd style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-cocoa)', marginTop: '0.2rem' }}>{puppyBreed}</dd>
                </div>
                <div>
                  <dt className="font-scrawl" style={{ fontSize: '0.95rem', color: 'var(--color-cocoa-soft)' }}>Boy or girl</dt>
                  <dd style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-cocoa)', marginTop: '0.2rem' }}>{puppy.genderLabel || (isBoy ? 'Boy' : 'Girl')}</dd>
                </div>
                <div>
                  <dt className="font-scrawl" style={{ fontSize: '0.95rem', color: 'var(--color-cocoa-soft)' }}>Age</dt>
                  <dd style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-cocoa)', marginTop: '0.2rem' }}>{puppy.age || '3 months'}</dd>
                </div>
                <div>
                  <dt className="font-scrawl" style={{ fontSize: '0.95rem', color: 'var(--color-cocoa-soft)' }}>Where</dt>
                  <dd style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-cocoa)', marginTop: '0.2rem' }}>
                    {puppy.featured ? 'Imported for you' : 'Downtown Dubai Showroom'}
                  </dd>
                </div>
              </dl>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '2rem' }}>
                <a 
                  href={waUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp"
                  style={{ fontSize: '1.1rem', padding: '1rem' }}
                >
                  Ask about {puppyName} on WhatsApp
                </a>
                <button 
                  type="button" 
                  onClick={() => setModalOpen(true)}
                  className="btn btn-ghost"
                  style={{ fontSize: '1.05rem', padding: '0.9rem' }}
                >
                  Send an enquiry
                </button>
              </div>
            </div>

            {/* Chapter 2: what comes with puppy */}
            <div style={{ 
              marginTop: '2rem', 
              backgroundColor: '#fffdf8', 
              border: '2px solid var(--color-cocoa)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '2rem',
              boxShadow: '3px 4px 0px var(--color-cocoa)'
            }}>
              <p className="tp-chapter" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="tp-chapter__n font-plush" style={{ fontSize: '1.25rem', color: 'var(--color-toffee)' }}>2</span>
                <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.15rem' }}>what comes with {puppyName}</span>
              </p>
              <h2 className="font-plush" style={{ fontSize: '1.6rem', color: 'var(--color-cocoa)', marginTop: '0.25rem' }}>
                Every Teddy Pup comes
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--color-toffee-deep)', fontSize: '1.25rem', fontWeight: 900 }}>✓</span>
                  <span>Vaccinated</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--color-toffee-deep)', fontSize: '1.25rem', fontWeight: 900 }}>✓</span>
                  <span>Dewormed</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--color-toffee-deep)', fontSize: '1.25rem', fontWeight: 900 }}>✓</span>
                  <span>Verified health certificate from licensed vets</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                  <span style={{ color: 'var(--color-toffee-deep)', fontSize: '1.25rem', fontWeight: 900 }}>✓</span>
                  <span>Thoroughly checked before joining your family</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Chapter 3: the way home */}
        <section style={{ marginTop: '5rem', borderTop: '2px dashed #ede7dc', paddingTop: '3.5rem' }}>
          <p className="tp-chapter" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="tp-chapter__n font-plush" style={{ fontSize: '1.4rem', color: 'var(--color-toffee)' }}>3</span>
            <span className="font-scrawl" style={{ fontSize: '1.25rem', color: 'var(--color-toffee)' }}>the way home</span>
          </p>
          <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)', marginTop: '0.5rem' }}>
            Coming home to your family
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: '3px 3px 0 var(--color-cocoa)' }}>
              <span className="font-plush" style={{ fontSize: '1.8rem', color: 'var(--color-toffee)', fontWeight: 800 }}>1</span>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: 'var(--color-cocoa)' }}>Reserve your puppy</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Tell us which puppy has captured your heart via WhatsApp or our enquiry form.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: '3px 3px 0 var(--color-cocoa)' }}>
              <span className="font-plush" style={{ fontSize: '1.8rem', color: 'var(--color-toffee)', fontWeight: 800 }}>2</span>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: 'var(--color-cocoa)' }}>Personalized consultation</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                We finalize details with you and share videos and updates on your puppy's journey.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: '3px 3px 0 var(--color-cocoa)' }}>
              <span className="font-plush" style={{ fontSize: '1.8rem', color: 'var(--color-toffee)', fontWeight: 800 }}>3</span>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: 'var(--color-cocoa)' }}>Import and arrival</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                We manage veterinary health checks, international travel, customs clearance, and paperwork.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: '3px 3px 0 var(--color-cocoa)' }}>
              <span className="font-plush" style={{ fontSize: '1.8rem', color: 'var(--color-toffee)', fontWeight: 800 }}>4</span>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: 'var(--color-cocoa)' }}>Welcome home</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                We deliver white-glove to your doorstep and provide 24/7 care support for a smooth transition.
              </p>
            </div>
          </div>
        </section>

        {/* Previous Pup / Next Pup Navigation */}
        {(prevPup || nextPup) && (
          <nav aria-label="More puppies" style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {prevPup && (
              <Link 
                to={`/puppies/${prevPup.slug}`} 
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  backgroundColor: '#ffffff', 
                  border: '3px solid var(--color-cocoa)', 
                  borderRadius: '2rem', 
                  padding: '1rem 1.5rem', 
                  boxShadow: '3px 4px 0px var(--color-cocoa)' 
                }}
              >
                <div style={{ width: '70px', height: '80px', borderRadius: '999px 999px 0.6rem 0.6rem', border: '2px solid var(--color-cocoa)', overflow: 'hidden', flexShrink: 0, backgroundColor: 'var(--color-honey-soft)' }}>
                  <img 
                    src={prevPup.cover?.url || '/brand/logo.png'} 
                    alt={prevPup.name || prevPup.breed} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/brand/logo.png'; }}
                  />
                </div>
                <div>
                  <span className="font-scrawl" style={{ fontSize: '0.95rem', color: 'var(--color-cocoa-soft)', display: 'block' }}>← Previous pup</span>
                  <span className="font-plush" style={{ fontSize: '1.4rem', color: 'var(--color-cocoa)', fontWeight: 700 }}>
                    {prevPup.name || prevPup.breed}
                  </span>
                </div>
              </Link>
            )}

            {nextPup && (
              <Link 
                to={`/puppies/${nextPup.slug}`} 
                style={{ 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-end',
                  textAlign: 'right',
                  gap: '1.25rem', 
                  backgroundColor: '#ffffff', 
                  border: '3px solid var(--color-cocoa)', 
                  borderRadius: '2rem', 
                  padding: '1rem 1.5rem', 
                  boxShadow: '3px 4px 0px var(--color-cocoa)' 
                }}
              >
                <div>
                  <span className="font-scrawl" style={{ fontSize: '0.95rem', color: 'var(--color-cocoa-soft)', display: 'block' }}>Next pup →</span>
                  <span className="font-plush" style={{ fontSize: '1.4rem', color: 'var(--color-cocoa)', fontWeight: 700 }}>
                    {nextPup.name || nextPup.breed}
                  </span>
                </div>
                <div style={{ width: '70px', height: '80px', borderRadius: '999px 999px 0.6rem 0.6rem', border: '2px solid var(--color-cocoa)', overflow: 'hidden', flexShrink: 0, backgroundColor: 'var(--color-honey-soft)' }}>
                  <img 
                    src={nextPup.cover?.url || '/brand/logo.png'} 
                    alt={nextPup.name || nextPup.breed} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/brand/logo.png'; }}
                  />
                </div>
              </Link>
            )}
          </nav>
        )}
      </div>

      <InquiryModal 
        puppy={puppy} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </article>
  );
}
