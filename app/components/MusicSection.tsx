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
    <section id="surprises" className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-pink-700 mb-3">
            🎵 Soundtrack To This Little Adventure ❤️
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-pink-300 to-pink-500 mx-auto" />
        </motion.div>

        {!musicStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => {
                setMusicStarted(true)
                onMusicStart()
              }}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              🎵 Play the soundtrack ❤️
            </button>
            <p className="text-sm text-pink-400 mt-4">
              (Click to let the music accompany your journey)
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.music.songs.map((song, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`glassmorphism rounded-2xl overflow-hidden ${song.isSpecial ? 'border-2 border-pink-400' : ''
                  }`}
              >
                <div className="relative">
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  {song.isSpecial && (
                    <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                      {song.specialBadge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-pink-800">{song.title}</h3>
                  <p className="text-sm text-pink-500">{song.artist}</p>
                  <a
                    href={song.youtubeUrl.replace('embed', 'watch')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm hover:bg-pink-200 transition"
                  >
                    ▶️ Play on YouTube
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
