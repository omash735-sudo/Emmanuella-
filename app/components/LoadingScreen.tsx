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
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    size: 10 + Math.random() * 20
  }))

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-pink-100">
        <div className="text-6xl mb-8">🧸</div>
        <div className="text-center">
          <h2 className="text-2xl font-light text-pink-700 mb-4">
            Someone who loves you made something special...
          </h2>
          <div className="w-64 h-1 bg-pink-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-pink-400 to-pink-600 w-0" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 to-pink-100">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400 opacity-30"
          style={{ left: `${heart.left}%`, fontSize: heart.size }}
          animate={{
            y: [-20, -(typeof window !== 'undefined' ? window.innerHeight : 800)],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Teddy Bear */}
      <motion.div
        className="text-6xl mb-8"
        animate={{
          y: [0, -30, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🧸
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-light text-pink-700 mb-4">
          Someone who loves you made something special...
        </h2>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-pink-200 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <p className="text-sm text-pink-400 mt-2">
          {Math.min(progress, 100)}%
        </p>
      </motion.div>

      {/* Sparkles */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-2xl"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5
        }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 text-2xl"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.5
        }}
      >
        ✨
      </motion.div>
    </div>
  )
}
