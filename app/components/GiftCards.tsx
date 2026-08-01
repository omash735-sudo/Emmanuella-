'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { content } from '@/config/content'

// Explicit type for map loops
type GiftItem = typeof content.gifts.items[number];

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
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 via-white to-pink-50/30" />
      
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-2xl text-yellow-300/20 pointer-events-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`
          }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.5, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
        >✨</motion.div>
      ))}

      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light text-rose-700 mb-3">{content.gifts.title}</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light">{content.gifts.subtitle}</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {content.gifts.items.map((gift: GiftItem, index: number) => {
            const isRevealed = revealedGifts.includes(gift.id)
            
            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl p-6 min-h-[200px] flex flex-col items-center justify-center shadow-lg border border-white/40"
                  whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 25px -5px rgb(244 63 94 / 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleGift(gift.id)}
                >
                  <AnimatePresence mode="wait">
                    {!isRevealed ? (
                      <motion.div key="closed" exit={{ opacity: 0, scale: 0.8 }} className="text-center flex flex-col items-center">
                        <div className="text-6xl mb-3">{gift.icon}</div>
                        <h3 className="text-xl font-light text-rose-700 text-center mt-2">{gift.title}</h3>
                        <div className="mt-4 text-rose-400 text-sm animate-pulse">Tap to open ✨</div>
                      </motion.div>
                    ) : (
                      <motion.div key="open" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                        <div className="text-5xl mb-4 animate-bounce">🎉</div>
                        <p className="text-rose-800 font-light text-sm leading-relaxed">{gift.revealContent}</p>
                        <div className="mt-4 text-rose-300 text-xs">{gift.emoji || '❤️'}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
