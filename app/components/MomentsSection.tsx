'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'

export default function MomentsSection() {
  return (
    <section id="more" className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-pink-700 mb-3">
            ✨ Moments I Fell In Love With You
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-pink-300 to-pink-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {content.moments.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, rotate: index % 2 === 0 ? -3 : 3, scale: 0.9 }}
              whileInView={{ opacity: 1, rotate: index % 2 === 0 ? -2 : 2, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="relative"
            >
              <div className={`polaroid-shadow bg-white p-2 rounded-lg ${index % 2 === 0 ? 'rotate-slight' : 'rotate-slight-right'}`}>
                <div className="relative overflow-hidden rounded-md aspect-[3/4]">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-pink-700 font-light text-xs">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
