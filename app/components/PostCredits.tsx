'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'

type CreditItem = typeof content.credits.items[number];

export default function PostCredits() {
  const credits = content.credits.items

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-rose-100/30 via-pink-50 to-white">
      <motion.div className="text-6xl mb-10" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>🎬</motion.div>

      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 max-w-md w-full text-center">
        {credits.map((credit: CreditItem, index: number) => (
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} viewport={{ once: true }} className="mb-6">
            {credit.label && <p className="text-xs text-rose-400 uppercase tracking-widest font-light">{credit.label}</p>}
            <p className={`text-lg md:text-xl text-rose-700 font-light mt-1 ${credit.isItalic ? 'text-rose-400 text-sm italic' : ''}`}>{credit.value}</p>
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 }} viewport={{ once: true }} className="mt-12">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-6" />
          <motion.p className="text-3xl md:text-4xl text-rose-600 font-light" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }}>{content.credits.title}</motion.p>
          <motion.div className="mt-6 text-4xl" animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }}>✨</motion.div>
          <p className="text-xs text-rose-300 mt-4 tracking-widest font-light">{content.credits.footer}</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
