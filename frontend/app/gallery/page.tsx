'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { getGallery } from '@/lib/api';
import { SERVICES } from '@/lib/constants';
import { PORTFOLIO_ITEMS } from '@/lib/portfolioData';
import type { GalleryImage } from '@/lib/types';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const loadCuratedPortfolio = () => {
    setImages(
      PORTFOLIO_ITEMS.map((item, i) => ({
        id: `portfolio-${i}`,
        url: `/portfolio/${encodeURIComponent(item.file)}`,
        service_slug: item.service_slug,
        caption: item.caption,
        sort_order: i,
        uploaded_at: new Date().toISOString(),
      }))
    );
  };

  useEffect(() => {
    getGallery()
      .then((data) => {
        if (data && data.length > 0) {
          setImages(data);
        } else {
          loadCuratedPortfolio();
        }
      })
      .catch(() => {
        loadCuratedPortfolio();
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? images
    : images.filter((img) => {
        if (img.service_slug === filter) return true;
        // Check additional relevant slugs
        const found = PORTFOLIO_ITEMS.find((p) => img.url.includes(encodeURIComponent(p.file)) || img.url.endsWith(p.file));
        if (found && found.additional_slugs?.includes(filter)) return true;
        return false;
      });

  const getDisplayCaption = (caption?: string | null, slug?: string | null) => {
    if (!caption) return 'Painting Work';
    if (caption.toLowerCase().includes('team')) return 'VR Painting Solutions Team';
    const clean = caption.replace(/(?:VR Paintings\s+|Portfolio\s+)?Project\s+\d+/gi, '').trim();
    if (!clean || clean === '-') {
      const match = SERVICES.find((s) => s.slug === slug);
      return match ? match.title : 'VR Painting Work';
    }
    return clean;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-charcoal" style={{ backgroundColor: '#1E1E1E' }}>
        <div className="absolute inset-0 bg-charcoal" style={{ backgroundColor: '#1E1E1E' }} />
        <div className="relative section-container text-center z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Our Work</h1>
          <p className="text-white/80 mt-4 max-w-lg mx-auto text-lg">
            Browse our portfolio of completed painting projects across Pune by service category.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-sand text-muted hover:bg-sand-dark'
              }`}
            >
              All Projects ({images.length})
            </button>
            {SERVICES.map((svc) => {
              const count = images.filter((img) => {
                if (img.service_slug === svc.slug) return true;
                const found = PORTFOLIO_ITEMS.find((p) => img.url.includes(encodeURIComponent(p.file)) || img.url.endsWith(p.file));
                return found?.additional_slugs?.includes(svc.slug);
              }).length;

              return (
                <button
                  key={svc.slug}
                  onClick={() => setFilter(svc.slug)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                    filter === svc.slug
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'bg-sand text-muted hover:bg-sand-dark'
                  }`}
                >
                  {svc.title} {count > 0 ? `(${count})` : ''}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-64 rounded-card" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted">
              <p>No images found for this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setLightbox(img)}
                  className="relative group overflow-hidden rounded-card aspect-[4/3] bg-sand cursor-pointer text-left"
                >
                  <Image
                    src={img.url}
                    alt={getDisplayCaption(img.caption, img.service_slug)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-sm font-medium text-white drop-shadow-sm">
                      {getDisplayCaption(img.caption, img.service_slug)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[65vh]">
              <Image
                src={lightbox.url}
                alt={getDisplayCaption(lightbox.caption, lightbox.service_slug)}
                fill
                className="object-contain rounded-card"
                unoptimized
              />
            </div>
            {lightbox.caption && (
              <p className="text-white text-center font-medium mt-4 text-base bg-charcoal/70 py-1.5 px-4 rounded-full">
                {getDisplayCaption(lightbox.caption, lightbox.service_slug)}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
