'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface TeddyProps {
  emoji: string
  label: string
  onClick: () => void
  delay: number
  color: string
}

const Teddy = ({ emoji, label, onClick, delay, color }: TeddyProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      initial={{ y: 50, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.08, y: -8 }}
      whileTap={{ scale: 0.92 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="relative text-7xl md:text-8xl"
        animate={{
          y: isHovered ? -12 : 0,
          rotate: isHovered ? [0, -8, 8, -8, 0] : 0
        }}
        transition={{ duration: 0.5 }}
      >
        {emoji}
        {/* Floating Heart on Hover */}
        <motion.div
          className="absolute -top-4 -right-2 text-2xl"
          animate={{
            scale: isHovered ? [1, 1.4, 1] : 0,
            opacity: isHovered ? 1 : 0,
            y: isHovered ? [-10, -20] : 0
          }}
          transition={{ duration: 0.6 }}
        >
          ❤️
        </motion.div>
      </motion.div>
      <motion.div
        className={`mt-3 text-sm font-medium px-4 py-1.5 rounded-full transition-all ${isHovered ? 'text-rose-600 bg-rose-50' : 'text-rose-400'}`}
        animate={{
          backgroundColor: isHovered ? '#FFF1F2' : 'transparent'
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  )
}

export default function IntroSection() {
  const sections = [
    { id: 'memories', emoji: '🐻', label: 'Sweet Memories', color: 'rose' },
    { id: 'surprises', emoji: '🐻', label: 'Little Surprises', color: 'pink' },
    { id: 'more', emoji: '🐻', label: 'One More Thing...', color: 'rose' }
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-pink-50 to-white" />
      
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Hearts Background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl text-rose-200/30 pointer-events-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-light text-rose-700 mb-3"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          💕 Happy Girlfriend's Day 💕
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <p className="text-lg text-rose-500 font-light leading-relaxed">
            This isn't just a card...
            <br />
            <span className="text-rose-400">It's a tiny adventure made just for you.</span>
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center">
          {sections.map((section, index) => (
            <Teddy
              key={section.id}
              emoji={section.emoji}
              label={section.label}
              delay={0.4 + index * 0.25}
              color={section.color}
              onClick={() => scrollToSection(section.id)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-xs text-rose-300 mt-12 tracking-widest uppercase"
        >
          ✨ Choose your adventure ✨
        </motion.p>
      </motion.div>
    </section>
  )
}
