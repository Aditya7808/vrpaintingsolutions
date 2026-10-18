import { Star, Shield, Clock, MapPin } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

const stats = [
  {
    icon: Star,
    value: `${BUSINESS.rating}★`,
    label: 'Rated on Google',
    badge: 'Verified',
    iconBg: 'bg-amber-100 text-amber-600 border-amber-200',
    valColor: 'text-amber-600',
  },
  {
    icon: Shield,
    value: `${BUSINESS.yearsInBusiness}+`,
    label: 'Years of Experience',
    badge: 'Trusted',
    iconBg: 'bg-orange-100 text-terracotta border-orange-200',
    valColor: 'text-charcoal',
  },
  {
    icon: Clock,
    value: 'On-Time',
    label: 'Project Delivery',
    badge: 'Guaranteed',
    iconBg: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    valColor: 'text-emerald-700',
  },
  {
    icon: MapPin,
    value: 'Pune',
    label: 'Hadapsar & Surrounding',
    badge: 'Local Crew',
    iconBg: 'bg-blue-100 text-blue-600 border-blue-200',
    valColor: 'text-blue-700',
  },
];

export default function TrustBar() {
  return (
    <section className="relative mt-8 z-20">
      <div className="section-container">
        <div className="bg-white rounded-box shadow-2xl border-2 border-terracotta/25 ring-4 ring-terracotta/10 overflow-hidden">
          {/* Top highlight bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-terracotta via-amber-400 to-terracotta" />

          <div className="p-5 md:p-7">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3.5 p-3 md:p-3.5 rounded-xl bg-gradient-to-br from-cream/90 to-cream/40 border border-line/70 hover:border-terracotta/40 hover:bg-cream transition-all duration-200 hover:-translate-y-0.5 hover:shadow-subtle"
                >
                  <div className={`w-11 h-11 md:w-12 md:h-12 rounded-card flex items-center justify-center border shrink-0 ${stat.iconBg}`}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-heading font-extrabold text-lg md:text-xl ${stat.valColor}`}>
                        {stat.value}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-charcoal/70 truncate">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
