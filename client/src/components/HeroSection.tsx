import { Button } from "@/components/ui/button";
import { SiLinkedin } from "react-icons/si";
import { useRef, useEffect } from "react";
import FloatingElements from "./FloatingElements";
import ChatInterface, { type ChatInterfaceRef } from "./ChatInterface";

export default function HeroSection() {
  const chatRef = useRef<ChatInterfaceRef>(null);

  // Expose chat interface globally for ContactSection
  useEffect(() => {
    (window as any).chatInterface = chatRef.current;
    return () => {
      delete (window as any).chatInterface;
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80; // Fixed navigation bar height
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const offsetPosition = elementTop - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen gradient-bg tech-grid relative overflow-hidden flex items-center"
      data-testid="hero-section"
    >
      <FloatingElements />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in" data-testid="hero-content">
            <div className="text-sm font-medium text-accent uppercase tracking-wider">
              AI Automation Specialist
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Simplify and{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                automate
              </span>
              <br />
              your business with{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Transform your operations with cutting-edge AI solutions. From intelligent process automation to conversational AI systems, I deliver enterprise-grade solutions that drive real results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4" data-testid="hero-buttons">
              <Button
                onClick={() => scrollToSection("portfolio")}
                className="bg-primary hover:bg-accent px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 animate-pulse-glow"
                data-testid="button-view-work"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                className="border-border hover:border-accent px-8 py-4 text-lg font-semibold text-foreground hover:text-accent transition-all duration-300 flex items-center gap-2"
                data-testid="button-linkedin-profile"
                onClick={() => window.open("https://www.linkedin.com/in/pawe%C5%82-budzan-95892b173/", "_blank")}
              >
                <SiLinkedin className="w-5 h-5" />
                LinkedIn Profile
              </Button>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-8 pt-8" data-testid="hero-metrics">
              <div className="text-center">
                <div className="text-3xl font-bold metric-number" data-testid="metric-automation">80%</div>
                <div className="text-sm text-muted-foreground">Task Automation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold metric-number" data-testid="metric-accuracy">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold metric-number" data-testid="metric-cost-reduction">75%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Live AI Chat */}
          <div className="relative animate-slide-up" data-testid="hero-mockup">
            <div className="relative">
              <ChatInterface ref={chatRef} />
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl shadow-lg opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
