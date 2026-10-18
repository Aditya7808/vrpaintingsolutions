import { ClipboardCheck, Eye, Calculator, Paintbrush, Handshake } from 'lucide-react';

const steps = [
  { icon: ClipboardCheck, title: 'Enquiry', description: 'Call, WhatsApp, or fill our form. We respond within hours.' },
  { icon: Eye, title: 'Site Visit', description: 'Free on-site inspection to assess walls, surface, and scope.' },
  { icon: Calculator, title: 'Quote', description: 'Transparent, itemised estimate — no hidden charges, no surprises.' },
  { icon: Paintbrush, title: 'Paint', description: 'Professional crew, premium materials, clean worksite, on-time delivery.' },
  { icon: Handshake, title: 'Handover', description: 'Final walkthrough with you. Touch-ups done on the spot. Done right.' },
];

export default function ProcessSteps() {
  return (
    <section className="section-padding bg-cream-dark">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
            How We Work
          </h2>
          <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-3" />
          <p className="text-muted mt-4 max-w-md mx-auto">
            A simple, transparent process from first call to final walkthrough.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-sand-dark z-0" />
              )}

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white shadow-card flex items-center justify-center mx-auto group-hover:shadow-lift transition-shadow">
                  <step.icon className="w-7 h-7 text-terracotta" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-terracotta text-white text-xs font-bold flex items-center justify-center mx-auto" style={{ left: 'calc(50% + 16px)' }}>
                  {i + 1}
                </div>
              </div>
              <h3 className="font-heading font-bold text-base mt-4 text-charcoal">{step.title}</h3>
              <p className="text-sm text-muted mt-1.5 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
