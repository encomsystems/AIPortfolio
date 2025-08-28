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
      className="fixed top-0 w-full z-50 transition-all duration-300"
      data-testid="navigation"
    >
      <div className="flex justify-center px-6 py-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center space-x-12">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection("home")}
            data-testid="logo"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div className="text-xl font-bold text-white">
              ConsHub
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8" data-testid="nav-links">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
              data-testid="link-home"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection("portfolio")}
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
              data-testid="link-portfolio"
            >
              FEATURES
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
              data-testid="link-services"
            >
              USE CASES
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
              data-testid="link-contact"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection("portfolio")}
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
              data-testid="button-portfolio"
            >
              PORTFOLIO
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
