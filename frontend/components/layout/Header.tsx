'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS, BUSINESS, SERVICES } from '@/lib/constants';
import clsx from 'clsx';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-200 shadow-sm',
        scrolled && 'header-scrolled'
      )}
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Main nav */}
      <nav className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 group py-1">
          <div className="relative h-14 w-40 sm:h-16 sm:w-48 shrink-0 transition-transform group-hover:scale-105 rounded-lg overflow-hidden bg-white/95 p-1">
            <Image 
              src="/images/vr-logo-official.png" 
              alt="VR Painting Solutions Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative group">
              {link.label === 'Services' ? (
                <div
                  className="relative group"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal hover:text-terracotta transition-colors rounded-btn"
                    onClick={() => setServicesOpen(!servicesOpen)}
                  >
                    Services <ChevronDown className={clsx("w-3.5 h-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
                  </button>
                  {servicesOpen && (
                    <div
                      className="absolute top-full left-0 bg-white rounded-card shadow-2xl p-3 min-w-[520px] border border-line z-50 animate-in fade-in zoom-in-95 duration-150"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-line">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted">All Painting Services</span>
                        <Link
                          href="/services"
                          className="text-xs font-semibold text-terracotta hover:underline"
                          onClick={() => setServicesOpen(false)}
                        >
                          View All Services Overview →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {SERVICES.map((svc) => (
                          <Link
                            key={svc.slug}
                            href={`/services/${svc.slug}`}
                            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-charcoal hover:bg-cream hover:text-terracotta rounded transition-colors group/item"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-terracotta/40 group-hover/item:bg-terracotta shrink-0" />
                            <span className="truncate">{svc.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-charcoal hover:text-terracotta transition-colors rounded-btn"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right side CTA */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{BUSINESS.phoneDisplay}</span>
          </a>
          <Link href="/contact" className="hidden sm:inline-flex btn btn-primary text-sm py-2 px-4">
            Get Free Quote
          </Link>
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-line shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="section-container py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-2.5 text-base font-medium text-charcoal hover:text-terracotta hover:bg-cream rounded-btn transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.label === 'Services' && (
                  <div className="pl-4 pr-2 py-2 grid grid-cols-1 sm:grid-cols-2 gap-1 bg-cream/40 rounded-lg my-1">
                    <Link
                      href="/services"
                      className="block px-2.5 py-1.5 text-xs font-bold text-terracotta hover:underline col-span-full"
                      onClick={() => setMenuOpen(false)}
                    >
                      All Services Overview →
                    </Link>
                    {SERVICES.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className="block px-2.5 py-1.5 text-xs text-charcoal/80 hover:text-terracotta hover:bg-cream rounded transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        • {svc.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-2 px-3 py-2.5 text-base font-medium text-terracotta"
            >
              <Phone className="w-5 h-5" />
              Call {BUSINESS.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
