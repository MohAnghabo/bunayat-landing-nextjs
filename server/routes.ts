import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo request submission endpoint
  app.post("/api/demo-request", async (req, res) => {
    try {
      const demoRequestSchema = z.object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().min(8, "Valid phone number is required"),
        properties: z.enum(["1-10", "11-50", "51-200", "200+"], {
          required_error: "Please select number of properties",
        }),
        challenge: z.string().min(1, "Please select your main challenge"),
        software: z.boolean().default(false),
        time: z.enum(["morning", "afternoon"], {
          required_error: "Please select preferred time",
        }),
      });

      const validatedData = demoRequestSchema.parse(req.body);
      
      // In a real implementation, this would:
      // 1. Save to database
      // 2. Send notification emails
      // 3. Integrate with CRM
      // 4. Schedule follow-up tasks
      
      console.log("Demo request received:", validatedData);
      
      res.json({ 
        success: true, 
        message: "Demo request submitted successfully",
        data: validatedData 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
