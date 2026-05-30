import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Laptop Repair',
    description: 'Fast diagnostics and hardware repair solutions for all laptop brands and models.',
    cta: 'Explore Service'
  },
  {
    title: 'Desktop Services',
    description: 'Performance optimization, system upgrades, and comprehensive desktop maintenance.',
    cta: 'View Solutions'
  },
  {
    title: 'Printer Solutions',
    description: 'Maintenance, servicing, toner refilling, and complete printer support.',
    cta: 'Get Support'
  },
  {
    title: 'CCTV Installation',
    description: 'Smart security systems for homes, offices, and businesses with remote monitoring.',
    cta: 'View Security'
  },
  {
    title: 'Data Recovery',
    description: 'Recover critical files safely and securely from damaged storage devices.',
    cta: 'Recover Data'
  },
  {
    title: 'Custom PC Build',
    description: 'High-performance systems customized for your specific workflow and requirements.',
    cta: 'Build Your PC'
  }
]

const particlesArray = [...Array(30)].map(() => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
  duration: `${5 + Math.random() * 5}s`
}))

const ServicesStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const robot = robotRef.current

    if (!section || !robot) return

    // Animate robot floating
    gsap.to(robot, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Subtle rotation
    gsap.to(robot, {
      rotation: 5,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Create scroll triggers for each service
    services.forEach((_, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: `${index * 16.66}% top`,
        end: `${(index + 1) * 16.66}% top`,
        onEnter: () => setActiveService(index),
        onEnterBack: () => setActiveService(index)
      })
    })

    // Animate service cards
    gsap.fromTo('.service-story-card',
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
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
    <section ref={sectionRef} className="relative h-[600vh] bg-[#050505]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0A0A0C] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#0050FF]/5 rounded-full blur-[150px]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particlesArray.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00D6FF]/30 rounded-full animate-float"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>

        {/* Center robot visual */}
        <div ref={robotRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          {/* Robot placeholder with holographic effect */}
          <div className="relative w-full h-full">
            {/* Energy rings */}
            <div className="absolute inset-0 border-2 border-[#00D6FF]/20 rounded-full animate-pulse" />
            <div className="absolute inset-4 border border-[#0050FF]/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-8 border border-[#00D6FF]/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Robot icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/20 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-24 h-24 text-[#00D6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Holographic UI elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-[#00D6FF]/60 text-xs font-mono">
              SYSTEM ONLINE
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-[#0050FF]/60 text-xs font-mono">
              AI ASSISTANT ACTIVE
            </div>
          </div>
        </div>

        {/* Service content cards */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - empty for robot space */}
              <div className="hidden lg:block" />
              
              {/* Right side - service content */}
              <div className="service-story-card space-y-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`glass-strong rounded-2xl p-8 transition-all duration-500 ${
                      activeService === index
                        ? 'opacity-100 scale-100 border-[#00D6FF]/40'
                        : 'opacity-30 scale-95 border-transparent'
                    }`}
                  >
                    <h3 className="text-3xl font-bold text-gradient-accent mb-4">
                      {service.title}
                    </h3>
                    <p className="text-body-large text-white/80 mb-6">
                      {service.description}
                    </p>
                    <button className="btn-primary">
                      {service.cta}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {services.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-12 rounded-full transition-all duration-300 ${
                activeService === index ? 'bg-[#00D6FF]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesStory
