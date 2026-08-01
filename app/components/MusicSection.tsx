'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { content } from '@/config/content'

interface MusicSectionProps {
  onMusicStart: () => void
}

export default function MusicSection({ onMusicStart }: MusicSectionProps) {
  const [musicStarted, setMusicStarted] = useState(false)

  return (
    <section id="surprises" className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 via-white to-rose-50/30" />
      
      {/* Floating Music Notes */}
      {['🎵', '🎶', '🎵', '🎶', '🎵'].map((note, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-3xl opacity-10 pointer-events-none"
          style={{
            left: `${10 + i * 20}%`,
            top: `${10 + i * 15}%`
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + i * 1.2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        >
          {note}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-light text-rose-700 mb-3">
            🎵 Soundtrack To This Little Adventure
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light">A playlist made just for you</p>
        </motion.div>

        {!musicStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              className="relative group px-10 py-5 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full text-lg font-medium shadow-2xl shadow-rose-200/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMusicStarted(true)
                onMusicStart()
              }}
            >
              <span className="relative z-10">🎵 Play the soundtrack</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            <p className="text-xs text-rose-300 mt-4 tracking-wider">
              Click to let the music accompany your journey ❤️
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.music.songs.map((song, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`group relative ${song.isSpecial ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <motion.div
                  className={`glassmorphism rounded-2xl overflow-hidden shadow-xl shadow-rose-200/20 border ${song.isSpecial ? 'border-rose-300/50' : 'border-white/50'}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <img
                      src={song.thumbnail}
                      alt={song.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {song.isSpecial && (
                      <motion.div
                        className="absolute top-3 right-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {song.specialBadge}
                      </motion.div>
                    )}
                    <motion.div
                      className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      🎵
                    </motion.div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-rose-800 text-lg">{song.title}</h3>
                    <p className="text-sm text-rose-500">{song.artist}</p>
                    <a
                      href={song.youtubeUrl.replace('embed', 'watch')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-700 rounded-full text-sm hover:bg-rose-100 transition-all group-hover:shadow-md"
                    >
                      <span>▶️</span> Play on YouTube
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
