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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-rose-100 via-pink-100 to-rose-50 overflow-hidden px-6">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl md:text-2xl opacity-20 pointer-events-none"
          style={{ left: `${5 + i * 9.5}%`, top: '-8%' }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15)],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + (i % 4),
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {i % 3 === 0 ? '✨' : i % 3 === 1 ? '❤️' : '🌸'}
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        <AnimatePresence mode="wait">
          {phase === 'loading' ? (
            <motion.div
              key="loading"
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div style={{ perspective: 800 }} className="mb-2">
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative"
                >
                  <motion.div
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-[92px] h-[82px]"
                  >
                    <span
                      className="absolute left-[46px] w-[46px] h-[74px] rounded-t-full"
                      style={{
                        background: 'linear-gradient(135deg, #FF8FB3, #FF3D7F)',
                        transform: 'rotate(-45deg)',
                        transformOrigin: '0 100%',
                        boxShadow: '0 0 40px rgba(255,61,127,0.5)',
                      }}
                    />
                    <span
                      className="absolute left-0 w-[46px] h-[74px] rounded-t-full"
                      style={{
                        background: 'linear-gradient(225deg, #FF8FB3, #FF3D7F)',
                        transform: 'rotate(45deg)',
                        transformOrigin: '100% 100%',
                        boxShadow: '0 0 40px rgba(255,61,127,0.5)',
                      }}
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="mx-auto mt-2 w-16 h-3 rounded-full bg-rose-300/40 blur-md"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl font-light text-rose-700 text-center mt-6 leading-relaxed"
              >
                Someone who loves you
                <br />
                made something special...
              </motion.h2>

              <div className="mt-8 w-56 md:w-64">
                <div className="h-1 bg-rose-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-300 via-pink-400 to-rose-400 rounded-full transition-[width] duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-center text-xs text-rose-400 mt-3 tracking-wider font-mono">
                  {progress}%
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-6xl mb-6"
              >
                ❤️
              </motion.div>
              <p className="text-lg md:text-xl font-light text-rose-700 leading-relaxed max-w-xs">
                Thank you for waiting. I hope you enjoy this little gift.
                <br />
                <span className="text-rose-500">With love, your man. ❤️</span>
              </p>

              <motion.button
                onClick={onContinue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="mt-10 flex flex-col items-center gap-2 text-rose-500"
                aria-label="Continue"
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
