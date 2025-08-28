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
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>LinkedIn</div>
              <div>GitHub</div>
              <div>Twitter</div>
              <div>Email</div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          © 2024 AI.ConsHub. All rights reserved. • Powered by cutting-edge AI technology
        </div>
      </div>
    </footer>
  );
}
