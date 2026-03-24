/** @typedef {{ id: string; author: string; rating: number; text: string; date: string }} Review */
/** @typedef {{ id: string; name: string; category: string; price: number; rating: number; reviewCount: number; description: string; images: string[]; reviews: Review[] }} Product */

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'accessories', label: 'Accessories' },
];

/** @type {Product[]} */
export const products = [
  {
    id: 'lunar-coat',
    name: 'Lunar Wool Coat',
    category: 'fashion',
    price: 289,
    rating: 4.8,
    reviewCount: 124,
    description:
      'Architectural silhouette in Italian wool blend. Matte black hardware, hidden placket, and a fluid drape engineered for city nights.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85',
    ],
    reviews: [
      { id: 'r1', author: 'Maya K.', rating: 5, text: 'Feels like a runway piece. Worth every dollar.', date: '2026-02-12' },
      { id: 'r2', author: 'Jon D.', rating: 4, text: 'Perfect weight for winter without bulk.', date: '2026-01-28' },
    ],
  },
  {
    id: 'noir-sneaker',
    name: 'Noir Velocity Runner',
    category: 'shoes',
    price: 189,
    rating: 4.9,
    reviewCount: 892,
    description:
      'Responsive foam midsole, carbon-infused plate, and a knit upper that breathes during long days on your feet.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&q=85',
    ],
    reviews: [
      { id: 'r3', author: 'Alex P.', rating: 5, text: 'Best daily driver sneaker I own.', date: '2026-03-01' },
    ],
  },
  {
    id: 'orbit-watch',
    name: 'Orbit Titanium Chronograph',
    category: 'accessories',
    price: 459,
    rating: 4.7,
    reviewCount: 203,
    description:
      'Sapphire crystal, ceramic bezel, and a luminous dial tuned for clarity at a glance. Water resistant to 100m.',
    images: [
      'https://images.unsplash.com/photo-1523275330224-f4d3e0fd6c2d?w=900&q=85',
      'https://images.unsplash.com/photo-1524592094714-0f0654ae2037?w=900&q=85',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=900&q=85',
    ],
    reviews: [
      { id: 'r4', author: 'Sam R.', rating: 5, text: 'Premium finishing — photos do not do it justice.', date: '2026-02-20' },
    ],
  },
  {
    id: 'pulse-laptop',
    name: 'Pulsebook Pro 16"',
    category: 'electronics',
    price: 2299,
    rating: 4.9,
    reviewCount: 1567,
    description:
      'Liquid-retina display, studio-grade speakers, and all-day battery for creators who refuse to compromise.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=85',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&q=85',
    ],
    reviews: [
      { id: 'r5', author: 'Elena V.', rating: 5, text: 'Silent, fast, and the screen is unreal.', date: '2026-03-10' },
    ],
  },
  {
    id: 'aurora-headphones',
    name: 'Aurora ANC Headphones',
    category: 'electronics',
    price: 349,
    rating: 4.6,
    reviewCount: 641,
    description:
      'Adaptive noise cancellation with spatial audio profiles. Memory foam cushions wrapped in vegan leather.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=85',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=85',
    ],
    reviews: [
      { id: 'r6', author: 'Chris L.', rating: 4, text: 'ANC is strong; case could be smaller.', date: '2026-01-15' },
    ],
  },
  {
    id: 'velvet-dress',
    name: 'Velvet Eclipse Dress',
    category: 'fashion',
    price: 198,
    rating: 4.5,
    reviewCount: 88,
    description:
      'Bias-cut velvet with a subtle sheen. Adjustable straps and invisible zipper for a clean line.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&q=85',
    ],
    reviews: [
      { id: 'r7', author: 'Priya S.', rating: 5, text: 'Stunning for evening events.', date: '2026-02-02' },
    ],
  },
  {
    id: 'summit-boot',
    name: 'Summit Leather Boot',
    category: 'shoes',
    price: 268,
    rating: 4.7,
    reviewCount: 312,
    description:
      'Goodyear welted, full-grain leather, and a stacked heel with shock-absorbing insole.',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=900&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900&q=85',
      'https://images.unsplash.com/photo-1460353581641-7b9edc6705f0?w=900&q=85',
    ],
    reviews: [
      { id: 'r8', author: 'Leo M.', rating: 5, text: 'Break-in was quick. Solid build.', date: '2026-01-08' },
    ],
  },
  {
    id: 'prism-bag',
    name: 'Prism Crossbody',
    category: 'accessories',
    price: 142,
    rating: 4.4,
    reviewCount: 56,
    description:
      'Sculpted hardware and soft pebbled leather. Fits phone, keys, and minimal wallet with magnetic closure.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=85',
      'https://images.unsplash.com/photo-1564422170193-89e3d9d9b7a5?w=900&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=85',
    ],
    reviews: [
      { id: 'r9', author: 'Nina F.', rating: 4, text: 'Chic and compact.', date: '2025-12-19' },
    ],
  },
  {
    id: 'flux-camera',
    name: 'Flux Mirrorless Kit',
    category: 'electronics',
    price: 1899,
    rating: 4.8,
    reviewCount: 421,
    description:
      'Full-frame sensor, in-body stabilization, and a compact lens system built for travel storytellers.',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=85',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85',
    ],
    reviews: [
      { id: 'r10', author: 'Omar H.', rating: 5, text: 'Colors straight out of camera are magic.', date: '2026-03-05' },
    ],
  },
  {
    id: 'silk-shirt',
    name: 'Silk Meridian Shirt',
    category: 'fashion',
    price: 128,
    rating: 4.3,
    reviewCount: 67,
    description:
      'Sand-washed silk with mother-of-pearl buttons. Relaxed fit with a refined collar roll.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=85',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=900&q=85',
    ],
    reviews: [
      { id: 'r11', author: 'Taylor B.', rating: 4, text: 'Luxurious feel — dry clean only.', date: '2026-02-14' },
    ],
  },
  {
    id: 'chrome-loafer',
    name: 'Chrome Penny Loafer',
    category: 'shoes',
    price: 215,
    rating: 4.6,
    reviewCount: 144,
    description:
      'Hand-polished calfskin with a flexible leather sole. Designed for boardrooms and gallery openings.',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=900&q=85',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=900&q=85',
      'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=900&q=85',
    ],
    reviews: [
      { id: 'r12', author: 'Jordan W.', rating: 5, text: 'Sharp silhouette.', date: '2025-11-30' },
    ],
  },
  {
    id: 'halo-ring',
    name: 'Halo Signet Ring',
    category: 'accessories',
    price: 96,
    rating: 4.2,
    reviewCount: 39,
    description:
      'Sterling silver with a brushed face and micro-pavé halo. Hypoallergenic inner band.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85',
    ],
    reviews: [
      { id: 'r13', author: 'Riley C.', rating: 4, text: 'Subtle sparkle.', date: '2026-01-22' },
    ],
  },
];

export const PRICE_BOUNDS = products.reduce(
  (acc, p) => ({
    min: Math.min(acc.min, p.price),
    max: Math.max(acc.max, p.price),
  }),
  { min: Infinity, max: 0 }
);

/** @param {string} id */
export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}
