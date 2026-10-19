import Link from 'next/link';
import { ArrowRight, Paintbrush, Home, Droplets, Layers, Building2, Palette, Building } from 'lucide-react';
import { FEATURED_SERVICES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Paintbrush, Home, Droplets, Layers, Building2, Palette, Building,
};

// Visually verified portfolio photos from VR Paintings projects
const imageMap: Record<string, string> = {
  'interior-painting': '/images/interior-painting.png',
  'exterior-painting': '/images/exterior-painting.png',
  'waterproofing': '/images/waterproofing-service.png',
  'wall-texture-painting': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.56.28%20PM.jpeg',
  'texture-pop': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.57.19%20PM.jpeg',
  'commercial-painting': '/portfolio/commercial-building.png',
  'color-consultation': '/portfolio/WhatsApp%20Image%202026-09-24%20at%2011.56.30%20PM.jpeg',
};

export default function ServicesGrid() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-3" />
          <p className="text-muted mt-4 max-w-lg mx-auto">
            From cozy bedrooms to commercial complexes — we bring the same care, preparation, and quality to every project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_SERVICES.map((svc) => {
            const Icon = iconMap[svc.icon] || Paintbrush;
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group relative bg-white rounded-card overflow-hidden shadow-subtle hover-lift"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${imageMap[svc.slug]}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-card bg-terracotta/90 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-muted mt-2 line-clamp-2">
                    Professional {svc.title.toLowerCase()} services with proper surface preparation, premium materials, and a finish that lasts.
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-terracotta mt-3 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Banner with all additional services link */}
        <div className="mt-10 p-5 rounded-box bg-cream-dark/60 border border-line text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-heading font-bold text-charcoal text-sm sm:text-base block">Looking for other specialized services?</span>
            <span className="text-xs text-muted">We also provide Home Painting, Residential Painting, Door Painting, Bathroom Waterproofing, Roof Coating & Decorative Finishes.</span>
          </div>
          <Link href="/services" className="btn btn-secondary text-xs sm:text-sm px-4 py-2 shrink-0">
            View All 12 Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
