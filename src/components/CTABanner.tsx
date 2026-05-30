// src/components/CTABanner.tsx

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const particlesArray = Array.from({ length: 12 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 5 + Math.random() * 4,
}))

const CTABanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true,
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.cta-button',
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true,
            toggleActions: 'play none none none',
          },
        }
      )

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0050FF]/5 via-[#0A0A0C] to-[#00D6FF]/5" />

      {/* Reduced Glow */}
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D6FF]/10 blur-[80px]" />

      {/* Spotlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0050FF]/5 via-transparent to-transparent" />

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particlesArray.map((particle, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#00D6FF]/30 animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="cta-content space-y-8">
            <h2 className="text-display text-gradient-primary">
              Ready to Upgrade Your Technology Experience?
            </h2>

            <p className="text-subheadline text-white/80">
              Fast Service • Trusted Experts • Reliable Solutions
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">

              <button className="cta-button btn-primary">
                Contact Us
              </button>

              <button className="cta-button btn-secondary">
                WhatsApp Support
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTABanner