import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, DollarSign, Plus, Calendar, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Calendar, label: 'Attendance', path: '/attendance' }, // Swapped
    { icon: Plus, label: 'Add', path: '/apply-leave', isCenter: true },
    { icon: DollarSign, label: 'Payslip', path: '/payslip' }, // Swapped
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="relative mx-4 mb-6">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl rounded-[2rem] border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-[2rem] pointer-events-none"></div>

        {/* Content */}
        <div className="relative flex items-center justify-around px-6 py-3">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.path} className="relative flex-1">
              {({ isActive }) => (
                <>
                  {item.isCenter ? (
                    <div className="flex justify-center">
                      <div className="relative -mt-10">
                        <div className="absolute inset-0 bg-indigo-500/40 rounded-full blur-xl"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-2xl shadow-indigo-500/40 flex items-center justify-center border-4 border-white/20 backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform">
                          <item.icon size={26} strokeWidth={2.5} className="text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-2 space-y-1">
                      <div className={cn("relative transition-all duration-200", isActive && "scale-110")}>
                        {isActive && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"></div>}
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={cn("transition-colors duration-200", isActive ? "text-indigo-600" : "text-gray-500")} />
                      </div>
                      <span className={cn("text-[10px] font-medium transition-all duration-200", isActive ? "text-indigo-600" : "text-gray-500")}>
                        {item.label}
                      </span>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
