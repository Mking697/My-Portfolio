// ─────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content (real data
// from Manoj Tiwari's CV & existing portfolio). Edit here to
// update the site — components read from this file.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Manoj Tiwari",
  title: "Sr. Business Automation & MIS Specialist",
  role: "Automation Architect",
  tagline:
    "I architect end-to-end business systems — turning complex logic into user-friendly Web Apps with Google Apps Script, and eliminating manual work with automation & real-time BI.",
  location: "Deoria, UP · Open to relocate",
  email: "manojtiwari8428@gmail.com",
  phone: "+91 63925 78428",
  phoneHref: "+916392578428",
  // WhatsApp number in international format, digits only (no +, no spaces).
  whatsapp: "916392578428",
  linkedinLabel: "Manoj Tiwari",
  linkedinUrl: "https://linkedin.com/in/manoj-tiwari-mis",
  github: "https://github.com/Mking697",
  cvUrl:
    "https://drive.google.com/file/d/1B52hhHbVDtf8XUDvMwpyb3_1X9k3CShQ/view?usp=sharing",
  heroImage:
    "https://i.postimg.cc/YqvCYLHh/Gemini-Generated-Image-2792792792792792.png",
  existingPortfolio:
    "https://script.google.com/macros/s/AKfycbz_ZdJ3ozXFWnfW-SabcwVf-ComV-2Zo_0V-efhszDzCzvaiY_pv9XwI5MPArqo1bZKrg/exec",
  summary:
    "Innovative Automation Expert with 5+ years of experience architecting end-to-end business systems. I transform complex business logic into user-friendly Web Applications using Google Apps Script, HTML5 and CSS3 — developing full-scale ERP-style solutions (CRM, IMS, Payroll) that eliminate manual intervention and deliver real-time Business Intelligence for startups and MSMEs.",
  motto: "Automating Business, Amplifying Growth.",
  mission:
    "I develop next-generation business systems for startups and MSMEs that integrate automation using Google Sheets and Looker Studio — interconnected, process-driven systems that minimise human intervention and boost productivity, efficiency and profitability.",
};

// About cards — icon keys map to lucide-react icons in About.tsx
export const competencies = [
  {
    icon: "Code2",
    title: "Web App Development",
    desc: "ERP-style web apps with custom GUIs using Google Apps Script, HTML5, CSS3 & JavaScript — replacing legacy spreadsheets with intuitive dashboards.",
  },
  {
    icon: "Workflow",
    title: "Automation & Integration",
    desc: "End-to-end automation with WhatsApp API, Pabbly Connect & email — single-click triggers for quotations, invoices, notifications and payment reminders.",
  },
  {
    icon: "Database",
    title: "Data Engineering & MIS",
    desc: "Advanced Google Sheets/Excel, data cleaning and MIS automation — architecting FMS, IMS and CRM systems for streamlined, error-free operations.",
  },
  {
    icon: "BarChart3",
    title: "BI & Reporting",
    desc: "Real-time business intelligence with Looker Studio dashboards, custom HTML dashboards and automated PDF reporting delivered straight to management.",
  },
];

// Skill proficiency bars
export const skills: { label: string; level: number }[] = [
  { label: "Google Apps Script & Web Apps (HTML/CSS/JS)", level: 95 },
  { label: "Automation (WhatsApp API, Pabbly, Email)", level: 92 },
  { label: "Data Engineering (Advanced Sheets & Excel)", level: 90 },
  { label: "BI Visualization (Looker Studio & Dashboards)", level: 88 },
];

// Experience timeline ("System Logs: Deployment History")
export const experience = [
  {
    role: "Sr. MIS & Automation Executive",
    company: "Hicon Engineering Company (P) Limited",
    period: "Nov 2024 – Present",
    current: true,
    points: [
      "ERP Architecture: Custom Google Workspace-based ERP systems tracking engineering production, quality assurance and supply chain metrics.",
      "UI/UX Optimization: Web App interfaces for centralized data entry and monitoring, replacing legacy spreadsheets with intuitive GUI dashboards.",
      "Executive Intelligence: Real-time departmental performance insights through automated reporting and graphical analysis.",
    ],
  },
  {
    role: "Full-Time Freelance Automation Consultant",
    company: "MH Insta Sheets",
    period: "Feb 2024 – Nov 2024",
    current: false,
    points: [
      'Custom FMS Development: Engineered "NextGen" Flow Management Systems for industrial clients including Auto Die Cast India and Shagun Cares Inc.',
      "Full-Stack Solutions: Integrated O2D (Order-to-Dispatch) systems with automated WhatsApp notifications and payment reminders.",
      "Business Growth: Scaled MSME operations by automating production planning (PPC) and raw material inventory tracking (IMS).",
    ],
  },
  {
    role: "Sr. MIS & Data Management Executive",
    company: "Callas MDI",
    period: "Aug 2023 – Feb 2024",
    current: false,
    points: [
      "System Architecture: Google Sheets-based CRM and Sales Tracker for real-time lead pipeline visibility.",
      "Workflow Efficiency: Automated Task Management Tool with integrated WhatsApp reminders to professionalize delegation.",
      "Infrastructure: Centralized company Intranet via Google Sites for streamlined access to internal resources.",
    ],
  },
  {
    role: "Sr. MIS & Data Management Executive",
    company: "UTL Solar",
    period: "Oct 2022 – Aug 2023",
    current: false,
    points: [
      "Financial Automation: Digitized the full payment approval lifecycle — from request to UTR generation — reducing processing delays.",
      "Operational Intelligence: Dynamic business dashboards in Looker Studio tracking Sales, Expenses and Operations trends.",
      "Reporting: Automated the generation and scheduling of MIS reports delivered to management via email.",
    ],
  },
  {
    role: "Sr. MIS & Data Management Executive",
    company: "Tulip Elastics Pvt Ltd",
    period: "Feb 2022 – Sep 2022",
    current: false,
    points: [
      "Workflow Automation: End-to-end Flow Management Systems (FMS) for Inward, IQC and Dispatch stages.",
      'Documentation Speed: Single-click "Form-to-PDF" tool for instant generation of professional Quotations and Invoices.',
    ],
  },
];

export const education = [
  {
    title: "Diploma in Business Automation",
    org: "Business Coaching India",
    year: "2022",
  },
  {
    title: "Bachelor of Commerce (B.Com)",
    org: "DDU Gorakhpur University",
    year: "2018",
  },
];

// Brand / offering (single-sourced from the profile object above)
export const motto = profile.motto;
export const mission = profile.mission;

// Core end-to-end FMS pipeline (Order-to-Dispatch ecosystem, in flow order)
export const fmsPipeline: { name: string; desc: string }[] = [
  {
    name: "Purchase FMS",
    desc: "Define requirements, supplier selection, negotiation, and PO approval.",
  },
  {
    name: "Inward FMS",
    desc: "Raw & other material inward, quality check, and payment records.",
  },
  {
    name: "IQC FMS",
    desc: "Incoming quality control: pass, pass-on-deviation, or return to supplier.",
  },
  {
    name: "IMS · Raw Material",
    desc: "Approved raw material auto-added to inventory, section-wise.",
  },
  {
    name: "PMS · Production",
    desc: "PPC planning from sale orders, auto quantity calculation, and loss tracking.",
  },
  {
    name: "IMS · Finished Goods",
    desc: "Achieved production auto-added to finished-goods inventory.",
  },
  {
    name: "Dispatch FMS",
    desc: "Dispatch as per sales order with vehicle & transport tracking.",
  },
  {
    name: "CRM FMS",
    desc: "Automated payment follow-ups and safely-dispatched confirmations.",
  },
  {
    name: "Account FMS",
    desc: "Invoice-wise payments, management approval, and auto vendor updates.",
  },
];

// Additional systems (icon keys map to lucide-react in Services.tsx)
export const additionalSystems = [
  {
    icon: "Share2",
    name: "Advance Delegation System",
    desc: "MD/EA delegate tasks to doers via mobile or laptop, tracked on a live Doers Dashboard.",
  },
  {
    icon: "BarChart3",
    name: "MIS Automation",
    desc: "Auto-generated MIS — doer & department wise, daily, weekly, monthly and yearly.",
  },
  {
    icon: "FileText",
    name: "Auto Report Compiler",
    desc: "Graphs & bar charts by date range, compiled into weekly PDFs auto-mailed to the MD.",
  },
  {
    icon: "Users",
    name: "Payroll & HR (HDR)",
    desc: "Requisition & hiring FMS, 5-step delegation, and a full payroll system.",
  },
  {
    icon: "MessageCircle",
    name: "WhatsApp & Email",
    desc: "WhatsApp API and email automation wired across every module.",
  },
  {
    icon: "Fingerprint",
    name: "Attendance System",
    desc: "Selfie & geo-based attendance capture with real-time records.",
  },
  {
    icon: "ClipboardList",
    name: "RGP & Petty Cash",
    desc: "Returnable Gate Pass, vendor relation management, and petty cash book.",
  },
  {
    icon: "Network",
    name: "Intranet & Checklists",
    desc: "Central company intranet, checklists, and custom tracking systems.",
  },
];

// Clients served (from the brochure)
export const clients: string[] = [
  "Auto Die Cast (India)",
  "Shagun Cares Inc.",
  "Gargee Designers",
  "OSV",
  "Earthy Shades",
  "MeenaGurnam",
  "ABC International Placement Services",
  "Callas",
];
