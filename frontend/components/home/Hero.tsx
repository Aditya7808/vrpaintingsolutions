'use client';

import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col pt-16 bg-[#f7f5f2]">
      <div className="w-full max-w-[1920px] mx-auto flex justify-center">
        <picture className="w-full block">
          <source srcSet="/images/hero-banner.webp" type="image/webp" />
          <img 
            src="/images/hero-banner-new.png" 
            alt="VR Painting Solutions — रंग जो बदल दें आपकी दुनिया!" 
            width={1920}
            height={810}
            className="w-full h-auto block select-none"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </picture>
      </div>
    </section>
  );
}
