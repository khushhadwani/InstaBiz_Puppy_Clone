import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PuppyCard from '../components/common/PuppyCard';
import PuppyFilterBar from '../components/common/PuppyFilterBar';
import { getPuppies } from '../services/api';

export default function PuppiesPage() {
  const [puppies, setPuppies] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getPuppies();
      setPuppies(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredPuppies = puppies.filter((p) => {
    // Breed filter
    if (selectedBreed !== 'all') {
      const b = p.breed.toLowerCase();
      if (selectedBreed === 'maltipoo' && !b.includes('maltipoo')) return false;
      if (selectedBreed === 'korean-teacup' && !p.name.toLowerCase().includes('korean') && !p.slug.includes('korean')) return false;
      if (selectedBreed === 'poodle' && !b.includes('poodle')) return false;
      if (selectedBreed === 'pomeranian' && !b.includes('pomeranian')) return false;
      if (selectedBreed === 'shih-tzu' && !b.includes('shih') && !b.includes('shitzu')) return false;
      if (selectedBreed === 'cavapoo' && !b.includes('cavapoo')) return false;
    }
    // Status filter
    if (selectedStatus !== 'all') {
      if (p.status !== selectedStatus) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBreed = p.breed.toLowerCase().includes(q);
      if (!matchName && !matchBreed) return false;
    }
    return true;
  });

  return (
    <div className="puppies-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="gutter site-container">
        {/* Header */}
        <div style={{ maxWidth: '780px', marginBottom: '2rem' }}>
          <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>
            from Teddy's sketchbook
          </span>
          <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)', marginTop: '0.25rem' }}>
            Available puppies
          </h1>
          <p className="text-lede" style={{ marginTop: '0.75rem' }}>
            Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
          </p>
        </div>

        {/* Filter Bar */}
        <PuppyFilterBar 
          selectedBreed={selectedBreed}
          onSelectBreed={setSelectedBreed}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Results Counter */}
        <div style={{ marginBottom: '1.5rem', color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', fontWeight: 600 }}>
          Showing {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'}
        </div>

        {/* Puppies Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-cocoa-soft)' }}>
            <p className="font-plush" style={{ fontSize: '1.5rem' }}>Gathering Teddy's sketches...</p>
          </div>
        ) : filteredPuppies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: '#ffffff', borderRadius: 'var(--radius-xl)', border: '2px dashed var(--color-cocoa)' }}>
            <p className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-cocoa)' }}>No puppies match your filter</p>
            <p style={{ color: 'var(--color-cocoa-soft)', marginTop: '0.5rem' }}>Try selecting "All Breeds" or clearing your search term.</p>
            <button 
              type="button" 
              onClick={() => { setSelectedBreed('all'); setSelectedStatus('all'); setSearchQuery(''); }}
              className="btn btn-outline"
              style={{ marginTop: '1.25rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <ul className="tp-sketches">
            {filteredPuppies.map((p, idx) => (
              <PuppyCard key={p.id || p.slug} puppy={p} index={idx} />
            ))}
          </ul>
        )}

        {/* Link to Gone Home */}
        <div style={{ marginTop: '5rem', backgroundColor: 'var(--color-honey-soft)', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', boxShadow: '3px 4px 0px var(--color-cocoa)' }}>
          <div>
            <span className="font-scrawl" style={{ color: 'var(--color-toffee-deep)', fontSize: '1.15rem' }}>happily ever after</span>
            <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)', marginTop: '0.2rem' }}>Already gone home</h2>
            <p style={{ color: 'var(--color-cocoa-soft)', marginTop: '0.5rem', maxWidth: '540px' }}>
              These little angels have already found their forever families across the UAE. View their departure tickets and family memories!
            </p>
          </div>
          <Link to="/gone-home" className="btn btn-primary" style={{ padding: '0.9rem 1.8rem' }}>
            Visit Ticket Booth →
          </Link>
        </div>
      </div>
    </div>
  );
}
