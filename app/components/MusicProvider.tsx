'use client'

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube'
import { content } from '@/config/content'

// Define Types
type Song = typeof content.music.songs[number];

interface MusicContextValue {
  songs: Song[]
  currentSongIndex: number | null
  currentSong: Song | null
  isPlaying: boolean
  progress: number
  duration: number
  playerReady: boolean
  hasStarted: boolean
  selectSong: (index: number) => void
  togglePlay: () => void
  seek: (percentage: number) => void
  playPreferredOrRandom: () => void
  getCurrentTime: () => number
  formatTime: (seconds: number) => string
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playerReady, setPlayerReady] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const playerRef = useRef<YouTubePlayer | null>(null)
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [])

  useEffect(() => {
    if (isPlaying && playerReady && currentSongIndex !== null) {
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
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [isPlaying, playerReady, currentSongIndex])

  const togglePlay = () => {
    if (!playerRef.current || !playerReady) return
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
    setIsPlaying(!isPlaying)
  }

  const selectSong = (index: number) => {
    if (currentSongIndex === index) {
      togglePlay()
      return
    }
    setCurrentSongIndex(index)
    setProgress(0)
    setDuration(0)
    setPlayerReady(false)
    setIsPlaying(true)
    setHasStarted(true)
  }

  const playPreferredOrRandom = () => {
    const songs = content.music.songs
    const preferredIndex = songs.findIndex((s: Song) =>
      s.title.toLowerCase().includes('save our song')
    )
    const index = preferredIndex !== -1
      ? preferredIndex
      : Math.floor(Math.random() * songs.length)
    selectSong(index)
  }

  const seek = (percentage: number) => {
    if (playerRef.current && duration > 0) {
      const seekTime = (percentage / 100) * duration
      playerRef.current.seekTo(seekTime, true)
      setProgress(percentage)
    }
  }

  const handlePlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target
    setPlayerReady(true)
    // Note: Autoplay might be blocked by browsers; manual trigger is safer
  }

  const handlePlayerStateChange = (event: YouTubeEvent) => {
    const state = event.data
    if (state === 1) setIsPlaying(true)
    else if (state === 2 || state === -1) setIsPlaying(false)
    else if (state === 0) {
      setIsPlaying(false)
      setProgress(0)
    }
  }

  const handlePlayerError = (e: { target: any; data: any }) => {
    console.error('YouTube Player Error:', e)
    setIsPlaying(false)
  }

  const getCurrentTime = () => {
    if (playerRef.current && playerReady) return playerRef.current.getCurrentTime()
    return 0
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentSong = currentSongIndex !== null ? content.music.songs[currentSongIndex] : null

  return (
    <MusicContext.Provider
      value={{
        songs: content.music.songs,
        currentSongIndex,
        currentSong,
        isPlaying,
        progress,
        duration,
        playerReady,
        hasStarted,
        selectSong,
        togglePlay,
        seek,
        playPreferredOrRandom,
        getCurrentTime,
        formatTime,
      }}
    >
      {children}

      {currentSongIndex !== null && (
        <div className="fixed -top-96 -left-96 opacity-0 pointer-events-none" aria-hidden="true">
          <YouTube
            videoId={content.music.songs[currentSongIndex].videoId}
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
            onError={handlePlayerError}
          />
        </div>
      )}
    </MusicContext.Provider>
  )
}
