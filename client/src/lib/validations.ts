import { z } from "zod";

export const demoRequestSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .min(8, "Please enter a valid phone number")
    .regex(/^\+968\d{8}$/, "Please enter a valid Omani phone number (+968XXXXXXXX)"),
  properties: z.enum(["1-10", "11-50", "51-200", "200+"], {
    required_error: "Please select number of properties",
  }),
  challenge: z.string().default("general-inquiry"),
  time: z.enum(["morning", "afternoon"]).default("morning"),
  software: z.boolean().default(false),
});

export type DemoRequestFormData = z.infer<typeof demoRequestSchema>;
