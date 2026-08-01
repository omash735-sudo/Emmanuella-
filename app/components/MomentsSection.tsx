'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'

export default function MomentsSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/20 to-pink-50/40" />
      
      {/* Floating Hearts Background */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`bg-heart-${i}`}
          className="absolute text-3xl text-rose-200/20 pointer-events-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 7 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="relative z-10 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light text-rose-700 mb-3">
            ✨ Moments I Fell In Love With You
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light">A collection of my favorite memories</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {content.moments.photos.map((photo, index) => {
            const rotation = index % 3 === 0 ? -3 : index % 3 === 1 ? 2 : -1
            const offset = index % 2 === 0 ? 5 : -5
            
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, rotate: rotation * 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="relative"
              >
                <motion.div 
                  className="bg-white rounded-xl shadow-xl shadow-rose-200/30 p-2.5"
                  animate={{
                    y: [0, offset, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-rose-50">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                  </div>
                  <div className="mt-2.5 text-center">
                    <p className="text-rose-700 font-light text-xs tracking-wide">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
