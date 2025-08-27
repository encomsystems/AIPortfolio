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

  const httpServer = createServer(app);
  return httpServer;
}
