# Email Setup Guide

## ✅ Current Status
Your development server is now running successfully! The email service is configured to work gracefully without an API key.

## 🔧 To Enable Email Notifications

### Step 1: Get Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### Step 2: Update Your .env File
Replace this line in your `.env` file:
```bash
RESEND_API_KEY=re_your_api_key_here
```

With your actual API key:
```bash
RESEND_API_KEY=re_1234567890abcdef...
```

### Step 3: Restart Your Server
```bash
pnpm run dev
```

## 📧 What Happens When Emails Are Enabled

### Admin Notification Email
- **To:** `moh.anghabo@gmail.com` (from your .env)
- **Subject:** "New Demo Request from [Name]"
- **Content:** Complete form details, contact info, next steps

### User Confirmation Email  
- **To:** The person who submitted the form
- **Subject:** "Thank you for your demo request - Bunayat"
- **Content:** Thank you message, what happens next, contact options

## 🧪 Testing
1. Submit a demo request form on your site
2. Check your email (`moh.anghabo@gmail.com`) for the notification
3. Check the user's email for the confirmation

## 🔍 Current Behavior (Without API Key)
- ✅ Development server runs normally
- ✅ Forms submit successfully
- ✅ Console shows: "Email service not configured - skipping notifications"
- ✅ No errors or crashes

## 🚀 Production Deployment
For production, you'll also want to:
1. Verify your domain in Resend
2. Update the `from` field in `lib/email.ts` to use your domain
3. Set up proper environment variables in your hosting platform

## 📞 Alternative: Use Existing SMTP
If you prefer to use your existing email setup, you can modify `lib/email.ts` to use Nodemailer with SMTP instead of Resend.
