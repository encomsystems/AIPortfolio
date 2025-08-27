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

      // In a real implementation, this would connect to your n8n webhook
      // For demonstration, we'll simulate different AI responses based on keywords
      let response = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('automation') || lowerMessage.includes('workflow')) {
        response = "I can help you implement intelligent process automation using n8n workflows. We can connect your CRM, ERP, and other business tools to automate up to 80% of repetitive tasks. Would you like to discuss your specific automation needs?";
      } else if (lowerMessage.includes('chat') || lowerMessage.includes('ai assistant')) {
        response = "I specialize in building conversational AI systems using advanced NLP models and voice AI with Eleven Labs. These systems achieve 85% first-contact resolution rates. What kind of customer interactions would you like to automate?";
      } else if (lowerMessage.includes('app') || lowerMessage.includes('dashboard')) {
        response = "I develop custom AI applications with Flutter and React frontends, including real-time dashboards and AI tutors. These apps integrate seamlessly with your existing systems. What type of application are you envisioning?";
      } else if (lowerMessage.includes('api') || lowerMessage.includes('integration')) {
        response = "I excel at API integration and orchestration, connecting electronic invoice systems, multimedia platforms, and enterprise services into unified AI-powered workflows. What systems do you need to connect?";
      } else if (lowerMessage.includes('rag') || lowerMessage.includes('document')) {
        response = "I can implement RAG (Retrieval-Augmented Generation) pipelines using Elastic and Qdrant that process 100,000+ documents daily with 95% accuracy. This creates powerful knowledge bases for your AI systems. What documents do you need to process?";
      } else if (lowerMessage.includes('avatar') || lowerMessage.includes('training')) {
        response = "I create AI avatar multi-language training systems using HeyGen and D-ID platforms. These systems deliver personalized training to each employee and can reduce operational costs by 75%. What kind of training content do you have?";
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = "Hello! I'm excited to discuss how AI can transform your business. I specialize in process automation, conversational AI, custom applications, and more. What's your biggest operational challenge right now?";
      } else {
        response = "That's an interesting question! Based on my expertise in AI automation, I can help you with process automation (80% task reduction), conversational AI systems (85% resolution rate), custom AI applications, API integrations, RAG systems, and AI avatar training. How can I specifically assist with your business needs?";
      }

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

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

  const httpServer = createServer(app);
  return httpServer;
}
