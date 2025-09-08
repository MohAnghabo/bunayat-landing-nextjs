import { Resend } from 'resend';

// Initialize Resend only if API key is provided
const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key_here'
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface DemoRequestData {
  name: string;
  email: string;
  phone: string;
  properties: string;
  challenge: string;
  software: boolean;
  time: string;
}

export async function sendDemoRequestNotification(data: DemoRequestData) {
  if (!resend) {
    console.log('Email service not configured - skipping admin notification');
    return null;
  }

  try {
    console.log('Sending admin notification to:', process.env.ADMIN_EMAIL);
    const { data: emailData, error } = await resend.emails.send({
      from: 'Bunayat <onboarding@resend.dev>', // Using Resend's default verified domain
      to: [process.env.ADMIN_EMAIL || 'moh.anghabo@gmail.com'], // Replace with your admin email
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
  
  <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <h4 style="color: #1e40af; margin-top: 0;">Recommended Demo Focus</h4>
    <ul style="color: #1e40af;">
      <li><strong>Arabic Invoice Generation:</strong> Show municipal-compliant templates</li>
      <li><strong>Automated Reminders:</strong> Demo SMS/email sequence setup</li>
      <li><strong>Maintenance Coordination:</strong> Vendor notification workflows</li>
      <li><strong>Time Savings:</strong> Emphasize 8+ hours weekly on invoicing tasks</li>
    </ul>
  </div>
  
  <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <h4 style="color: #92400e; margin-top: 0;">Follow-up Actions</h4>
    <ul style="color: #92400e;">
      <li>Contact within 24 hours (business days)</li>
      <li>Prepare portfolio-specific demo (${data.properties} properties)</li>
      <li>Address their specific challenge: "${data.challenge}"</li>
      <li>Have pricing sheet ready for ${data.properties} unit range</li>
    </ul>
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
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
  <p style="color: #64748b; font-size: 12px; text-align: center;">
    Demo request received from www.bunanyat.com landing page.<br>
    Response SLA: 24 hours (business days)
  </p>
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

export async function sendDemoRequestConfirmation(data: DemoRequestData) {
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
      from: 'Bunayat <onboarding@resend.dev>', // Using Resend's default verified domain
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
  
  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #1e293b; margin-top: 0;">Your Demo Request Summary</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Property Portfolio:</strong> ${data.properties}</p>
    <p><strong>Main Challenge:</strong> ${data.challenge}</p>
    <p><strong>Preferred Demo Time:</strong> ${data.time === 'morning' ? 'Morning (9AM-12PM)' : 'Afternoon (2PM-5PM)'}</p>
  </div>

  <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #047857; margin-top: 0;">What You'll See in Your Demo</h3>
    <ul style="color: #047857;">
      <li><strong>Arabic Invoice Generation:</strong> Municipality-compliant templates in seconds</li>
      <li><strong>Automated Reminder Sequences:</strong> SMS/email follow-ups until payment confirmed</li>
      <li><strong>Maintenance Coordination:</strong> Vendor notifications without apps</li>
      <li><strong>Bilingual Communications:</strong> Arabic for officials, English for tenants</li>
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

  <div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
    <p style="color: #92400e; margin: 0;"><strong>Perfect Timing:</strong> Our current customers typically see their first automated Arabic invoice generated within 30 minutes of setup. You're joining 50+ Omani landlords who've already streamlined their property management with Bunanyat.</p>
  </div>
  
  <p>We look forward to showing you how Bunanyat can eliminate manual invoicing and streamline your property operations.</p>
  
  <p>Best regards,<br>
  <strong>The Bunanyat Team</strong><br>
  <em>Mohammed Anghabo, Founder</em></p>
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
  <p style="color: #64748b; font-size: 12px; text-align: center;">
    Bunanyat - Streamline Property Management in Arabic & English<br>
    بنايات - تبسيط إدارة العقارات بالعربية والإنجليزية<br>
    Email: info@bunanyat.com | Phone: +968 9115 5004 | www.bunanyat.com
  </p>
</div>
      `,
    });

    if (error) {
      console.error('Confirmation email sending failed:', error);
      // Don't throw error for confirmation email - it's not critical
      return null;
    }

    console.log('Confirmation email sent successfully:', emailData?.id);
    return emailData;
  } catch (error) {
    console.error('Confirmation email service error:', error);
    // Don't throw error for confirmation email - it's not critical
    return null;
  }
}
