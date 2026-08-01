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
      {/* Toggle Button - Pink Pill Shape */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg shadow-rose-200/50 flex items-center gap-2 font-medium tracking-wide"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? '✕ Close' : '🎵 Music'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-2rem)] bg-[#3a3a3c] rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {/* Dripping top/header */}
            <div className="relative bg-[#2a2a2c] px-4 py-5 pb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white/60 text-xs font-medium tracking-wider">iPhone</h3>
                <span className="text-[10px] text-white/40 font-mono">
                  {formatTime(getCurrentTime())} / {formatTime(duration)}
                </span>
              </div>
              
              {currentSong && (
                <div className="flex items-center gap-3">
                   <img src={currentSong.thumbnail} alt={currentSong.title} className="w-10 h-10 rounded-lg object-cover" />
                   <div className="flex-1 min-w-0">
                     <p className="text-white text-sm font-medium truncate">{currentSong.title}</p>
                     <p className="text-white/50 text-xs truncate">{currentSong.artist}</p>
                   </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mt-3 cursor-pointer group" onClick={handleSeek}>
                <div className="h-[2px] bg-white/20 rounded-full w-full relative">
                  <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            {/* Main Player Area - Dark Gray */}
            <div className="bg-[#3a3a3c] p-4 pt-0">
               {/* Controls */}
               <div className="flex justify-center items-center gap-6 py-3 text-white">
                  <button className="hover:text-white/70 transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>
                  <button onClick={togglePlay} className="text-2xl hover:scale-110 transition-transform">
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <button className="hover:text-white/70 transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>
               </div>

               {/* Volume Slider */}
               <div className="flex items-center gap-3 px-1 pb-4 text-xs text-white/50">
                 <span>🔊</span>
                 <div className="flex-1 h-[2px] bg-white/20 rounded-full">
                   <div className="h-full bg-white w-1/2 rounded-full" />
                 </div>
                 <span>🔊</span>
               </div>
               
               {/* Dripping bottom decoration */}
               <div className="absolute bottom-[-20px] left-0 w-full h-8 bg-[#3a3a3c] rounded-[50%] blur-sm opacity-80 pointer-events-none" />
               <div className="absolute bottom-[-15px] left-1/4 w-4 h-12 bg-[#3a3a3c] rounded-b-full opacity-80 pointer-events-none" />
               <div className="absolute bottom-[-12px] right-1/3 w-3 h-10 bg-[#3a3a3c] rounded-b-full opacity-80 pointer-events-none" />
            </div>

            {/* Playlist Popout (optional) */}
            <div className="max-h-48 overflow-y-auto bg-[#2a2a2c]/80 backdrop-blur border-t border-white/5">
               {songs.map((song, idx) => (
                 <div 
                   key={idx}
                   onClick={() => selectSong(idx)}
                   className={`flex justify-between items-center px-4 py-2 text-xs cursor-pointer hover:bg-white/5 transition-colors ${currentSongIndex === idx ? 'text-pink-400' : 'text-white/60'}`}
                 >
                   <span>{song.title}</span>
                   {currentSongIndex === idx && <span className="text-[8px]">▶</span>}
                 </div>
               ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
