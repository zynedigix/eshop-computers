import { useState, useEffect, useCallback } from 'react'

const galleryImages = [
  { src: '/src/assets/images/gallery/gallery-01.webp', alt: 'Gallery Image 1' },
  { src: '/src/assets/images/gallery/gallery-02.webp', alt: 'Gallery Image 2' },
  { src: '/src/assets/images/gallery/gallery-03.webp', alt: 'Gallery Image 3' },
  { src: '/src/assets/images/gallery/gallery-04.webp', alt: 'Gallery Image 4' },
  { src: '/src/assets/images/gallery/gallery-05.webp', alt: 'Gallery Image 5' },
  { src: '/src/assets/images/gallery/gallery-06.webp', alt: 'Gallery Image 6' },
  { src: '/src/assets/images/gallery/gallery-07.webp', alt: 'Gallery Image 7' },
  { src: '/src/assets/images/gallery/gallery-08.webp', alt: 'Gallery Image 8' },
  { src: '/src/assets/images/gallery/gallery-09.webp', alt: 'Gallery Image 9' },
  { src: '/src/assets/images/gallery/gallery-10.webp', alt: 'Gallery Image 10' },
  { src: '/src/assets/images/gallery/gallery-11.webp', alt: 'Gallery Image 11' },
  { src: '/src/assets/images/gallery/gallery-12.webp', alt: 'Gallery Image 12' },
  { src: '/src/assets/images/gallery/gallery-13.webp', alt: 'Gallery Image 13' },
  { src: '/src/assets/images/gallery/gallery-14.webp', alt: 'Gallery Image 14' },
  { src: '/src/assets/images/gallery/gallery-15.webp', alt: 'Gallery Image 15' },
  { src: '/src/assets/images/gallery/gallery-16.webp', alt: 'Gallery Image 16' },
  { src: '/src/assets/images/gallery/gallery-17.webp', alt: 'Gallery Image 17' },
  { src: '/src/assets/images/gallery/gallery-18.webp', alt: 'Gallery Image 18' },
  { src: '/src/assets/images/gallery/gallery-19.webp', alt: 'Gallery Image 19' },
  { src: '/src/assets/images/gallery/gallery-20.webp', alt: 'Gallery Image 20' },
  { src: '/src/assets/images/gallery/gallery-21.webp', alt: 'Gallery Image 21' },
  { src: '/src/assets/images/gallery/gallery-22.webp', alt: 'Gallery Image 22' },
  { src: '/src/assets/images/gallery/gallery-23.webp', alt: 'Gallery Image 23' },
]

const GalleryWall = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal, goToPrevious, goToNext])

  return (
    <section className="relative overflow-hidden py-32 bg-[#050505]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A0A0C] to-[#050505]" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[#00D6FF]/5 rounded-full blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="mb-4 tracking-[0.3em] text-[#00D6FF] text-sm uppercase">
            Our Work
          </p>
          <h2 className="mb-6 text-5xl md:text-6xl font-bold text-white">
            Cinematic Gallery
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Explore our portfolio of premium technology solutions and installations
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4 space-y-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item relative group break-inside-avoid rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-[#00D6FF]/50 hover:scale-[1.02] cursor-pointer"
              onClick={() => openModal(index)}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#00D6FF]/20 backdrop-blur-xl flex items-center justify-center border border-[#00D6FF]/50">
                  <svg className="w-8 h-8 text-[#00D6FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0050FF]/10 to-[#00D6FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button onClick={() => openModal(0)} className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#00D6FF] bg-[#00D6FF]/10 text-[#00D6FF] font-semibold hover:bg-[#00D6FF] hover:text-white transition-all duration-300">
            Preview
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div className="relative max-w-5xl max-h-[85vh] w-full">
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-white text-sm font-medium">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}

export default GalleryWall
