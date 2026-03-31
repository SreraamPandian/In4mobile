import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import TopBar from './TopBar';

const MobileLayout = () => {
  const location = useLocation();
  const hideNavPaths = ['/', '/login'];
  const showNav = !hideNavPaths.includes(location.pathname);
  
  // Hide TopBar on Splash, Login, Settings, Add Visitor, and Visitor Pre Entry forms
  const showTopBar = !['/', '/login', '/settings', '/add-visitor', '/visitor-pre-entry'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-text-main font-sans antialiased overflow-x-hidden">
      <div className="w-full md:max-w-lg mx-auto h-[100dvh] relative bg-background shadow-2xl flex flex-col">
        {showTopBar && <TopBar />}
        <main className={`flex-1 overflow-y-auto pb-24 scrollbar-hide ${showTopBar ? 'pt-[130px]' : ''}`}>
          <Outlet />
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};

export default MobileLayout;
