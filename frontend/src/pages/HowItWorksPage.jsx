import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  return (
    <div className="how-it-works-page" style={{ padding: '2.5rem 0 5rem' }}>
      <div className="gutter site-container">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>
            the adoption guide
          </span>
          <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)', marginTop: '0.25rem' }}>
            How it works
          </h1>
          <p className="text-lede" style={{ marginTop: '1rem' }}>
            Whether you choose to visit us locally in Downtown Dubai or order an exclusive teacup breed from certified international breeders, TeddyPups is here to make the experience pure joy.
          </p>
        </div>

        {/* Dual Pathways */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          
          {/* Pathway 1 */}
          <div style={{ backgroundColor: '#ffffff', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-hard)' }}>
            <div style={{ display: 'inline-flex', padding: '0.4rem 1rem', backgroundColor: 'var(--color-honey-soft)', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
              Option A: In-Person
            </div>
            <h2 className="font-plush" style={{ fontSize: '2rem', color: 'var(--color-cocoa)', marginBottom: '1rem' }}>
              Meet your puppy in person
            </h2>
            <p style={{ color: 'var(--color-cocoa-soft)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-toffee)', fontWeight: 800 }}>1.</span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Explore our puppies</h3>
                  <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Browse our website to view available puppies with real photos and health status.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-toffee)', fontWeight: 800 }}>2.</span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Choose your puppy</h3>
                  <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Open their dossier for full details or reach out directly on WhatsApp.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-toffee)', fontWeight: 800 }}>3.</span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Meet before you choose</h3>
                  <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Spend quality bonding time in our private Downtown Dubai showroom suite.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-toffee)', fontWeight: 800 }}>4.</span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Pick-up or delivery</h3>
                  <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Take your new friend home the same day, or opt for VIP delivery across the UAE.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                Book Showroom Visit
              </Link>
            </div>
          </div>

          {/* Pathway 2 */}
          <div style={{ backgroundColor: '#ffffff', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-hard)' }}>
            <div style={{ display: 'inline-flex', padding: '0.4rem 1rem', backgroundColor: 'var(--color-sky)', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
              Option B: Concierge Import
            </div>
            <h2 className="font-plush" style={{ fontSize: '2rem', color: 'var(--color-cocoa)', marginBottom: '1rem' }}>
              Order upon request
            </h2>
            <p style={{ color: 'var(--color-cocoa-soft)', lineHeight: 1.6, marginBottom: '2rem' }}>
              For those seeking rare breeds, specific genetics, or ultra-teacup puppies from the finest breeders in South Korea and Europe, our Order Upon Request service offers an exclusive, stress-free path to adoption.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-toffee)', fontWeight: 800 }}>1.</span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Reserve your puppy</h3>
                  <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Choose an available import puppy or tell us your dream specifications.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-toffee)', fontWeight: 800 }}>2.</span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Personalized consultation</h3>
                  <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Review video updates, pedigree records, and adult size forecasts.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-toffee)', fontWeight: 800 }}>3.</span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Import and arrival</h3>
                  <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Your puppy travels in safe climate-controlled cargo with veterinary supervision.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <span className="font-plush" style={{ fontSize: '1.5rem', color: 'var(--color-toffee)', fontWeight: 800 }}>4.</span>
                <div>
                  <h3 className="font-plush" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Welcome home</h3>
                  <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Receive your puppy with health certificate, starter kit, and 24/7 care plan.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <a 
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20like%20to%20consult%20about%20importing%20a%20rare%20teacup%20puppy." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp" 
                style={{ width: '100%' }}
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Our Premium Puppy Promise */}
        <section style={{ backgroundColor: 'var(--color-honey-soft)', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: 'clamp(2rem, 5vw, 3.5rem)', boxShadow: '4px 5px 0px var(--color-cocoa)', marginBottom: '5rem' }}>
          <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)', textAlign: 'center', marginBottom: '2.5rem' }}>
            Our premium puppy promise
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '1.75rem', border: '2px solid var(--color-cocoa)' }}>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>International Cargo</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.55 }}>We partner exclusively with top pet-friendly airlines ensuring optimal cabin pressure and warmth.</p>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '1.75rem', border: '2px solid var(--color-cocoa)' }}>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>24/7 Lifelong Support</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.55 }}>Your adoption is just the beginning. Our dedicated pet concierge is always a WhatsApp message away.</p>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '1.75rem', border: '2px solid var(--color-cocoa)' }}>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Verified Health Guarantee</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.55 }}>Every puppy comes with clear veterinary health certifications, genetic screening, and deworming.</p>
            </div>
          </div>
        </section>

        {/* Delivery & Collection Section */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)' }}>
            Delivery &amp; Collection Options
          </h2>
          <p className="text-lede" style={{ marginTop: '0.75rem' }}>
            We provide convenient, secure options across the UAE and worldwide.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2.5rem', textAlign: 'left' }}>
            <div style={{ padding: '1.5rem', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', backgroundColor: '#ffffff' }}>
              <h4 className="font-plush" style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Same-Day Pickup</h4>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.9rem' }}>Collect locally available puppies directly from our Downtown showroom.</p>
            </div>
            <div style={{ padding: '1.5rem', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', backgroundColor: '#ffffff' }}>
              <h4 className="font-plush" style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Doorstep Delivery</h4>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.9rem' }}>Personal VIP nanny delivery to your home in Dubai, Abu Dhabi, or Sharjah.</p>
            </div>
            <div style={{ padding: '1.5rem', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', backgroundColor: '#ffffff' }}>
              <h4 className="font-plush" style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Worldwide Shipping</h4>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.9rem' }}>Certified international delivery with export passports and customs clearance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
