'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface LoadingScreenProps {
  onContinue: () => void
}

export default function LoadingScreen({ onContinue }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'complete'>('loading')
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const TOTAL_MS = 2800

    const tick = (now: number) => {
      if (startTime.current === null) startTime.current = now
      const elapsed = now - startTime.current
      const t = Math.min(elapsed / TOTAL_MS, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))

      if (t < 1) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        setPhase('complete')
      }
    }

    rafId.current = requestAnimationFrame(tick)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fde3e8] overflow-hidden px-6">
      {/* WATERCOLOR HEART BACKGROUND (Matching your first image) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl mix-blend-multiply"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              background: i % 2 === 0 ? '#fda4af' : '#f43f5e',
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Hand-drawn heart silhouettes overlay */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute text-[250px] text-rose-300/30 select-none"
            style={{
              left: `${15 + i * 25}%`,
              top: `${10 + i * 20}%`,
              transform: `rotate(${20 - i * 15}deg)`,
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        <AnimatePresence mode="wait">
          {phase === 'loading' ? (
            <motion.div
              key="loading"
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              {/* SKETCHED HEART (White scribble style from image) */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-28 h-24 md:w-32 md:h-28 mb-8"
              >
                <svg viewBox="0 0 100 85" className="w-full h-full fill-none stroke-white stroke-[2.5]">
                  <motion.path
                    d="M50,15 C50,15 25,-5 10,15 C-5,35 15,55 25,65 C35,75 45,80 50,85 C55,80 65,75 75,65 C85,55 105,35 90,15 C75,-5 50,15 50,15 Z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="opacity-80"
                  />
                  {/* Scribble lines inside heart */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 0.5 }}
                  >
                    <line x1="25" y1="30" x2="75" y2="60" />
                    <line x1="40" y1="25" x2="60" y2="70" />
                    <line x1="55" y1="20" x2="45" y2="75" />
                    <line x1="70" y1="30" x2="30" y2="65" />
                    <line x1="30" y1="50" x2="70" y2="40" />
                  </motion.g>
                </svg>
              </motion.div>

              {/* STRIPED PROGRESS BAR (Matching reference) */}
              <div className="w-56 md:w-64 relative h-6 rounded-full border-2 border-white bg-transparent overflow-hidden flex items-center">
                <div
                  className="h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.8)_4px,rgba(255,255,255,0.8)_8px)] transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-sm mt-3 font-light tracking-wide text-center"
              >
                loading
                <br />
                <span className="text-lg font-medium">{progress}%</span>
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              {/* 3D LOVE YOU heart (from second image) - simulated with CSS */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-40 h-36 mb-8 flex items-center justify-center"
                style={{ perspective: 800 }}
              >
                <div className="absolute inset-0 bg-[#a1133b] rounded-t-full w-[48%] h-[50%] left-0 top-[15%] -rotate-45 origin-bottom-right" />
                <div className="absolute inset-0 bg-[#a1133b] rounded-t-full w-[48%] h-[50%] right-0 top-[15%] rotate-45 origin-bottom-left" />
                <div className="absolute inset-0 bg-[#a1133b] w-full h-[52%] bottom-0 rounded-b-full" />
                <div className="relative z-10 text-[#a1133b] font-bold text-5xl leading-tight flex flex-col items-center mix-blend-screen text-white">
                  <span>LOVE</span>
                  <span>YOU</span>
                </div>
              </motion.div>

              <p className="text-lg md:text-xl font-light text-rose-800 leading-relaxed max-w-xs">
                Thank you for waiting. I hope you enjoy this little gift.
                <br />
                <span className="text-rose-600">With love, your man. ❤️</span>
              </p>

              <motion.button
                onClick={onContinue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="mt-10 flex flex-col items-center gap-2 text-rose-600"
              >
                <span className="text-xs tracking-widest uppercase text-rose-400">
                  Tap to continue
                </span>
                <motion.span
                  className="text-3xl"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ↓
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
