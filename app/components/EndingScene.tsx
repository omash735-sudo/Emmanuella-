'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'

export default function EndingScene() {
  const messages = content.endingMessage.split('\n\n')

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-pink-100/50 to-rose-100/30" />
      
      {/* Soft Glow Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating Hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ending-heart-${i}`}
          className="absolute text-2xl text-rose-200/20 pointer-events-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl text-center px-4"
      >
        {messages.map((message, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.4 }}
            viewport={{ once: true }}
            className={`text-rose-800 leading-relaxed ${
              index === messages.length - 1 
                ? 'text-3xl md:text-4xl font-light mt-8' 
                : 'text-lg md:text-xl font-light'
            }`}
          >
            {message}
          </motion.p>
        ))}

        <motion.div
          className="mt-12"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-7xl md:text-8xl">❤️</div>
        </motion.div>

        <motion.div
          className="mt-4"
          animate={{
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p className="text-sm text-rose-400 tracking-wider font-light">
            Forever yours
          </p>
        </motion.div>

        {/* Cinematic Sparkle */}
        <motion.div
          className="absolute -top-10 -right-10 text-4xl text-yellow-300/30"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -left-10 text-4xl text-yellow-300/30"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      </motion.div>
    </section>
  )
}
