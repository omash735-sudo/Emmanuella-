'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { content } from '@/config/content'
import { useMusic } from './MusicProvider'

export default function MusicSection() {
  const [hoveredSong, setHoveredSong] = useState<number | null>(null)
  const {
    songs,
    currentSongIndex,
    currentSong,
    isPlaying,
    progress,
    duration,
    togglePlay,
    selectSong,
    seek,
    getCurrentTime,
    formatTime,
  } = useMusic()

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    seek(percentage)
  }

  return (
    <section id="surprises" className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 via-white to-pink-50/30" />

      {['🎵', '🎶', '🎵', '🎶', '🎵', '🎶'].map((note, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-4xl md:text-5xl opacity-10 pointer-events-none"
          style={{ left: `${5 + i * 18}%`, top: `${5 + (i % 3) * 30}%` }}
          animate={{ y: [0, -60, 0], rotate: [0, 15, -15, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 7 + i * 1.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        >
          {note}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-rose-700 mb-3">
            {content.music.title}
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light tracking-wide">
            {content.music.subtitle}
          </p>
        </motion.div>

        <AnimatePresence>
          {currentSong && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-5 glassmorphism rounded-2xl shadow-xl shadow-rose-200/20 border border-white/50"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={currentSong.thumbnail}
                    alt={currentSong.title}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-md"
                    loading="lazy"
                  />
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-white text-2xl">▶</span>
                    </motion.div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-base md:text-lg font-medium text-rose-800 truncate">
                      {currentSong.title}
                    </p>
                    {currentSong.isSpecial && <span className="text-rose-400 text-sm">❤️</span>}
                  </div>
                  <p className="text-sm text-rose-500 truncate">{currentSong.artist}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-rose-400 font-mono">{formatTime(getCurrentTime())}</span>
                    <div
                      className="flex-1 h-1.5 bg-rose-200 rounded-full cursor-pointer relative group"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `calc(${progress}% - 6px)` }}
                      />
                    </div>
                    <span className="text-xs text-rose-400 font-mono">{formatTime(duration)}</span>
                  </div>
                </div>
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              viewport={{ once: true }}
              className="relative"
              onHoverStart={() => setHoveredSong(index)}
              onHoverEnd={() => setHoveredSong(null)}
            >
              <motion.div
                className={`glassmorphism rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 ${
                  currentSongIndex === index
                    ? 'border-2 border-rose-400/50 shadow-rose-200/40'
                    : 'border border-white/50 hover:shadow-rose-200/30'
                }`}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectSong(index)}
              >
                <div className="relative">
                  <img src={song.thumbnail} alt={song.title} className="w-full h-48 object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <motion.div
                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0"
                    animate={{
                      opacity: hoveredSong === index || currentSongIndex === index ? 1 : 0,
                      backgroundColor: currentSongIndex === index && isPlaying ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-full bg-white/90 text-rose-500 flex items-center justify-center text-2xl shadow-xl"
                      animate={{ scale: hoveredSong === index ? 1.1 : 1 }}
                    >
                      {currentSongIndex === index && isPlaying ? '⏸' : '▶'}
                    </motion.div>
                  </motion.div>
                  {song.isSpecial && (
                    <motion.div
                      className="absolute top-3 right-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {song.specialBadge}
                    </motion.div>
                  )}
                  {currentSongIndex === index && isPlaying && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      {[...Array(3)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="w-1 h-3 bg-white rounded-full"
                          animate={{ height: [3, 8 + i * 4, 3] }}
                          transition={{ duration: 0.6 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-rose-800 text-lg truncate">{song.title}</h3>
                  <p className="text-sm text-rose-500 truncate">{song.artist}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-rose-300">{song.duration || '⏱'}</span>
                    {currentSongIndex === index && (
                      <span className="text-xs text-rose-400">{isPlaying ? '▶ Playing' : '⏸ Paused'}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
