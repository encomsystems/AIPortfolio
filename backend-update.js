// Production-only backend - no static file serving
import express from "express";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(`${new Date().toLocaleTimeString()} [express] ${logLine}`);
    }
  });

  next();
});

// Routes
const server = createServer(app);

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, projectType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: "Missing required fields: name, email, and message are required" 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: "Invalid email format" 
      });
    }

    console.log("Contact form submission:", {
      name,
      email,
      projectType,
      message,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ 
      success: true, 
      message: "Thank you for your message. I'll get back to you within 24 hours." 
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ 
      error: "Internal server error. Please try again later." 
    });
  }
});

// AI Chat endpoint - connected to n8n
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    // Send message to n8n webhook
    const n8nWebhookUrl = `https://n8n.aiconshub.com/webhook/YOUR_WEBHOOK_ID`;
    
    try {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString(),
          source: 'portfolio_chat'
        })
      });

      if (!n8nResponse.ok) {
        throw new Error(`n8n webhook returned ${n8nResponse.status}`);
      }

      const n8nData = await n8nResponse.json();
      
      // Return the AI response from n8n
      res.status(200).json({
        response: n8nData.response || n8nData.message || "I received your message but couldn't generate a response. Please try again.",
        timestamp: new Date().toISOString()
      });

    } catch (n8nError) {
      console.error("Error calling n8n webhook:", n8nError);
      
      // Fallback response if n8n is unavailable
      res.status(200).json({
        response: "I'm currently experiencing technical difficulties with my AI system. Please try again in a moment, or feel free to contact me directly through the contact form.",
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error("Error processing chat message:", error);
    res.status(500).json({
      error: "Internal server error. Please try again later."
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  console.error(err);
});

// Start server
const port = parseInt(process.env.PORT || '5000', 10);
server.listen(port, '0.0.0.0', () => {
  console.log(`${new Date().toLocaleTimeString()} [express] serving on port ${port}`);
});