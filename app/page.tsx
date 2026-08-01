'use client'

import { useState } from 'react'
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
import MusicConsentPopup from './components/MusicConsentPopup'
import { MusicProvider } from './components/MusicProvider'

type Phase = 'loading' | 'consent' | 'experience'

export default function Home() {
  const [phase, setPhase] = useState<Phase>('loading')

  return (
    <MusicProvider>
      {phase === 'loading' && (
        <LoadingScreen onContinue={() => setPhase('consent')} />
      )}

      {phase === 'consent' && (
        <MusicConsentPopup onDone={() => setPhase('experience')} />
      )}

      {phase === 'experience' && (
        <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-x-hidden">
          <IntroSection />
          <PersonalMessage />
          <MusicSection />
          <MomentsSection />
          <GiftCards />
          <ReasonsSection />
          <EndingScene />
          <PostCredits />
          <FloatingMusicPlayer />
        </main>
      )}
    </MusicProvider>
  )
}
