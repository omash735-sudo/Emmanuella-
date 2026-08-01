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
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-pink-100 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-md w-full text-center"
      >
        {credits.map((credit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.3 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            {credit.label && (
              <p className="text-sm text-pink-400 uppercase tracking-wider">{credit.label}</p>
            )}
            <p className="text-xl text-pink-700 font-light">{credit.value}</p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-6" />
          <p className="text-2xl text-pink-600 font-light">❤️ The End ❤️</p>
          <motion.div
            className="mt-4 text-4xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
