const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gradient-primary">
                E-Shop
              </h3>
              <p className="text-xl text-white/60 font-light">
                Computers
              </p>
            </div>
            <p className="text-body text-white/50">
              Reliable IT Solutions for a Smarter Future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-caption text-white/60 tracking-widest">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-body text-white/50 hover:text-[#00D6FF] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-body text-white/50 hover:text-[#00D6FF] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-body text-white/50 hover:text-[#00D6FF] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-body text-white/50 hover:text-[#00D6FF] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-caption text-white/60 tracking-widest">
              SERVICES
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-body text-white/50 hover:text-[#00D6FF] transition-colors">
                  Laptop Repair
                </a>
              </li>
              <li>
                <a href="#" className="text-body text-white/50 hover:text-[#00D6FF] transition-colors">
                  Desktop Services
                </a>
              </li>
              <li>
                <a href="#" className="text-body text-white/50 hover:text-[#00D6FF] transition-colors">
                  CCTV Installation
                </a>
              </li>
              <li>
                <a href="#" className="text-body text-white/50 hover:text-[#00D6FF] transition-colors">
                  Custom PC Build
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="text-caption text-white/60 tracking-widest">
              CONNECT
            </h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/eshophubballi/" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/[0.1] transition-all duration-300 group" target="_blank">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.47727 0 0 4.49364 0 10.0364C0 14.7436 3.22909 18.6936 7.58455 19.7782V13.1036H5.52273V10.0364H7.58455V8.71546C7.58455 5.29909 9.12455 3.71545 12.4664 3.71545C13.1 3.71545 14.1936 3.84091 14.64 3.96455V6.74545C14.4036 6.72 13.9945 6.70818 13.4855 6.70818C11.8455 6.70818 11.2118 7.33091 11.2118 8.95182V10.0364H14.4782L13.9173 13.1036H11.2118V20C16.1636 19.4 20 15.1682 20 10.0364C20 4.49364 15.5227 0 10 0Z" fill="#5F6164" />
                </svg>
              </a>
              <a href="https://www.instagram.com/eshopcomputers" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/[0.1] transition-all duration-300 group" target="_blank">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.42 0H17.58C18.912 0 20 1.09533 20 2.43184V17.5676C20 18.9061 18.91 19.9994 17.58 19.9994H2.42C1.088 19.9994 0 18.9041 0 17.5676V2.43184C0 1.09332 1.09 0 2.42 0ZM2.16 8.2341H4.158C3.95 8.84307 3.836 9.49424 3.836 10.1735C3.836 13.5239 6.596 16.2391 10 16.2391C13.404 16.2391 16.164 13.5239 16.164 10.1735C16.164 9.49625 16.05 8.84307 15.842 8.2341H17.84V16.6551C17.84 17.252 17.354 17.7384 16.762 17.7384H3.156C2.608 17.7384 2.16 17.2882 2.16 16.7375V8.2341ZM14.548 1.98165H16.87C17.394 1.98165 17.824 2.41376 17.824 2.94032V5.10888C17.824 5.63545 17.394 6.06755 16.87 6.06755H14.548C14.024 6.06755 13.594 5.63545 13.594 5.10888V2.94032C13.594 2.41376 14.024 1.98165 14.548 1.98165ZM10.006 5.90074C12.216 5.90074 14.008 7.66533 14.008 9.83992C14.008 12.0145 12.216 13.7791 10.006 13.7791C7.796 13.7791 6.004 12.0145 6.004 9.83992C6.004 7.66533 7.796 5.90074 10.006 5.90074Z" fill="#5F6164" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body text-white/40">
              © {new Date().getFullYear()} E-Shop Computers. All rights reserved.
            </p>
            <p className="text-body text-white/40">
              Design & Developed by ZyneDigix
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
