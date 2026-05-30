import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      rating: 5,
      text: 'Fast service and excellent support. They fixed our office network in record time. Highly recommended for any IT needs.',
      avatar: 'RK'
    },
    {
      name: 'Priya Sharma',
      role: 'Home User',
      rating: 5,
      text: 'Best CCTV installation experience in Hubli. The team was professional, and the system works perfectly. Great value for money.',
      avatar: 'PS'
    },
    {
      name: 'Suresh Patil',
      role: 'Student',
      rating: 5,
      text: 'Affordable pricing with genuine products. Got my custom gaming PC built exactly as I wanted. Amazing performance!',
      avatar: 'SP'
    },
    {
      name: 'Anita Desai',
      role: 'Office Manager',
      rating: 5,
      text: 'Reliable and trustworthy. They handle all our computer maintenance and printer services. Always on time and professional.',
      avatar: 'AD'
    }
  ]

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    // Animate testimonials on scroll
    gsap.fromTo('.testimonial-card',
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-[#00D6FF]' : 'text-white/20'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A0A0C] to-[#050505]" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#0050FF]/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-caption text-[#00D6FF] tracking-widest mb-4">TESTIMONIALS</p>
          <h2 className="text-headline text-gradient-primary mb-6">
            What Our Customers Say
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Real feedback from our satisfied customers across Hubli
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="testimonial-card glass-strong rounded-3xl p-12 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-8 left-8 text-[#00D6FF]/20">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Current testimonial */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-6 justify-center">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              {/* Text */}
              <p className="text-2xl md:text-3xl text-white/90 text-center mb-8 font-light leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0050FF]/30 to-[#00D6FF]/30 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#00D6FF]">
                    {testimonials[currentIndex].avatar}
                  </span>
                </div>

                {/* Info */}
                <div className="text-left">
                  <h4 className="text-xl font-semibold text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-body text-white/60">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/[0.1] transition-all duration-300 group"
              >
                <svg className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-[#00D6FF] w-8' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/[0.1] transition-all duration-300 group"
              >
                <svg className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
