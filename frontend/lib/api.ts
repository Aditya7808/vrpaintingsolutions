// ===================================================================
// VR Painting Solutions — API Client
// All frontend-to-backend communication goes through this file.
// ===================================================================

import { API_BASE } from './constants';
import type { Service, ServiceSummary, GalleryImage, Lead, AuthResponse } from './types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('vr_admin_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Fetch all active services (summary view) */
export const getServices = () =>
  request<ServiceSummary[]>('/api/services');

/** Fetch a single service by slug */
export const getService = (slug: string) =>
  request<Service>(`/api/services/${slug}`);

/** Fetch gallery images, optionally filtered by service slug */
export const getGallery = (serviceSlug?: string) => {
  const qs = serviceSlug ? `?service=${serviceSlug}` : '';
  return request<GalleryImage[]>(`/api/gallery${qs}`);
};

/** Submit a contact/lead form */
export const submitLead = (data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  service_interested?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}) =>
  request<{ success: boolean; id: string; whatsapp_url?: string }>('/api/leads', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// ---------------------------------------------------------------------------
// Admin API
// ---------------------------------------------------------------------------

/** Admin login */
export const adminLogin = (email: string, password: string) =>
  request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

/** Verify current admin session */
export const adminMe = () =>
  request<{ admin: { sub: string; email: string } }>('/api/auth/me');

/** Admin: fetch all leads */
export const adminGetLeads = () =>
  request<Lead[]>('/api/leads');

/** Admin: create a new service */
export const adminCreateService = (data: Partial<Service>) =>
  request<Service>('/api/services', {
    method: 'POST',
    body: JSON.stringify(data),
  });

/** Admin: update a service */
export const adminUpdateService = (id: string, data: Partial<Service>) =>
  request<Service>(`/api/services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

/** Admin: delete a service */
export const adminDeleteService = (id: string) =>
  request<{ success: boolean }>(`/api/services/${id}`, { method: 'DELETE' });

/** Admin: upload gallery image (multipart) */
export async function adminUploadImage(file: File, serviceSlug?: string, caption?: string) {
  const formData = new FormData();
  formData.append('image', file);
  if (serviceSlug) formData.append('service_slug', serviceSlug);
  if (caption) formData.append('caption', caption);

  const url = `${API_BASE}/api/gallery/upload`;
  const token = getToken();

  const res = await fetch(url, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || 'Upload failed');
  }

  return res.json() as Promise<GalleryImage>;
}

/** Admin: delete gallery image */
export const adminDeleteImage = (id: string) =>
  request<{ success: boolean }>(`/api/gallery/${id}`, { method: 'DELETE' });

/** Admin: export leads as CSV (returns Blob) */
export async function adminExportLeads(): Promise<Blob> {
  const url = `${API_BASE}/api/leads/export`;
  const token = getToken();

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) throw new Error('Export failed');
  return res.blob();
}
