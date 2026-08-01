'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/app/components/LoadingScreen'
import IntroSection from '@/app/components/IntroSection'
import PersonalMessage from '@/app/components/PersonalMessage'
import MusicSection from '@/app/components/MusicSection'
import MomentsSection from '@/app/components/MomentsSection'
import GiftCards from '@/app/components/GiftCards'
import ReasonsSection from '@/app/components/ReasonsSection'
import EndingScene from '@/app/components/EndingScene'
import PostCredits from '@/app/components/PostCredits'
import FloatingMusicPlayer from '@/app/components/FloatingMusicPlayer'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
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
