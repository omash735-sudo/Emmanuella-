'use client'

import { useState } from 'react'
import { motion } from 'framer-motion' // Needed for the smooth fade
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
        /* This motion div prevents the "white flash" on mobile */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-x-hidden">
            <IntroSection />
            <PersonalMessage />
            <MusicSection />
            
            {/* WRAPPED WITH ID FOR TEDDY BEAR #1 */}
            <section id="memories">
              <MomentsSection />
            </section>

            {/* WRAPPED WITH ID FOR TEDDY BEAR #2 */}
            <section id="surprises">
              <GiftCards />
            </section>

            <ReasonsSection />

            {/* WRAPPED WITH ID FOR TEDDY BEAR #3 */}
            <section id="more">
              <EndingScene />
            </section>

            <PostCredits />
            <FloatingMusicPlayer />
          </main>
        </motion.div>
      )}
    </MusicProvider>
  )
}
