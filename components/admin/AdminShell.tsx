"use client";

import { useState } from "react";
import {
  FolderGit2,
  User,
  Sparkles,
  Briefcase,
  Workflow,
  Users,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import ProfileEditor from "./ProfileEditor";
import ObjectListEditor, { type Field } from "./ObjectListEditor";
import StringListEditor from "./StringListEditor";
import MessagesViewer from "./MessagesViewer";
import type { Project, SiteContent, Message } from "@/lib/types";

const COMPETENCY_ICONS = ["Code2", "Database", "Workflow", "BarChart3"];
const SYSTEM_ICONS = [
  "Share2",
  "BarChart3",
  "FileText",
  "Users",
  "MessageCircle",
  "Fingerprint",
  "ClipboardList",
  "Network",
];

const competencyFields: Field[] = [
  { name: "icon", label: "Icon", type: "select", options: COMPETENCY_ICONS },
  { name: "title", label: "Title" },
  { name: "desc", label: "Description", type: "textarea" },
];
const skillFields: Field[] = [
  { name: "label", label: "Skill Label" },
  { name: "level", label: "Level %", type: "number", hint: "0-100" },
];
const experienceFields: Field[] = [
  { name: "role", label: "Role" },
  { name: "company", label: "Company" },
  { name: "period", label: "Period", hint: "e.g. Nov 2024 – Present" },
  { name: "current", label: "Current job?", type: "checkbox", placeholder: "Currently working here" },
  { name: "points", label: "Bullet Points", type: "lines", hint: "one per line" },
];
const educationFields: Field[] = [
  { name: "title", label: "Course / Degree" },
  { name: "org", label: "Institution" },
  { name: "year", label: "Year" },
];
const pipelineFields: Field[] = [
  { name: "name", label: "Module Name" },
  { name: "desc", label: "Description", type: "textarea" },
];
const systemFields: Field[] = [
  { name: "icon", label: "Icon", type: "select", options: SYSTEM_ICONS },
  { name: "name", label: "System Name" },
  { name: "desc", label: "Description", type: "textarea" },
];

const TABS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "profile", label: "Profile", icon: User },
  { id: "about", label: "About & Skills", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "services", label: "Services", icon: Workflow },
  { id: "clients", label: "Clients", icon: Users },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

export default function AdminShell({
  projects,
  content,
  messages,
}: {
  projects: Project[];
  content: SiteContent;
  messages: Message[];
}) {
  const [tab, setTab] = useState("projects");

  return (
    <div>
      {/* Tab bar */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border border-accent/40 bg-accent/15 text-white"
                  : "border border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              {t.id === "messages" && messages.length > 0 && (
                <span className="rounded-full bg-accent-cyan/20 px-1.5 text-[11px] text-accent-cyan">
                  {messages.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tab === "projects" && <AdminDashboard initialProjects={projects} />}

      {tab === "profile" && <ProfileEditor initial={content.profile} />}

      {tab === "about" && (
        <>
          <ObjectListEditor
            title="Core Competencies"
            description="The 4 cards in the About section."
            contentKey="competencies"
            initial={content.competencies}
            fields={competencyFields}
            newItem={{ icon: "Code2", title: "", desc: "" }}
            titleField="title"
          />
          <ObjectListEditor
            title="Skill Bars"
            description="Proficiency bars with percentages."
            contentKey="skills"
            initial={content.skills}
            fields={skillFields}
            newItem={{ label: "", level: 80 }}
            titleField="label"
          />
        </>
      )}

      {tab === "experience" && (
        <>
          <ObjectListEditor
            title="Experience Timeline"
            description="Your work history (newest first)."
            contentKey="experience"
            initial={content.experience}
            fields={experienceFields}
            newItem={{ role: "", company: "", period: "", current: false, points: [] }}
            titleField="company"
          />
          <ObjectListEditor
            title="Education & Certifications"
            contentKey="education"
            initial={content.education}
            fields={educationFields}
            newItem={{ title: "", org: "", year: "" }}
            titleField="title"
          />
        </>
      )}

      {tab === "services" && (
        <>
          <ObjectListEditor
            title="FMS Pipeline"
            description="The end-to-end automation ecosystem modules (in order)."
            contentKey="fmsPipeline"
            initial={content.fmsPipeline}
            fields={pipelineFields}
            newItem={{ name: "", desc: "" }}
            titleField="name"
          />
          <ObjectListEditor
            title="Additional Systems"
            contentKey="additionalSystems"
            initial={content.additionalSystems}
            fields={systemFields}
            newItem={{ icon: "Share2", name: "", desc: "" }}
            titleField="name"
          />
        </>
      )}

      {tab === "clients" && (
        <StringListEditor
          title="Clients"
          description="Client / company names shown in the Clients section."
          contentKey="clients"
          initial={content.clients}
          placeholder="Client name"
        />
      )}

      {tab === "messages" && <MessagesViewer initial={messages} />}
    </div>
  );
}
