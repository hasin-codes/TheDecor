import { Hero } from "@/components/ui";
import { AboutSection } from "@/components/about";
import { Footer } from "@/components/footer";
import { ProjectsSection } from "@/components/work";
import { TeamSection } from "@/components/team";
import { PhilosophySection } from "@/components/philosophy";
import { TestimonialSection } from "@/components/testimonials";
import { GetInTouchSection } from "@/components/getintouch";
import { PageWrapper } from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-background">
        <main className="w-full">
          <Hero />
          <AboutSection />

          <ProjectsSection />
          <TeamSection />
          <PhilosophySection />
          <TestimonialSection />
          <GetInTouchSection />
          <Footer />
        </main>
      </div>
    </PageWrapper>
  );
}
