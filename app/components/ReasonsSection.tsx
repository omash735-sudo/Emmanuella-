'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { content } from '@/config/content'

export default function ReasonsSection() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-white to-rose-50/30" />
      
      {/* Floating Hearts */}
      {['❤️', '💕', '💗', '❤️', '💕'].map((heart, i) => (
        <motion.div
          key={`heart-bg-${i}`}
          className="absolute text-4xl opacity-10 pointer-events-none"
          style={{
            left: `${10 + i * 20}%`,
            top: `${10 + i * 15}%`
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          {heart}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light text-rose-700 mb-3">
            💕 Reasons I Love You
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light">Tap each card to see the reason</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.reasons.map((reason, index) => {
            const isFlipped = flipped === index
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="perspective-500"
                onClick={() => setFlipped(isFlipped ? null : index)}
              >
                <motion.div
                  className="relative h-36 cursor-pointer"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div className="absolute inset-0 glassmorphism rounded-xl p-4 flex items-center justify-center backface-hidden shadow-lg shadow-rose-200/20 border border-white/50">
                    <div className="text-center">
                      <div className="text-3xl mb-2">💕</div>
                      <span className="text-rose-700 font-light text-sm">Tap to reveal</span>
                    </div>
                  </div>
                  
                  {/* Back */}
                  <div
                    className="absolute inset-0 glassmorphism rounded-xl p-4 flex items-center justify-center backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isFlipped ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <span className="text-rose-700 font-medium text-sm leading-relaxed">
                          {reason}
                        </span>
                        <div className="mt-2 text-2xl">❤️</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
