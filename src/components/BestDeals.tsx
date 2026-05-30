import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

gsap.registerPlugin(ScrollTrigger)

// ─── Product icons as inline SVG components ───────────────────────────────────

const LaptopIllustration = ({ accent = '#00D6FF' }: { accent?: string }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <filter id="glow-l">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <linearGradient id="screen-l" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0A0A1A" />
        <stop offset="100%" stopColor="#0D1540" />
      </linearGradient>
      <linearGradient id="body-l" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0d0d1a" />
      </linearGradient>
    </defs>
    {/* Base */}
    <ellipse cx="160" cy="200" rx="130" ry="10" fill={accent} opacity="0.12" />
    {/* Keyboard base */}
    <rect x="30" y="165" width="260" height="22" rx="4" fill="url(#body-l)" stroke={accent} strokeWidth="0.8" strokeOpacity="0.5"/>
    {/* Keyboard row */}
    {[0,1,2,3,4,5,6,7,8,9].map(i => (
      <rect key={i} x={38 + i*24} y="170" width="18" height="11" rx="2" fill="#1e1e3a" stroke={accent} strokeWidth="0.4" strokeOpacity="0.4"/>
    ))}
    {/* Screen hinge */}
    <rect x="30" y="158" width="260" height="8" rx="2" fill="#111128" />
    {/* Screen bezel */}
    <rect x="42" y="28" width="236" height="132" rx="8" fill="#0a0a1a" stroke={accent} strokeWidth="1" strokeOpacity="0.6" filter="url(#glow-l)"/>
    {/* Screen content */}
    <rect x="50" y="36" width="220" height="116" rx="4" fill="url(#screen-l)" />
    {/* UI lines on screen */}
    <rect x="60" y="55" width="80" height="6" rx="3" fill={accent} opacity="0.7"/>
    <rect x="60" y="68" width="120" height="4" rx="2" fill="#ffffff" opacity="0.25"/>
    <rect x="60" y="78" width="100" height="4" rx="2" fill="#ffffff" opacity="0.15"/>
    <rect x="60" y="90" width="60" height="4" rx="2" fill="#ffffff" opacity="0.1"/>
    {/* Graph bars */}
    <rect x="190" y="60" width="18" height="50" rx="2" fill={accent} opacity="0.3"/>
    <rect x="212" y="75" width="18" height="35" rx="2" fill={accent} opacity="0.5"/>
    <rect x="234" y="50" width="18" height="60" rx="2" fill={accent} opacity="0.7"/>
    {/* Glowing top edge */}
    <line x1="42" y1="28" x2="278" y2="28" stroke={accent} strokeWidth="1.5" strokeOpacity="0.8" filter="url(#glow-l)"/>
  </svg>
)

const DesktopIllustration = ({ accent = '#00D6FF' }: { accent?: string }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <filter id="glow-d">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <linearGradient id="tower-d" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0a0a16" />
      </linearGradient>
      <linearGradient id="panel-d" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="100" cy="210" rx="70" ry="7" fill={accent} opacity="0.1"/>
    {/* Tower body */}
    <rect x="40" y="40" width="120" height="170" rx="8" fill="url(#tower-d)" stroke={accent} strokeWidth="1" strokeOpacity="0.5"/>
    {/* Glass panel */}
    <rect x="55" y="55" width="90" height="140" rx="5" fill="url(#panel-d)" stroke={accent} strokeWidth="0.6" strokeOpacity="0.4"/>
    {/* GPU highlight */}
    <rect x="62" y="100" width="75" height="30" rx="4" fill="#0d0d2a" stroke={accent} strokeWidth="0.8"/>
    <rect x="65" y="104" width="55" height="22" rx="3" fill="#1a1a3a"/>
    {/* Fan rings */}
    {[0,1,2].map(i => <circle key={i} cx={80 + i*18} cy="115" r="7" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.6"/>)}
    {/* RGB strip */}
    <rect x="55" y="55" width="6" height="140" rx="3" fill={accent} opacity="0.8" filter="url(#glow-d)"/>
    {/* Power button */}
    <circle cx="100" cy="72" r="8" fill="#0a0a1a" stroke={accent} strokeWidth="1" filter="url(#glow-d)"/>
    <path d="M100 66 v6" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
    {/* Monitor */}
    <rect x="175" y="30" width="120" height="80" rx="6" fill="#0a0a1a" stroke={accent} strokeWidth="1" strokeOpacity="0.7" filter="url(#glow-d)"/>
    <rect x="182" y="37" width="106" height="66" rx="3" fill="#0d1540"/>
    <rect x="188" y="45" width="55" height="4" rx="2" fill={accent} opacity="0.7"/>
    <rect x="188" y="55" width="90" height="3" rx="2" fill="#ffffff" opacity="0.2"/>
    <rect x="188" y="63" width="70" height="3" rx="2" fill="#ffffff" opacity="0.15"/>
    {/* Monitor stand */}
    <rect x="228" y="110" width="8" height="25" rx="2" fill="#1a1a2e"/>
    <rect x="215" y="133" width="34" height="5" rx="2" fill="#1a1a2e" stroke={accent} strokeWidth="0.5" strokeOpacity="0.4"/>
  </svg>
)

const PrinterIllustration = ({ accent = '#00D6FF' }: { accent?: string }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <filter id="glow-p">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <ellipse cx="160" cy="208" rx="100" ry="7" fill={accent} opacity="0.1"/>
    {/* Paper tray bottom */}
    <rect x="55" y="170" width="210" height="20" rx="4" fill="#12122a" stroke={accent} strokeWidth="0.6" strokeOpacity="0.3"/>
    {/* Main body */}
    <rect x="50" y="85" width="220" height="90" rx="10" fill="#14142c" stroke={accent} strokeWidth="1" strokeOpacity="0.6"/>
    {/* Top lid */}
    <rect x="50" y="55" width="220" height="35" rx="10" fill="#1a1a3a" stroke={accent} strokeWidth="0.8" strokeOpacity="0.5"/>
    {/* Paper slot */}
    <rect x="70" y="125" width="180" height="8" rx="2" fill="#0a0a1a" stroke={accent} strokeWidth="0.6"/>
    {/* Paper coming out */}
    <rect x="85" y="105" width="150" height="5" rx="1" fill="#f0f0f0" opacity="0.9"/>
    <rect x="85" y="108" width="120" height="1" fill={accent} opacity="0.3"/>
    {/* Control panel */}
    <rect x="170" y="62" width="80" height="20" rx="4" fill="#0d0d22"/>
    <circle cx="185" cy="72" r="4" fill={accent} opacity="0.8" filter="url(#glow-p)"/>
    <rect x="196" y="68" width="40" height="8" rx="2" fill="#1a1a3a"/>
    <rect x="198" y="70" width="24" height="4" rx="1" fill={accent} opacity="0.5"/>
    {/* Brand stripe */}
    <rect x="50" y="85" width="220" height="4" fill={accent} opacity="0.6" filter="url(#glow-p)"/>
    {/* Vent lines */}
    {[0,1,2,3].map(i => <line key={i} x1="60" y1={100+i*8} x2="100" y2={100+i*8} stroke={accent} strokeWidth="0.6" strokeOpacity="0.3"/>)}
  </svg>
)

const CCTVIllustration = ({ accent = '#00D6FF' }: { accent?: string }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <filter id="glow-c">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <radialGradient id="lens-c" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1a4a8a"/>
        <stop offset="60%" stopColor="#0a1a3a"/>
        <stop offset="100%" stopColor="#050515"/>
      </radialGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="160" cy="205" rx="60" ry="6" fill={accent} opacity="0.1"/>
    {/* Mounting bracket */}
    <rect x="148" y="30" width="24" height="50" rx="4" fill="#1a1a2e" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4"/>
    <rect x="140" y="28" width="40" height="10" rx="3" fill="#1a1a2e" stroke={accent} strokeWidth="0.8"/>
    {/* Camera body */}
    <rect x="90" y="100" width="140" height="70" rx="12" fill="#14142c" stroke={accent} strokeWidth="1.2" strokeOpacity="0.7" filter="url(#glow-c)"/>
    {/* Lens housing */}
    <circle cx="120" cy="135" r="28" fill="#0d0d22" stroke={accent} strokeWidth="1.5" filter="url(#glow-c)"/>
    <circle cx="120" cy="135" r="20" fill="url(#lens-c)" stroke={accent} strokeWidth="0.8" strokeOpacity="0.6"/>
    <circle cx="120" cy="135" r="10" fill="#050510" stroke={accent} strokeWidth="0.6" strokeOpacity="0.8"/>
    <circle cx="120" cy="135" r="4" fill={accent} opacity="0.3" filter="url(#glow-c)"/>
    {/* IR LEDs */}
    {[-1, 0, 1].map(i => (
      <circle key={i} cx={120 + i*16} cy="118" r="3" fill={accent} opacity={i === 0 ? 0.9 : 0.5} filter="url(#glow-c)"/>
    ))}
    {/* Status lights */}
    <circle cx="210" cy="120" r="4" fill="#ff4444" opacity="0.8" filter="url(#glow-c)"/>
    <circle cx="210" cy="135" r="4" fill={accent} opacity="0.9" filter="url(#glow-c)"/>
    {/* Scan line effect */}
    <rect x="92" y="135" width="136" height="1" fill={accent} opacity="0.2"/>
    {/* Connectivity port */}
    <rect x="224" y="130" width="10" height="16" rx="2" fill="#0a0a1a" stroke={accent} strokeWidth="0.6"/>
    {/* Detection arc */}
    <path d="M 50 135 Q 90 80, 90 135" stroke={accent} strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 3" fill="none"/>
    <path d="M 30 135 Q 90 60, 90 135" stroke={accent} strokeWidth="0.4" strokeOpacity="0.15" strokeDasharray="4 4" fill="none"/>
  </svg>
)

const AccessoriesIllustration = ({ accent = '#00D6FF' }: { accent?: string }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <filter id="glow-a">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <ellipse cx="160" cy="208" rx="120" ry="7" fill={accent} opacity="0.08"/>
    {/* Keyboard base */}
    <rect x="30" y="130" width="180" height="65" rx="8" fill="#12122a" stroke={accent} strokeWidth="1" strokeOpacity="0.5"/>
    {/* Key rows */}
    {[0,1,2,3].map(row => (
      [0,1,2,3,4,5,6,7].map(col => (
        <rect key={`${row}-${col}`} x={40 + col*20} y={140 + row*13} width="15" height="9" rx="2"
          fill={row === 0 && col < 3 ? accent : '#1a1a3a'}
          opacity={row === 0 && col < 3 ? 0.7 : 1}
          stroke={accent} strokeWidth="0.3" strokeOpacity="0.3"
        />
      ))
    ))}
    {/* RGB strip on keyboard */}
    <rect x="30" y="130" width="180" height="3" rx="1" fill={accent} opacity="0.8" filter="url(#glow-a)"/>
    {/* Mouse */}
    <ellipse cx="255" cy="155" rx="30" ry="45" fill="#12122a" stroke={accent} strokeWidth="1" strokeOpacity="0.6"/>
    <line x1="255" y1="110" x2="255" y2="165" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4"/>
    <circle cx="255" cy="135" r="5" fill={accent} opacity="0.5" filter="url(#glow-a)"/>
    <rect x="245" y="110" width="10" height="20" rx="5" fill={accent} opacity="0.15"/>
    {/* Headset on top-right */}
    <path d="M 200 40 Q 200 20 240 20 Q 280 20 280 40" stroke={accent} strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow-a)"/>
    <circle cx="200" cy="52" r="12" fill="#12122a" stroke={accent} strokeWidth="1" strokeOpacity="0.7"/>
    <circle cx="280" cy="52" r="12" fill="#12122a" stroke={accent} strokeWidth="1" strokeOpacity="0.7"/>
    <circle cx="200" cy="52" r="5" fill={accent} opacity="0.4"/>
    <circle cx="280" cy="52" r="5" fill={accent} opacity="0.4"/>
  </svg>
)

const CustomPCIllustration = ({ accent = '#00D6FF' }: { accent?: string }) => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <filter id="glow-cp">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="body-cp" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a1040"/>
        <stop offset="100%" stopColor="#080818"/>
      </linearGradient>
    </defs>
    <ellipse cx="160" cy="208" rx="110" ry="8" fill={accent} opacity="0.12"/>
    {/* Case body */}
    <rect x="70" y="30" width="180" height="175" rx="10" fill="url(#body-cp)" stroke={accent} strokeWidth="1.5" strokeOpacity="0.7" filter="url(#glow-cp)"/>
    {/* Glass panel */}
    <rect x="85" y="45" width="150" height="145" rx="6" fill={accent} opacity="0.04" stroke={accent} strokeWidth="0.6" strokeOpacity="0.3"/>
    {/* Motherboard area */}
    <rect x="95" y="55" width="130" height="100" rx="4" fill="#0d0d28"/>
    {/* CPU */}
    <rect x="105" y="65" width="40" height="40" rx="3" fill="#1a1a40" stroke={accent} strokeWidth="0.8"/>
    <rect x="112" y="72" width="26" height="26" rx="2" fill="#252550" stroke={accent} strokeWidth="0.5"/>
    <text x="125" y="89" textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace" opacity="0.8">CPU</text>
    {/* RAM sticks */}
    {[0,1].map(i => (
      <rect key={i} x={155 + i*20} y="60" width="14" height="50" rx="2" key={i}
        fill="#1a1a40" stroke={accent} strokeWidth="0.6" strokeOpacity="0.7"/>
    ))}
    {[0,1].map(i => (
      <rect key={`ram-${i}`} x={157 + i*20} y="63" width="10" height="3" rx="1"
        fill={accent} opacity="0.8" filter="url(#glow-cp)"/>
    ))}
    {/* GPU */}
    <rect x="95" y="170" width="130" height="22" rx="4" fill="#1a0a40" stroke={accent} strokeWidth="0.8" strokeOpacity="0.7"/>
    {[0,1,2].map(i => <circle key={i} cx={112 + i*18} cy="181" r="7" fill="#0d0d28" stroke={accent} strokeWidth="0.5" strokeOpacity="0.5"/>)}
    <text x="195" y="184" textAnchor="middle" fill={accent} fontSize="6" fontFamily="monospace" opacity="0.7">RTX</text>
    {/* RGB strips on case edges */}
    <rect x="70" y="30" width="4" height="175" rx="2" fill={accent} opacity="0.9" filter="url(#glow-cp)"/>
    <rect x="70" y="198" width="180" height="4" rx="2" fill={accent} opacity="0.7" filter="url(#glow-cp)"/>
    {/* Fan */}
    <circle cx="215" cy="90" r="22" fill="#0d0d24" stroke={accent} strokeWidth="0.8" strokeOpacity="0.5"/>
    <circle cx="215" cy="90" r="8" fill="#1a1a3a" stroke={accent} strokeWidth="0.6"/>
    {[0,60,120,180,240,300].map(a => (
      <line key={a} x1="215" y1="90"
        x2={215 + 20*Math.cos(a*Math.PI/180)} y2={90 + 20*Math.sin(a*Math.PI/180)}
        stroke={accent} strokeWidth="0.8" strokeOpacity="0.4"/>
    ))}
  </svg>
)

// ─── Product data ─────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 'laptops',
    title: 'Laptops',
    subtitle: 'Premium Performance Machines',
    description: 'High-performance laptops built for creators, gamers, and professionals who demand excellence.',
    color: '#00D6FF',
    Icon: LaptopIllustration,
    slides: [
      {
        name: 'ASUS ROG Strix G16',
        specs: 'Intel Core i9 13th Gen  •  NVIDIA RTX 4070  •  32GB DDR5 RAM  •  1TB NVMe SSD',
        features: ['Advanced ray-tracing GPU', 'Per-key RGB keyboard', '16" QHD 240Hz display', 'MUX Switch for pure GPU output'],
      },
      {
        name: 'MacBook Pro M3 Max',
        specs: 'Apple M3 Max Chip  •  48GB Unified Memory  •  1TB SSD  •  16-core GPU',
        features: ['Liquid Retina XDR display', 'ProMotion 120Hz', 'Up to 22hr battery life', 'MagSafe 3 charging'],
      },
      {
        name: 'Dell XPS 15 Ultra',
        specs: 'Intel Core i7 13th Gen  •  NVIDIA RTX 3060  •  32GB RAM  •  512GB SSD',
        features: ['OLED touch display', 'InfinityEdge ultra-thin bezel', 'Carbon fiber chassis', 'Thunderbolt 4 x2'],
      },
    ],
  },
  {
    id: 'desktops',
    title: 'Desktops',
    subtitle: 'Powerhouse Workstations',
    description: 'Dominate every task with our curated selection of desktop systems engineered for peak performance.',
    color: '#0080FF',
    Icon: DesktopIllustration,
    slides: [
      {
        name: 'Alienware Aurora R16',
        specs: 'Intel Core i9-14900KF  •  NVIDIA RTX 4090  •  64GB DDR5  •  2TB NVMe',
        features: ['360° liquid cooling', 'Tool-free upgradeable chassis', 'USB 3.2 Gen 2 front ports', 'WiFi 6E built-in'],
      },
      {
        name: 'HP OMEN 45L Tower',
        specs: 'AMD Ryzen 9 7900X  •  NVIDIA RTX 4080  •  32GB RAM  •  1TB SSD',
        features: ['Cryo Chamber cooling system', 'OMEN Tempest cooling', 'VR-ready performance', 'Upgradeable tool-free design'],
      },
      {
        name: 'iMac 24" M3',
        specs: 'Apple M3 Chip  •  8-core CPU  •  10-core GPU  •  24GB RAM',
        features: ['4.5K Retina display', 'Centre Stage camera', '6-speaker sound system', 'Touch ID Magic Keyboard'],
      },
    ],
  },
  {
    id: 'printers',
    title: 'Printers',
    subtitle: 'Precision Printing Solutions',
    description: 'From office workhorses to creative powerhouses, our printer range delivers flawless output every time.',
    color: '#00D6FF',
    Icon: PrinterIllustration,
    slides: [
      {
        name: 'Canon imagePROGRAF PRO',
        specs: '24-inch large-format  •  12-color LUCIA PRO inks  •  2400 dpi  •  USB & LAN',
        features: ['Borderless printing up to A1', 'Professional color accuracy', 'Large media roll support', 'Built-in print server'],
      },
      {
        name: 'Epson EcoTank L8180',
        specs: 'A3+ format  •  6-color cartridge-free  •  5760 dpi  •  WiFi + Ethernet',
        features: ['Ultra-low cost per page', 'High-capacity ink tanks', 'Wireless printing & scanning', 'CD/DVD printing support'],
      },
      {
        name: 'HP Color LaserJet Pro',
        specs: 'A4 laser  •  600 dpi  •  33ppm  •  WiFi Direct + USB + Ethernet',
        features: ['JetIntelligence toner', 'Automatic duplex printing', 'HP Smart app control', 'Energy Star certified'],
      },
    ],
  },
  {
    id: 'cctv',
    title: 'CCTV Cameras',
    subtitle: 'Smart Surveillance Systems',
    description: 'Next-generation security cameras with AI-powered detection, 24/7 monitoring, and crystal-clear footage.',
    color: '#00AAFF',
    Icon: CCTVIllustration,
    slides: [
      {
        name: 'Dahua Pro 4K Turret',
        specs: '4K Ultra HD  •  IR 50m Night Vision  •  H.265+  •  Smart Motion Detection',
        features: ['AI-powered human/vehicle detection', 'Color night vision', 'IP67 weatherproof', 'PoE powered'],
      },
      {
        name: 'Hikvision AcuSense 5MP',
        specs: '5MP resolution  •  60m IR range  •  Deep Learning AI  •  WDR 130dB',
        features: ['AcuSense false alarm filtering', 'Face capture & search', 'Strobe light & audio alarm', '4K HDMI output'],
      },
      {
        name: 'CP Plus NVR Kit 16CH',
        specs: '16-channel NVR  •  8MP cameras  •  4TB HDD  •  Remote viewing',
        features: ['16-channel simultaneous recording', 'Mobile app live view', 'H.265 compression', 'Auto email alerts'],
      },
    ],
  },
  {
    id: 'accessories',
    title: 'Accessories',
    subtitle: 'Premium Peripherals & Add-ons',
    description: 'Elevate your tech setup with carefully selected accessories that blend performance with premium aesthetics.',
    color: '#00D6FF',
    Icon: AccessoriesIllustration,
    slides: [
      {
        name: 'Logitech MX Master 3S',
        specs: 'Wireless  •  Bluetooth + USB  •  8000 dpi  •  Multi-device (3 devices)',
        features: ['Ultra-quiet MagSpeed scroll', 'Ergonomic thumb rest', 'USB-C fast charging', 'Works on any surface'],
      },
      {
        name: 'Keychron Q5 Pro',
        specs: 'Mechanical keyboard  •  QMK/VIA  •  Gasket mount  •  Wireless + USB-C',
        features: ['Premium POM plate dampening', 'Fully programmable', 'Double-shot PBT keycaps', 'RGB backlighting'],
      },
      {
        name: 'Sony WH-1000XM5',
        specs: 'Over-ear wireless  •  30hr battery  •  8 mic array  •  Multipoint Bluetooth',
        features: ['Industry-leading ANC', 'Precise Voice Pickup', '30hr playback with ANC on', 'Speak-to-Chat auto-pause'],
      },
    ],
  },
  {
    id: 'custom-pc',
    title: 'Custom PC Builds',
    subtitle: 'Tailor-Made Dream Machines',
    description: 'We build custom rigs precisely to your specs — from esports champions to creative powerhouses.',
    color: '#6600FF',
    Icon: CustomPCIllustration,
    slides: [
      {
        name: 'Ultra Gaming Beast',
        specs: 'AMD Ryzen 9 7950X  •  RTX 4090 24GB  •  64GB DDR5  •  2TB PCIe 4.0 NVMe',
        features: ['360mm custom liquid cooling loop', 'Full RGB synchronization', 'Cable-managed premium build', '850W 80+ Platinum PSU'],
      },
      {
        name: 'Creator Workstation',
        specs: 'Intel Core i9-14900K  •  RTX 4080 Super  •  128GB ECC RAM  •  4TB Storage',
        features: ['Dual NVMe RAID setup', 'Professional color-accurate monitor ready', 'Thunderbolt 4 expansion', 'Silent cooling profile'],
      },
      {
        name: 'Budget Esports Rig',
        specs: 'AMD Ryzen 7 7700  •  RTX 4060 Ti  •  32GB DDR5  •  1TB NVMe',
        features: ['High FPS for all esports titles', 'Efficient power consumption', 'Stylish mid-tower chassis', '3-year build warranty'],
      },
    ],
  },
]

// ─── Modal Component ──────────────────────────────────────────────────────────

const ProductModal = ({
  product,
  onClose,
}: {
  product: typeof PRODUCTS[0]
  onClose: () => void
}) => {
  const { Icon } = product

  const handleGetQuote = () => {
    onClose()
    setTimeout(() => {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 400)
  }

  const handleContactUs = () => {
    const msg = encodeURIComponent(`Hello E-Shop Computers, I'm interested in your ${product.title}.`)
    window.open(`https://wa.me/?text=${msg}`, '_blank')
  }

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Modal panel */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[96vw] max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 bg-[#06060f]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,214,255,0.12)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Neon top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${product.color}, transparent)` }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <p className="text-xs uppercase tracking-[0.3em] mb-1" style={{ color: product.color }}>{product.subtitle}</p>
          <h2 className="text-3xl font-bold text-white">{product.title}</h2>
          <p className="text-white/50 text-sm mt-1">{product.description}</p>
        </div>

        {/* Swiper */}
        <div className="px-6 pb-6">
          <style>{`
            .product-swiper .swiper-button-next,
            .product-swiper .swiper-button-prev {
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: rgba(255,255,255,0.06);
              border: 1px solid rgba(255,255,255,0.12);
              backdrop-filter: blur(12px);
              color: white;
              transition: all 0.25s;
            }
            .product-swiper .swiper-button-next:hover,
            .product-swiper .swiper-button-prev:hover {
              background: ${product.color}22;
              border-color: ${product.color}66;
              color: ${product.color};
              box-shadow: 0 0 20px ${product.color}44;
            }
            .product-swiper .swiper-button-next::after,
            .product-swiper .swiper-button-prev::after {
              font-size: 14px;
              font-weight: 700;
            }
            .product-swiper .swiper-pagination-bullet {
              background: rgba(255,255,255,0.25);
              opacity: 1;
              transition: all 0.25s;
            }
            .product-swiper .swiper-pagination-bullet-active {
              background: ${product.color};
              box-shadow: 0 0 8px ${product.color};
              width: 20px;
              border-radius: 4px;
            }
          `}</style>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            className="product-swiper !pb-10"
          >
            {product.slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col md:flex-row gap-6 rounded-xl border border-white/5 bg-white/[0.02] p-5 min-h-[320px]">
                  {/* Image side */}
                  <div className="w-full md:w-[45%] flex items-center justify-center p-4 rounded-xl relative overflow-hidden"
                    style={{ background: `radial-gradient(ellipse at center, ${product.color}12, transparent 70%)` }}>
                    {/* Floating glow */}
                    <div className="absolute inset-0 rounded-xl"
                      style={{ boxShadow: `inset 0 0 40px ${product.color}15` }} />
                    {/* Grid lines */}
                    <div className="absolute inset-0 rounded-xl opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(${product.color}30 1px, transparent 1px), linear-gradient(90deg, ${product.color}30 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                      }} />
                    <motion.div
                      animate={{ y: [-6, 6, -6] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-10 w-full max-w-[260px] h-[180px]"
                    >
                      <Icon accent={product.color} />
                    </motion.div>
                  </div>

                  {/* Content side */}
                  <div className="w-full md:w-[55%] flex flex-col justify-center gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: product.color }}>
                        Model {i + 1} of {product.slides.length}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">{slide.name}</h3>
                      <p className="text-white/40 text-xs mt-2 leading-relaxed">{slide.specs}</p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-2">
                      {slide.features.map((feat, fi) => (
                        <div key={fi} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: `${product.color}22`, border: `1px solid ${product.color}55` }}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={product.color} strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/70 text-sm">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={handleGetQuote}
                        className="flex-1 py-3 px-5 rounded-full text-sm font-semibold text-black transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}, #0050FF)`,
                          boxShadow: `0 0 20px ${product.color}55`,
                        }}
                      >
                        Get Quote
                      </button>
                      <button
                        onClick={handleContactUs}
                        className="flex-1 py-3 px-5 rounded-full text-sm font-semibold text-white border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]"
                        style={{ boxShadow: `0 0 15px rgba(255,255,255,0.04)` }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Contact Us
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const BestDeals = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeProduct, setActiveProduct] = useState<typeof PRODUCTS[0] | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const openModal = useCallback((product: typeof PRODUCTS[0]) => {
    setActiveProduct(product)
  }, [])

  const closeModal = useCallback(() => {
    setActiveProduct(null)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      '.deal-card',
      { opacity: 0, y: 60, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <section id="deals" ref={sectionRef} className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#07070f] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#00D6FF]/4 rounded-full blur-[140px] pointer-events-none" />

        <div className="container relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-caption text-[#00D6FF] tracking-widest mb-4">PREMIUM PRODUCTS</p>
            <h2 className="text-headline text-gradient-primary mb-5">Our Product Range</h2>
            <p className="text-body-large max-w-2xl mx-auto text-white/60">
              Explore our curated selection of premium technology — click any category to view our full lineup.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PRODUCTS.map(product => {
              const { Icon } = product
              const isHovered = hoveredId === product.id

              return (
                <motion.div
                  key={product.id}
                  className="deal-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-500"
                  style={{
                    boxShadow: isHovered
                      ? `0 0 40px ${product.color}22, 0 20px 60px rgba(0,0,0,0.4)`
                      : '0 4px 24px rgba(0,0,0,0.3)',
                    borderColor: isHovered ? `${product.color}44` : 'rgba(255,255,255,0.06)',
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => openModal(product)}
                >
                  {/* Top neon accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${product.color}, transparent)`,
                      opacity: isHovered ? 1 : 0.4,
                    }}
                  />

                  {/* Glow behind image */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[180px] transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top, ${product.color}12, transparent 70%)`,
                      opacity: isHovered ? 1 : 0.5,
                    }}
                  />

                  {/* Product Illustration */}
                  <div className="relative h-[180px] flex items-center justify-center p-4 overflow-hidden">
                    {/* Subtle grid */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(${product.color}40 1px, transparent 1px), linear-gradient(90deg, ${product.color}40 1px, transparent 1px)`,
                        backgroundSize: '28px 28px',
                      }}
                    />
                    <motion.div
                      className="w-full max-w-[240px] h-[150px] relative z-10"
                      animate={isHovered ? { y: [-4, 4, -4] } : { y: 0 }}
                      transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
                    >
                      <Icon accent={product.color} />
                    </motion.div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 pt-2">
                    {/* Divider */}
                    <div className="w-full h-[1px] bg-white/5 mb-5" />

                    <p className="text-[10px] uppercase tracking-[0.25em] mb-1" style={{ color: product.color }}>
                      {product.subtitle}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Explore CTA */}
                    <button
                      className="flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                      style={{ color: product.color }}
                      onClick={e => { e.stopPropagation(); openModal(product) }}
                    >
                      <span>Explore {product.slides.length} Models</span>
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                        transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0, ease: 'easeInOut' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </button>
                  </div>

                  {/* Corner glow dot */}
                  <div
                    className="absolute bottom-5 right-5 w-2 h-2 rounded-full transition-all duration-500"
                    style={{
                      background: product.color,
                      boxShadow: isHovered ? `0 0 12px ${product.color}` : 'none',
                      opacity: isHovered ? 1 : 0.4,
                    }}
                  />
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <button
              className="btn-primary"
              onClick={() => {
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get in Touch for Custom Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Modal Portal */}
      <AnimatePresence>
        {activeProduct && (
          <ProductModal product={activeProduct} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  )
}

export default BestDeals
