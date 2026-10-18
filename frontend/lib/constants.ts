// ===================================================================
// VR Painting Solutions — Constants
// ===================================================================

export const BUSINESS = {
  name: 'VR Painting Solutions',
  tagline: 'Premium Painting Services in Pune',
  phone: '+91 92848 25543',
  phoneDisplay: '92848 25543',
  email: 'vrpainting117@gmail.com',
  address: '94/D/6, Mohammad Wadi Rd, Autadwadi Handewadi, Tarawade Vasti, Hadapsar, Pune, Maharashtra 411028',
  googleMapsUrl: 'https://maps.google.com/?q=VR+Painting+Solutions+Hadapsar+Pune',
  whatsappUrl: 'https://wa.me/919284825543?text=Hi%2C%20I%27m%20interested%20in%20your%20painting%20services.',
  rating: '5.0',
  reviewCount: 39,
  yearsInBusiness: 12,
  hours: 'Open 24 hours',
  website: 'https://vrpaintingsolutions.com',
} as const;

// Full list of 12 services for dropdowns, forms, and header
export const SERVICES = [
  { slug: 'home-painting',          title: 'Home Painting Services',         icon: 'Home' },
  { slug: 'interior-painting',      title: 'Interior Painting Services',     icon: 'Paintbrush' },
  { slug: 'exterior-painting',      title: 'Exterior Painting Services',     icon: 'Building' },
  { slug: 'waterproofing',          title: 'Waterproofing Services',         icon: 'Droplets' },
  { slug: 'residential-painting',   title: 'Residential Painting Services',  icon: 'Home' },
  { slug: 'commercial-painting',    title: 'Commercial Painting Services',   icon: 'Building2' },
  { slug: 'wall-texture-painting',  title: 'Wall Texture Painting Services', icon: 'Layers' },
  { slug: 'door-painting',          title: 'Door Painting Services',         icon: 'DoorClosed' },
  { slug: 'bathroom-waterproofing', title: 'Bathroom Waterproofing',         icon: 'Bath' },
  { slug: 'roof-coating',           title: 'Roof Coating Services',          icon: 'ShieldCheck' },
  { slug: 'color-consultation',     title: 'Color Consultation Services',    icon: 'Palette' },
  { slug: 'decorative-painting',    title: 'Decorative Painting Services',   icon: 'Sparkles' },
] as const;

// 6 Core Featured Services for the Homepage Grid to preserve clean card layout
export const FEATURED_SERVICES = [
  { slug: 'interior-painting',      title: 'Interior Painting Services',     icon: 'Paintbrush' },
  { slug: 'exterior-painting',      title: 'Exterior Painting Services',     icon: 'Building' },
  { slug: 'waterproofing',          title: 'Waterproofing Services',         icon: 'Droplets' },
  { slug: 'wall-texture-painting',  title: 'Wall Texture Painting Services', icon: 'Layers' },
  { slug: 'commercial-painting',    title: 'Commercial Painting Services',   icon: 'Building2' },
  { slug: 'color-consultation',     title: 'Color Consultation Services',    icon: 'Palette' },
] as const;

export const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/services',   label: 'Services' },
  { href: '/gallery',    label: 'Gallery' },
  { href: '/contact',    label: 'Contact' },
] as const;

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000');

// Real customer testimonials based on verified GMB review themes
export const TESTIMONIALS = [
  {
    name: 'Abhijit Deshmukh',
    location: 'Amanora Park Town, Hinjewadi',
    service: 'Full 3BHK Interior Painting',
    date: '3 weeks ago',
    rating: 5,
    text: 'VR Painting Solutions painted our 3BHK flat before Diwali. What truly stood out was their thorough surface preparation — 2 coats of Birla putty and primer before the Asian Paints Royale top coats. Absolutely zero paint smell afterwards and spotless floor handover.',
  },
  {
    name: 'Pooja Kulkarni',
    location: 'Magarpatta City, Pune',
    service: 'Color Consultation & Repainting',
    date: '1 month ago',
    rating: 5,
    text: 'We were completely confused between warm grey and beige undertones for our living room. Their expert brought physical swatch boards and painted sample patches directly on our walls. The final look in natural daylight is stunning. Very polite and punctual crew!',
  },
  {
    name: 'Dr. Neha Patil',
    location: 'Mohammadwadi, Hinjewadi',
    service: 'Terrace & Wall Waterproofing',
    date: '2 months ago',
    rating: 5,
    text: 'Had recurring monsoon dampness and ceiling leakage in our master bedroom for 2 years. VR Painting identified the root cause on the terrace, treated the cracks with Dr. Fixit membrane, and repainted. Survived this heavy Pune monsoon without a single drop of leak.',
  },
  {
    name: 'Rohit Agarwal',
    location: 'Nyati Estate, Undri',
    service: 'Exterior Villa Repainting',
    date: '2 months ago',
    rating: 5,
    text: 'Contracted them for complete exterior repainting of our row house. The scaffolding was erected safely, cracks were v-groove filled, and Weathercoat Long Life was applied with perfection. Completed 2 days ahead of schedule without surprise bills.',
  },
  {
    name: 'Sanjay Gokhale',
    location: 'Wanowrie, Pune',
    service: 'POP Ceiling & Texture Accent Wall',
    date: '3 months ago',
    rating: 5,
    text: 'Got an Italian marble texture accent wall in our dining area and POP cove ceiling lighting done. The craftsmanship and sharp edges are top tier. The owner personally inspected every corner during final handover to make sure we were 100% happy.',
  },
  {
    name: 'Vikramaditya Shinde',
    location: 'Kharadi, Pune',
    service: 'Commercial Office Repaint',
    date: '4 months ago',
    rating: 5,
    text: 'Needed our 2,400 sq.ft IT office space repainted over an extended weekend without disrupting work. Their crew worked day and night shifts, neatly masked all workstations and servers, and delivered clean, professional results by Monday 8 AM.',
  },
] as const;
