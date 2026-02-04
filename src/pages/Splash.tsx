import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-surface flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut"
          }
        }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="relative flex flex-col items-center"
      >
        {/* Logo Image */}
        <motion.img
          src={logo}
          alt="In4CloudHR"
          className="w-80 md:w-96 object-contain"
          initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: [0, -15, 0], // Slightly larger float
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8, type: "spring", bounce: 0.4 },
            filter: { duration: 0.8 },
            y: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }
          }}
        />
      </motion.div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-20 text-text-secondary text-lg font-semibold tracking-wide"
      >
        in4cloud.in
      </motion.p>
    </div>
  );
};

export default Splash;
