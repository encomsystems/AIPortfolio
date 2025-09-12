import { Button } from "@/components/ui/button";
import { Mail, Zap, MapPin } from "lucide-react";

export default function ContactSection() {
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

  const handleScheduleConsultation = () => {
    // Scroll to chat section (in hero/home section)
    scrollToSection("home");
    
    // Wait for scroll to complete, then trigger AI consultation
    setTimeout(() => {
      const chatInput = document.querySelector('[data-testid="chat-input"]') as HTMLInputElement;
      const chatForm = chatInput?.closest('form');
      
      if (chatInput && chatForm) {
        // Set consultation message
        const consultationMessage = "I'd like to schedule a consultation to discuss my AI automation needs and potential solutions for my business.";
        chatInput.value = consultationMessage;
        
        // Trigger input change event
        const event = new Event('input', { bubbles: true });
        chatInput.dispatchEvent(event);
        
        // Focus on the input
        chatInput.focus();
        
        // Auto-submit after a short delay to let user see the message
        setTimeout(() => {
          const sendButton = chatForm.querySelector('[data-testid="chat-send-button"]') as HTMLButtonElement;
          if (sendButton && !sendButton.disabled) {
            sendButton.click();
          }
        }, 1500);
      }
    }, 1000); // Wait 1 second for scroll to complete
  };

  return (
    <section id="contact" className="py-16" data-testid="contact-section">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's Build the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Future
            </span>{" "}
            Together
          </h2>
          <p className="text-xl text-muted-foreground">
            Ready to transform your business with AI? Let's discuss your project and create innovative solutions.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8" data-testid="contact-info">
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">Email</div>
                    <div className="text-muted-foreground">p.budzan@aiconshub.com</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">Response Time</div>
                    <div className="text-muted-foreground">Within 24 hours</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">Location</div>
                    <div className="text-muted-foreground">Remote & On-site</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect p-8 rounded-2xl text-center">
              <h4 className="text-xl font-bold mb-4">Project Consultation</h4>
              <p className="text-muted-foreground mb-6">
                Free 30-minute consultation to discuss your AI automation needs and potential solutions.
              </p>
              <Button 
                onClick={handleScheduleConsultation}
                className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 hover:shadow-lg transition-all duration-300"
                data-testid="button-schedule-consultation"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
