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

        {/* Staggered Grid for "Liveliness" */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } } // Cascading effect
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {content.moments.photos.map((photo: Photo, index: number) => {
            const rotation = (index - 1) * 3 - 3; 
            return (
              <motion.div
                key={photo.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, rotate: rotation * 2, y: 20 },
                  visible: { opacity: 1, scale: 1, rotate: rotation, y: 0 }
                }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, rotate: 0, y: -8 }}
                className="relative flex flex-col items-center w-full"
              >
                {/* Pink Clothespin */}
                <div className="absolute -top-5 z-10 w-5 h-9 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-xl shadow-sm rotate-6 flex flex-col items-center justify-center border-[1px] border-pink-400/40">
                   <div className="w-2.5 h-2.5 rounded-full bg-white/50 mb-1 border border-pink-300" />
                   <div className="w-3.5 h-0.5 bg-pink-500/30 rounded-full" />
                </div>

                {/* Polaroid Card */}
                <motion.div 
                  className="bg-white rounded-sm shadow-xl p-2 pb-4 relative w-full aspect-[3/4] flex flex-col"
                  style={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                >
                  <div className="relative overflow-hidden rounded-sm flex-1 bg-rose-50 w-full">
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-2 text-center px-1 flex flex-col justify-end">
                    <p className="text-rose-700 font-semibold text-[10px] tracking-wide uppercase truncate">{photo.caption}</p>
                    <p className="text-rose-400 text-[8px] mt-0.5 truncate">{photo.location}</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
