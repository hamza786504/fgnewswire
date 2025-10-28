'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center shadow-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-t-blue-300 border-r-purple-300 border-b-pink-300 border-l-transparent"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-light text-gray-700 mb-2"
        >
          Loading Content
        </motion.h1>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8 }}
          className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"
          />
        </motion.div>

        {/* Status Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-gray-500"
        >
          {progress < 30 && "Initializing..."}
          {progress >= 30 && progress < 70 && "Loading resources..."}
          {progress >= 70 && progress < 90 && "Almost there..."}
          {progress >= 90 && "Finishing up..."}
        </motion.p>

        {/* Animated Dots */}
        <motion.div 
          className="flex justify-center space-x-1 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-blue-200 rounded-full inline-block"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}