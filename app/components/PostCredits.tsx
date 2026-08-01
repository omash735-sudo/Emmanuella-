'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'

export default function PostCredits() {
  const credits = [
    { label: 'Directed by', value: content.credits.directedBy },
    { label: '', value: content.credits.createdWith },
    { label: 'Produced for', value: content.credits.producedFor },
    { label: 'Special thanks', value: content.credits.specialThanks },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-100/30 via-pink-50 to-white" />
      
      {/* Floating Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`credit-sparkle-${i}`}
          className="absolute text-3xl text-yellow-300/20 pointer-events-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 60 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-md w-full text-center"
      >
        {/* Film Reel Decoration */}
        <motion.div
          className="text-5xl mb-8"
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🎬
        </motion.div>

        {credits.map((credit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            {credit.label && (
              <p className="text-xs text-rose-400 uppercase tracking-widest font-light">
                {credit.label}
              </p>
            )}
            <p className={`text-lg md:text-xl text-rose-700 font-light mt-1 ${
              credit.label === '' ? 'text-rose-400 text-sm italic' : ''
            }`}>
              {credit.value}
            </p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-6" />
          
          <motion.p
            className="text-3xl md:text-4xl text-rose-600 font-light"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ❤️ The End ❤️
          </motion.p>
          
          <motion.div
            className="mt-6 text-4xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ✨
          </motion.div>
          
          <p className="text-xs text-rose-300 mt-4 tracking-widest font-light">
            Made with love • 2025
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
