import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS.name} — Premium Painting Services in Pune`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: `${BUSINESS.name} — Pune's trusted painting contractor. Interior, exterior, waterproofing, texture & POP, commercial painting, and color consultation. ${BUSINESS.rating}★ Google rated. Get a free quote today.`,
  keywords: ['painting contractor Pune', 'interior painting Hadapsar', 'exterior painting Pune', 'waterproofing Pune', 'VR Painting Solutions'],
  icons: {
    icon: [
      { url: '/images/vr-logo-official.png' },
      { url: '/icon.png' },
    ],
    apple: '/images/vr-logo-official.png',
    shortcut: '/images/vr-logo-official.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — Premium Painting Services in Pune`,
    description: `${BUSINESS.name} — Pune's trusted painting contractor. 5.0★ Google rated. Interior, exterior, waterproofing, texture & POP.`,
    images: [
      {
        url: '/images/hero-banner.png',
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name} Hero Banner`,
      },
      {
        url: '/images/vr-logo-official.png',
        width: 500,
        height: 500,
        alt: `${BUSINESS.name} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS.name} — Premium Painting Services in Pune`,
    description: `Pune's trusted painting contractor. 5.0★ Google rated. Get a free quote today.`,
    images: ['/images/hero-banner.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': BUSINESS.website,
              name: BUSINESS.name,
              description: `Premium painting contractor in Pune — interior, exterior, waterproofing, texture & POP, commercial painting.`,
              url: BUSINESS.website,
              telephone: BUSINESS.phone,
              address: {
                '@type': 'PostalAddress',
                streetAddress: '94/D/6, Mohammad Wadi Rd, Autadwadi Handewadi, Tarawade Vasti',
                addressLocality: 'Hadapsar, Pune',
                addressRegion: 'Maharashtra',
                postalCode: '411028',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 18.4818,
                longitude: 73.9405,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: BUSINESS.rating,
                reviewCount: BUSINESS.reviewCount,
              },
              openingHours: 'Mo-Su 00:00-23:59',
              priceRange: '$$',
              image: '/images/og-image.jpg', // TODO: replace with real OG image
            }),
          }}
        />

        {/* Google Analytics stub — env-driven */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}

        {/* Meta Pixel stub — env-driven */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        )}
      </head>
      <body className="font-body antialiased bg-cream text-charcoal">
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />

        {/* WhatsApp floating button */}
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat on WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
