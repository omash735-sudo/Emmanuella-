'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'

type Photo = typeof content.moments.photos[number];

export default function MomentsSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-white via-rose-50/20 to-pink-50/40">
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light text-rose-700 mb-3">{content.moments.title}</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light">{content.moments.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {content.moments.photos.map((photo: Photo, index: number) => {
            const rotation = (index - 1) * 4 - 4; 
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9, rotate: rotation * 1.5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 0, y: -8 }}
                className="relative flex flex-col items-center"
              >
                {/* Pink Clothespin (Styled to look like reference) */}
                <div className="absolute -top-6 z-10 w-6 h-10 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-xl shadow-sm rotate-6 flex flex-col items-center justify-center border-[1px] border-pink-400/40">
                   <div className="w-3 h-3 rounded-full bg-white/50 mb-1 border border-pink-300" />
                   <div className="w-4 h-1 bg-pink-500/30 rounded-full" />
                </div>

                <motion.div 
                  className="bg-white rounded-sm shadow-xl p-2 pb-6 relative"
                  style={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                >
                  <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-rose-50 w-full max-w-[150px]">
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-2 text-center px-1">
                    <p className="text-rose-700 font-medium text-[10px] tracking-wide uppercase">{photo.caption}</p>
                    <p className="text-rose-400 text-[8px] mt-1">{photo.location}</p>
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
