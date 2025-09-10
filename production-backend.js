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

// AI Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    let response = "";
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("automation") || lowerMessage.includes("workflow")) {
      response = "I can help you implement intelligent process automation using n8n workflows. We can connect your CRM, ERP, and other business tools to automate up to 80% of repetitive tasks. Would you like to discuss your specific automation needs?";
    } else if (lowerMessage.includes("chat") || lowerMessage.includes("ai assistant")) {
      response = "I specialize in building conversational AI systems using advanced NLP models and voice AI with Eleven Labs. These systems achieve 85% first-contact resolution rates. What kind of customer interactions would you like to automate?";
    } else if (lowerMessage.includes("app") || lowerMessage.includes("dashboard")) {
      response = "I develop custom AI applications with Flutter and React frontends, including real-time dashboards and AI tutors. These apps integrate seamlessly with your existing systems. What type of application are you envisioning?";
    } else if (lowerMessage.includes("api") || lowerMessage.includes("integration")) {
      response = "I excel at API integration and orchestration, connecting electronic invoice systems, multimedia platforms, and enterprise services into unified AI-powered workflows. What systems do you need to connect?";
    } else if (lowerMessage.includes("rag") || lowerMessage.includes("document")) {
      response = "I can implement RAG (Retrieval-Augmented Generation) pipelines using Elastic and Qdrant that process 100,000+ documents daily with 95% accuracy. This creates powerful knowledge bases for your AI systems. What documents do you need to process?";
    } else if (lowerMessage.includes("avatar") || lowerMessage.includes("training")) {
      response = "I create AI avatar multi-language training systems using HeyGen and D-ID platforms. These systems deliver personalized training to each employee and can reduce operational costs by 75%. What kind of training content do you have?";
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      response = "Hello! I'm excited to discuss how AI can transform your business. I specialize in process automation, conversational AI, custom applications, and more. What's your biggest operational challenge right now?";
    } else {
      response = "That's an interesting question! Based on my expertise in AI automation, I can help you with process automation (80% task reduction), conversational AI systems (85% resolution rate), custom AI applications, API integrations, RAG systems, and AI avatar training. How can I specifically assist with your business needs?";
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500));

    res.status(200).json({
      response,
      timestamp: new Date().toISOString()
    });

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