// server/production.ts
import express from "express";

// server/routes.ts
import { createServer } from "http";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
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
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
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
  app2.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({
          error: "Message is required"
        });
      }
      const n8nWebhookUrl = "https://n8n.aiconshub.com/webhook/e4c8d697-bfe9-42ca-8262-c13432b19c33";
      const maxRetries = 2;
      let lastError;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const n8nResponse = await fetch(n8nWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              message,
              timestamp: (/* @__PURE__ */ new Date()).toISOString(),
              source: "portfolio_chat",
              attempt
            })
          });
          if (!n8nResponse.ok) {
            throw new Error(`n8n webhook returned ${n8nResponse.status}`);
          }
          const n8nData = await n8nResponse.json();
          const aiResponse = Array.isArray(n8nData) && n8nData[0]?.output || n8nData.response || n8nData.message || n8nData.text || n8nData.output || n8nData.result || n8nData.ai_response || n8nData.content || n8nData.data && (n8nData.data.response || n8nData.data.message || n8nData.data.text);
          return res.status(200).json({
            response: aiResponse || "I received your message but couldn't generate a response. Please try again.",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        } catch (error) {
          lastError = error;
          console.error(`n8n webhook attempt ${attempt}/${maxRetries} failed:`, error);
          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 1e3));
          }
        }
      }
      console.error("All n8n webhook attempts failed:", lastError);
      res.status(200).json({
        response: "I'm currently experiencing technical difficulties with my AI system. Please try again in a moment, or feel free to contact me directly through the contact form.",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({
        error: "Internal server error. Please try again later."
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/production.ts
import fs from "fs";
import path from "path";
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      console.log(`${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      })} [express] ${logLine}`);
    }
  });
  next();
});
function serveStatic(app2) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  serveStatic(app);
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    console.log(`${(/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    })} [express] serving on port ${port}`);
  });
})();
