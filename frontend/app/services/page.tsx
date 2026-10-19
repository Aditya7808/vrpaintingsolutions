import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Paintbrush, Home, Droplets, Layers, Building2, Palette, Building, DoorClosed, Bath, ShieldCheck, Sparkles } from 'lucide-react';
import { SERVICES, BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Services',
  description: `${BUSINESS.name} offers complete home painting, interior and exterior painting, waterproofing, wall textures, door polishing, and color consultation in Pune. Get a free quote today.`,
};

const iconMap: Record<string, React.ElementType> = {
  Paintbrush, Home, Droplets, Layers, Building2, Palette, Building, DoorClosed, Bath, ShieldCheck, Sparkles,
};

const imageMap: Record<string, string> = {
  'home-painting': '/portfolio/2026-03-07%20(1).jpg',
  'interior-painting': '/portfolio/2026-06-16.jpg',
  'exterior-painting': '/images/exterior-painting.png',
  'waterproofing': '/images/waterproofing-service.png',
  'residential-painting': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.59.20%20PM.jpeg',
  'commercial-painting': '/portfolio/commercial-building.png',
  'wall-texture-painting': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.56.28%20PM.jpeg',
  'door-painting': '/portfolio/2026-03-07%20(6).jpg',
  'bathroom-waterproofing': '/images/waterproofing-service.png',
  'roof-coating': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.55.19%20PM.jpeg',
  'color-consultation': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.56.30%20PM.jpeg',
  'decorative-painting': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.57.19%20PM.jpeg',
};

const descriptions: Record<string, string> = {
  'home-painting': 'Complete turnkey home painting solutions for flats, row houses, and bungalows — dust-free prep, Birla putty, and spotless post-paint cleanup.',
  'interior-painting': 'Transform your living spaces with premium interior painting — flawless finishes, proper surface prep, and colours that make every room feel like home.',
  'exterior-painting': 'Weather-tough exterior painting that protects your building from Pune\'s monsoons while giving it a fresh, striking look for years.',
  'waterproofing': 'Stop leaks and dampness before they damage your home. Professional waterproofing for terraces, bathrooms, and exterior walls.',
  'residential-painting': 'Tailored residential painting for apartments and housing societies — premium washability, crisp trim edges, and punctual handover.',
  'commercial-painting': 'Professional painting for offices, showrooms, retail spaces, and apartment complexes — on schedule, within budget, and built to impress.',
  'wall-texture-painting': 'Elevate your interiors with custom texture finishes and accent walls — from Italian marble to rustic stone and metallic sheens.',
  'door-painting': 'Premium PU polish, melamine wood finishes, and high-gloss enamel spray and brush painting for main doors, bedroom doors, and trims.',
  'bathroom-waterproofing': 'No-destruction tile joint epoxy grouting and pipe sealers that cure bathroom leaks and damp spots without breaking tiles.',
  'roof-coating': 'Elastomeric terrace waterproofing and solar-reflective heat barrier coatings that prevent rain leaks and lower indoor room temperatures.',
  'color-consultation': 'Find the perfect palette with professional on-site color consulting — shade cards, lighting analysis, and test patches tailored to your space.',
  'decorative-painting': 'Artistic accent walls, designer stencils, and custom aesthetic finishes crafted by master decorative painters.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="relative section-container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Our Services</h1>
          <p className="text-white/70 mt-4 max-w-lg mx-auto text-lg">
            Professional painting solutions for every space — residential and commercial.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container space-y-12">
          {SERVICES.map((svc, i) => {
            const Icon = iconMap[svc.icon] || Paintbrush;
            const isEven = i % 2 === 0;
            return (
              <div
                key={svc.slug}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div
                    className="rounded-box overflow-hidden aspect-[16/10] bg-cover bg-center shadow-card"
                    style={{ backgroundImage: `url('${imageMap[svc.slug]}')` }}
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-card bg-terracotta-pale flex items-center justify-center">
                      <Icon className="w-5 h-5 text-terracotta" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-charcoal">{svc.title}</h2>
                  </div>
                  <p className="text-muted leading-relaxed">{descriptions[svc.slug]}</p>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="btn btn-primary mt-5 inline-flex"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
