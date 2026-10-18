import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import ServicesGrid from '@/components/home/ServicesGrid';
import Testimonials from '@/components/home/Testimonials';
import ProcessSteps from '@/components/home/ProcessSteps';
import ContactForm from '@/components/home/ContactForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <ProcessSteps />
      <Testimonials />
      <section className="section-padding bg-cream-dark">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal accent-underline">
              Get Your Free Quote
            </h2>
            <p className="text-muted mt-4 max-w-lg mx-auto">
              Tell us about your project or connect directly via WhatsApp for an instant consultation and free quote.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
