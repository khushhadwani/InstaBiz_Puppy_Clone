import React from 'react';
import { Link } from 'react-router-dom';

export default function PuppyCard({ puppy, index = 0 }) {
  // Deterministic subtle tilt angles matching original site design
  const tilts = ['0.36deg', '-0.65deg', '0.75deg', '-0.42deg', '0.8deg', '-0.85deg'];
  const tilt = tilts[index % tilts.length];

  const coverUrl = puppy.cover?.url || puppy.coverUrl || '/brand/logo.png';
  const isBoy = puppy.gender === 'male' || puppy.genderLabel?.toLowerCase() === 'boy';

  return (
    <li style={{ listStyle: 'none' }}>
      <Link 
        to={`/puppies/${puppy.slug}`} 
        className="tp-sketch"
        style={{ '--tilt': tilt }}
        aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.genderLabel || puppy.gender}, ${puppy.age}, ${puppy.status}`}
      >
        <div className="tp-sketch__photo-wrap">
          <img 
            src={coverUrl} 
            alt={`${puppy.name}, ${puppy.breed}`} 
            className="tp-sketch__photo"
            loading="lazy"
          />
        </div>

        <div className="tp-sketch__info">
          <div className="tp-sketch__badges">
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

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.25rem' }}>
            <h3 className="font-plush" style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-cocoa)' }}>
              {puppy.name}
            </h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-cocoa-soft)', fontWeight: 600 }}>
              {puppy.age}
            </span>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-cocoa-soft)', marginTop: '0.2rem' }}>
            {puppy.breed}
          </p>

          <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #e8e2d8', paddingTop: '0.65rem' }}>
            <span className="font-scrawl" style={{ fontSize: '0.95rem', color: 'var(--color-toffee)' }}>
              view profile &amp; photos →
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
