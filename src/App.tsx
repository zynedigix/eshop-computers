// src/App.tsx

import { useState, useEffect } from 'react'
import Lenis from 'lenis'

// Components
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Brands from './components/Brands'
import About from './components/About'
import QuickServices from './components/QuickServices'
import WhyChooseUs from './components/WhyChooseUs'
// import ServicesStory from './components/ServicesStory'
import TrustStatistics from './components/TrustStatistics'
import BestDeals from './components/BestDeals'
// import FeatureHighlight from './components/FeatureHighlight'
import GalleryWall from './components/GalleryWall'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isHeroReady, setIsHeroReady] = useState(false)

  // Smooth Scroll
  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    let animationFrameId: number

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [isLoading])

  return (
    <>
      {isLoading && (
        <Loader onComplete={() => setIsLoading(false)} isAppReady={isHeroReady} />
      )}
      
      <div 
        className={`relative w-full overflow-clip bg-[#050505] text-white selection:bg-[#00D6FF]/30 selection:text-white ${
          isLoading ? 'h-screen overflow-hidden fixed inset-0 pointer-events-none opacity-0' : 'min-h-screen opacity-100'
        }`}
      >

        {/* Cursor Glow */}
        <div className="fixed inset-0 pointer-events-none z-30 hidden md:block bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(0,214,255,0.02)_0%,transparent_50%)]" />

        {/* Navbar */}
        <Navbar />

        {/* Main */}
        <main>
          <Hero onReady={() => setIsHeroReady(true)} />
          <Brands />
          <About />
          <QuickServices />
          <WhyChooseUs />
          {/* <ServicesStory /> */}
          <TrustStatistics />
          <BestDeals />
          {/* <FeatureHighlight /> */}
          <GalleryWall />
          <Testimonials />
          <CTABanner />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp */}
        <WhatsAppButton />
      </div>
    </>
  )
}

export default App