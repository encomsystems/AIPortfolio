import { Button } from "@/components/ui/button";
import FloatingElements from "./FloatingElements";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
                className="border-border hover:border-accent px-8 py-4 text-lg font-semibold text-foreground hover:text-accent transition-all duration-300"
                data-testid="button-download-cv"
              >
                Download CV
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

          {/* Right Content - 3D Mockup */}
          <div className="relative animate-slide-up" data-testid="hero-mockup">
            <div className="relative">
              {/* Main Device Mockup */}
              <div className="bg-gradient-to-br from-card to-secondary p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 animate-float">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="text-xs text-muted-foreground">AI Dashboard</div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    <div className="h-2 bg-gradient-to-r from-accent to-primary rounded-full w-3/4"></div>
                    <div className="h-2 bg-gradient-to-r from-primary to-accent rounded-full w-1/2"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium">Automation</span>
                    </div>
                    <div className="h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium">AI Chat</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl shadow-lg animate-float-delayed opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg animate-float opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
