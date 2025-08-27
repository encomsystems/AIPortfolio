import FloatingElements from "./FloatingElements";
import { Link, Settings, MessageSquare } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 gradient-bg relative" data-testid="services-section">
      <FloatingElements />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            AI Services &{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI solutions tailored to transform your business operations and drive growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="services-grid">
          {/* API Integration */}
          <div className="glass-effect p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group" data-testid="service-api-integration">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Link className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">API Integration & Orchestration</h3>
            <p className="text-muted-foreground mb-4">
              Seamlessly connect electronic invoice systems, multimedia platforms, and enterprise APIs into unified AI-powered workflows.
            </p>
            <div className="text-sm text-accent font-medium">
              Enterprise Integration • Workflow Automation • System Orchestration
            </div>
          </div>

          {/* AI Avatars */}
          <div className="glass-effect p-6 rounded-2xl hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group" data-testid="service-ai-avatars">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">AI Avatar Training Systems</h3>
            <p className="text-muted-foreground mb-4">
              Multi-language AI avatar systems using HeyGen and D-ID platforms, delivering personalized training while reducing operational costs by 75%.
            </p>
            <div className="text-sm text-primary font-medium">
              HeyGen • D-ID • Multi-language • Cost Reduction: 75%
            </div>
          </div>

          {/* Custom GPTs */}
          <div className="glass-effect p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group" data-testid="service-custom-gpts">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Custom GPTs & AI Assistants</h3>
            <p className="text-muted-foreground mb-4">
              Intelligent AI assistants handling customer interactions with 85% first-contact resolution, transforming customer service operations.
            </p>
            <div className="text-sm text-accent font-medium">
              OpenAI GPT • Custom Training • 85% Resolution Rate
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center" data-testid="tech-stack">
          <h3 className="text-2xl font-bold mb-8">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium" data-testid="tech-n8n">n8n</span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium" data-testid="tech-openai">OpenAI</span>
            <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium" data-testid="tech-eleven-labs">Eleven Labs</span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium" data-testid="tech-flutter">Flutter</span>
            <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium" data-testid="tech-react">React</span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium" data-testid="tech-elastic">Elastic</span>
            <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium" data-testid="tech-qdrant">Qdrant</span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium" data-testid="tech-heygen">HeyGen</span>
            <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium" data-testid="tech-d-id">D-ID</span>
          </div>
        </div>
      </div>
    </section>
  );
}
