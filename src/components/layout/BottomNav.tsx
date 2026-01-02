import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, DollarSign, Plus, Calendar, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: DollarSign, label: 'Payslip', path: '/payslip' },
    { icon: Plus, label: 'Add', path: '/apply-leave', isCenter: true }, // Using Apply Leave as the center action for now
    { icon: Calendar, label: 'Attendance', path: '/attendance' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border pb-safe pt-2 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] z-50">
      <div className="flex justify-between items-end max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full pb-2 transition-colors duration-200",
              isActive ? "text-primary" : "text-text-muted hover:text-text-secondary"
            )}
          >
            {({ isActive }) => (
              <>
                {item.isCenter ? (
                  <div className="bg-primary text-white p-3 rounded-full shadow-lg -mt-8 mb-1 border-4 border-surface">
                    <item.icon size={24} strokeWidth={2.5} />
                  </div>
                ) : (
                  <item.icon
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="mb-1"
                  />
                )}
                <span className={cn("text-[10px] font-medium", item.isCenter && "mt-0")}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
