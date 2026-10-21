import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import PuppiesPage from './pages/PuppiesPage';
import PuppyDetailPage from './pages/PuppyDetailPage';
import GoneHomePage from './pages/GoneHomePage';
import HappyFamiliesPage from './pages/HappyFamiliesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="puppies" element={<PuppiesPage />} />
          <Route path="puppies/:slug" element={<PuppyDetailPage />} />
          <Route path="gone-home" element={<GoneHomePage />} />
          <Route path="happy-families" element={<HappyFamiliesPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
