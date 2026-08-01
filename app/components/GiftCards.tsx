'use client'

import { motion } from 'framer-motion'
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
    <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-pink-700 mb-3">
            🎁 Your Gifts Are Waiting
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-pink-300 to-pink-500 mx-auto" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {content.gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                className="glassmorphism rounded-3xl p-6 cursor-pointer min-h-[220px] flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleGift(gift.id)}
              >
                {!revealedGifts.includes(gift.id) ? (
                  <>
                    <div className="text-5xl mb-4">{gift.icon}</div>
                    <h3 className="text-xl font-light text-pink-700 text-center">{gift.title}</h3>
                    <div className="mt-4 text-pink-400 text-sm">Tap to open ✨</div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <p className="text-pink-800 font-light text-sm leading-relaxed">
                      {gift.revealContent}
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
