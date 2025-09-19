import { Mail } from "lucide-react";
import { SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="py-12 bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              AI.ConsHub
            </div>
            <p className="text-muted-foreground">
              Transforming businesses with cutting-edge AI solutions and intelligent automation.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Process Automation</div>
              <div>Conversational AI</div>
              <div>Custom Applications</div>
              <div>API Integration</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="space-y-2 text-sm">
              <a 
                href="https://www.linkedin.com/in/pawe%C5%82-budzan-95892b173/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href="mailto:p.budzan@aiconshub.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          © 2024 AI.ConsHub. All rights reserved. • Powered by cutting-edge AI technology • V1.0.1
        </div>
      </div>
    </footer>
  );
}
