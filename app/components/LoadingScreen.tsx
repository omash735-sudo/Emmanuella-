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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#ffdce5] via-[#ffb3c6] to-[#ff8fa3] overflow-hidden px-6">
      
      {/* Floating Pink Hearts Background - Mobile optimized */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-5xl text-[#ffb3c6] opacity-30 pointer-events-none"
          style={{ 
            left: `${5 + Math.random() * 90}%`, 
            top: `${10 + (i % 7) * 12}%` 
          }}
          animate={{
            y: [0, -60, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm">
        
        {/* Main Heart (Soft Pink) */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl md:text-8xl mb-6 text-[#ff4d6d] drop-shadow-sm"
        >
          ♥
        </motion.div>

        {/* BUBBLE GUM TEXT Loading... */}
        <h2 className="text-4xl md:text-5xl text-[#590d22] mb-2 tracking-wide font-bubble drop-shadow-sm">
          {progress < 100 ? "Loading..." : "Ready for you 💕"}
        </h2>

        {/* Subtitle */}
        <p className="text-[#800f2f] text-sm mb-10 font-medium tracking-wider opacity-80">
          {progress < 100 ? "Something special is coming" : "Your gift is waiting"}
        </p>

        {/* Clean White Striped Bar */}
        <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.9)_3px,rgba(255,255,255,0.9)_6px)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p className="text-[#590d22] text-sm mt-3 font-mono tracking-widest opacity-60">
          {progress}%
        </p>

        {/* PINK BUTTON (Centered, Pill Shape, Pink Words) */}
        {progress === 100 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={onContinue}
            className="mt-12 px-12 py-4 bg-white/80 backdrop-blur-sm text-[#ff4d6d] text-xl font-bold rounded-full shadow-xl shadow-[#ff4d6d]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-white/50"
          >
            Let's Go
          </motion.button>
        )}
      </div>
    </div>
  )
}
