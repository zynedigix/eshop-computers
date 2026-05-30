import { useEffect, useState } from 'react'
import gsap from 'gsap'

const particlesArray = [...Array(15)].map(() => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 2}s`,
  duration: `${5 + Math.random() * 4}s`
}))

const Loader = ({ onComplete, isAppReady = true }: { onComplete: () => void, isAppReady?: boolean }) => {
  const [progress, setProgress] = useState(0)

  // 1. Entrance animation (Only runs once on mount)
  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo('.loader-logo', 
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.loader-text',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.loader-progress',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
  }, [])

  // 2. Continuous progress bar simulation (No state recalculation loop)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99 && !isAppReady) {
          return 99
        }
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Increment by random realistic values
        const next = prev + Math.random() * 12 + 4
        if (next >= 100) {
          return isAppReady ? 100 : 99
        }
        return next
      })
    }, 180)

    return () => clearInterval(progressInterval)
  }, [isAppReady])

  // 3. Clean exit fade-out when progress hits 100
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        gsap.to('.loader-container', {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete
        })
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  // Derive loading text dynamically during render to avoid sync interval lags
  let loadingText = 'Initializing Technology Experience…'
  if (progress > 30 && progress <= 60) {
    loadingText = 'Loading Premium Assets…'
  } else if (progress > 60 && progress <= 85) {
    loadingText = 'Preparing Cinematic Experience…'
  } else if (progress > 85) {
    loadingText = 'Almost Ready…'
  }

  return (
    <div className="loader-container fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0050FF]/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D6FF]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlesArray.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="loader-logo mb-8">
          <div className="text-5xl md:text-6xl font-bold text-gradient-accent tracking-tight">
            E-Shop
          </div>
          <div className="text-2xl md:text-3xl font-light text-white/80 tracking-wide mt-2">
            Computers
          </div>
        </div>

        {/* Loading text */}
        <div className="loader-text mb-8 min-h-[24px]">
          <p className="text-caption text-white/60 tracking-widest transition-all duration-300">
            {loadingText}
          </p>
        </div>

        {/* Progress bar */}
        <div className="loader-progress w-64 mx-auto">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-[10px] text-white/40 font-mono">{Math.round(progress)}%</span>
            <span className="text-[10px] text-white/40 font-mono">100%</span>
          </div>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_2px,#000_4px)]" />
        </div>
      </div>
    </div>
  )
}

export default Loader
