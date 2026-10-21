import React from 'react';
import { Outlet } from 'react-router-dom';
import Curtain from './Curtain';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function AppLayout() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Curtain />
      <SiteHeader />
      <main id="main" tabIndex="-1" style={{ paddingTop: 'var(--header-h)', flex: 1, outline: 'none' }}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
