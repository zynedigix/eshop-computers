const TrustStatistics = () => {
  const statistics = [
    {
      value: 5000,
      suffix: '+',
      label: 'Devices Repaired',
      description: 'Expert diagnostics and repairs',
    },
    {
      value: 2000,
      suffix: '+',
      label: 'Happy Customers',
      description: 'Trusted by the community',
    },
    {
      value: 10,
      suffix: '+',
      label: 'Years Experience',
      description: 'Industry expertise',
    },
    {
      value: 24,
      suffix: '/7',
      label: 'Technical Support',
      description: 'Always available for you',
    },
    {
      value: 100,
      suffix: '%',
      label: 'Genuine Parts',
      description: 'Authentic components only',
    },
    {
      value: 100,
      suffix: '%',
      label: 'On-Site Service',
      description: 'Fast and convenient',
    },
  ]

  return (
    <section className="relative overflow-hidden py-32 bg-[#050505]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A0A0C] to-[#050505]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0050FF]/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">

        {/* Header */}
        <div className="mb-20 text-center">
          <p className="mb-4 tracking-[0.3em] text-[#00D6FF] text-sm uppercase">
            Trust & Reliability
          </p>

          <h2 className="mb-6 text-5xl md:text-6xl font-bold text-white">
            Numbers That Speak
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Our track record demonstrates commitment, expertise,
            and trusted customer satisfaction.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">

          {statistics.map((stat, index) => (
            <div
              key={index}
              className="stat-item relative rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#00D6FF]/50 hover:bg-white/[0.05] hover:scale-105"
            >

              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0050FF]/5 to-[#00D6FF]/5" />

              {/* Number */}
              <div className="relative z-10 mb-6">

                <div className="text-6xl md:text-7xl font-bold text-white">

                  {stat.value}

                  <span className="text-[#00D6FF]">
                    {stat.suffix}
                  </span>

                </div>

                {/* Divider */}
                <div className="stat-divider mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00D6FF] to-transparent" />

              </div>

              {/* Label */}
              <h3 className="relative z-10 mb-3 text-2xl font-semibold text-white">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-white/60">
                {stat.description}
              </p>

            </div>
          ))}

        </div>

        {/* Bottom Badge */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 backdrop-blur-xl">

            <div className="h-2 w-2 rounded-full bg-[#00D6FF] animate-pulse" />

            <p className="tracking-[0.25em] text-white/60 text-sm uppercase">
              Trusted By Hubli Businesses & Residents
            </p>

          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustStatistics