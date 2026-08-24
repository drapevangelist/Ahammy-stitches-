import { GarmentSilhouette, FabricSwatch, TrackingOrder } from '../types';

export const EDITS_DATA = [
  {
    id: 'wedding',
    num: '01',
    title: 'The Wedding Edit',
    tagline: 'Monumental presence for unforgettable unions',
    description: 'Aso-ebi, three-piece regal agbadas, and sculpted gowns crafted for milestones where every stitch speaks.',
    leadTime: '10–14 working days',
    coverAccent: 'from-[#C9A94C]/20 to-transparent',
    silhouettes: ['agbada-regal', 'gown-sculpted', 'groom-senator'],
    highlights: ['Hand-drawn breastplate embroidery', 'Weighted hem drape', 'Custom monograms & crests']
  },
  {
    id: 'executive',
    num: '02',
    title: 'The Executive Edit',
    tagline: 'Precision tailoring with quiet architectural authority',
    description: 'Structured double-breasted suits, safari jackets, and minimalist senator cuts engineered for the modern board member.',
    leadTime: '7–10 working days',
    coverAccent: 'from-[#8C7A34]/20 to-transparent',
    silhouettes: ['executive-suit', 'senator-minimal', 'safari-structured'],
    highlights: ['Half-canvas chest construction', 'Crease-resistant luxury blends', 'Hidden passport & card compartments']
  },
  {
    id: 'traditional',
    num: '03',
    title: 'The Traditional Edit',
    tagline: 'Ancestral elegance calibrated for contemporary ease',
    description: 'Heritage kaftans, etibo shirts, and modern wrapper silhouettes cut with ancestral pride and immaculate finishing.',
    leadTime: '6–8 working days',
    coverAccent: 'from-[#C9A94C]/15 to-transparent',
    silhouettes: ['kaftan-heritage', 'etibo-classic', 'agbada-flowing'],
    highlights: ['Contrast piped plackets', 'Authentic geometric collar stitches', 'Breathable organic cotton bases']
  },
  {
    id: 'everyday',
    num: '04',
    title: 'The Everyday Edit',
    tagline: 'Unforced sophistication in effortless separates',
    description: 'Relaxed two-piece linen sets, resort shirts, and casual tunics made for weekend getaways and effortless evenings.',
    leadTime: '4–6 working days',
    coverAccent: 'from-[#F3EAD2]/10 to-transparent',
    silhouettes: ['twopiece-resort', 'tunic-relaxed'],
    highlights: ['Pure washed European linen', 'Elasticated tailored waistbands', 'Double-stitched stress points']
  }
];

export const GARMENTS: GarmentSilhouette[] = [
  {
    id: 'agbada-regal',
    name: 'The Sovereign 3-Piece Agbada',
    category: 'wedding',
    tagline: 'Heavy drape with monumental hand-guided metallic thread embroidery',
    description: 'The definitive Nigerian statement garment. Includes the flowing grand agbada robe, tailored internal kaftan top, and tapered sokoto trousers.',
    basePriceNGN: 185000,
    basePriceUSD: 165,
    turnaroundDays: 12,
    tags: ['Agbada', 'Wedding', 'Regal', '3-Piece'],
    fabricSuggestions: ['Super 160s Cashmere Wool', 'Heavy Swiss Voile', 'Brocade Damask'],
    svgType: 'agbada',
    details: {
      cut: 'Monumental 60-inch wing span, weighted shoulder pleat',
      embroidery: 'High-density chain stitch with gold thread accents',
      occasion: 'Traditional Weddings, Coronations, State Galas',
      origin: 'Bespoke Atelier, Port Harcourt'
    }
  },
  {
    id: 'executive-suit',
    name: 'The Obsidian Executive Suit',
    category: 'executive',
    tagline: 'Peak lapel, tailored waist suppression and structured shoulder roll',
    description: 'A sharp two-piece or three-piece corporate suit engineered with half-canvas construction to mold to your silhouette effortlessly over time.',
    basePriceNGN: 195000,
    basePriceUSD: 175,
    turnaroundDays: 10,
    tags: ['Executive', 'Suit', 'Boardroom', 'Structured'],
    fabricSuggestions: ['Italian Super 150s Merino Wool', 'Dormeuil Tropical Blend'],
    svgType: 'suit',
    details: {
      cut: 'Italian-English hybrid silhouette with tapered flat-front trousers',
      embroidery: 'Hand-sewn milanese buttonhole & pick-stitched lapels',
      occasion: 'Board meetings, Keynote presentations, Black-Tie dinners',
      origin: 'Ahammy Stitches Savile-inspired cut'
    }
  },
  {
    id: 'senator-minimal',
    name: 'The Port Harcourt Signature Kaftan',
    category: 'traditional',
    tagline: 'Sharp collar, geometric placket and clean tapered leg',
    description: 'Our most sought-after signature design. Sleek mandarin collar, hidden magnetic button placket, and subtle tone-on-tone stitch geometry.',
    basePriceNGN: 95000,
    basePriceUSD: 85,
    turnaroundDays: 7,
    tags: ['Kaftan', 'Senator', 'Signature', '2-Piece'],
    fabricSuggestions: ['Cashmere Wool Blend', 'High-Count Egyptian Cotton', 'Textured Crepe'],
    svgType: 'kaftan',
    details: {
      cut: 'Fitted torso, contoured back yoke, ankle-grazing trousers',
      embroidery: 'Subtle micro-stitch placket detailing',
      occasion: 'Executive Fridays, Church services, Intimate celebrations',
      origin: 'Hand-finished in Rivers State'
    }
  },
  {
    id: 'gown-sculpted',
    name: 'The Empress Sculpted Gown',
    category: 'wedding',
    tagline: 'Corseted waistline with cascading floor-length drape',
    description: 'An architectural evening gown blending rich African textures with couture draping techniques. Accented with hand-applied beaded motifs.',
    basePriceNGN: 220000,
    basePriceUSD: 195,
    turnaroundDays: 14,
    tags: ['Gown', 'Evening', 'Bridal Guest', 'Couture'],
    fabricSuggestions: ['Duchess Silk Satin', 'Metallic Brocade', 'Italian Velvet'],
    svgType: 'gown',
    details: {
      cut: 'Internal bone corsetry with floor-skimming fishtail train',
      embroidery: 'Hand-beaded crystals along neckline and hip contour',
      occasion: 'Receptions, Red Carpets, Milestone Anniversaries',
      origin: 'Bespoke Couture Line'
    }
  },
  {
    id: 'twopiece-resort',
    name: 'The Riviera Two-Piece Linen Set',
    category: 'everyday',
    tagline: 'Camp collar resort shirt with drawstring tapered trousers',
    description: 'Unstructured luxury for travel and weekends. Made from pure pre-washed European linen that softens with every wear.',
    basePriceNGN: 75000,
    basePriceUSD: 68,
    turnaroundDays: 5,
    tags: ['Resort', 'Linen', 'Two-Piece', 'Casual'],
    fabricSuggestions: ['Pure Washed Linen', 'Breathable Slub Cotton'],
    svgType: 'twopiece',
    details: {
      cut: 'Relaxed drop-shoulder fit, drawstring waist with metal aglets',
      embroidery: 'Contrast chain-stitch pocket monogram',
      occasion: 'Resort vacations, Sunday brunches, Private yacht gatherings',
      origin: 'Casual Bespoke line'
    }
  }
];

export const FABRIC_SWATCHES: FabricSwatch[] = [
  {
    id: 'cashmere-obsidian',
    name: 'Imperial Cashmere Wool (Midnight Obsidian)',
    material: '85% Cashmere, 15% Fine Wool',
    origin: 'Biella, Northern Italy',
    texture: 'Ultra-soft, subtle matte sheen with exceptional drape',
    weight: '280 GSM (All-Season)',
    colorHex: '#121214',
    accentColor: '#C9A94C',
    description: 'The holy grail for structured Agbadas and Kaftans. Resists wrinkles throughout long ceremonies.',
    suitableFor: ['Sovereign Agbada', 'Signature Kaftan', 'Executive Suit'],
    premiumTier: 'Luxury'
  },
  {
    id: 'wool-sandgold',
    name: 'Super 150s Tropical Wool (Desert Sand & Gold)',
    material: '100% Virgin Worsted Wool',
    origin: 'Huddersfield, England',
    texture: 'Crisp hand feel, high breathability in tropical heat',
    weight: '240 GSM (Tropical Light)',
    colorHex: '#C5A059',
    accentColor: '#141009',
    description: 'Engineered specifically for warm West African climates, keeping its sharp crease under high humidity.',
    suitableFor: ['Executive Suit', 'Safari Jacket', 'Modern Senator'],
    premiumTier: 'Ultra-Bespoke'
  },
  {
    id: 'swiss-emerald',
    name: 'High-Density Swiss Voile (Emerald Pine)',
    material: '100% Giza Long-Staple Cotton',
    origin: 'St. Gallen, Switzerland',
    texture: 'Featherweight, silky cool touch, rich dye penetration',
    weight: '160 GSM',
    colorHex: '#1B382B',
    accentColor: '#C9A94C',
    description: 'Lustrous cotton weave that holds embroidery stitches without puckering.',
    suitableFor: ['Sovereign Agbada', 'Traditional Kaftan'],
    premiumTier: 'Luxury'
  },
  {
    id: 'brocade-wine',
    name: 'Damask Jacquard Brocade (Burgundy Wine & Bronze)',
    material: 'Silk & Metallic Filament Weave',
    origin: 'Lyon, France / Lagos Artisan Looms',
    texture: 'Embossed floral geometric relief with light-catching luster',
    weight: '320 GSM (Heavy Structure)',
    colorHex: '#4A121E',
    accentColor: '#C9A94C',
    description: 'Designed for wedding celebrants and grand traditional entries. Holds an unmatched sculptural silhouette.',
    suitableFor: ['Wedding Agbada', 'Empress Gown', 'Celebrant 2-Piece'],
    premiumTier: 'Ultra-Bespoke'
  },
  {
    id: 'crepe-cream',
    name: 'Heavy Italian Silk Crepe (Pristine Cream)',
    material: '92% Silk, 8% Elastane',
    origin: 'Como, Italy',
    texture: 'Fluid liquid drape, heavy fall, soothing matte texture',
    weight: '260 GSM',
    colorHex: '#F0E6CD',
    accentColor: '#4A3B22',
    description: 'A dreamy drape that falls naturally against body contours without clinging.',
    suitableFor: ['Empress Gown', 'Flowing Kaftan', 'Luxury Two-Piece'],
    premiumTier: 'Luxury'
  },
  {
    id: 'linen-slate',
    name: 'Pure Washed Slub Linen (Charcoal Slate)',
    material: '100% Organic European Flax',
    origin: 'Normandy, France',
    texture: 'Natural organic slub, breathable, relaxed luxury',
    weight: '210 GSM',
    colorHex: '#2E3239',
    accentColor: '#8C7A34',
    description: 'Naturally thermoregulating linen with an effortlessly refined rumple that gets softer with every wash.',
    suitableFor: ['Riviera Linen Set', 'Resort Kaftan'],
    premiumTier: 'Standard'
  }
];

export const PALETTE_OPTIONS = [
  { name: 'Midnight Obsidian', hex: '#141009' },
  { name: 'Royal Gold & Amber', hex: '#C9A94C' },
  { name: 'Imperial Emerald', hex: '#1B382B' },
  { name: 'Deep Burgundy Wine', hex: '#4A121E' },
  { name: 'Pristine Cream', hex: '#F3EAD2' },
  { name: 'Olive Bronze', hex: '#4A3B22' },
  { name: 'Navy Sapphire', hex: '#112233' },
  { name: 'Pure White Starch', hex: '#FAFAFA' }
];

export const SAMPLE_ORDERS: TrackingOrder[] = [
  {
    orderId: 'AS-8820',
    clientName: 'Chief Kenneth Briggs',
    garmentTitle: 'The Obsidian Executive Suit',
    category: 'Executive Edit',
    fabricName: 'Italian Super 150s Merino Wool',
    colorName: 'Midnight Obsidian',
    placedDate: '2026-08-18',
    estimatedDeliveryDate: '2026-08-28',
    status: 'in_sewing',
    currentStepIndex: 3,
    tailorAssigned: 'Master Tailor Tari (Savile specialist)',
    deliveryLocation: 'GRA Phase 2, Port Harcourt',
    progressPercent: 65,
    timeline: [
      { title: 'Brief & Design Confirmed', subtitle: '3-piece sketch approved & specs logged', completed: true, date: 'Aug 18' },
      { title: 'Smart Measurements Verified', subtitle: 'Chest: 42", Shoulder: 19", Inseam: 32"', completed: true, date: 'Aug 19' },
      { title: 'Italian Fabric Cut', subtitle: 'Hand-sheared with half-canvas horsehair interlining', completed: true, date: 'Aug 21' },
      { title: 'Precision Tailoring in Progress', subtitle: 'Lapel roll shaping and sleeve lining insertion', completed: false, active: true, date: 'Aug 24 (Today)' },
      { title: 'Final Hand Finishing & Steam', subtitle: 'Horn buttons attached & pocket welt finishing', completed: false },
      { title: 'Quality Signoff & Dispatch', subtitle: 'Complimentary garment bag + DHL Express', completed: false }
    ],
    notes: [
      'Customer requested subtle gold monogram "K.B" on inner left chest pocket.',
      'Sleeve cuff buttons made functional (surgeon cuffs).'
    ]
  },
  {
    orderId: 'AS-001',
    clientName: 'Dr. Tammy & Vanessa Alabo',
    garmentTitle: 'The Sovereign 3-Piece Agbada (Wedding Commission)',
    category: 'Wedding Edit',
    fabricName: 'Damask Jacquard Brocade (Burgundy & Gold)',
    colorName: 'Deep Burgundy Wine',
    placedDate: '2026-08-12',
    estimatedDeliveryDate: '2026-08-25',
    status: 'final_fitting',
    currentStepIndex: 4,
    tailorAssigned: 'Head Embroiderer Alwell & Master Nengi',
    deliveryLocation: 'Old GRA, Port Harcourt / Lagos Courier',
    progressPercent: 90,
    timeline: [
      { title: 'Brief & Design Confirmed', subtitle: 'Groom royal ensemble design finalized', completed: true, date: 'Aug 12' },
      { title: 'Measurements Logged', subtitle: 'Agbada wingspan 62" custom drape calibrated', completed: true, date: 'Aug 13' },
      { title: 'Brocade & Silk Lining Sourced', subtitle: 'Gold thread embroidery tension calibrated', completed: true, date: 'Aug 15' },
      { title: 'Hand-Guided Chain Embroidery Done', subtitle: 'Over 48,000 stitches along chest and neckline', completed: true, date: 'Aug 20' },
      { title: 'Studio Final Fitting & Steaming', subtitle: 'Garment pressed on wooden mannequin', completed: false, active: true, date: 'Aug 24 (Today)' },
      { title: 'Dispatched in Premium Vault Box', subtitle: 'Scheduled for studio pickup tomorrow', completed: false }
    ],
    notes: [
      'Groom traditional wedding ensemble matching bride coral accents.',
      'Includes matching embroidered Aso-Oke Fila cap.'
    ]
  },
  {
    orderId: 'AS-7419',
    clientName: 'Barrister Somtochukwu Obi',
    garmentTitle: 'The Port Harcourt Signature Kaftan (2-Piece)',
    category: 'Traditional Edit',
    fabricName: 'High-Density Swiss Voile (Emerald Pine)',
    colorName: 'Imperial Emerald',
    placedDate: '2026-08-22',
    estimatedDeliveryDate: '2026-08-30',
    status: 'fabric_sourced',
    currentStepIndex: 2,
    tailorAssigned: 'Senior Craftsman Dennis',
    deliveryLocation: 'Ikoyi, Lagos State (Air Express)',
    progressPercent: 40,
    timeline: [
      { title: 'Brief & Design Confirmed', subtitle: 'Digital brief received via website builder', completed: true, date: 'Aug 22' },
      { title: 'Smart Measurements Verified', subtitle: 'Standard Size XL with custom +1" sleeve length', completed: true, date: 'Aug 23' },
      { title: 'Swiss Voile Sourced & Laser-Cut', subtitle: 'Fabric pre-shrunk and pattern matched', completed: true, active: true, date: 'Aug 24 (Today)' },
      { title: 'Sewing & Placket Assembly', subtitle: 'Hidden button tape and collar interfacing', completed: false },
      { title: 'Hand Finishing & QC', subtitle: 'Reinforced bar-tacking on pocket slits', completed: false },
      { title: 'Dispatch via GIG/DHL', subtitle: 'Insured transit to Lagos', completed: false }
    ],
    notes: [
      'Client selected express 7-day turnaround for Bar Association reception.'
    ]
  }
];
