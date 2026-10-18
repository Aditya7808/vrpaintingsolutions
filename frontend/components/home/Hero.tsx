'use client';

import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col pt-16 bg-white">
      <div className="w-full max-w-[1920px] mx-auto flex justify-center bg-white">
        <img 
          src="/images/hero-banner-new.png" 
          alt="VR Painting Solutions Hero Banner" 
          className="w-full h-auto max-h-[80vh] object-contain block"
        />
      </div>
    </section>
  );
}
