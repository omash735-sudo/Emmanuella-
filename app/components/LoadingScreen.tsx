'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onContinue: () => void
}

export default function LoadingScreen({ onContinue }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#ffe0e8] via-[#ffb3c6] to-[#ff8fa3] overflow-hidden px-4">
      
      {/* 20 MASSIVE FLOATING PINK HEARTS (Scattered everywhere) */}
      {[...Array(20)].map((_, i) => {
        // Generate random positions and sizes for a chaotic, cute feel
        const size = 60 + Math.random() * 140; // Between 60px and 200px
        return (
          <motion.div
            key={i}
            className="absolute text-[#ff4d6d] opacity-30 pointer-events-none select-none"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              fontSize: `${size}px`,
            }}
            animate={{
              y: [0, -(40 + Math.random() * 60), 0],
              x: [0, (Math.random() - 0.5) * 40, 0],
              rotate: [0, 20, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          >
            ♥
          </motion.div>
        )
      })}

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm">
        
        {/* Main Giant Heart (Solid Pink with pulse) */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl md:text-9xl mb-6 text-[#ff4d6d] drop-shadow-xl"
        >
          ♥
        </motion.div>

        {/* MASSIVE BUBBLE GUM TEXT */}
        <h2 className="text-6xl md:text-7xl text-[#590d22] mb-3 tracking-tight font-bubble drop-shadow-lg leading-[1.1]">
          {progress < 100 ? "Loading..." : "Ready for you 💕"}
        </h2>

        {/* Subtitle */}
        <p className="text-[#800f2f] text-sm md:text-base mb-10 font-medium tracking-wider opacity-80">
          {progress < 100 ? "Something special is coming" : "Your gift is waiting"}
        </p>

        {/* Clean White Striped Bar */}
        <div className="w-64 md:w-72 h-2 bg-white/40 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.9)_3px,rgba(255,255,255,0.9)_6px)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p className="text-[#590d22] text-sm mt-3 font-mono tracking-widest opacity-70">
          {progress}%
        </p>

        {/* MASSIVE VIBRANT PINK PILL BUTTON */}
        {progress === 100 && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
            onClick={onContinue}
            className="mt-12 px-12 py-5 bg-gradient-to-r from-[#ff4d6d] to-[#ff1a4f] text-white text-2xl md:text-3xl font-bold rounded-full shadow-2xl shadow-[#ff4d6d]/40 hover:shadow-[#ff4d6d]/60 hover:scale-105 active:scale-95 transition-all duration-200 border-[2px] border-white/20 font-bubble tracking-wide"
          >
            Let's Go 💖
          </motion.button>
        )}
      </div>
    </div>
  )
}
