import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { Resend } from 'resend';

// Initialize Resend
const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key_here'
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Email sending functions
async function sendDemoRequestNotification(data: any) {
  if (!resend) {
    console.log('Email service not configured - skipping admin notification');
    return null;
  }

  try {
    console.log('Sending admin notification to:', process.env.ADMIN_EMAIL);
    const { data: emailData, error } = await resend.emails.send({
      from: 'Bunayat <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'moh.anghabo@gmail.com'],
      subject: `New Demo Request from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Demo Request - Bunanyat PMS</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Property Portfolio Details</h3>
            <p><strong>Number of Properties:</strong> ${data.properties}</p>
            <p><strong>Main Challenge:</strong> ${data.challenge}</p>
            <p><strong>Currently Uses Property Software:</strong> ${data.software ? 'Yes' : 'No'}</p>
            <p><strong>Preferred Demo Time:</strong> ${data.time === 'morning' ? 'Morning (9AM-12PM)' : 'Afternoon (2PM-5PM)'}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${data.email}?subject=Bunanyat Demo - Follow up for ${data.name}" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px;">
              Email ${data.name}
            </a>
            <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}?text=Hi ${data.name}! Thank you for your interest in Bunanyat. I'd like to schedule your demo to show how we can streamline your property management." 
               style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px;">
              WhatsApp ${data.name}
            </a>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email notification');
    }

    console.log('Demo request email sent successfully:', emailData?.id);
    return emailData;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

async function sendDemoRequestConfirmation(data: any) {
  if (!resend) {
    console.log('Email service not configured - skipping user confirmation');
    return null;
  }

  // For unverified domains, only send to the admin email (your own email)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@bunayat.com';
  const isAdminEmail = data.email === adminEmail;

  if (!isAdminEmail) {
    console.log(`Skipping user confirmation email to ${data.email} - domain not verified. Only sending to admin email.`);
    return null;
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Bunayat <onboarding@resend.dev>',
      to: [data.email],
      subject: 'Thank you for your demo request - Bunayat',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">شكراً لاهتمامك ببنايات - Thank you for your interest in Bunanyat!</h2>
          
          <p>Hi ${data.name},</p>
          
          <p>Thank you for requesting a demo of Bunanyat's property management platform. We're excited to show you how our Arabic/English system can streamline your property operations and save you 8+ hours weekly on invoicing and maintenance coordination.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">What happens next?</h3>
            <ul style="color: #0369a1;">
              <li>Our team will prepare a customized demo for your ${data.properties} properties</li>
              <li>We'll focus on solving your specific challenge: "${data.challenge}"</li>
              <li>We'll contact you within 24 hours to schedule your 30-minute demo</li>
              <li>You'll see live Arabic invoice generation and municipal compliance features</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #64748b; margin-bottom: 15px;">Need immediate assistance or have questions?</p>
            <a href="https://wa.me/96891155004?text=Hi! I just submitted a demo request for Bunanyat. I have ${data.properties} properties and need help with: ${data.challenge}" 
               style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px;">
               واتساب WhatsApp
            </a>
            <a href="tel:+96891155004" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px;">
               اتصال Call Us
            </a>
          </div>
          
          <p>We look forward to showing you how Bunanyat can eliminate manual invoicing and streamline your property operations.</p>
          
          <p>Best regards,<br>
          <strong>The Bunanyat Team</strong><br>
          <em>Mohammed Anghabo, Founder</em></p>
        </div>
      `,
    });

    if (error) {
      console.error('Confirmation email sending failed:', error);
      return null;
    }

    console.log('Confirmation email sent successfully:', emailData?.id);
    return emailData;
  } catch (error) {
    console.error('Confirmation email service error:', error);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const demoRequestSchema = z.object({
      name: z.string().min(2, "Name is required"),
      email: z.string().email("Valid email is required"),
      phone: z.string().min(8, "Valid phone number is required"),
      properties: z.enum(["1-10", "11-50", "51-200", "200+"], {
        required_error: "Please select number of properties",
      }),
      challenge: z.string().optional().default("general-inquiry"),
      software: z.boolean().optional().default(false),
      time: z.enum(["morning", "afternoon"]).optional().default("morning"),
    });

    const validatedData = demoRequestSchema.parse(req.body);
    
    console.log("Demo request received:", validatedData);
    
    // Send email notifications
    try {
      // Send notification to admin
      await sendDemoRequestNotification(validatedData);
      
      // Send confirmation to user
      await sendDemoRequestConfirmation(validatedData);
      
      console.log("Email notifications sent successfully");
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Don't fail the request if email fails - still return success
    }
    
    res.json({ 
      success: true, 
      message: "Demo request submitted successfully",
      data: validatedData 
    });
  } catch (error) {
    console.error("Demo request error:", error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors: error.errors 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
}