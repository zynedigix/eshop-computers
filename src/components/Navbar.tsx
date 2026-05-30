import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Why Us', href: '#why-choose-us', id: 'why-choose-us' },
  { name: 'Deals', href: '#deals', id: 'deals' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const mobileLinksRef = useRef<HTMLDivElement>(null)

  // Track scroll position for navbar background styles
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Always visible, but background changes on scroll
      if (scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on load
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ScrollSpy: active link glow on section change
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the sweet spot of the viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id)
      if (el) observer.observe(el)
    })

    return () => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  // Animate mobile drawer entrance with GSAP
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent body scrolling
      document.body.style.overflow = 'hidden'

      // Stagger animate individual links sliding in
      if (mobileLinksRef.current) {
        const links = mobileLinksRef.current.children
        gsap.fromTo(links,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
        )
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleMobileLinkClick = (href: string) => {
    setIsMobileMenuOpen(false)
    // Smooth scroll to target
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full transition-all duration-500 ease-out border opacity-100 translate-y-0 scale-100
          ${isScrolled
            ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(0,214,255,0.06)] border-[#00D6FF]/15 py-3 px-6'
            : 'bg-transparent border-transparent py-5 px-6'
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-2xl font-extrabold tracking-tight text-white font-display">
              E-Shop<span className="text-gradient-accent">.</span>
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-white/40 font-mono font-medium pt-1">
              Computers
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-display">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium tracking-wide transition-all duration-300 hover:text-white
                    ${isActive
                      ? 'text-[#00D6FF] drop-shadow-[0_0_8px_rgba(0,214,255,0.6)] font-semibold'
                      : 'text-white/70'
                    }`}
                >
                  {link.name}
                  {/* Underline sliding track indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D6FF] to-transparent transition-all duration-300 origin-center
                      ${isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'}`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </a>
              )
            })}
          </div>

          {/* Right Action CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="glass rounded-full text-xs font-semibold uppercase tracking-widest text-[#00D6FF] border-[#00D6FF]/20 px-5 py-2.5 hover:bg-[#00D6FF]/10 hover:border-[#00D6FF]/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,214,255,0.2)]"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full glass border-white/5 hover:border-[#00D6FF]/30 transition-all duration-300 z-50"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-5 h-[2px] bg-white rounded-full transition-transform duration-300 origin-center
                ${isMobileMenuOpen ? 'translate-y-1.5 rotate-45 bg-[#00D6FF]' : ''}`}
            />
            <span
              className={`w-5 h-[2px] bg-white rounded-full transition-opacity duration-200
                ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`w-5 h-[2px] bg-white rounded-full transition-transform duration-300 origin-center
                ${isMobileMenuOpen ? '-translate-y-2 -rotate-45 bg-[#00D6FF]' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Glass Menu Panel */}
      <div
        className={`fixed inset-0 z-40 md:hidden flex justify-end transition-all duration-500 ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Dark blurred background overlay */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Sliding Panel */}
        <div
          className={`relative w-[80%] max-w-sm h-full bg-[#050505]/95 border-l border-white/5 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Subtle glowing orb in background */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#0050FF]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Links container */}
          <div ref={mobileLinksRef} className="flex flex-col gap-6 font-display">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.name}
                  onClick={() => handleMobileLinkClick(link.href)}
                  className={`text-left text-2xl font-bold tracking-wide transition-all duration-300 py-1
                    ${isActive
                      ? 'text-[#00D6FF] drop-shadow-[0_0_8px_rgba(0,214,255,0.5)]'
                      : 'text-white/60 hover:text-white'
                    }`}
                >
                  {link.name}
                </button>
              )
            })}
          </div>

          {/* Mobile Footer CTAs */}
          <div className="space-y-6">
            <div className="h-[1px] bg-white/5 w-full" />
            <div className="space-y-4">
              <button
                onClick={() => handleMobileLinkClick('#contact')}
                className="w-full text-center btn-primary justify-center text-sm py-3.5"
              >
                Instant Support
              </button>
              <button
                onClick={() => handleMobileLinkClick('#contact')}
                className="w-full text-center text-white/50 hover:text-white text-xs uppercase tracking-widest py-2.5"
              >
                Branch Locations
              </button>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-white/30 uppercase tracking-widest">
                Hubli, Karnataka
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
