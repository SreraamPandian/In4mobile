import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Splash = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // "Hi" in 15 languages
  const greetings = [
    'Hi', 'Hola', 'Bonjour', 'Hallo', 'Ciao',
    'नमस्ते', '你好', 'こんにちは', '안녕하세요', 'مرحبا',
    'Olá', 'Привет', 'Hej', 'Merhaba', 'Sawubona'
  ];

  useEffect(() => {
    if (currentIndex < greetings.length - 1) {
      const timer = setTimeout(() => setCurrentIndex(currentIndex + 1), 280); // Slightly slower
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => navigate('/login'), 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, navigate, greetings.length]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.15 }}
          className="text-4xl font-bold text-indigo-600"
        >
          {greetings[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default Splash;
