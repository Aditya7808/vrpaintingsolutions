'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ChevronDown, ChevronUp, ArrowLeft, Phone, Paintbrush, Home, Droplets, Layers, Building2, Palette, Building, DoorClosed, Bath, ShieldCheck, Sparkles } from 'lucide-react';
import { getService, getGallery } from '@/lib/api';
import { BUSINESS, SERVICES } from '@/lib/constants';
import ContactForm from '@/components/home/ContactForm';
import type { Service, GalleryImage } from '@/lib/types';

const iconMap: Record<string, React.ElementType> = {
  Paintbrush, Home, Droplets, Layers, Building2, Palette, Building, DoorClosed, Bath, ShieldCheck, Sparkles,
};

// Visually verified portfolio photos from VR Paintings projects
const heroImages: Record<string, string> = {
  'home-painting': '/portfolio/2026-03-07%20(1).jpg',
  'interior-painting': '/portfolio/2026-06-16.jpg',
  'exterior-painting': '/images/exterior-painting.png',
  'waterproofing': '/images/waterproofing-service.png',
  'residential-painting': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.59.20%20PM.jpeg',
  'commercial-painting': '/portfolio/commercial-building.png',
  'wall-texture-painting': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.56.28%20PM.jpeg',
  'texture-pop': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.57.19%20PM.jpeg',
  'door-painting': '/portfolio/2026-03-07%20(6).jpg',
  'bathroom-waterproofing': '/images/waterproofing-service.png',
  'roof-coating': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.55.19%20PM.jpeg',
  'color-consultation': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.56.30%20PM.jpeg',
  'decorative-painting': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.57.19%20PM.jpeg',
};

// Fallback data when API is unavailable
const fallbackData: Record<string, Partial<Service>> = {
  'interior-painting': {
    title: 'Interior Painting',
    short_description: 'Transform your living spaces with premium interior painting.',
    full_description: 'Our interior painting service covers every room in your home or office. We start with thorough surface preparation — filling cracks, sanding rough patches, and priming walls — to ensure a smooth, long-lasting finish.',
    scope_of_work: 'Wall preparation (putty, primer, sanding) • 2–3 coats of premium emulsion paint • Ceiling painting • Trim and moulding finishing • Furniture and floor protection • Post-paint cleanup',
    process_steps: [
      { step: 1, title: 'Free Site Inspection', description: 'Our team visits your home and assesses surface condition.' },
      { step: 2, title: 'Colour Consultation', description: 'Browse shades with our expert. We bring colour cards.' },
      { step: 3, title: 'Detailed Quote', description: 'Transparent, itemised quote — no hidden charges.' },
      { step: 4, title: 'Surface Preparation', description: 'Putty, sanding, crack filling, and primer coat.' },
      { step: 5, title: 'Painting', description: '2–3 coats applied with rollers and brushes.' },
      { step: 6, title: 'Final Walkthrough', description: 'Owner inspects every wall with you.' },
    ],
    faqs: [
      { q: 'How long does interior painting take?', a: 'A 2BHK typically takes 5–7 working days.' },
      { q: 'Do I need to move furniture?', a: 'No — we carefully cover and shift furniture.' },
      { q: 'Can I change colours mid-project?', a: 'Absolutely. We accommodate changes without hassle.' },
    ],
  },
  'exterior-painting': {
    title: 'Exterior Painting',
    short_description: 'Weather-tough exterior painting for Pune\'s climate.',
    full_description: 'Our exterior painting service uses weather-proof, UV-resistant paints that resist peeling, cracking, and algae growth.',
    scope_of_work: 'Pressure washing • Crack sealing • Exterior primer • 2–3 coats weather-proof emulsion • Trim painting • Scaffolding',
    process_steps: [
      { step: 1, title: 'Building Survey', description: 'Inspect for cracks, dampness, algae.' },
      { step: 2, title: 'Surface Prep', description: 'Pressure wash, scrape, sand, seal cracks.' },
      { step: 3, title: 'Primer & Base', description: 'Exterior-grade primer application.' },
      { step: 4, title: 'Top Coats', description: '2–3 coats of weather-proof paint.' },
      { step: 5, title: 'Final Inspection', description: 'Walk around the building with you.' },
    ],
    faqs: [
      { q: 'How long does exterior paint last?', a: '7–10 years with proper prep and quality paint.' },
      { q: 'Do you handle multi-storey buildings?', a: 'Yes — up to 5 floors with scaffolding.' },
    ],
  },
  'waterproofing': {
    title: 'Waterproofing',
    short_description: 'Stop leaks and dampness before they cause damage.',
    full_description: 'We diagnose the root cause of leakage and apply targeted solutions with workmanship warranty.',
    scope_of_work: 'Leak detection • Terrace waterproofing • Bathroom waterproofing • Wall damp-proofing • Crack injection',
    process_steps: [
      { step: 1, title: 'Leak Assessment', description: 'Trace the source of water ingress.' },
      { step: 2, title: 'Surface Prep', description: 'Clean and prep — remove loose material.' },
      { step: 3, title: 'Waterproof Application', description: 'Liquid membrane, coating, or sealant.' },
      { step: 4, title: 'Curing & Testing', description: 'Proper curing, then water-test.' },
    ],
    faqs: [
      { q: 'How long does waterproofing last?', a: '5-year warranty, typically lasts 8–12 years.' },
      { q: 'Can you waterproof without breaking tiles?', a: 'In many cases, yes — injection grouting.' },
    ],
  },
  'texture-pop': {
    title: 'Texture & POP Design',
    short_description: 'Custom texture finishes and POP false ceilings.',
    full_description: 'Add character with metallic sheen, rustic stone, sand swirl, or geometric patterns applied by experienced artisans.',
    scope_of_work: 'Texture accent walls • Full-room texture • POP false ceiling • Cove lighting • Designer wall panels',
    process_steps: [
      { step: 1, title: 'Design Discussion', description: 'Texture samples and ceiling designs.' },
      { step: 2, title: 'Surface Prep', description: 'Smooth and prime walls.' },
      { step: 3, title: 'Texture Application', description: 'Hand-applied finish with precision tools.' },
      { step: 4, title: 'POP Installation', description: 'Fabricate and mount ceiling panels.' },
      { step: 5, title: 'Finishing', description: 'Seal, sand edges, and clean up.' },
    ],
    faqs: [
      { q: 'Is texture paint more expensive?', a: 'Per sq.ft yes, but it\'s applied to accent walls — not the entire room.' },
    ],
  },
  'commercial-painting': {
    title: 'Commercial Painting',
    short_description: 'Professional painting for offices, showrooms, and complexes.',
    full_description: 'We work outside business hours, follow strict timelines, and use commercial-grade paints for high-traffic environments.',
    scope_of_work: 'Office interiors • Showroom painting • Apartment complex common areas • Parking line marking • After-hours scheduling',
    process_steps: [
      { step: 1, title: 'Site Assessment', description: 'Survey the space, understand branding.' },
      { step: 2, title: 'Project Plan', description: 'Detailed scope and phased schedule.' },
      { step: 3, title: 'Execution', description: 'Professional crew, daily progress reports.' },
      { step: 4, title: 'Handover', description: 'Walkthrough, touch-ups, warranty docs.' },
    ],
    faqs: [
      { q: 'Can you paint without shutting down our office?', a: 'Yes — we work nights and weekends.' },
    ],
  },
  'color-consultation': {
    title: 'Color Consultation',
    short_description: 'Expert on-site color consulting and palette design.',
    full_description: 'Choosing the right wall colors can feel overwhelming with thousands of shades available. Our personalized color consultation brings shade decks, digital visualizations, and physical test patches directly to your space. We consider natural lighting, room dimensions, interior furnishings, and your aesthetic goals to create harmonious color palettes for every room.',
    scope_of_work: 'On-site lighting & space assessment • Shade book & digital palette selection • Wall test patch application • Accent wall & finish pairing (matte/satin/gloss) • Personalized paint specification sheet',
    process_steps: [
      { step: 1, title: 'Space & Light Survey', description: 'Evaluate room dimensions, natural sunlight, and evening ambient lighting.' },
      { step: 2, title: 'Palette Discovery', description: 'Review your preferences, furnishings, and trending architectural palettes.' },
      { step: 3, title: 'Sample Wall Swatches', description: 'Apply real paint patches on actual walls to observe day-to-night transitions.' },
      { step: 4, title: 'Finish & Product Selection', description: 'Choose between luxury matte, silk, satin, or washable emulsions.' },
      { step: 5, title: 'Specification Handover', description: 'Detailed color codes, brand choices, and paint schedules ready for execution.' },
    ],
    faqs: [
      { q: 'Can you provide test swatches on my walls?', a: 'Yes! We apply physical sample patches so you can see how light changes the color throughout the day.' },
      { q: 'Do you help match existing furniture and curtains?', a: 'Absolutely. We take your flooring, curtains, lighting fixtures, and furniture into full account.' },
      { q: 'Is color consultation included with full painting projects?', a: 'Yes, a complimentary color consultation is included with every full interior or exterior painting package.' },
    ],
  },
  'home-painting': {
    title: 'Home Painting Services',
    short_description: 'Complete home painting solutions for Pune apartments and bungalows.',
    full_description: 'Full-service home painting designed to deliver pristine walls, sharp trim, and zero post-project mess. We treat your home with total respect, masking all furniture, floors, and electrical fittings.',
    scope_of_work: 'Complete wall surface preparation • 2 coats Birla putty & acrylic primer • 2–3 coats premium washable emulsion • Ceiling and trim painting • Masking, tarping, and thorough deep cleanup',
    process_steps: [
      { step: 1, title: 'In-Home Site Inspection', description: 'Accurate laser measurement and moisture inspection of every room.' },
      { step: 2, title: 'Color & Product Consultation', description: 'Choose shades from Asian Paints, Berger, or Dulux swatch cards.' },
      { step: 3, title: 'Protection & Masking', description: 'Heavy drop cloths and plastic masking over furniture and tile floors.' },
      { step: 4, title: 'Sanding & Putty', description: 'Dust-free sanding, crack filling, and smooth base preparation.' },
      { step: 5, title: 'Precision Top Coats', description: 'Roller and brush application with crisp ceiling cutting.' },
      { step: 6, title: 'Final Inspection & Clean Handover', description: 'Thorough post-paint cleaning and joint walkthrough.' },
    ],
    faqs: [
      { q: 'How long does a complete home paint job take?', a: 'Typically 4–7 working days for a 2BHK/3BHK apartment.' },
      { q: 'Do we have to vacate during the painting?', a: 'No, we paint room-by-room and use low-VOC, odorless emulsions so you can stay comfortably.' },
    ],
  },
  'residential-painting': {
    title: 'Residential Painting Services',
    short_description: 'Dedicated residential painting for flats, societies, and villas.',
    full_description: 'Our residential painting services bring durable, high-aesthetic finishes to Pune homes. From budget-conscious refreshes to luxury designer finishes, we deliver transparent pricing and reliable timelines.',
    scope_of_work: 'Wall crack repair • Moisture treatment • Anti-fungal primer coat • Premium emulsion application • Door, window frame, and grill painting',
    process_steps: [
      { step: 1, title: 'Free Site Estimate', description: 'Itemized quotation with no hidden costs.' },
      { step: 2, title: 'Surface Priming', description: 'Scraping old loose paint and applying bonding primer.' },
      { step: 3, title: 'Two-Coat Finish', description: 'Uniform paint application with consistent sheen.' },
      { step: 4, title: 'Quality Assurance', description: '100% satisfaction check with the owner.' },
    ],
    faqs: [
      { q: 'Do you offer a warranty on residential painting?', a: 'Yes, we provide up to 3 years warranty on workmanship and brand-backed product warranties.' },
    ],
  },
  'wall-texture-painting': {
    title: 'Wall Texture Painting Services',
    short_description: 'Stunning accent wall textures, metallic finishes, and designer patterns.',
    full_description: 'Elevate your living room or master bedroom with signature texture finishes. Our master artisans create marble, rustic, spatulo, safari, and metallic wall textures that transform plain walls into works of art.',
    scope_of_work: 'Accent wall base preparation • Base coat primer • Artistic texture trowel/roller application • Metallic glaze & protective topcoat',
    process_steps: [
      { step: 1, title: 'Texture Selection', description: 'Browse physical texture sample boards.' },
      { step: 2, title: 'Base Smoothing', description: 'Leveling wall to level-5 finish.' },
      { step: 3, title: 'Artisan Application', description: 'Custom pattern troweled by experienced specialists.' },
      { step: 4, title: 'Protective Glaze', description: 'Clear coat for washability and long-lasting shine.' },
    ],
    faqs: [
      { q: 'Can texture walls be cleaned?', a: 'Yes, our textures are sealed with a protective glaze that allows gentle damp-cloth wiping.' },
    ],
  },
  'door-painting': {
    title: 'Door Painting & Polishing Services',
    short_description: 'High-gloss enamel paint, PU polish, and melamine finishes for doors.',
    full_description: 'Restore the beauty of your wooden and metal doors. We specialize in PU clear polish, melamine wood finish, and smooth spray or brush enamel painting for main doors, flush doors, and bathroom doors.',
    scope_of_work: 'Old finish stripping & sanding • Wood filler & grain sealing • 2 coats primer • 2 coats PU polish or high-gloss enamel • Hardware masking',
    process_steps: [
      { step: 1, title: 'Door Inspection', description: 'Check wood condition, warping, or previous varnish coats.' },
      { step: 2, title: 'Machine Sanding', description: 'Remove oxidation and unevenness down to bare wood/primer.' },
      { step: 3, title: 'Filler & Primer', description: 'Fill pores and imperfections with wood filler.' },
      { step: 4, title: 'Spray/Roller Finish', description: 'Glass-smooth top coats for lasting protection.' },
    ],
    faqs: [
      { q: 'How long does door polish take to dry?', a: 'Touch dry in 4–6 hours, fully cured in 24 hours.' },
    ],
  },
  'bathroom-waterproofing': {
    title: 'Bathroom Waterproofing Services',
    short_description: 'No-destruction tile grouting, sunken slab waterproofing, and leak repair.',
    full_description: 'Stop bathroom dampness and ceiling seepage in the rooms below. We provide both advanced non-destructive epoxy tile grouting and full sunken slab waterproofing for long-term protection.',
    scope_of_work: 'Tile joint groove cleaning • Waterproof epoxy tile grout injection • Plumbing pipe collar sealing • Nano-penetrating barrier coating',
    process_steps: [
      { step: 1, title: 'Leak Detection', description: 'Pinpoint if seepage is from supply pipes or tile joints.' },
      { step: 2, title: 'Joint Cleaning', description: 'Deep clean joints and remove contaminated cement.' },
      { step: 3, title: 'Waterproof Polymer Grouting', description: 'Inject high-grade waterproof epoxy resin.' },
      { step: 4, title: 'Testing & Sealing', description: 'Water test to ensure 100% moisture blockage.' },
    ],
    faqs: [
      { q: 'Can you stop bathroom leakage without breaking floor tiles?', a: 'In over 80% of cases, yes! Our specialized epoxy grouting and pipe sealers fix leaks without tile demolition.' },
    ],
  },
  'roof-coating': {
    title: 'Roof Coating & Terrace Waterproofing',
    short_description: 'Cool roof heat-reflective coatings and elastomeric terrace waterproofing.',
    full_description: 'Protect your building against Pune summer heat and monsoon downpours. Our elastomeric terrace coatings bridge hairline cracks and reduce indoor surface temperatures by up to 5°C.',
    scope_of_work: 'Terrace pressure wash • V-groove crack repair with polymer sealant • Primer coat • 2 coats elastomeric UV-resistant roof coating',
    process_steps: [
      { step: 1, title: 'Terrace Cleaning', description: 'Pressure wash to remove moss, dirt, and loose debris.' },
      { step: 2, title: 'Crack Sealing', description: 'Cut and fill all expansion and surface cracks.' },
      { step: 3, title: 'Penetrating Primer', description: 'Apply deep-penetrating bonding base coat.' },
      { step: 4, title: 'Elastomeric Membrane', description: 'Two heavy coats of UV-reflective waterproof coating.' },
    ],
    faqs: [
      { q: 'Does roof coating reduce indoor heat?', a: 'Yes! High solar-reflective white coatings reflect up to 85% of solar radiation, significantly cooling top-floor rooms.' },
    ],
  },
  'decorative-painting': {
    title: 'Decorative Painting Services',
    short_description: 'Artistic murals, stencil designs, and custom aesthetic wall treatments.',
    full_description: 'Bring creative flair to children\'s bedrooms, living room feature walls, or boutique retail spaces. From elegant geometric stencils to bespoke hand-painted artistic finishes.',
    scope_of_work: 'Design consultation & stencil drafting • High-adhesion base coat • Multi-tone artistic painting • Protective clear satin sealer',
    process_steps: [
      { step: 1, title: 'Concept Design', description: 'Select patterns, stencils, or custom art motifs.' },
      { step: 2, title: 'Grid & Wall Prep', description: 'Mark precision measurements and prep smooth surface.' },
      { step: 3, title: 'Detailed Painting', description: 'Handcrafted application with specialty artists.' },
      { step: 4, title: 'Protective Topcoat', description: 'Clear sealing coat for durability and washability.' },
    ],
    faqs: [
      { q: 'Can you paint a custom stencil design?', a: 'Yes, we can replicate specific patterns, floral motifs, or geometric layouts.' },
    ],
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<Service | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const svcInfo = SERVICES.find(s => s.slug === slug);
  const Icon = svcInfo ? iconMap[svcInfo.icon] || Paintbrush : Paintbrush;

  useEffect(() => {
    Promise.all([
      getService(slug).catch(() => fallbackData[slug] as Service),
      getGallery(slug).catch(() => []),
    ]).then(([svcData, galleryData]) => {
      setService(svcData);
      setGallery(galleryData);
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="section-padding">
        <div className="section-container space-y-6">
          <div className="skeleton h-64 rounded-box" />
          <div className="skeleton h-8 w-1/3 rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="section-padding text-center">
        <h1 className="font-heading text-3xl font-bold text-charcoal">Service Not Found</h1>
        <Link href="/services" className="btn btn-primary mt-6">View All Services</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImages[slug] || heroImages['interior-painting']}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/20" />
        <div className="relative section-container">
          <Link href="/services" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-card bg-terracotta flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">{service.title}</h1>
          </div>
          <p className="text-lg text-white/80 max-w-2xl mt-3">{service.short_description}</p>
          <div className="flex gap-3 mt-6">
            <a href="#quote" className="btn btn-primary">Get Free Quote</a>
            <a href={`tel:${BUSINESS.phone}`} className="btn btn-white">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-charcoal accent-underline">About This Service</h2>
            <p className="text-muted leading-relaxed mt-6">{service.full_description}</p>
          </div>
        </div>
      </section>

      {/* Scope of work */}
      {service.scope_of_work && (
        <section className="section-padding bg-cream-dark">
          <div className="section-container">
            <h2 className="font-heading text-2xl font-bold text-charcoal accent-underline mb-6">What&apos;s Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.scope_of_work.split('•').filter(Boolean).map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-card p-4 shadow-subtle">
                  <CheckCircle className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal">{item.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process steps */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="section-padding">
          <div className="section-container">
            <h2 className="font-heading text-2xl font-bold text-charcoal accent-underline mb-8">Our Process</h2>
            <div className="space-y-4 max-w-2xl">
              {service.process_steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-terracotta text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {step.step || i + 1}
                    </div>
                    {i < service.process_steps.length - 1 && (
                      <div className="w-px h-full bg-line mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-heading font-bold text-base text-charcoal">{step.title}</h3>
                    <p className="text-sm text-muted mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="section-padding bg-cream-dark">
          <div className="section-container">
            <h2 className="font-heading text-2xl font-bold text-charcoal accent-underline mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="relative rounded-card overflow-hidden aspect-[4/3] bg-sand">
                  <Image
                    src={img.url}
                    alt={img.caption || `${service.title} project`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="section-padding">
          <div className="section-container">
            <h2 className="font-heading text-2xl font-bold text-charcoal accent-underline mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-2xl space-y-3">
              {service.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-card shadow-subtle overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-charcoal pr-4">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="w-5 h-5 text-muted shrink-0" />
                      : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted leading-relaxed border-t border-line pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA / Quote form */}
      <section id="quote" className="section-padding bg-cream-dark">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              Get a Free {service.title} Quote
            </h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">
              Tell us about your project and we&apos;ll respond within 24 hours.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm preselectedService={slug} />
          </div>
        </div>
      </section>
    </>
  );
}
