// Shared data types for the portfolio.

export interface Project {
  id: string; // uuid
  title: string;
  description: string;
  tech_stack: string[]; // e.g. ["Next.js", "Supabase", "TypeScript"]
  live_url: string | null;
  github_url: string | null;
  image_url: string | null;
  featured: boolean;
  created_at: string; // ISO timestamp
}

// Shape of the admin form / insert payload (id + created_at are DB-generated).
export type ProjectInput = Omit<Project, "id" | "created_at">;

// ── Editable site content (managed from the admin dashboard) ──

export interface ProfileData {
  name: string;
  title: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  linkedinLabel: string;
  linkedinUrl: string;
  github: string;
  cvUrl: string;
  heroImage: string;
  existingPortfolio: string;
  summary: string;
  motto: string;
  mission: string;
}

export interface Competency {
  icon: string;
  title: string;
  desc: string;
}

export interface Skill {
  label: string;
  level: number;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  current: boolean;
  points: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  year: string;
}

export interface PipelineItem {
  name: string;
  desc: string;
}

export interface SystemItem {
  icon: string;
  name: string;
  desc: string;
}

export interface SiteContent {
  profile: ProfileData;
  competencies: Competency[];
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  fmsPipeline: PipelineItem[];
  additionalSystems: SystemItem[];
  clients: string[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Keys that map to editable content sections in the DB.
export type ContentKey = keyof SiteContent;

