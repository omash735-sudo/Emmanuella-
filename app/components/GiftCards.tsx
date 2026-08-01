'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { content } from '@/config/content'

export default function GiftCards() {
  const [revealedGifts, setRevealedGifts] = useState<string[]>([])

  const toggleGift = (id: string) => {
    setRevealedGifts(prev =>
      prev.includes(id)
        ? prev.filter(g => g !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 via-white to-pink-50/30" />
      
      {/* Floating Sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-2xl text-yellow-300/20 pointer-events-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        >
          ✨
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
            🎁 Your Gifts Are Waiting
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light">Tap to unwrap each surprise</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {content.gifts.map((gift, index) => {
            const isRevealed = revealedGifts.includes(gift.id)
            
            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 80 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  className="relative cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleGift(gift.id)}
                  animate={{
                    y: isRevealed ? 0 : [0, -6, 0],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: isRevealed ? 0 : Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                >
                  <div className={`glassmorphism rounded-2xl p-6 min-h-[200px] flex flex-col items-center justify-center transition-all duration-500 shadow-xl ${
                    isRevealed 
                      ? 'shadow-rose-200/50 border-rose-200/50' 
                      : 'shadow-rose-200/20 border-white/50'
                  }`}>
                    {!isRevealed ? (
                      <>
                        {/* Gift Box Animation */}
                        <motion.div
                          className="relative"
                          animate={{
                            rotate: [0, -5, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3 + index,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="text-6xl mb-3">{gift.icon}</div>
                          <motion.div
                            className="absolute -top-2 -right-2 text-2xl"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: index * 0.3
                            }}
                          >
                            ✨
                          </motion.div>
                        </motion.div>
                        <h3 className="text-xl font-light text-rose-700 text-center mt-2">
                          {gift.title}
                        </h3>
                        <motion.div
                          className="mt-4 text-rose-400 text-sm"
                          animate={{
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          Tap to open ✨
                        </motion.div>
                      </>
                    ) : (
                      <motion.div
