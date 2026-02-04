import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, DollarSign, Calendar, Settings, LucideIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  path: string;
  isCenter?: boolean;
  type: 'lucide' | 'fontawesome';
  icon: LucideIcon | IconDefinition;
}

const BottomNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', path: '/dashboard', type: 'lucide' },
    { icon: Calendar, label: 'Attendance', path: '/attendance', type: 'lucide' },
    { icon: faPersonRunning, label: 'Actions', path: '/quick-actions', isCenter: true, type: 'fontawesome' },
    { icon: DollarSign, label: 'Payslip', path: '/payslip', type: 'lucide' },
    { icon: Settings, label: 'Settings', path: '/settings', type: 'lucide' },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
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
                        <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center border-4 border-white/20 backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform">
                          {item.type === 'fontawesome' && (
                            <FontAwesomeIcon icon={item.icon as IconDefinition} className="text-white text-2xl" />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-2 space-y-1">
                      <div className={cn("relative transition-all duration-200", isActive && "scale-110")}>
                        {item.type === 'lucide' && (() => {
                          const Icon = item.icon as LucideIcon;
                          return (
                            <Icon
                              size={24}
                              strokeWidth={isActive ? 2.5 : 2}
                              className={cn(
                                "transition-colors duration-200",
                                isActive ? "text-primary" : "text-gray-500"
                              )}
                            />
                          );
                        })()}
                      </div>
                      <span className={cn(
                        "text-[10px] font-medium transition-colors duration-200",
                        isActive ? "text-primary" : "text-gray-500"
                      )}>
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
