import { getProjects } from "@/lib/projects";
import { getSiteContent, getMessages } from "@/lib/content";
import AdminShell from "@/components/admin/AdminShell";

// Always render fresh data (no static caching for the dashboard).
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [projects, content, messages] = await Promise.all([
    getProjects(),
    getSiteContent(),
    getMessages(),
  ]);

  return (
    <AdminShell projects={projects} content={content} messages={messages} />
  );
}
