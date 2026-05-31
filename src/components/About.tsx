import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const left = leftRef.current
    const right = rightRef.current

    if (!section || !left || !right) return

    // Animate left content
    gsap.fromTo(left,
      {
        opacity: 0,
        x: -60
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Animate right visual
    gsap.fromTo(right,
      {
        opacity: 0,
        x: 60
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0A0A0C] to-[#050505]" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#0050FF]/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div ref={leftRef} className="space-y-8">
            {/* Section label */}
            <div className="space-y-4">
              <p className="text-caption text-[#00D6FF] tracking-widest">ABOUT US</p>
              <h2 className="text-headline text-gradient-primary">
                Trusted Technology Partner
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-6 text-body-large">
              <p>
                E-Shop Computers is a trusted technology partner in Hubli delivering premium computer sales, repair services, CCTV solutions, and complete IT support for homes, offices, and businesses.
              </p>
              <p>
                From high-performance laptops and desktops to security systems, printers, accessories, and custom PC builds, the company provides reliable solutions backed by expert technical support and years of experience.
              </p>
            </div>

            {/* Mission statement */}
            <div className="glass rounded-2xl p-8 border-l-4 border-[#00D6FF]">
              <p className="text-subheadline font-semibold text-white mb-3">
                Our Mission
              </p>
              <p className="text-body text-white/80">
                Keep your technology running flawlessly.
              </p>
            </div>

            {/* CTA */}
            <button className="btn-primary">
              Learn More About Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Right: Visual */}
          {/* Right: Owner Image Visual */}
          <div ref={rightRef} className="relative">

            {/* Main Image Container */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-strong group">

              {/* Owner Image */}
              <img
                src="/images/about-us/subramani.webp"
                alt="Subramani - E-Shop Computers"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />

              {/* Blue Glow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0050FF]/10 via-transparent to-[#00D6FF]/10 mix-blend-screen" />

              {/* Bottom Content */}
              <div className="absolute bottom-12 left-0 w-full p-8 z-10">
                <p className="text-caption tracking-[0.3em] text-[#00D6FF] mb-3">
                  FOUNDER & TECHNICAL EXPERT
                </p>

                <h3 className="text-3xl font-bold text-white mb-2">
                  Subramani
                </h3>

                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  Delivering trusted computer solutions, technical expertise,
                  and premium customer support for businesses and homes.
                </p>
              </div>

              {/* Decorative Rings */}
              <div className="absolute top-6 left-6 w-24 h-24 border border-[#00D6FF]/20 rounded-full" />
              <div className="absolute bottom-6 right-6 w-36 h-36 border border-[#0050FF]/20 rounded-full" />

              {/* Floating Glow Dot */}
              <div className="absolute top-1/2 right-10 w-2 h-2 bg-[#00D6FF] rounded-full animate-pulse" />
              <div className="absolute bottom-10 left-10 w-2 h-2 bg-[#0050FF] rounded-full animate-pulse" />

            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-6 animate-float">
              <div className="text-3xl font-bold text-gradient-accent mb-1">
                10+
              </div>

              <div className="text-caption text-white/60">
                Years Experience
              </div>
            </div>

            {/* Floating Customer Card */}
            <div
              className="absolute -top-6 -right-6 glass rounded-2xl p-6 animate-float"
              style={{ animationDelay: '1s' }}
            >
              <div className="text-3xl font-bold text-gradient-accent mb-1">
                2000+
              </div>

              <div className="text-caption text-white/60">
                Happy Customers
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default About
