'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { content } from '@/config/content'

export default function PersonalMessage() {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const fullText = content.personalMessage

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, 25)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="memories" className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-pink-50/50" />
      
      {/* Floating Envelopes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`envelope-${i}`}
          className="absolute text-6xl opacity-10 pointer-events-none"
          style={{
            left: `${10 + i * 25}%`,
            top: `${10 + i * 20}%`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          ✉️
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Letter Card with 3D effect */}
        <motion.div
          className="relative"
          whileHover={{ rotateY: -2, rotateX: 2 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glassmorphism rounded-3xl p-8 md:p-12 shadow-2xl shadow-rose-200/30 border border-white/50">
            {/* Wax Seal */}
            <motion.div
              className="absolute -top-5 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg flex items-center justify-center">
                <span className="text-white text-sm">❤️</span>
              </div>
            </motion.div>

            <div className="text-center mb-8 pt-4">
              <h2 className="text-2xl md:text-3xl font-light text-rose-700">A Letter For You</h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mt-3" />
            </div>

            <div className="prose prose-rose max-w-none">
              <p className="text-rose-800 leading-relaxed whitespace-pre-line font-light text-base md:text-lg tracking-wide">
                {displayText}
                {!isComplete && (
                  <span className="inline-block w-0.5 h-5 bg-rose-400 animate-pulse ml-0.5 align-middle" />
                )}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isComplete ? 1 : 0, scale: isComplete ? 1 : 0.8 }}
              className="mt-8 text-center"
            >
              <motion.div
                className="inline-block p-3 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 shadow-inner"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-3xl">💕</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
