import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-xl" : "glass-effect"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection("home")}
            data-testid="logo"
          >
            AI.Expert
          </div>
          
          <div className="hidden md:flex space-x-8" data-testid="nav-links">
            <button 
              onClick={() => scrollToSection("home")}
              className="nav-link text-foreground hover:text-accent"
              data-testid="link-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("portfolio")}
              className="nav-link text-foreground hover:text-accent"
              data-testid="link-portfolio"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="nav-link text-foreground hover:text-accent"
              data-testid="link-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="nav-link text-foreground hover:text-accent"
              data-testid="link-contact"
            >
              Contact
            </button>
          </div>
          
          <Button 
            onClick={() => scrollToSection("contact")}
            className="bg-primary hover:bg-accent text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            data-testid="button-get-started"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
