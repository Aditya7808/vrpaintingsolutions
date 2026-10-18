'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { submitLead } from '@/lib/api';
import { SERVICES, BUSINESS } from '@/lib/constants';

interface ContactFormProps {
  preselectedService?: string;
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function ContactForm({ preselectedService }: ContactFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    service_interested: preselectedService || '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Capture UTM params from URL
    const params = new URLSearchParams(window.location.search);

    // Prepare fallback WhatsApp link
    const selectedServiceObj = SERVICES.find(s => s.slug === form.service_interested);
    const serviceTitle = selectedServiceObj ? selectedServiceObj.title : (form.service_interested || 'General Painting Enquiry');

    const messageLines = [
      'Hello VR Painting Solutions,',
      '',
      'I would like to request a quotation for painting services:',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Service Required: ${serviceTitle}`,
      form.message ? `Project Details: ${form.message}` : null,
      '',
      'Please share the estimate and site visit details. Thank you!',
    ].filter((item): item is string => item !== null);

    const fallbackWaUrl = `https://wa.me/919284825543?text=${encodeURIComponent(messageLines.join('\n'))}`;

    try {
      const res = await submitLead({
        ...form,
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
      });

      const finalWaUrl = res?.whatsapp_url || fallbackWaUrl;
      setWhatsappUrl(finalWaUrl);
      setStatus('success');

      // Seamlessly route to WhatsApp in a new tab/window
      if (typeof window !== 'undefined') {
        window.open(finalWaUrl, '_blank', 'noopener,noreferrer');
      }

      setForm({ name: '', phone: '', email: '', message: '', service_interested: '' });
    } catch (err) {
      // Even if backend has network lag, still route the enquiry to WhatsApp so the lead is never lost
      setWhatsappUrl(fallbackWaUrl);
      if (typeof window !== 'undefined') {
        window.open(fallbackWaUrl, '_blank', 'noopener,noreferrer');
      }
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-card p-8 md:p-10 text-center shadow-subtle space-y-5 animate-fadeIn">
        <div className="w-16 h-16 bg-[#25D366]/15 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
          <WhatsAppIcon className="w-9 h-9" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-charcoal">Enquiry Sent to WhatsApp!</h3>
        <p className="text-muted max-w-md mx-auto text-sm md:text-base leading-relaxed">
          Your details have been registered and WhatsApp has opened to connect directly with our expert team at <strong>+91 92848 25543</strong>.
        </p>

        {whatsappUrl && (
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold rounded-btn shadow-md hover:shadow-lg transition-all text-sm md:text-base"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Open WhatsApp Chat Again
            </a>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => setStatus('idle')}
            className="text-xs md:text-sm text-terracotta hover:text-terracotta-dark font-medium underline transition-colors"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 md:p-8 shadow-subtle space-y-5">
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm p-3 rounded-btn">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            id="name"
            type="text"
            required
            className="form-field"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            required
            className="form-field"
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="form-label">Email (optional)</label>
        <input
          id="email"
          type="email"
          className="form-field"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="service" className="form-label">Service Interested In</label>
        <select
          id="service"
          className="form-field"
          value={form.service_interested}
          onChange={(e) => setForm({ ...form, service_interested: e.target.value })}
        >
          <option value="">Select a service (optional)</option>
          {SERVICES.map((svc) => (
            <option key={svc.slug} value={svc.slug}>{svc.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          id="message"
          rows={4}
          className="form-field resize-none"
          placeholder="Tell us about your project — room count, approximate area, preferred timeline…"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {/* High-converting WhatsApp Action Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 px-6 rounded-btn font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5b] active:scale-[0.99] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 text-base disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Connecting to WhatsApp…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            Get Free Quote on WhatsApp
          </span>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-muted text-center pt-1">
        <span>⚡ Direct inquiry to VR Painting Solutions WhatsApp ({BUSINESS.phoneDisplay}) • Free site visit</span>
      </div>
    </form>
  );
}
