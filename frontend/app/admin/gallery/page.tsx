'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { getGallery, adminUploadImage, adminDeleteImage } from '@/lib/api';
import { SERVICES } from '@/lib/constants';
import type { GalleryImage } from '@/lib/types';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [serviceSlug, setServiceSlug] = useState('');
  const [caption, setCaption] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = () => {
    setLoading(true);
    getGallery()
      .then(setImages)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await adminUploadImage(file, serviceSlug || undefined, caption || undefined);
      setCaption('');
      setServiceSlug('');
      if (fileRef.current) fileRef.current.value = '';
      loadGallery();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await adminDeleteImage(id);
      loadGallery();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-6">Gallery</h1>

      {/* Upload form */}
      <div className="bg-white rounded-card p-5 shadow-subtle mb-6">
        <h2 className="font-heading font-bold text-base text-charcoal mb-4">Upload New Image</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <select
            className="form-field"
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
          >
            <option value="">No service tag</option>
            {SERVICES.map(svc => (
              <option key={svc.slug} value={svc.slug}>{svc.title}</option>
            ))}
          </select>
          <input
            type="text"
            className="form-field"
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="btn btn-primary w-full py-2.5 disabled:opacity-60"
            >
              {uploading ? 'Uploading…' : <><Upload className="w-4 h-4" /> Choose & Upload</>}
            </button>
          </div>
        </div>
        <p className="text-xs text-muted">JPEG, PNG, or WebP. Max 5MB.</p>
      </div>

      {/* Image grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-40 rounded-card" />)}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-card overflow-hidden bg-sand aspect-square">
              <Image
                src={img.url}
                alt={img.caption || 'Gallery image'}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full transition-opacity hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {img.service_slug && (
                <div className="absolute bottom-2 left-2 bg-charcoal/70 text-white text-xs px-2 py-0.5 rounded">
                  {img.service_slug}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-muted mt-3">{images.length} image{images.length !== 1 ? 's' : ''}</div>
    </AdminLayout>
  );
}
