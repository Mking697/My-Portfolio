import type { Project } from "./types";

// Real featured automation projects (from Manoj's CV / Innovation Lab).
// Used as the local (no-Supabase) data source so the site is never empty,
// and mirrored in supabase/schema.sql.
export const seedProjects: Project[] = [
  {
    id: "seed-0001-o2d-webapp",
    title: "Custom O2D Web App",
    description:
      "A full-stack Order-to-Dispatch suite with a custom GUI that automates the entire inventory flow — from raw material inward to final shipping — replacing manual spreadsheets with an intuitive web interface.",
    tech_stack: ["Google Apps Script", "HTML5", "CSS3", "JavaScript"],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: true,
    created_at: "2025-06-01T10:00:00.000Z",
  },
  {
    id: "seed-0002-whatsapp-crm",
    title: "WhatsApp CRM Integration",
    description:
      "A WhatsApp API-powered CRM that sends automated quotations, invoices and payment reminders with single-click triggers — turning follow-ups into a one-tap operation.",
    tech_stack: ["WhatsApp API", "Pabbly Connect", "Apps Script"],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: true,
    created_at: "2025-05-01T10:00:00.000Z",
  },
  {
    id: "seed-0003-auto-reporting",
    title: "Auto-Reporting Engine",
    description:
      "A script that compiles weekly business data into formatted PDF reports and automatically emails them to management on schedule — delivering actionable MIS insights with zero manual effort.",
    tech_stack: ["Apps Script", "Looker Studio", "PDF Automation"],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: true,
    created_at: "2025-04-01T10:00:00.000Z",
  },
  {
    id: "seed-0004-nextgen-fms",
    title: "NextGen Flow Management System (FMS)",
    description:
      "End-to-end Flow Management Systems engineered for industrial clients (Auto Die Cast India, Shagun Cares) covering Inward, IQC and Dispatch — with production planning (PPC) and inventory tracking (IMS).",
    tech_stack: ["Google Apps Script", "FMS", "IMS", "Automation"],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: false,
    created_at: "2025-03-01T10:00:00.000Z",
  },
  {
    id: "seed-0005-hikom",
    title: "HIKOM — Business Website",
    description:
      "A business website with integrated email automation and a lead-generation system that captures and nurtures inbound enquiries automatically.",
    tech_stack: ["Web Development", "Email Automation", "Lead Generation"],
    live_url: "https://hikom.in/",
    github_url: null,
    image_url: null,
    featured: true,
    created_at: "2025-07-10T10:00:00.000Z",
  },
  {
    id: "seed-0006-srm-cool",
    title: "SRM Cool Solutions — Business Website",
    description:
      "A business website for SRM Cool Solutions with email automation and a built-in lead generator that turns website visitors into qualified enquiries.",
    tech_stack: ["Web Development", "Email Automation", "Lead Generation"],
    live_url: "https://srmcoolsolutions.com/",
    github_url: null,
    image_url: null,
    featured: true,
    created_at: "2025-02-15T10:00:00.000Z",
  },
  {
    id: "seed-0007-doc-organizer",
    title: "Document Organizer",
    description:
      "A tool that automatically organizes, categorizes and manages documents — enabling quick retrieval and streamlined, error-free record-keeping.",
    tech_stack: ["Google Apps Script", "Automation", "Web App"],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: false,
    created_at: "2025-01-15T10:00:00.000Z",
  },
  {
    id: "seed-0008-host-aatithi",
    title: "Host Aatithi",
    description:
      "A travel & hospitality marketplace connecting travellers with verified stays, local tour guides and home-cooked fooding directly from hosts across India — no middleman, transparent pricing, with a dedicated partner program for host onboarding.",
    tech_stack: ["Web Development", "Marketplace", "Automation"],
    live_url: "https://hostaatithi.com/",
    github_url: null,
    image_url: null,
    featured: true,
    created_at: "2024-12-01T10:00:00.000Z",
  },
  {
    id: "seed-0009-allyoumart",
    title: "AllYouMart — Shopify Store",
    description:
      "A Shopify e-commerce store (now closed) — a complete online storefront with product catalog, cart and checkout built on Shopify.",
    tech_stack: ["Shopify", "E-commerce"],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: false,
    created_at: "2024-10-01T10:00:00.000Z",
  },
];
