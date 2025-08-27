import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 space-y-8 py-8">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden">
          <PortfolioSection />
        </div>
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden">
          <ServicesSection />
        </div>
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden">
          <ContactSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
