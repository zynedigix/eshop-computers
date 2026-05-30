import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FeatureHighlight = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      title: 'Fast Service',
      description: 'Quick turnaround times with efficient diagnostics and repair processes. Get your technology back up and running in no time.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-[#0050FF] to-[#00D6FF]'
    },
    {
      title: 'Genuine Hardware',
      description: '100% authentic components from authorized distributors. Quality you can trust with warranty protection.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-[#00D6FF] to-[#0050FF]'
    },
    {
      title: 'Smart Security',
      description: 'Advanced CCTV and security solutions with remote monitoring, AI-powered detection, and 24/7 surveillance capabilities.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-[#0050FF] to-[#00D6FF]'
    }
  ]

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current

    if (!section || !container) return

    // Horizontal scroll animation
    const sections = gsap.utils.toArray('.feature-block')
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => '+=' + container.offsetWidth
      }
    })

    // Animate feature elements
    gsap.fromTo('.feature-content',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050505]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0A0A0C] to-[#050505]" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[800px] bg-[#00D6FF]/5 rounded-full blur-[150px]" />

      <div ref={containerRef} className="relative z-10">
        {features.map((feature, index) => (
          <div key={index} className="feature-block w-screen h-screen flex items-center">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Feature content */}
                <div className="feature-content space-y-8">
                  <div className="space-y-4">
                    <p className="text-caption text-[#00D6FF] tracking-widest">
                      FEATURE 0{index + 1}
                    </p>
                    <h2 className="text-headline text-gradient-primary">
                      {feature.title}
                    </h2>
                  </div>
                  
                  <p className="text-body-large text-white/80 max-w-xl">
                    {feature.description}
                  </p>

                  <button className="btn-primary">
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                {/* Feature visual */}
                <div className="relative flex items-center justify-center">
                  {/* Floating visual container */}
                  <div className="relative w-80 h-80">
                    {/* Holographic particles */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-[#00D6FF]/40 rounded-full animate-float"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${4 + Math.random() * 4}s`
                        }}
                      />
                    ))}

                    {/* Energy rings */}
                    <div className="absolute inset-0 border-2 border-[#00D6FF]/20 rounded-full animate-pulse" />
                    <div className="absolute inset-8 border border-[#0050FF]/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute inset-16 border border-[#00D6FF]/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

                    {/* Icon */}
                    <div className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br ${feature.color}/20 backdrop-blur-sm`}>
                      <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                        {feature.icon}
                      </div>
                    </div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-3xl bg-[#00D6FF]/20 -z-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {features.map((_, index) => (
          <div
            key={index}
            className="feature-indicator w-1 h-12 rounded-full bg-white/20 transition-all duration-300"
          />
        ))}
      </div>
    </section>
  )
}

export default FeatureHighlight
