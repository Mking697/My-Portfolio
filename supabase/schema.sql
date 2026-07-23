-- ─────────────────────────────────────────────────────────────
-- Portfolio database schema
-- Run this in Supabase → SQL Editor → New query → Run.
-- ─────────────────────────────────────────────────────────────

-- Projects table
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  tech_stack  text[] not null default '{}',
  live_url    text,
  github_url  text,
  image_url   text,
  featured    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Keep newest first by default
create index if not exists projects_created_at_idx
  on public.projects (created_at desc);

-- ── Row Level Security ──
alter table public.projects enable row level security;

-- Anyone (anon key) may READ projects — this powers the public portfolio.
drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
  on public.projects
  for select
  using (true);

-- No public INSERT/UPDATE/DELETE policies are defined on purpose.
-- All writes happen through the admin API using the service-role key,
-- which bypasses RLS and is itself protected by Clerk auth.

-- ── Optional: contact messages (for the Contact section) ──
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Allow the public site to submit a message (INSERT only, no reads).
drop policy if exists "Public can send messages" on public.messages;
create policy "Public can send messages"
  on public.messages
  for insert
  with check (true);

-- ── Editable site content (managed from the admin dashboard) ──
-- One JSONB row per section: profile, competencies, skills, experience,
-- education, fmsPipeline, additionalSystems, clients.
create table if not exists public.site_content (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- Public may read content (powers the public site). Writes go through the
-- admin API with the service key (bypasses RLS), protected by Clerk.
drop policy if exists "Public can read site_content" on public.site_content;
create policy "Public can read site_content"
  on public.site_content
  for select
  using (true);

-- ── Seed data (real featured automation projects) ──
insert into public.projects (title, description, tech_stack, live_url, github_url, image_url, featured)
values
  (
    'Custom O2D Web App',
    'A full-stack Order-to-Dispatch suite with a custom GUI that automates the entire inventory flow — from raw material inward to final shipping — replacing manual spreadsheets with an intuitive web interface.',
    array['Google Apps Script', 'HTML5', 'CSS3', 'JavaScript'],
    null, null, null, true
  ),
  (
    'WhatsApp CRM Integration',
    'A WhatsApp API-powered CRM that sends automated quotations, invoices and payment reminders with single-click triggers — turning follow-ups into a one-tap operation.',
    array['WhatsApp API', 'Pabbly Connect', 'Apps Script'],
    null, null, null, true
  ),
  (
    'Auto-Reporting Engine',
    'A script that compiles weekly business data into formatted PDF reports and automatically emails them to management on schedule — delivering actionable MIS insights with zero manual effort.',
    array['Apps Script', 'Looker Studio', 'PDF Automation'],
    null, null, null, true
  ),
  (
    'NextGen Flow Management System (FMS)',
    'End-to-end Flow Management Systems engineered for industrial clients (Auto Die Cast India, Shagun Cares) covering Inward, IQC and Dispatch — with production planning (PPC) and inventory tracking (IMS).',
    array['Google Apps Script', 'FMS', 'IMS', 'Automation'],
    null, null, null, false
  ),
  (
    'HIKOM — Business Website',
    'A business website with integrated email automation and a lead-generation system that captures and nurtures inbound enquiries automatically.',
    array['Web Development', 'Email Automation', 'Lead Generation'],
    'https://hikom.in/', null, null, true
  ),
  (
    'SRM Cool Solutions — Business Website',
    'A business website for SRM Cool Solutions with email automation and a built-in lead generator that turns website visitors into qualified enquiries.',
    array['Web Development', 'Email Automation', 'Lead Generation'],
    'https://srmcoolsolutions.com/', null, null, true
  ),
  (
    'Document Organizer',
    'A tool that automatically organizes, categorizes and manages documents — enabling quick retrieval and streamlined, error-free record-keeping.',
    array['Google Apps Script', 'Automation', 'Web App'],
    null, null, null, false
  ),
  (
    'Host Aatithi',
    'A travel & hospitality marketplace connecting travellers with verified stays, local tour guides and home-cooked fooding directly from hosts across India — no middleman, transparent pricing, with a dedicated partner program for host onboarding.',
    array['Web Development', 'Marketplace', 'Automation'],
    'https://hostaatithi.com/', null, null, true
  ),
  (
    'AllYouMart — Shopify Store',
    'A Shopify e-commerce store (now closed) — a complete online storefront with product catalog, cart and checkout built on Shopify.',
    array['Shopify', 'E-commerce'],
    null, null, null, false
  )
on conflict do nothing;
