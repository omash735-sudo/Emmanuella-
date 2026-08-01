'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'

export default function EndingScene() {
  const messages = content.endingMessage.split('\n\n')

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-pink-50 to-pink-100">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="max-w-2xl text-center"
      >
        {messages.map((message, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.5 }}
            viewport={{ once: true }}
            className={`text-pink-800 leading-relaxed ${index === messages.length - 1 ? 'text-3xl font-light mt-8' : 'text-lg font-light'
              }`}
          >
            {message}
          </motion.p>
        ))}

        <motion.div
          className="mt-12 text-6xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ❤️
        </motion.div>

        <motion.div
          className="mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-sm text-pink-400">Forever yours</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
