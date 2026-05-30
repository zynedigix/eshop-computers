import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      // Animate contact elements on scroll
      gsap.fromTo('.contact-item',
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            once: true,
            toggleActions: 'play none none none',
          }
        }
      )

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A0A0C] to-[#050505]" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#0050FF]/5 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-caption text-[#00D6FF] tracking-widest mb-4">CONTACT US</p>
          <h2 className="text-headline text-gradient-primary mb-6">
            Get In Touch
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Visit our store or reach out to us for any technology needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Main Office */}
            <div className="contact-item glass-strong rounded-2xl p-8">
              <h3 className="text-subheadline font-semibold text-white mb-6">
                Main Office
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00D6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body text-white/80">
                      #239, UGF, IT Park, P.B. Road<br />
                      Hubli-580029
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00D6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href="tel:08364254530" className="text-body text-white/80 hover:text-[#00D6FF] transition-colors">
                    0836-4254530
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00D6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:eshophubli@gmail.com" className="text-body text-white/80 hover:text-[#00D6FF] transition-colors">
                    eshophubli@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Branch Office */}
            <div className="contact-item glass-strong rounded-2xl p-8">
              <h3 className="text-subheadline font-semibold text-white mb-6">
                Branch Office
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00D6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body text-white/80">
                      #3, LGF, Shet Ballet Opp Oaks Hotel 2.0<br />
                      Near Kadasideshwar College, Vidya Nagar<br />
                      Hubli-580020
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00D6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href="tel:966353008" className="text-body text-white/80 hover:text-[#00D6FF] transition-colors">
                    966353008
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Google Map */}

          <div className="contact-item glass-strong rounded-2xl overflow-hidden h-full min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d660.7385886027429!2d75.12308860237655!3d15.364301998050356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7a3e8db5fe7%3A0xc9f662857804cd20!2sE-SHOP%20COMPUTERS!5e0!3m2!1sen!2sus!4v1780181685519!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
