export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-background relative" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            AI Solutions{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my comprehensive range of AI-powered solutions that have transformed businesses across industries
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid lg:grid-cols-2 gap-8" data-testid="portfolio-grid">
          {/* Process Automation */}
          <div className="project-card group glass-effect p-8 rounded-2xl relative overflow-hidden" data-testid="card-automation">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Intelligent Process Automation</h3>
                  <p className="text-muted-foreground">n8n workflows • AI agents • Business integration</p>
                </div>
                <div className="text-3xl metric-number font-bold" data-testid="metric-automation-80">80%</div>
              </div>
              
              {/* Mock Workflow Visualization */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  <div className="h-2 bg-gradient-to-r from-primary/50 to-transparent rounded-full flex-1"></div>
                  <div className="px-3 py-1 bg-primary/20 rounded-full text-xs">CRM</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-accent rounded-full animate-pulse" style={{animationDelay: "0.5s"}}></div>
                  <div className="h-2 bg-gradient-to-r from-accent/50 to-transparent rounded-full flex-1"></div>
                  <div className="px-3 py-1 bg-accent/20 rounded-full text-xs">ERP</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{animationDelay: "1s"}}></div>
                  <div className="h-2 bg-gradient-to-r from-primary/50 to-transparent rounded-full flex-1"></div>
                  <div className="px-3 py-1 bg-primary/20 rounded-full text-xs">Google Workspace</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-primary font-semibold">Key Technologies</div>
                  <div className="text-muted-foreground">n8n, Zapier, AI Agents</div>
                </div>
                <div>
                  <div className="text-accent font-semibold">Impact</div>
                  <div className="text-muted-foreground">80% task reduction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversational AI */}
          <div className="project-card group glass-effect p-8 rounded-2xl relative overflow-hidden" data-testid="card-conversational-ai">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Conversational AI Systems</h3>
                  <p className="text-muted-foreground">Voice AI • Eleven Labs • Custom NLP</p>
                </div>
                <div className="text-3xl metric-number font-bold" data-testid="metric-resolution-85">85%</div>
              </div>
              
              {/* Mock Chat Interface */}
              <div className="bg-card/50 rounded-lg p-4 mb-6 space-y-3">
                <div className="flex justify-end">
                  <div className="bg-primary px-3 py-2 rounded-lg text-sm max-w-xs">
                    How can I track my order?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-secondary px-3 py-2 rounded-lg text-sm max-w-xs">
                    I can help you track your order. Please provide your order number.
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>AI typing...</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-accent font-semibold">Technologies</div>
                  <div className="text-muted-foreground">Eleven Labs, OpenAI</div>
                </div>
                <div>
                  <div className="text-primary font-semibold">Resolution Rate</div>
                  <div className="text-muted-foreground">85% first contact</div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom AI Applications */}
          <div className="project-card group glass-effect p-8 rounded-2xl relative overflow-hidden" data-testid="card-custom-ai">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Custom AI Applications</h3>
                  <p className="text-muted-foreground">Flutter • React • Real-time dashboards</p>
                </div>
                <div className="text-3xl metric-number font-bold" data-testid="metric-performance-95">95%</div>
              </div>
              
              {/* Mock Dashboard */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Active Users</div>
                  <div className="text-lg font-bold">12.5K</div>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">AI Accuracy</div>
                  <div className="text-lg font-bold">95.2%</div>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Performance</div>
                  <div className="text-lg font-bold">99.9%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-primary font-semibold">Frameworks</div>
                  <div className="text-muted-foreground">Flutter, React, Vue</div>
                </div>
                <div>
                  <div className="text-accent font-semibold">Performance</div>
                  <div className="text-muted-foreground">Sub-second response</div>
                </div>
              </div>
            </div>
          </div>

          {/* RAG Systems */}
          <div className="project-card group glass-effect p-8 rounded-2xl relative overflow-hidden" data-testid="card-rag-systems">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">RAG Systems & Knowledge Base</h3>
                  <p className="text-muted-foreground">Elastic • Qdrant • Document processing</p>
                </div>
                <div className="text-3xl metric-number font-bold" data-testid="metric-documents-100k">100K+</div>
              </div>
              
              {/* Mock Knowledge Processing */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span>Document Processing</span>
                  <span className="text-green-400">✓ Complete</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full w-full"></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div className="bg-primary/20 p-2 rounded">
                    <div className="font-bold">100K+</div>
                    <div className="text-muted-foreground">Documents</div>
                  </div>
                  <div className="bg-accent/20 p-2 rounded">
                    <div className="font-bold">95%</div>
                    <div className="text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="bg-primary/20 p-2 rounded">
                    <div className="font-bold">Daily</div>
                    <div className="text-muted-foreground">Processing</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-accent font-semibold">Vector DBs</div>
                  <div className="text-muted-foreground">Elastic, Qdrant, Pinecone</div>
                </div>
                <div>
                  <div className="text-primary font-semibold">Scale</div>
                  <div className="text-muted-foreground">100K+ docs daily</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
