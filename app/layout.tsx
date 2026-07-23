import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/config";
import Background from "@/components/Background";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Manoj Tiwari — Sr. Business Automation & MIS Specialist",
  description:
    "Portfolio of Manoj Tiwari — Sr. Business Automation & MIS Specialist. Architecting ERP-style web apps with Google Apps Script, workflow automation (WhatsApp API, Pabbly), and real-time BI dashboards.",
  keywords: [
    "Manoj Tiwari",
    "Business Automation",
    "MIS Specialist",
    "Google Apps Script",
    "Workflow Automation",
    "WhatsApp API",
    "Looker Studio",
    "FMS",
  ],
  openGraph: {
    title: "Manoj Tiwari — Sr. Business Automation & MIS Specialist",
    description:
      "Architecting end-to-end business systems — web apps, automation, and real-time Business Intelligence for startups and MSMEs.",
    type: "website",
    siteName: "Manoj Tiwari — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manoj Tiwari — Sr. Business Automation & MIS Specialist",
    description:
      "Web apps, workflow automation, and real-time Business Intelligence for startups and MSMEs.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const html = (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-screen font-sans">
        <Background />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );

  // Only wrap in ClerkProvider when Clerk keys are present. Without them the
  // site runs in local mode (open /admin) so it works on localhost instantly.
  return isClerkConfigured ? <ClerkProvider>{html}</ClerkProvider> : html;
}
