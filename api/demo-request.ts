import { z } from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
    return;
  }

  try {
    const validatedData = demoRequestSchema.parse(req.body);
    
    // In a real implementation, this would:
    // 1. Save to database
    // 2. Send notification emails
    // 3. Integrate with CRM
    // 4. Schedule follow-up tasks
    
    console.log("Demo request received:", validatedData);
    
    res.status(200).json({ 
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
      console.error("Demo request error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  }
}
