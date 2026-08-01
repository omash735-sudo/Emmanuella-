'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useMusic } from './MusicProvider'

interface MusicConsentPopupProps {
  onDone: () => void
}

export default function MusicConsentPopup({ onDone }: MusicConsentPopupProps) {
  const { playPreferredOrRandom } = useMusic()
  const [step, setStep] = useState<'ask' | 'confirm-no'>('ask')
  const [isAnimating, setIsAnimating] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Check if user permanently dismissed this
  const checkDismissal = useCallback(() => {
    if (typeof window === 'undefined') return false
    const dismissed = localStorage.getItem('music_popup_dismissed')
    if (!dismissed) return false
    return true
  }, [])

  // Save dismissal permanently (no annoying repeats)
  const dismissPopup = useCallback(() => {
    localStorage.setItem('music_popup_dismissed', 'true')
    setIsAnimating(true)
    setTimeout(() => {
      onDone()
      setIsAnimating(false)
    }, 200)
  }, [onDone])

  // Handle actions
  const handleYes = () => {
    playPreferredOrRandom()
    dismissPopup()
  }

  const handleNoFirstTime = () => setStep('confirm-no')

  const handleFinalNo = () => dismissPopup()

  const handleReconsider = () => {
    playPreferredOrRandom()
    dismissPopup()
  }

  // If already dismissed, skip entirely
  if (checkDismissal()) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-200"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={modalRef}
        className={`relative glassmorphism rounded-3xl max-w-sm w-full shadow-2xl shadow-rose-200/40 border border-white/60 overflow-hidden transition-all duration-200 ${
          isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        
        {/* Floating Pink Hearts inside the pop-up */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-[#ff4d6d] opacity-20 pointer-events-none select-none"
            style={{
              left: `${10 + (i * 15) % 80}%`,
              top: `${10 + (i * 12) % 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          >
            ❤️
          </motion.div>
        ))}

        {/* Image Banner Section */}
        <div className="relative h-36 w-full bg-gradient-to-r from-[#ff4d6d] to-[#ff1a4f] flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl md:text-7xl"
          >
            🎵
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="p-6 text-center relative z-10">
          <AnimatePresence mode="wait">
            {step === 'ask' ? (
              <motion.div
                key="ask"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 id="popup-title" className="text-xl md:text-2xl font-bubble text-[#590d22] mb-2">
                  Music Time!
                </h3>
                <p className="text-rose-800 font-light text-base md:text-lg leading-relaxed mb-6">
                  Would you like to listen to some music while you explore your present?
                </p>
                
                <div className="flex flex-col gap-3">
                  {/* NEW STYLED PINK BUTTON (White bordered, solid fill) */}
                  <button
                    onClick={handleYes}
                    className="w-full py-3.5 bg-[#ff4d6d] text-white text-lg font-bold rounded-full shadow-lg shadow-[#ff4d6d]/40 border-[2px] border-white/90 hover:bg-[#ff1a4f] hover:scale-105 active:scale-95 transition-all duration-200"
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
                <div className="text-5xl mb-2">🥺</div>
                <h3 className="text-xl font-bubble text-[#590d22] mb-2">Are you sure?</h3>
                <p className="text-rose-800 font-light text-base leading-relaxed mb-6">
                  I put a lot of thought into choosing these songs! They make this experience even more special. But if you'd rather skip, that's okay. ❤️
                </p>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleReconsider}
                    className="w-full py-3.5 bg-[#ff4d6d] text-white text-lg font-bold rounded-full shadow-lg shadow-[#ff4d6d]/40 border-[2px] border-white/90 hover:bg-[#ff1a4f] hover:scale-105 active:scale-95 transition-all duration-200"
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
        </div>
      </div>

      {/* Animations from reference */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
