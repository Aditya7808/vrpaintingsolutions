import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Star, ArrowUpRight } from 'lucide-react';
import { BUSINESS, SERVICES, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream" style={{ backgroundColor: '#4B3F35', color: '#FAF7F2' }}>
      {/* Main footer */}
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative h-14 w-40 shrink-0 rounded-lg overflow-hidden bg-white/95 p-1">
                <Image 
                  src="/images/vr-logo-official.png" 
                  alt="VR Painting Solutions Logo" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-4">
              Pune&apos;s trusted painting professionals. Premium finishes, proper preparation, and a commitment to doing the job right — every time.
            </p>
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{BUSINESS.rating}</span>
              <span className="text-cream/50">/ 5 Google Rated</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/70 hover:text-terracotta-light transition-colors flex items-center gap-1">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — two columns */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-lg font-semibold mb-4">Our Services</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {SERVICES.map((svc) => (
                <li key={svc.slug}>
                  <Link href={`/services/${svc.slug}`} className="text-sm text-cream/70 hover:text-terracotta-light transition-colors">
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${BUSINESS.phone}`} className="flex items-start gap-2.5 text-sm text-cream/70 hover:text-terracotta-light transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-start gap-2.5 text-sm text-cream/70 hover:text-terracotta-light transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  {BUSINESS.email}
                </a>
              </li>
              <li>
                <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-sm text-cream/70 hover:text-terracotta-light transition-colors">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  {BUSINESS.address}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <span>© {currentYear} {BUSINESS.name}. All rights reserved.</span>
          <span>Painting contractor in Hadapsar, Pune</span>
        </div>
      </div>
    </footer>
  );
}
