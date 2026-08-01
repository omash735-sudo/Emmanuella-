'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube'
import { content } from '@/config/content'

export default function FloatingMusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSong, setCurrentSong] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playerReady, setPlayerReady] = useState(false)
  const playerRef = useRef<YouTubePlayer | null>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  // Progress tracking
  useEffect(() => {
    if (isPlaying && playerReady && currentSong !== null) {
      progressInterval.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime()
          const totalDuration = playerRef.current.getDuration()
          if (totalDuration > 0) {
            setProgress((currentTime / totalDuration) * 100)
            setDuration(totalDuration)
          }
        }
      }, 500)
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying, playerReady, currentSong])

  // Keyboard shortcut
  useEffect(() => {
    if (!isMounted) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && isOpen) {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMounted, isOpen, isPlaying])

  const togglePlay = () => {
    if (playerRef.current && playerReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSongSelect = (index: number) => {
    if (currentSong === index) {
      togglePlay()
      return
    }
    
    setCurrentSong(index)
    setProgress(0)
    setDuration(0)
    setPlayerReady(false)
    setIsPlaying(true)
  }

  const handlePlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target
    setPlayerReady(true)
    event.target.playVideo()
  }

  const handlePlayerStateChange = (event: YouTubeEvent) => {
    const state = event.data
    if (state === 1) {
      setIsPlaying(true)
    } else if (state === 2 || state === -1) {
      setIsPlaying(false)
    } else if (state === 0) {
      setIsPlaying(false)
      setProgress(0)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, x / rect.width))
      const seekTime = percentage * duration
      playerRef.current.seekTo(seekTime, true)
      setProgress(percentage * 100)
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getCurrentTime = () => {
    if (playerRef.current && playerReady) {
      return playerRef.current.getCurrentTime()
    }
    return 0
  }

  if (!isMounted) {
    return null
  }

  const currentSongData = currentSong !== null ? content.music.songs[currentSong] : null

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-2xl shadow-rose-200/50 flex items-center justify-center text-2xl"
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {isOpen ? '✕' : '🎵'}
        {isPlaying && (
          <motion.span
            className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Music Player Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-2rem)] glassmorphism rounded-2xl p-6 shadow-2xl shadow-rose-200/30 border border-white/50"
          >
            {/* Currently Playing */}
            {currentSongData && (
              <div className="mb-4 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <img
                    src={currentSongData.thumbnail}
                    alt={currentSongData.title}
                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-rose-800 truncate">
                      {currentSongData.title}
                    </p>
                    <p className="text-xs text-rose-500 truncate">
                      {currentSongData.artist}
                    </p>
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
                      <span className="text-xs text-rose-400 font-mono">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="mt-2 text-center"
                  animate={{ opacity: isPlaying ? [0.5, 1, 0.5] : 0.3 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-xs text-rose-400 font-light">
                    {isPlaying ? '🎵 Now Playing' : '⏸ Paused'}
                  </span>
                </motion.div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-rose-700 font-light text-sm">🎵 Soundtrack</h3>
              <span className={`text-xs ${isPlaying ? 'text-rose-500' : 'text-rose-300'}`}>
                {isPlaying ? '▶ Playing' : '⏸ Paused'}
              </span>
            </div>

            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {content.music.songs.map((song, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                    currentSong === index
                      ? 'bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/50 shadow-sm'
                      : 'hover:bg-rose-50/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSongSelect(index)}
                >
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-rose-800 truncate">
                      {song.title}
                    </p>
                    <p className="text-xs text-rose-500 truncate">
                      {song.artist}
                    </p>
                  </div>
                  {currentSong === index && isPlaying && (
                    <motion.div
                      className="text-rose-500"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ▶
                    </motion.div>
                  )}
                  {currentSong === index && !isPlaying && (
                    <div className="text-rose-400">⏸</div>
                  )}
                  {song.isSpecial && (
                    <motion.div
                      className="text-rose-400 text-sm"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ❤️
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-rose-100">
              <div className="flex items-center justify-between gap-3">
                <button
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full text-sm hover:from-rose-200 hover:to-pink-200 transition-all flex items-center justify-center gap-2"
                  onClick={togglePlay}
                  disabled={!playerReady}
                >
                  {isPlaying ? (
                    <>
                      <span>⏸</span> Pause
                    </>
                  ) : (
                    <>
                      <span>▶</span> Play
                    </>
                  )}
                </button>
                <button
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full text-sm hover:shadow-lg transition-all text-center"
                  onClick={() => {
                    if (currentSong !== null) {
                      window.open(
                        `https://www.youtube.com/watch?v=${content.music.songs[currentSong].videoId}`,
                        '_blank'
                      )
                    }
                  }}
                >
                  📺 YouTube
                </button>
              </div>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-rose-300 tracking-widest font-light">
                Spacebar to toggle play
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden YouTube Player */}
      {currentSong !== null && (
        <div className="fixed -top-96 -left-96 opacity-0 pointer-events-none">
          <YouTube
            videoId={content.music.songs[currentSong].videoId}
            opts={{
              height: '1',
              width: '1',
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
              },
            }}
            onReady={handlePlayerReady}
            onStateChange={handlePlayerStateChange}
            onError={(e) => {
              console.error('YouTube Player Error:', e)
              setIsPlaying(false)
            }}
            className="w-0 h-0 opacity-0"
          />
        </div>
      )}
    </>
  )
}
