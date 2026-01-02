import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Hexagon } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-black/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center z-10"
      >
        <div className="bg-white p-4 rounded-2xl shadow-xl mb-6">
          <Hexagon size={48} className="text-primary fill-primary/20" strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">ProPeople</h1>
        <p className="text-primary-light text-sm font-medium tracking-widest uppercase">HR Management System</p>
      </motion.div>

      <div className="absolute bottom-12 flex flex-col items-center">
        <Loader2 className="animate-spin text-white/50 mb-4" size={24} />
        <p className="text-white/30 text-xs">Version 2.0.1</p>
      </div>
    </div>
  );
};

export default Splash;
