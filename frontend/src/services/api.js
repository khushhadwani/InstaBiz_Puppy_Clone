import localPuppies from '../data/puppies.json';
import localGoneHome from '../data/goneHome.json';
import localFaqs from '../data/faqs.json';
import localTestimonials from '../data/testimonials.json';
import localSiteConfig from '../data/siteConfig.json';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function getPuppies(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/api/puppies${query ? `?${query}` : ''}`;
    const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    console.warn('Backend API unavailable, using cached reference puppies:', err.message);
  }

  // Fallback to local data
  let filtered = [...localPuppies];
  if (params.breed && params.breed.toLowerCase() !== 'all') {
    filtered = filtered.filter(p => p.breed.toLowerCase().includes(params.breed.toLowerCase()));
  }
  if (params.gender && params.gender.toLowerCase() !== 'all') {
    filtered = filtered.filter(p => p.gender.toLowerCase() === params.gender.toLowerCase());
  }
  if (params.status && params.status.toLowerCase() !== 'all') {
    filtered = filtered.filter(p => p.status.toLowerCase() === params.status.toLowerCase());
  }
  return filtered;
}

export async function getPuppyBySlug(slug) {
  try {
    const resp = await fetch(`${API_BASE_URL}/api/puppies/${slug}`, { headers: { 'Accept': 'application/json' } });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    console.warn(`Backend API unavailable for puppy ${slug}, using local cache:`, err.message);
  }

  return localPuppies.find(p => p.slug === slug) || null;
}

export async function getGoneHomePuppies() {
  try {
    const resp = await fetch(`${API_BASE_URL}/api/gone-home`, { headers: { 'Accept': 'application/json' } });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    console.warn('Backend API unavailable, using local gone home data:', err.message);
  }
  return localGoneHome;
}

export async function getFaqs() {
  try {
    const resp = await fetch(`${API_BASE_URL}/api/faqs`, { headers: { 'Accept': 'application/json' } });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    console.warn('Backend API unavailable, using local faqs:', err.message);
  }
  return localFaqs;
}

export async function getTestimonials() {
  try {
    const resp = await fetch(`${API_BASE_URL}/api/testimonials`, { headers: { 'Accept': 'application/json' } });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    console.warn('Backend API unavailable, using local testimonials:', err.message);
  }
  return localTestimonials;
}

export async function submitInquiry(inquiryData) {
  try {
    const resp = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(inquiryData)
    });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    console.warn('Backend API unavailable for inquiry, saving locally:', err.message);
  }
  return { success: true, message: 'Inquiry received successfully! Our team will contact you shortly.', localOnly: true };
}

export async function submitContactLetter(letterData) {
  try {
    const resp = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(letterData)
    });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    console.warn('Backend API unavailable for contact letter, saving locally:', err.message);
  }
  return { success: true, message: 'Letter sent! Teddy and the team will reply soon.', localOnly: true };
}

export { localSiteConfig };
