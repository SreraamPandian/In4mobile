import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const MobileLayout = () => {
  const location = useLocation();
  const hideNavPaths = ['/', '/login'];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-text-main font-sans antialiased overflow-x-hidden">
      <div className="max-w-md mx-auto min-h-screen relative bg-background shadow-2xl overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          <Outlet />
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};

export default MobileLayout;
