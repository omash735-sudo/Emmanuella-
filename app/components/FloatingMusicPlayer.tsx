'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useMusic } from './MusicProvider'

export default function FloatingMusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    songs,
    currentSongIndex,
    currentSong,
    isPlaying,
    progress,
    duration,
    playerReady,
    selectSong,
    togglePlay,
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
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-2xl shadow-rose-200/50 flex items-center justify-center text-2xl"
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Music player"
      >
        {isOpen ? '✕' : '🎵'}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex items-end gap-[2px] bg-emerald-400 rounded-full px-1 py-1 h-4">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-[2px] bg-white rounded-full"
                animate={{ height: [3, 8, 3] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-2rem)] glassmorphism rounded-2xl p-6 shadow-2xl shadow-rose-200/30 border border-white/50"
          >
            {currentSong && (
              <div className="mb-4 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    src={currentSong.thumbnail}
                    alt={currentSong.title}
                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-rose-800 truncate">{currentSong.title}</p>
                    <p className="text-xs text-rose-500 truncate">{currentSong.artist}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-rose-400 font-mono">
                        {formatTime(getCurrentTime())}
                      </span>
                      <div
                        className="flex-1 h-1 bg-rose-200 rounded-full cursor-pointer relative group"
                        onClick={handleSeek}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-rose-400 font-mono">{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-rose-700 font-light text-sm">🎵 Soundtrack</h3>
              <span className={`text-xs ${isPlaying ? 'text-rose-500' : 'text-rose-300'}`}>
                {isPlaying ? '▶ Playing' : '⏸ Paused'}
              </span>
            </div>

            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {songs.map((song, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                    currentSongIndex === index
                      ? 'bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/50 shadow-sm'
                      : 'hover:bg-rose-50/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectSong(index)}
                >
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-rose-800 truncate">{song.title}</p>
                    <p className="text-xs text-rose-500 truncate">{song.artist}</p>
                  </div>
                  {currentSongIndex === index && isPlaying && (
                    <motion.div
                      className="text-rose-500"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ▶
                    </motion.div>
                  )}
                  {song.isSpecial && (
                    <span className="text-rose-400 text-sm">❤️</span>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-rose-100">
              <button
                className="w-full px-4 py-2.5 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full text-sm hover:from-rose-200 hover:to-pink-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                onClick={togglePlay}
                disabled={!playerReady && currentSongIndex !== null}
              >
                {isPlaying ? <><span>⏸</span> Pause</> : <><span>▶</span> Play</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
