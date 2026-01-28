import { Hero } from "@/components/ui";
import { AboutSection } from "@/components/about";
import { ServicesSection } from "@/components/services";
import { Footer } from "@/components/footer";
import { ProjectsSection } from "@/components/work";
import { TeamSection } from "@/components/team";
import { PhilosophySection } from "@/components/philosophy";
import { TestimonialSection } from "@/components/testimonials";

import { PageWrapper } from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-background">
        <main className="w-full">
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <PhilosophySection />
          <TeamSection />
          <ServicesSection />
          <TestimonialSection />

          <Footer />
        </main>
      </div>
    </PageWrapper>
  );
}
