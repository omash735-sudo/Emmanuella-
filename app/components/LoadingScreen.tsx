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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 via-rose-200 to-pink-100 overflow-hidden">
      {/* Animated background gradient orbs for softness */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-pink-300/30 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-rose-300/30 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating hearts - clean and safe */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-30 text-rose-400"
          style={{ left: `${5 + i * 12}%`, top: `${10 + (i % 5) * 15}%` }}
          animate={{
            y: [0, -80, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Main heart with pulse */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl md:text-8xl mb-6"
        >
          <span className="text-rose-500">♥</span>
        </motion.div>

        {/* Loading / Complete Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-light text-rose-600 mb-2 tracking-wider"
        >
          {progress < 100 ? "Loading..." : "Ready for you 💕"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-sm text-rose-400 mb-8 tracking-widest"
        >
          {progress < 100 ? "Something special is coming" : "Your gift is waiting"}
        </motion.p>

        {/* Elegant White Striped Progress Bar (Stable version) */}
        <div className="w-64 md:w-80 h-2 bg-white/40 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.9)_3px,rgba(255,255,255,0.9)_6px)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="text-xs text-rose-400 mt-3 font-mono tracking-widest"
        >
          {progress}%
        </motion.p>

        {/* Continue button - Pink Pill Shape */}
        {progress === 100 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={onContinue}
            className="mt-10 px-10 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-lg font-medium rounded-full shadow-xl shadow-rose-300/40 hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            Let's Go 💖
          </motion.button>
        )}
      </div>
    </div>
  )
}
