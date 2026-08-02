import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { getProjects } from "@/lib/projects";
import { getSiteContent } from "@/lib/content";

// Re-fetch on each request so admin edits show up immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, content] = await Promise.all([
    getProjects(),
    getSiteContent(),
  ]);

  return (
    <>
      <Navbar profile={content.profile} />
      <main id="main-content">
        <Hero profile={content.profile} />
        <Stats />
        <About
          competencies={content.competencies}
          skills={content.skills}
          summary={content.profile.summary}
        />
        <Services
          fmsPipeline={content.fmsPipeline}
          additionalSystems={content.additionalSystems}
          mission={content.profile.mission}
        />
        <Experience
          experience={content.experience}
          education={content.education}
        />
        <Projects projects={projects} />
        <Clients clients={content.clients} motto={content.profile.motto} />
        <Contact profile={content.profile} />
      </main>
      <Footer profile={content.profile} />
      <WhatsAppButton profile={content.profile} />
      <BackToTop />
    </>
  );
}
