import type { Metadata } from 'next';
import Image from 'next/image';
import { Star, Award, Users, Clock, Heart } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${BUSINESS.name} — ${BUSINESS.yearsInBusiness}+ years of professional painting services in Pune. Our story, values, and commitment to quality.`,
};

const values = [
  { icon: Star, title: 'Quality First', description: 'We never cut corners on surface prep. A flawless finish starts with the work you can\'t see.' },
  { icon: Clock, title: 'On-Time Delivery', description: 'We plan carefully and stick to timelines. When we say a date, we mean it.' },
  { icon: Heart, title: 'Client Care', description: 'The owner personally follows up after every project to ensure complete satisfaction.' },
  { icon: Users, title: 'Skilled Crew', description: 'Our painters are experienced professionals — trained, equipped, and detail-oriented.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1920&q=80')` }}
        />
        <div className="relative section-container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">About Us</h1>
          <p className="text-white/70 mt-4 max-w-lg mx-auto text-lg">
            The story behind Pune&apos;s most trusted painting team.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-charcoal accent-underline">Our Story</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-box overflow-hidden shadow-card aspect-[4/3]">
              <Image 
                src="/images/vr-team-official.jpg" 
                alt="The VR Painting Solutions Team" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                VR Painting Solutions started with a simple belief: every home and business deserves a paint job done right — with proper preparation, quality materials, and a crew that takes genuine pride in the result.
              </p>
              <p>
                Over {BUSINESS.yearsInBusiness}+ years, we&apos;ve grown from a small team in Hadapsar to Pune&apos;s go-to painting contractor, serving hundreds of residential and commercial clients across the city. Our {BUSINESS.rating}★ Google rating reflects what matters most to us: happy clients and lasting finishes.
              </p>
              <p>
                What sets us apart isn&apos;t fancy marketing — it&apos;s the basics done exceptionally well. We spend extra time on surface prep because it makes every coat of paint look better and last longer. We show up on time, keep your space clean, and the owner personally inspects every completed project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream-dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-charcoal">What We Stand For</h2>
            <div className="w-16 h-1 bg-terracotta rounded-full mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-card p-6 text-center hover-lift shadow-subtle">
                <div className="w-14 h-14 rounded-full bg-terracotta-pale flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-terracotta" />
                </div>
                <h3 className="font-heading font-bold text-lg text-charcoal">{v.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="section-container">
          <div className="bg-charcoal rounded-box p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${BUSINESS.yearsInBusiness}+`, label: 'Years Experience' },
                { value: '1800+', label: 'Happy Clients' },
                { value: `${BUSINESS.rating}★`, label: 'Google Rating' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-3xl md:text-4xl font-bold text-terracotta-light">{stat.value}</div>
                  <div className="text-sm text-cream/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
