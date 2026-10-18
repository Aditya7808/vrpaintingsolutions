import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import ContactForm from '@/components/home/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get a free painting quote from ${BUSINESS.name}. Call ${BUSINESS.phoneDisplay}, WhatsApp, or fill our form. We respond within 24 hours.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="relative section-container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="text-white/70 mt-4 max-w-lg mx-auto text-lg">
            Ready to transform your space? Get a free, no-obligation quote.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-charcoal accent-underline">Get in Touch</h2>
                <p className="text-muted mt-4 leading-relaxed">
                  Call us, send a WhatsApp message, or fill the form. We&apos;ll get back to you within 24 hours with a detailed estimate.
                </p>
              </div>

              <div className="space-y-5">
                <a href={`tel:${BUSINESS.phone}`} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-card bg-terracotta-pale flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">Phone</div>
                    <div className="text-muted group-hover:text-terracotta transition-colors">{BUSINESS.phoneDisplay}</div>
                  </div>
                </a>

                <a href={`mailto:${BUSINESS.email}`} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-card bg-terracotta-pale flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">Email</div>
                    <div className="text-muted group-hover:text-terracotta transition-colors">{BUSINESS.email}</div>
                  </div>
                </a>

                <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-card bg-terracotta-pale flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">Address</div>
                    <div className="text-muted text-sm group-hover:text-terracotta transition-colors">{BUSINESS.address}</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-card bg-terracotta-pale flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-terracotta" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-charcoal">Hours</div>
                    <div className="text-muted">{BUSINESS.hours}</div>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="space-y-3">
                <div className="rounded-card overflow-hidden shadow-subtle h-56">
                  <iframe
                    src="https://maps.google.com/maps?q=VR%20Painting%20Solutions,%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VR Painting Solutions location"
                  />
                </div>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=18.4780392,73.9254395" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-terracotta text-white rounded-btn font-medium hover:bg-terracotta-dark transition-colors shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions to VR Painting Solutions
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
