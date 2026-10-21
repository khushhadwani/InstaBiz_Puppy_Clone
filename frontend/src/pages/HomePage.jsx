import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PuppyCard from '../components/common/PuppyCard';
import { getPuppies, getFaqs, getTestimonials } from '../services/api';

export default function HomePage() {
  const [featuredPuppies, setFeaturedPuppies] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function loadData() {
      const pups = await getPuppies();
      setFeaturedPuppies(pups.slice(0, 4));
      const f = await getFaqs();
      setFaqs(f.slice(0, 4));
      const t = await getTestimonials();
      setTestimonials(t.slice(0, 3));
    }
    loadData();
  }, []);

  return (
    <div className="home-page" style={{ paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--color-milk)', paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <div className="gutter site-container" style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', backgroundColor: 'var(--color-honey-soft)', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-cocoa)', marginBottom: '1.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
            <span>🐾</span>
            <span>Premium teacup puppies in Dubai</span>
          </div>

          <h1 className="font-plush text-giant" style={{ color: 'var(--color-cocoa)' }}>
            Find your tiny best friend in Dubai
          </h1>

          <p className="text-lede" style={{ marginTop: '1.5rem', maxWidth: '680px', margin: '1.5rem auto 0' }}>
            Meet your new best friend in our Downtown Dubai showroom, or order a rare miniature breed imported from certified, ethical breeders worldwide.
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/puppies" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.9rem 2.2rem' }}>
              Meet the puppies
            </Link>
            <Link to="/how-it-works" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '0.9rem 2.2rem' }}>
              How adoption works
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Puppies Showcase */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderTop: '2px dashed #ede7dc', borderBottom: '2px dashed #ede7dc' }}>
        <div className="gutter site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>
                from Teddy's sketchbook
              </span>
              <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)', marginTop: '0.25rem' }}>
                Meet the pups looking for love
              </h2>
            </div>
            <Link to="/puppies" className="btn btn-outline">
              View all 25+ puppies →
            </Link>
          </div>

          <ul className="tp-sketches">
            {featuredPuppies.map((p, idx) => (
              <PuppyCard key={p.id || p.slug} puppy={p} index={idx} />
            ))}
          </ul>
        </div>
      </section>

      {/* Two Ways to Meet Your Puppy */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="gutter site-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>
              choose your way
            </span>
            <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)', marginTop: '0.25rem' }}>
              Two ways to meet your puppy
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Option 1 */}
            <div style={{ backgroundColor: '#ffffff', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-hard)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-honey-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1.25rem' }}>
                🏙️
              </div>
              <h3 className="font-plush" style={{ fontSize: '1.85rem', color: 'var(--color-cocoa)', marginBottom: '0.75rem' }}>
                Puppies in Dubai
              </h3>
              <p style={{ color: 'var(--color-cocoa-soft)', lineHeight: 1.6, flex: 1, fontSize: '1.05rem' }}>
                See them, love them, take them home. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before you decide.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                  Visit our Showroom
                </Link>
              </div>
            </div>

            {/* Option 2 */}
            <div style={{ backgroundColor: '#ffffff', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-hard)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1.25rem' }}>
                ✈️
              </div>
              <h3 className="font-plush" style={{ fontSize: '1.85rem', color: 'var(--color-cocoa)', marginBottom: '0.75rem' }}>
                Imported for you
              </h3>
              <p style={{ color: 'var(--color-cocoa-soft)', lineHeight: 1.6, flex: 1, fontSize: '1.05rem' }}>
                Exclusive Korean teacup puppies, delivered. Order from the world's most reputable, certified breeders and let our concierge team handle all travel, vetting, and customs.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/how-it-works" className="btn btn-outline" style={{ width: '100%' }}>
                  Learn about Imports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Puppy Journey */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--color-honey-soft)' }}>
        <div className="gutter site-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="font-scrawl" style={{ color: 'var(--color-toffee-deep)', fontSize: '1.25rem' }}>
              step by step
            </span>
            <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)' }}>
              Your puppy adoption journey
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: '3px 4px 0px var(--color-cocoa)' }}>
              <span className="font-plush" style={{ fontSize: '2.2rem', color: 'var(--color-toffee)', fontWeight: 800 }}>01</span>
              <h3 className="font-plush" style={{ fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>Choose your breed</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', lineHeight: 1.6 }}>Browse our gallery of teacup breeds. Filter by breed, size, and personality to discover your perfect match.</p>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: '3px 4px 0px var(--color-cocoa)' }}>
              <span className="font-plush" style={{ fontSize: '2.2rem', color: 'var(--color-toffee)', fontWeight: 800 }}>02</span>
              <h3 className="font-plush" style={{ fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>Get photos &amp; health checks</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', lineHeight: 1.6 }}>Receive verified veterinary reports, video calls, vaccination records, and international microchip details.</p>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: '3px 4px 0px var(--color-cocoa)' }}>
              <span className="font-plush" style={{ fontSize: '2.2rem', color: 'var(--color-toffee)', fontWeight: 800 }}>03</span>
              <h3 className="font-plush" style={{ fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>Secure &amp; safe delivery</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', lineHeight: 1.6 }}>Same-day showroom collection in Downtown Dubai or white-glove doorstep delivery to your home in the UAE.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Trust TeddyPups */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="gutter site-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)' }}>
              Why families trust TeddyPups
            </h2>
            <p className="text-lede" style={{ marginTop: '0.75rem' }}>
              We set the gold standard in ethical pet adoption across the United Arab Emirates.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🩺</div>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Vet Health Certified</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.5 }}>Every puppy undergoes comprehensive medical screening by licensed Dubai veterinarians.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💉</div>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Vaccinated &amp; Microchipped</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.5 }}>Comes complete with up-to-date vaccine passports, deworming, and ISO microchip registration.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏛️</div>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Downtown Dubai Showroom</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.5 }}>Visit our clean, welcoming boutique showroom to meet puppies in person before adopting.</p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</div>
              <h3 className="font-plush" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>24/7 Lifelong Support</h3>
              <p style={{ color: 'var(--color-cocoa-soft)', fontSize: '0.95rem', lineHeight: 1.5 }}>Our concierge team is always available via WhatsApp for nutrition, care, and training guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Families Preview */}
      <section style={{ padding: '4rem 0', backgroundColor: '#faf8f2', borderTop: '2px dashed #e8e2d8' }}>
        <div className="gutter site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="font-scrawl" style={{ color: 'var(--color-toffee)', fontSize: '1.25rem' }}>our wall of happy endings</span>
              <h2 className="font-plush text-title" style={{ color: 'var(--color-cocoa)' }}>Happy families &amp; puppies</h2>
            </div>
            <Link to="/happy-families" className="btn btn-outline">
              See all family stories →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t) => (
              <div key={t.id} style={{ backgroundColor: '#ffffff', border: '2px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: 'var(--shadow-hard)' }}>
                <p style={{ fontStyle: 'italic', color: 'var(--color-cocoa-soft)', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1.25rem' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img src={t.imageUrl} alt={t.clientName} style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-full)', objectFit: 'cover', border: '2px solid var(--color-cocoa)' }} />
                  <div>
                    <h4 className="font-plush" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t.clientName}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-toffee)' }}>{t.puppyName} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Meet CTA Banner */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="gutter site-container">
          <div style={{ backgroundColor: 'var(--color-honey)', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)', padding: 'clamp(2.5rem, 5vw, 4rem)', boxShadow: '5px 6px 0px var(--color-cocoa)', textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
            <span className="font-scrawl" style={{ fontSize: '1.4rem', color: 'var(--color-toffee-deep)' }}>
              every puppy is family
            </span>
            <h2 className="font-plush text-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--color-cocoa)' }}>
              Ready to meet your new best friend?
            </h2>
            <p style={{ maxWidth: '580px', margin: '0 auto 2rem', color: 'var(--color-cocoa-soft)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Whether you want to visit our Downtown Dubai showroom today or ask about a specific teacup puppy, we're here to help you every step of the way.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a 
                href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20available%20puppies." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp"
                style={{ fontSize: '1.1rem', padding: '0.9rem 2rem' }}
              >
                Chat on WhatsApp Now
              </a>
              <Link to="/contact" className="btn btn-outline" style={{ backgroundColor: '#ffffff', fontSize: '1.1rem', padding: '0.9rem 2rem' }}>
                Visit our Showroom
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
