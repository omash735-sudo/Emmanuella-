'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1.5
      })
    }, 25)

    return () => clearInterval(timer)
  }, [])

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-rose-100 via-pink-100 to-rose-50">
        <div className="text-7xl mb-8">🧸</div>
      </div>
    )
  }

  // Floating elements
  const floatingElements = [
    { icon: '❤️', size: 'text-3xl', left: '5%', delay: 0, duration: 4 },
    { icon: '✨', size: 'text-2xl', left: '15%', delay: 0.5, duration: 3.5 },
    { icon: '💕', size: 'text-4xl', left: '25%', delay: 1, duration: 5 },
    { icon: '🌸', size: 'text-3xl', left: '40%', delay: 0.3, duration: 4.5 },
    { icon: '✨', size: 'text-2xl', left: '55%', delay: 0.8, duration: 3.8 },
    { icon: '❤️', size: 'text-3xl', left: '70%', delay: 0.2, duration: 4.2 },
    { icon: '💗', size: 'text-4xl', left: '82%', delay: 0.6, duration: 5.5 },
    { icon: '✨', size: 'text-2xl', left: '92%', delay: 0.9, duration: 3.2 },
  ]

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-rose-100 via-pink-100 to-rose-50 overflow-hidden">
      {/* Floating Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.size} opacity-30`}
          style={{ left: el.left, top: '-10%' }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 60],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: el.duration + Math.random() * 2,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 via-transparent to-transparent pointer-events-none" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Teddy Bear with Heart */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -20, 0],
            rotate: [-3, 3, -3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-8xl md:text-9xl">🧸</div>
          <motion.div
            className="absolute -top-2 -right-2 text-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 px-6"
        >
          <h2 className="text-xl md:text-2xl font-light text-rose-700 leading-relaxed max-w-sm">
            Someone who loves you
            <br />
            made something special...
          </h2>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 w-64 md:w-80"
        >
          <div className="h-1 bg-rose-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center text-xs text-rose-400 mt-3 tracking-wider">
            {Math.min(progress, 100)}%
          </p>
        </motion.div>

        {/* Sparkle Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-2xl text-rose-300/30"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 80}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
