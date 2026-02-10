import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, User, LayoutGrid, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const BottomNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Calendar, label: 'Attendance', path: '/attendance' },
    { icon: LayoutGrid, label: 'Menu', path: '/quick-actions' },
    { icon: User, label: 'Profile', path: '/settings' },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-6 left-0 right-0 z-40 transition-transform duration-500 flex justify-center px-6",
        isVisible ? "translate-y-0" : "translate-y-24"
      )}
    >
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 flex items-center justify-around px-2 py-3">
        {navItems.map((item) => (
          <NavLink key={item.label} to={item.path} className="relative flex-1">
            {({ isActive }) => (
              <div className="flex flex-col items-center group">
                <div className={cn(
                  "relative flex items-center justify-center w-12 h-10 rounded-2xl transition-all duration-300",
                  isActive ? "text-primary" : "text-gray-400 group-hover:text-primary/70"
                )}>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-x-1 bottom-0 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="transition-transform duration-200 active:scale-95"
                  />
                </div>
                <span className={cn(
                  "text-[10px] font-bold mt-1 transition-all duration-200",
                  isActive ? "text-primary" : "text-gray-400"
                )}>
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
