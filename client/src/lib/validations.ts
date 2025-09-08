import { z } from "zod";

export const demoRequestSchema = z.object({
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

export type DemoRequestFormData = z.infer<typeof demoRequestSchema>;
