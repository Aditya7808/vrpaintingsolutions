// ===================================================================
// VR Painting Solutions — Shared Types
// ===================================================================

export interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  scope_of_work: string;
  process_steps: ProcessStep[];
  faqs: FAQ[];
  price_hint: string | null;
  is_active: boolean;
  sort_order: number;
  hero_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceSummary {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  hero_image: string | null;
  sort_order: number;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  service_slug: string | null;
  caption: string | null;
  sort_order: number;
  uploaded_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  service_interested: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  admin: AdminUser;
}
