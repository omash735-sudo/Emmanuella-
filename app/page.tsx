'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import IntroSection from './components/IntroSection'
import PersonalMessage from './components/PersonalMessage'
import MusicSection from './components/MusicSection'
import MomentsSection from './components/MomentsSection'
import GiftCards from './components/GiftCards'
import ReasonsSection from './components/ReasonsSection'
import EndingScene from './components/EndingScene'
import PostCredits from './components/PostCredits'
import FloatingMusicPlayer from './components/FloatingMusicPlayer'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-x-hidden">
      <IntroSection />
      <PersonalMessage />
      <MusicSection onMusicStart={() => setShowMusicPlayer(true)} />
      <MomentsSection />
      <GiftCards />
      <ReasonsSection />
      <EndingScene />
      <PostCredits />
      
      {showMusicPlayer && <FloatingMusicPlayer />}
    </main>
  )
}
