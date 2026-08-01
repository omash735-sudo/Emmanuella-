'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { content } from '@/config/content'
import { useMusic } from './MusicProvider'

type Song = typeof content.music.songs[number];

export default function MusicSection() {
  const [hoveredSong, setHoveredSong] = useState<number | null>(null)
  const {
    songs,
    currentSongIndex,
    currentSong,
    isPlaying,
    selectSong,
  } = useMusic()

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-pink-50/30">
      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-rose-700 mb-3">{content.music.title}</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light tracking-wide">{content.music.subtitle}</p>
        </motion.div>

        {currentSong && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-center">
             <div className="w-64 h-64 rounded-full bg-black shadow-2xl flex items-center justify-center border-[8px] border-[#2a2a2a] relative p-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
                <div className="w-24 h-24 rounded-full bg-[#e0e0e0] flex items-center justify-center text-[10px] text-black font-mono font-bold border border-gray-300 shadow-inner flex-col">
                  <span className="uppercase tracking-wider text-[8px]">Side A</span>
                  <span className="mt-1">33⅓ RPM</span>
                </div>
             </div>
          </motion.div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song: Song, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredSong(index)}
              onHoverEnd={() => setHoveredSong(null)}
            >
              <motion.div
                className="relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer border border-gray-100"
                whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(244 63 94 / 0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectSong(index)}
              >
                 {/* Sticker Effect (White Border around album art) */}
                 <div className="p-2 pb-0">
                    <div className="relative rounded-lg overflow-hidden border-[2px] border-white shadow-sm">
                       <img src={song.thumbnail} alt={song.title} className="w-full h-36 object-cover" />
                       {currentSongIndex === index && (
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white text-3xl">{isPlaying ? '▶' : '⏸'}</span>
                         </div>
                       )}
                    </div>
                 </div>
                 <div className="p-4 text-center">
                    <h3 className="font-medium text-rose-800 text-base">{song.title}</h3>
                    <p className="text-xs text-rose-500">{song.artist}</p>
                 </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
