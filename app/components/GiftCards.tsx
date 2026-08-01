'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { content } from '@/config/content'
import { Gift, Sparkles } from 'lucide-react'

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

  // 🎲 "Surprise Me" Function - Makes it lively!
  const handleSurpriseMe = () => {
    const availableGifts = content.gifts.items.filter(g => !revealedGifts.includes(g.id));
    if (availableGifts.length === 0) {
      // If all are revealed, reset them all to start over
      setRevealedGifts([]);
      return;
    }
    const randomGift = availableGifts[Math.floor(Math.random() * availableGifts.length)];
    toggleGift(randomGift.id);
  }

  // Random tilt angles for the Polaroid look
  const getTilt = (index: number) => {
    const tilts = [-3, 2, -4, 3, -2, 4];
    return tilts[index % tilts.length];
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-[#faf5f5]">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 via-white to-pink-50/30" />
      
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-2xl text-yellow-300/20 pointer-events-none"
          style={{ left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%` }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.5, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
        >✨</motion.div>
      ))}

      <div className="relative z-10 max-w-5xl w-full">
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

        {/* 🎲 SURPRISE ME BUTTON - Makes it interactive */}
        <div className="flex justify-center mb-10">
          <motion.button
            onClick={handleSurpriseMe}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/60 backdrop-blur-md text-[#ff4d6d] border border-[#ff4d6d]/30 rounded-full shadow-lg flex items-center gap-2 font-medium transition-all hover:bg-white hover:shadow-xl"
          >
            <Sparkles size={18} />
            Surprise Me!
          </motion.button>
        </div>

        {/* POLAROID GRID - Mimicking the ProductCard structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {content.gifts.items.map((gift: GiftItem, index: number) => {
            const isRevealed = revealedGifts.includes(gift.id)
            const tilt = getTilt(index);
            
            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative perspective-800"
                style={{ transform: `rotate(${tilt}deg)` }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0, 
                  transition: { duration: 0.2 } 
                }}
              >
                {/* The Polaroid Card */}
                <div 
                  className="relative bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer border border-gray-100 pb-4 transition-shadow hover:shadow-2xl"
                  onClick={() => toggleGift(gift.id)}
                >
                  {/* Top Section: The Image / Icon Area */}
                  <div className="relative h-48 sm:h-56 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    {/* Status Badge (Closed/Open) */}
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold z-10 shadow-md flex items-center gap-1 ${isRevealed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {isRevealed ? <Sparkles size={12} /> : <Gift size={12} />}
                      {isRevealed ? 'Opened!' : 'Unopened'}
                    </div>

                    {/* Center Icon */}
                    {!isRevealed ? (
                      <motion.div 
                        className="text-7xl drop-shadow-md"
                        animate={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {gift.icon}
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="text-7xl"
                      >
                        🎉
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom Section: Text Info */}
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-rose-800 text-lg mb-1">
                      {gift.title}
                    </h3>
                    
                    <div className="mt-2 flex items-center justify-center gap-1 text-xs text-rose-400">
                      {isRevealed ? '❤️ Tap to close' : '👆 Tap to unwrap'}
                    </div>

                    {/* Revealed Content (Only shows if opened) */}
                    <AnimatePresence>
                      {isRevealed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="mt-4 pt-4 border-t border-gray-100"
                        >
                          <p className="text-rose-700 font-light text-sm leading-relaxed">
                            {gift.revealContent}
                          </p>
                          <div className="mt-3 text-2xl">
                            {gift.emoji || '❤️'}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
