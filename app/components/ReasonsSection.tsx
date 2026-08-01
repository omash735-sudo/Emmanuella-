'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { content } from '@/config/content'
import { Shuffle } from 'lucide-react'

export default function ReasonsSection() {
  const [flipped, setFlipped] = useState<number | null>(null)
  
  // Shuffle the reasons randomly once per session so it feels alive
  const [shuffledReasons] = useState(() => 
    [...content.reasons.items].sort(() => Math.random() - 0.5)
  )

  const handleShuffle = () => {
    // Reset all cards, then re-shuffle the UI (re-render with key change)
    setFlipped(null);
    window.location.reload(); // Quick refresh to randomize array again
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-pink-50/30 via-white to-rose-50/30">
      {['❤️', '💕', '💗'].map((heart, i) => (
        <motion.div key={`heart-bg-${i}`} className="absolute text-4xl opacity-10 pointer-events-none"
          style={{ left: `${10 + i * 35}%`, top: `${10 + i * 25}%` }}
          animate={{ y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8 + i * 1.5, repeat: Infinity, delay: i * 0.5 }}
        >{heart}</motion.div>
      ))}

      <div className="relative z-10 max-w-4xl w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-rose-700 mb-3">{content.reasons.title}</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light">{content.reasons.subtitle}</p>
        </motion.div>

        {/* Shuffle Button to make it lively */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm text-rose-500 border border-rose-200 rounded-full shadow-sm hover:shadow-md transition-all text-xs"
          >
            <Shuffle size={14} /> Shuffle Reasons
          </button>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {shuffledReasons.map((reason: string, index: number) => {
            const isFlipped = flipped === index
            return (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                className="perspective-500"
                onClick={() => setFlipped(isFlipped ? null : index)}
              >
                <motion.div
                  className="relative h-36 cursor-pointer"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front - Bubblegum Pink with white border */}
                  <div className="absolute inset-0 bg-[#ffb3c6] rounded-2xl p-4 flex items-center justify-center backface-hidden shadow-md border-[3px] border-white">
                    <div className="text-center">
                      <div className="text-4xl mb-1">💕</div>
                      <span className="text-[#590d22] font-bubble text-sm">Tap me!</span>
                    </div>
                  </div>
                  
                  {/* Back - White with pink text */}
                  <div className="absolute inset-0 bg-white rounded-2xl p-4 flex items-center justify-center backface-hidden shadow-md border-[3px] border-[#ffb3c6]"
                    style={{ transform: 'rotateY(180deg)' }}>
                    <div className="text-center">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: isFlipped ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                        <span className="text-rose-700 font-medium text-sm leading-relaxed">{reason}</span>
                        <div className="mt-2 text-2xl">❤️</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
