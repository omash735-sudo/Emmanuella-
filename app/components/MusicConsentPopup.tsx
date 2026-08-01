'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useMusic } from './MusicProvider'

interface MusicConsentPopupProps {
  onDone: () => void
}

export default function MusicConsentPopup({ onDone }: MusicConsentPopupProps) {
  const { playPreferredOrRandom } = useMusic()
  const [step, setStep] = useState<'ask' | 'confirm-no'>('ask')

  const handleYes = () => {
    playPreferredOrRandom()
    onDone()
  }

  const handleNoFirstTime = () => {
    setStep('confirm-no')
  }

  const handleFinalNo = () => {
    onDone()
  }

  const handleReconsider = () => {
    playPreferredOrRandom()
    onDone()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="glassmorphism rounded-3xl p-7 md:p-8 max-w-sm w-full shadow-2xl shadow-rose-200/40 border border-white/60 text-center"
      >
        <AnimatePresence mode="wait">
          {step === 'ask' ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-5xl mb-4"
              >
                🎵
              </motion.div>
              <p className="text-rose-800 font-light text-base md:text-lg leading-relaxed mb-7">
                Would you like to listen to some music while you explore your present?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleYes}
                  className="w-full py-3.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium shadow-lg shadow-rose-200/50 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Yes, please ❤️
                </button>
                <button
                  onClick={handleNoFirstTime}
                  className="w-full py-3 text-rose-400 hover:text-rose-500 text-sm transition-colors"
                >
                  Maybe not right now
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="confirm-no"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-4xl mb-4">🥺</div>
              <p className="text-rose-800 font-light text-base leading-relaxed mb-7">
                Are you sure? I put a lot of thought into choosing these songs and I
                think they make the experience even more special. But if you'd rather
                continue without them, that's completely okay. ❤️
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleReconsider}
                  className="w-full py-3.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-medium shadow-lg shadow-rose-200/50 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Okay, play the music 🎵
                </button>
                <button
                  onClick={handleFinalNo}
                  className="w-full py-3 text-rose-400 hover:text-rose-500 text-sm transition-colors"
                >
                  Continue without music
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
