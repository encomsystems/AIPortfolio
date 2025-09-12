import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, projectType, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          error: "Missing required fields: name, email, and message are required" 
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: "Invalid email format" 
        });
      }

      // In a real application, you would:
      // 1. Save the contact form submission to a database
      // 2. Send an email notification to the portfolio owner
      // 3. Send an auto-reply email to the person who submitted the form
      
      // For now, we'll just log the submission and return success
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

  // AI Chat endpoint connected to n8n workflow
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          error: "Message is required" 
        });
      }

      // Connect to n8n production webhook
      const n8nWebhookUrl = "https://n8n.aiconshub.com/webhook-test/e4c8d697-bfe9-42ca-8262-c13432b19c33";
      
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

  const httpServer = createServer(app);
  return httpServer;
}
