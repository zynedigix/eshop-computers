import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const slides = [
  {
    title: "Technology That Understands You",
    subtext: "Where human expertise meets intelligent innovation to deliver seamless computer solutions, repairs, and support.",
    caption: "Bridging people and technology with precision-driven service.",
    startFrame: 0,
    endFrame: 49
  },
  {
    title: "Intelligent Repair Systems",
    subtext: "Advanced diagnostics, precision repair, hardware restoration, and expert technical solutions for every device.",
    caption: "Engineered to restore performance beyond expectations.",
    startFrame: 50,
    endFrame: 99
  },
  {
    title: "Complete Tech Ecosystem",
    subtext: "From laptops and desktops to accessories, printers, CCTV, and custom hardware — everything connected in one powerful universe.",
    caption: "Your one-stop destination for modern technology solutions.",
    startFrame: 100,
    endFrame: 149
  },
  {
    title: "Smart Security & Surveillance",
    subtext: "Next-generation CCTV systems and intelligent monitoring solutions designed to protect homes, offices, and businesses.",
    caption: "Advanced protection powered by smart technology.",
    startFrame: 150,
    endFrame: 199
  },
  {
    title: "Connected Without Limits",
    subtext: "Reliable networking, fast connectivity, seamless integration, and uninterrupted digital experiences for every environment.",
    caption: "Building stronger connections for smarter businesses.",
    startFrame: 200,
    endFrame: 249
  },
  {
    title: "Future-Ready Digital Solutions",
    subtext: "Custom systems, software support, data recovery, upgrades, and intelligent computing solutions built for tomorrow.",
    caption: "Driven by innovation. Powered by expertise.",
    startFrame: 250,
    endFrame: 293
  }
]

interface HeroProps {
  onReady?: () => void
}

const Hero = ({ onReady }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalFrames = 294

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = []
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      const frameNumber = i.toString().padStart(3, '0')
      img.src = `/images/hero/${frameNumber}.jpg`
      loadedImages.push(img)
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawFrame = (frameIndex: number) => {
      if (loadedImages[frameIndex] && loadedImages[frameIndex].complete) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const img = loadedImages[frameIndex]

        // Full screen cover calculation
        const canvasAspect = canvas.width / canvas.height
        const imgAspect = img.width / img.height

        let drawWidth, drawHeight

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width
          drawHeight = canvas.width / imgAspect
        } else {
          drawHeight = canvas.height
          drawWidth = canvas.height * imgAspect
        }

        // Offset slightly to right to leave room for text
        const xOffset = (canvas.width - drawWidth) * 0.7
        const yOffset = (canvas.height - drawHeight) / 2

        ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight)
      }
    }

    if (loadedImages.every(img => img.complete)) {
      drawFrame(0)
    }

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr

      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      const currentFrame = Math.floor((ScrollTrigger.getById('hero-scrub')?.progress || 0) * (totalFrames - 1))
      drawFrame(currentFrame)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const waitLoad = setInterval(() => {
      if (loadedImages.every(img => img.complete)) {
        clearInterval(waitLoad)

        // Initial draw
        handleResize()

        if (onReady) {
          onReady()
        }

        const trigger = ScrollTrigger.create({
          id: 'hero-scrub',
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            const frameIndex = Math.floor(self.progress * (totalFrames - 1))
            drawFrame(frameIndex)

            const slideIndex = slides.findIndex(s => frameIndex >= s.startFrame && frameIndex <= s.endFrame)
            if (slideIndex !== -1) {
              setCurrentSlide(prev => prev !== slideIndex ? slideIndex : prev)
            }
          }
        })

        return () => trigger.kill()
      }
    }, 100)

    return () => {
      clearInterval(waitLoad)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getById('hero-scrub')?.kill()
    }
  }, [])

  return (
    <div id="home" ref={containerRef} className="relative w-full h-[250vh] md:h-[600vh] bg-[#050505]">
      {/* Sticky Inner Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen"
        />

        {/* Visual Effects Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#00D6FF15,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[#050505]/10 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', backgroundSize: '150px' }}
        />

        {/* Layout */}
        <div className="absolute inset-0 flex flex-col md:flex-row max-w-[1920px] mx-auto px-6 md:px-[10%] py-[10%]">

          {/* Left Content */}
          <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col justify-start md:justify-center h-full relative z-10 pt-24 sm:pt-28 md:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-5 md:gap-6 items-center text-center md:items-start md:text-left"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#00D6FF] uppercase tracking-[0.3em] text-xs font-semibold"
                >
                  {slides[currentSlide].caption}
                </motion.p>

                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-white tracking-tight">
                  {slides[currentSlide].title}
                </h1>

                <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light max-w-xl">
                  {slides[currentSlide].subtext}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right CTA */}
          <div className="absolute bottom-[12%] md:bottom-[10%] left-0 right-0 md:left-auto md:right-[10%] flex flex-col md:flex-row items-center justify-center md:justify-end gap-4 z-20 px-6 md:px-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const section = document.getElementById('services')

                if (section) {
                  section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
              }}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-[#00D6FF] hover:text-white transition-colors duration-300 shadow-[0_0_30px_rgba(0,214,255,0.2)] backdrop-blur-md"
            >
              Explore Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const section = document.getElementById('contact')

                if (section) {
                  section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
              }}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full backdrop-blur-md hover:bg-white/10 transition-colors duration-300"
            >
              Get Quote
            </motion.button>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide < 5 ? 1 : 0 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-[#00D6FF]"
            />
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Hero
