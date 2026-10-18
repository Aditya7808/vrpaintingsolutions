-- VR Painting Solutions — Database Schema
-- PostgreSQL (Supabase)

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- Services table
-- =============================================================================
CREATE TABLE IF NOT EXISTS services (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          VARCHAR(100) UNIQUE NOT NULL,
  title         VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL DEFAULT '',
  full_description  TEXT NOT NULL DEFAULT '',
  scope_of_work     TEXT NOT NULL DEFAULT '',
  process_steps     JSONB NOT NULL DEFAULT '[]',
  faqs              JSONB NOT NULL DEFAULT '[]',
  price_hint    VARCHAR(100),            -- e.g. "₹12/sq.ft" — NULL until confirmed
  is_active     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  hero_image    VARCHAR(500),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- Gallery images
-- =============================================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url           VARCHAR(500) NOT NULL,
  service_slug  VARCHAR(100) REFERENCES services(slug) ON DELETE SET NULL,
  caption       VARCHAR(500),
  sort_order    INTEGER NOT NULL DEFAULT 0,
  uploaded_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- Leads (contact form submissions)
-- =============================================================================
CREATE TABLE IF NOT EXISTS leads (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                VARCHAR(255) NOT NULL,
  phone               VARCHAR(20) NOT NULL,
  email               VARCHAR(255),
  message             TEXT,
  service_interested  VARCHAR(100),
  utm_source          VARCHAR(255),
  utm_medium          VARCHAR(255),
  utm_campaign        VARCHAR(255),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- Admin users
-- =============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- Indexes
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_service ON gallery_images(service_slug);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
