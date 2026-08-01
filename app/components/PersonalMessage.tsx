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
    }, 30)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="memories" className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-pink-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl w-full glassmorphism rounded-3xl p-8 md:p-12 relative"
      >
        {/* Envelope decoration */}
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💌
        </motion.div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-pink-700">A Letter For You</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-pink-300 to-pink-500 mx-auto mt-3" />
        </div>

        <div className="prose prose-pink max-w-none">
          <p className="text-pink-800 leading-relaxed whitespace-pre-line font-light text-base md:text-lg">
            {displayText}
            {!isComplete && <span className="animate-pulse text-pink-400">|</span>}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          className="mt-8 text-center"
        >
          <div className="inline-block p-3 rounded-full bg-pink-100">
            <span className="text-2xl">❤️</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
