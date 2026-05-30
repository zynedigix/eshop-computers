// src/data/premiumProducts.ts

export interface ProductSlide {
  img: string; // path to image (PNG/WebP)
  name: string;
  specs: string;
  price: string;
  features: string[];
}

export interface ProductCategory {
  id: string; // e.g., 'laptops'
  title: string;
  description: string;
  thumbnail: string; // image shown on the card
  slides: ProductSlide[];
}

export const premiumProducts: ProductCategory[] = [
  {
    id: 'laptops',
    title: 'Laptops',
    description: 'Premium high‑performance laptops for creators and gamers.',
    thumbnail: '/assets/products/laptop_thumb.png',
    slides: [
      {
        img: '/assets/products/laptop1.png',
        name: 'ASUS ROG Strix',
        specs: 'Intel i9 • RTX 4070 • 32GB RAM',
        price: 'Starting from ₹1,45,000',
        features: ['Ray‑tracing GPU', 'RGB keyboard', '15.6” 4K display'],
      },
      {
        img: '/assets/products/laptop2.png',
        name: 'MacBook Pro M3',
        specs: 'Apple M3 • 18GB RAM • 512GB SSD',
        price: 'Starting from ₹1,75,000',
        features: ['Retina display', 'ProMotion 120Hz', 'Long‑life battery'],
      },
      {
        img: '/assets/products/laptop3.png',
        name: 'Dell XPS 15',
        specs: 'Intel i7 • RTX 3060 • 16GB RAM',
        price: 'Starting from ₹1,25,000',
        features: ['InfinityEdge bezel', 'Carbon fiber chassis', 'OLED touch screen'],
      },
    ],
  },
  {
    id: 'desktops',
    title: 'Desktops',
    description: 'Powerful desktop rigs for workstations and gaming.',
    thumbnail: '/assets/products/desktop_thumb.png',
    slides: [
      {
        img: '/assets/products/desktop1.png',
        name: 'Alienware Aurora R15',
        specs: 'Intel i9 • RTX 4090 • 64GB RAM',
        price: 'Starting from ₹2,80,000',
        features: ['Liquid cooling', 'RGB chassis', 'Upgradeable'],
      },
      {
        img: '/assets/products/desktop2.png',
        name: 'HP Omen 45L',
        specs: 'AMD Ryzen 9 • RTX 3080 • 32GB RAM',
        price: 'Starting from ₹2,30,000',
        features: ['Tool‑free upgrade', 'Silent fans', 'VR ready'],
      },
      {
        img: '/assets/products/desktop3.png',
        name: 'Custom Gaming Rig',
        specs: 'AMD Threadripper • RTX 4090 • 128GB RAM',
        price: 'Starting from ₹4,50,000',
        features: ['Water‑cooled', 'RGB lighting', 'Future‑proof'],
      },
    ],
  },
  {
    id: 'printers',
    title: 'Printers',
    description: 'High‑quality printers for office and creative work.',
    thumbnail: '/assets/products/printer_thumb.png',
    slides: [
      {
        img: '/assets/products/printer1.png',
        name: 'Canon imagePROGRAF',
        specs: '24‑inch • 1200 dpi • UV‑curable inks',
        price: 'Starting from ₹1,10,000',
        features: ['Borderless prints', 'Color accuracy', 'Large media support'],
      },
      {
        img: '/assets/products/printer2.png',
        name: 'Epson EcoTank Pro',
        specs: 'A4 • Cartridge‑free • 4800 dpi',
        price: 'Starting from ₹85,000',
        features: ['Low cost per page', 'High speed', 'Wireless'],
      },
    ],
  },
  {
    id: 'cctv',
    title: 'CCTV Cameras',
    description: 'Smart surveillance solutions for homes and businesses.',
    thumbnail: '/assets/products/cctv_thumb.png',
    slides: [
      {
        img: '/assets/products/cctv1.png',
        name: 'Arlo Ultra 2K',
        specs: '4K HDR • 180° view • Night vision',
        price: 'Starting from ₹45,000',
        features: ['Wire‑free', 'AI detection', 'Color night vision'],
      },
      {
        img: '/assets/products/cctv2.png',
        name: 'Nest Cam IQ',
        specs: '1080p • Facial recognition • Indoor/Outdoor',
        price: 'Starting from ₹38,000',
        features: ['Smart alerts', 'Two‑way audio', 'Secure streaming'],
      },
    ],
  },
  {
    id: 'accessories',
    title: 'Accessories',
    description: 'Premium accessories to complement your tech ecosystem.',
    thumbnail: '/assets/products/accessories_thumb.png',
    slides: [
      {
        img: '/assets/products/accessories1.png',
        name: 'Logitech MX Master 3S',
        specs: 'Wireless • Multi‑device • Ultra‑quiet clicks',
        price: '₹7,500',
        features: ['Customizable buttons', 'Ergonomic', 'Fast scrolling'],
      },
      {
        img: '/assets/products/accessories2.png',
        name: 'Apple Magic Keyboard',
        specs: 'Scissor‑mechanism • Backlit • USB‑C',
        price: '₹9,999',
        features: ['Low‑profile keys', 'Premium aluminum', 'Seamless macOS integration'],
      },
    ],
  },
  {
    id: 'custom-pc',
    title: 'Custom PC Builds',
    description: 'Tailor‑made high‑performance systems built to your specifications.',
    thumbnail: '/assets/products/custompc_thumb.png',
    slides: [
      {
        img: '/assets/products/custompc1.png',
        name: 'Ultra‑Gaming Beast',
        specs: 'AMD Ryzen 9 • RTX 4090 • 32GB DDR5',
        price: 'Starting from ₹3,20,000',
        features: ['Liquid cooling', 'RGB lighting', 'Cable‑managed'],
      },
      {
        img: '/assets/products/custompc2.png',
        name: 'Professional Workstation',
        specs: 'Intel Xeon • Quadro RTX • 64GB ECC',
        price: 'Starting from ₹4,75,000',
        features: ['ECC memory', 'Dual 4K outputs', 'Reliability certified'],
      },
    ],
  },
];
