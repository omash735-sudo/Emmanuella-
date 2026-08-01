'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { content } from '@/config/content'

export default function ReasonsSection() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-pink-700 mb-3">
            💕 Reasons I Love You
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-pink-300 to-pink-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="perspective-500"
              onClick={() => setFlipped(flipped === index ? null : index)}
            >
              <motion.div
                className="relative h-32 cursor-pointer"
                animate={{ rotateY: flipped === index ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 glassmorphism rounded-2xl p-4 flex items-center justify-center backface-hidden">
                  <span className="text-pink-700 font-light text-center text-sm">
                    {reason}
                  </span>
                </div>
                <div
                  className="absolute inset-0 glassmorphism rounded-2xl p-4 flex items-center justify-center backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <span className="text-3xl">❤️</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
