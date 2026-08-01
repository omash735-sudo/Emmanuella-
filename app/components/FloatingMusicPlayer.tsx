'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { content } from '@/config/content'

export default function FloatingMusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSong, setCurrentSong] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Keyboard shortcut: Space to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && isOpen) {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isPlaying])

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-2xl flex items-center justify-center text-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {isOpen ? '✕' : '🎵'}
      </motion.button>

      {/* Music Player Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-2rem)] glassmorphism rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-pink-700 font-light text-sm">🎵 Soundtrack</h3>
              <span className="text-xs text-pink-400">
                {isPlaying ? '▶ Playing' : '⏸ Paused'}
              </span>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {content.music.songs.map((song, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${currentSong === index
                      ? 'bg-pink-100 border border-pink-300'
                      : 'hover:bg-pink-50'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentSong(index)
                    setIsPlaying(true)
                  }}
                >
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-pink-800 truncate">
                      {song.title}
                    </p>
                    <p className="text-xs text-pink-500 truncate">
                      {song.artist}
                    </p>
                  </div>
                  {currentSong === index && isPlaying && (
                    <motion.div
                      className="text-pink-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ▶
                    </motion.div>
                  )}
                  {song.isSpecial && (
                    <span className="text-xs text-pink-400">❤️</span>
                  )}
                </motion.div>
              ))}
            </div>

            {currentSong !== null && (
              <div className="mt-4 pt-4 border-t border-pink-100">
                <div className="flex items-center justify-between gap-4">
                  <button
                    className="flex-1 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm hover:bg-pink-200 transition"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                  </button>
                  <a
                    href={content.music.songs[currentSong].youtubeUrl.replace('embed', 'watch')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 transition text-center"
                  >
                    Open YouTube
                  </a>
                </div>
              </div>
            )}

            <div className="mt-3 text-center">
              <p className="text-xs text-pink-300">
                Spacebar to toggle play
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube iframe (hidden, plays audio) */}
      {currentSong !== null && (
        <iframe
          src={`${content.music.songs[currentSong].youtubeUrl}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${content.music.songs[currentSong].youtubeUrl.split('/').pop()}`}
          className="hidden"
          allow="autoplay; encrypted-media"
          title="Music player"
        />
      )}
    </>
  )
}
