import { Nav, Hero, Manifesto, Features, Model, FoundingSection, ContactSection, Footer } from "@/components/sections";
import { Marquee, MapSection, FinalCTA } from "@/components/landing-extras";
import { Credibility } from "@/components/credibility";
import CinematicShowcase from "@/components/cinematic";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <Features />
      <Credibility />
      <CinematicShowcase />
      <Model />
      <MapSection />
      <FoundingSection />
      <ContactSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
