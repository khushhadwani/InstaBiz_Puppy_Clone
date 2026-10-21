import React from 'react';

export default function PuppyFilterBar({ 
  selectedBreed, 
  onSelectBreed, 
  selectedStatus, 
  onSelectStatus,
  searchQuery,
  onSearchChange
}) {
  const breeds = [
    { id: 'all', label: 'All Breeds' },
    { id: 'maltipoo', label: 'Maltipoo' },
    { id: 'korean-teacup', label: 'Korean Teacup' },
    { id: 'poodle', label: 'Toy Poodle' },
    { id: 'pomeranian', label: 'Pomeranian' },
    { id: 'shih-tzu', label: 'Shih Tzu' },
    { id: 'cavapoo', label: 'Cavapoo' }
  ];

  return (
    <div style={{ margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Search Input & Status Pills */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
          <input
            type="text"
            placeholder="Search puppy by name or breed..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--color-cocoa)',
              backgroundColor: '#ffffff',
              fontSize: '0.95rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => onSelectStatus('all')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: selectedStatus === 'all' ? 'var(--color-cocoa)' : 'transparent',
              color: selectedStatus === 'all' ? 'var(--color-milk)' : 'var(--color-cocoa)',
              border: '2px solid var(--color-cocoa)'
            }}
          >
            All Status
          </button>
          <button
            type="button"
            onClick={() => onSelectStatus('available')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: selectedStatus === 'available' ? '#1f7a4d' : 'transparent',
              color: selectedStatus === 'available' ? '#ffffff' : '#1f7a4d',
              border: '2px solid #1f7a4d'
            }}
          >
            Available Now
          </button>
          <button
            type="button"
            onClick={() => onSelectStatus('reserved')}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: selectedStatus === 'reserved' ? 'var(--color-cocoa-soft)' : 'transparent',
              color: selectedStatus === 'reserved' ? '#ffffff' : 'var(--color-cocoa-soft)',
              border: '2px solid var(--color-cocoa-soft)'
            }}
          >
            Reserved
          </button>
        </div>
      </div>

      {/* Breed Filter Pills */}
      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
        {breeds.map((b) => {
          const isActive = selectedBreed === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onSelectBreed(b.id)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                backgroundColor: isActive ? 'var(--color-toffee)' : '#ffffff',
                color: isActive ? 'var(--color-milk)' : 'var(--color-cocoa)',
                border: '2px solid var(--color-cocoa)',
                boxShadow: isActive ? '3px 3px 0px var(--color-cocoa)' : 'none'
              }}
            >
              {b.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
