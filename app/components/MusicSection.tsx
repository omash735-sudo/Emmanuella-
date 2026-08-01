'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube'
import { content } from '@/config/content'

interface MusicSectionProps {
  onMusicStart: () => void
}

export default function MusicSection({ onMusicStart }: MusicSectionProps) {
  const [musicStarted, setMusicStarted] = useState(false)
  const [currentSong, setCurrentSong] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playerReady, setPlayerReady] = useState(false)
  const [hoveredSong, setHoveredSong] = useState<number | null>(null)
  const playerRef = useRef<YouTubePlayer | null>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
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
    
    if (!musicStarted) {
      setMusicStarted(true)
      onMusicStart()
    }
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

  const currentSongData = currentSong !== null ? content.music.songs[currentSong] : null

  return (
    <section id="surprises" className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 via-white to-pink-50/30" />
      
      {/* Floating Music Notes - Enhanced */}
      {['🎵', '🎶', '🎵', '🎶', '🎵', '🎶'].map((note, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-4xl md:text-5xl opacity-10 pointer-events-none"
          style={{
            left: `${5 + i * 18}%`,
            top: `${5 + (i % 3) * 30}%`
          }}
          animate={{
            y: [0, -60, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 7 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut"
          }}
        >
          {note}
        </motion.div>
      ))}

      {/* Soft Glow Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-rose-700 mb-3">
            🎵 Soundtrack To This Little Adventure
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          <p className="text-sm text-rose-400 mt-3 font-light tracking-wide">
            A playlist made just for you ❤️
          </p>
        </motion.div>

        {/* Now Playing - Premium Card */}
        <AnimatePresence>
          {currentSongData && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-5 glassmorphism rounded-2xl shadow-xl shadow-rose-200/20 border border-white/50"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={currentSongData.thumbnail}
                    alt={currentSongData.title}
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
                      {currentSongData.title}
                    </p>
                    {currentSongData.isSpecial && (
                      <span className="text-rose-400 text-sm">❤️</span>
                    )}
                  </div>
                  <p className="text-sm text-rose-500 truncate">
                    {currentSongData.artist}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-rose-400 font-mono">
                      {formatTime(getCurrentTime())}
                    </span>
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
                    <span className="text-xs text-rose-400 font-mono">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={togglePlay}
                  disabled={!playerReady}
                  className="p-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Song Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.music.songs.map((song, index) => (
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
                  currentSong === index 
                    ? 'border-2 border-rose-400/50 shadow-rose-200/40' 
                    : 'border border-white/50 hover:shadow-rose-200/30'
                }`}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSongSelect(index)}
              >
                <div className="relative">
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Play Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0"
                    animate={{ 
                      opacity: hoveredSong === index || currentSong === index ? 1 : 0,
                      backgroundColor: currentSong === index && isPlaying ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-full bg-white/90 text-rose-500 flex items-center justify-center text-2xl shadow-xl"
                      animate={{ 
                        scale: hoveredSong === index ? 1.1 : 1,
                      }}
                    >
                      {currentSong === index && isPlaying ? '⏸' : '▶'}
                    </motion.div>
                  </motion.div>

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

                  {currentSong === index && isPlaying && (
                    <motion.div
                      className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full"
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="w-1 h-3 bg-white rounded-full"
                          animate={{
                            height: [3, 8 + i * 4, 3],
                          }}
                          transition={{
                            duration: 0.6 + i * 0.2,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-rose-800 text-lg truncate">
                    {song.title}
                  </h3>
                  <p className="text-sm text-rose-500 truncate">
                    {song.artist}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-rose-300">
                      {song.duration || '⏱'}
                    </span>
                    {currentSong === index && (
                      <span className="text-xs text-rose-400">
                        {isPlaying ? '▶ Playing' : '⏸ Paused'}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

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
      </div>
    </section>
  )
}
