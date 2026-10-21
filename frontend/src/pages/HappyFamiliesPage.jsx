import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTestimonials } from '../services/api';

export default function HappyFamiliesPage() {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getTestimonials();
      setFamilies(data);
    }
    load();
  }, []);

  // Additional gallery moments from reference
  const galleryMoments = [
    { id: 'gm-1', name: 'Oliver & Mia', breed: 'Korean Teacup Maltipoo', quote: 'Oliver has filled our home with so much joy and endless cuddles.', img: '/media/xaIi_2gMoj_N/27123a3e2c/27b888_3375199e717a4f6ca02e902672664e79-mv2.jpg' },
    { id: 'gm-2', name: 'Chloe & Zayn', breed: 'Toy Poodle', quote: 'Healthy, playful, and immediately crate-trained. Best puppy experience!', img: '/media/yEfM9sdMluCX/46ecd570ef/edb2f5_099acc542ba14359aa8c0f933cb4ef2c-mv2.jpeg' },
    { id: 'gm-3', name: 'Luna & Tariq', breed: 'Pomeranian', quote: 'The passport and health paperwork made international travel a breeze.', img: '/media/xHEMhVTwflC_/8859dd626c/b942a5_65113182432144f49bd50bb009e7d88c-mv2.jpg' },
    { id: 'gm-4', name: 'Simba & Leila', breed: 'Cavapoo', quote: 'TeddyPups answered all our questions at 11pm. Truly 24/7 care!', img: '/media/wyDhW6yEQ6ef/e012615aab/b942a5_9381a9a0ca3e40b4b4f31906cf7fda56-mv2.png' },
    { id: 'gm-5', name: 'Bella & Hamdan', breed: 'Korean Teacup Pomeranian', quote: 'She fits in my palm and is the sweetest little bear.', img: '/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg' },
    { id: 'gm-6', name: 'Archie & Noor', breed: 'Bichon Frise', quote: 'We visited the Downtown showroom and knew in 5 minutes.', img: '/media/fI-hlHuSwrRw/e5ae9b6384/27b888_8d87239e23854214a8718ef8f02c2d50-mv2.avif' }
  ];

  return (
    <div className="happy-families-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="gutter site-container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>
            our wall of happy endings
          </span>
          <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)', marginTop: '0.25rem' }}>
            Happy families
          </h1>
          <p className="text-lede" style={{ marginTop: '1rem' }}>
            Nothing makes us happier than seeing our tiny puppies in loving homes! Here are some of the beautiful moments shared by our amazing clients across Dubai and the UAE.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', padding: '0.4rem 1rem', backgroundColor: 'var(--color-honey-soft)', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-cocoa)', fontWeight: 700, fontSize: '0.9rem' }}>
            <span>🌟</span>
            <span>64 moments and counting — every one of them was a Teddy Pup once</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {galleryMoments.map((m, idx) => {
            const tilts = ['0.5deg', '-0.6deg', '0.75deg', '-0.4deg', '0.6deg', '-0.7deg'];
            const tilt = tilts[idx % tilts.length];
            return (
              <div 
                key={m.id} 
                style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid var(--color-cocoa)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-hard)',
                  transform: `rotate(${tilt})`,
                  transition: 'transform 0.3s ease',
                  padding: '1.25rem'
                }}
              >
                <div style={{ width: '100%', height: '320px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', backgroundColor: 'var(--color-honey-soft)' }}>
                  <img 
                    src={m.img} 
                    alt={m.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>

                <div style={{ paddingTop: '1.25rem' }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--color-cocoa-soft)', lineHeight: 1.55, fontSize: '1.05rem', marginBottom: '1rem' }}>
                    "{m.quote}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px dashed #e8e2d8', paddingTop: '0.75rem' }}>
                    <h3 className="font-plush" style={{ fontSize: '1.25rem', color: 'var(--color-cocoa)', fontWeight: 700 }}>
                      {m.name}
                    </h3>
                    <span className="font-scrawl" style={{ fontSize: '0.95rem', color: 'var(--color-toffee)' }}>
                      {m.breed}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div style={{ marginTop: '5rem', textAlign: 'center', backgroundColor: 'var(--color-honey-soft)', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '3rem', boxShadow: '3px 4px 0px var(--color-cocoa)' }}>
          <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)' }}>
            Want to be featured on our wall?
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--color-cocoa-soft)', maxWidth: '580px', margin: '0.75rem auto 1.5rem', fontSize: '1.1rem' }}>
            Adopt your tiny puppy today and share your family's milestones with our community!
          </p>
          <Link to="/puppies" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
            Find Your Puppy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
