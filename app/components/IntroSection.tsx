'use client'

import { motion } from 'framer-motion'

interface TeddyProps {
  emoji: string
  label: string
  onClick: () => void
  delay: number
}

const Teddy = ({ emoji, label, onClick, delay }: TeddyProps) => (
  <motion.div
    className="flex flex-col items-center cursor-pointer group"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <div className="text-6xl mb-2 group-hover:animate-bounce">
      {emoji}
    </div>
    <div className="text-sm text-pink-600 font-medium group-hover:text-pink-800 transition">
      {label}
    </div>
  </motion.div>
)

export default function IntroSection() {
  const sections = [
    { id: 'memories', emoji: '🐻', label: 'Sweet Memories' },
    { id: 'surprises', emoji: '🐻', label: 'Little Surprises' },
    { id: 'more', emoji: '🐻', label: 'One More Thing...' }
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #FFB7C5 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, #FFB7C5 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, #FFB7C5 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 opacity-20 text-3xl pointer-events-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-light text-pink-700 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕 Happy Girlfriend's Day 💕
        </motion.h1>
        
        <p className="text-lg text-pink-500 font-light mb-12 max-w-md mx-auto">
          This isn't just a card...
          <br />
          It's a tiny adventure made just for you.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {sections.map((section, index) => (
            <Teddy
              key={section.id}
              emoji={section.emoji}
              label={section.label}
              delay={0.3 + index * 0.2}
              onClick={() => scrollToSection(section.id)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-sm text-pink-400 mt-12"
        >
          ✨ Choose your adventure ✨
        </motion.p>
      </motion.div>
    </section>
  )
}
