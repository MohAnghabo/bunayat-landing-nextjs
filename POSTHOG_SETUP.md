# PostHog Analytics & A/B Testing Setup

## Overview

This document outlines the PostHog integration for Bunanyat landing page analytics and A/B testing.

## Environment Variables

Add these to your `.env` file:

```bash
VITE_POSTHOG_KEY=phc-your-posthog-key-here
VITE_POSTHOG_HOST=https://app.posthog.com
```

## Features Implemented

### 1. Privacy-Compliant Tracking

- GDPR consent banner with accept/decline options
- Respects DNT (Do Not Track) headers
- Opt-out capability for users
- Session recording with input masking

### 2. Event Tracking

- **Page Views**: Landing page views with UTM parameters
- **CTA Clicks**: All "Request Demo" buttons tracked
- **Form Interactions**: Start, complete, abandon events
- **Scroll Depth**: 25%, 50%, 75%, 100% milestones
- **WhatsApp/Call Clicks**: Alternative contact methods
- **Pricing Interactions**: Plan selection and "Learn More" clicks

### 3. Conversion Funnel

1. Landing page view
2. Scroll to features section
3. View pricing section
4. CTA click
5. Form completion

### 4. A/B Testing Framework

- Feature flag: `streamlined_landing_page`
- 50/50 traffic split
- Primary goal: Form submission conversion
- Secondary goals: Time on page, scroll depth, CTA click rate

## Usage

### Basic Event Tracking

```typescript
import { trackEvent } from '@/lib/posthog'

trackEvent('button_click', {
  button_name: 'request_demo',
  location: 'hero'
})
```

### A/B Testing

```typescript
import { useABTest } from '@/hooks/use-ab-test'

function MyComponent() {
  const { variant, isLoading } = useABTest('streamlined_landing_page')
  
  if (isLoading) return <div>Loading...</div>
  
  return variant ? <StreamlinedLayout /> : <OriginalLayout />
}
```

### Conversion Funnel Tracking

```typescript
import { trackConversionFunnel } from '@/lib/posthog'

// Track each step
trackConversionFunnel.landingPageView()
trackConversionFunnel.ctaClick('hero')
trackConversionFunnel.formComplete()
```

## PostHog Dashboard Setup

### 1. Create Feature Flags

- `streamlined_landing_page`: Boolean flag for A/B testing
- `pricing_layout_variant`: Alternative pricing layouts
- `cta_copy_variant`: Different CTA text variations

### 2. Set Up Funnels

Create a funnel in PostHog:

1. Landing page view
2. CTA click
3. Form start
4. Form complete

### 3. Configure Goals

- **Primary**: Form completion rate
- **Secondary**: Time on page > 2 minutes
- **Secondary**: Scroll depth > 75%

### 4. UTM Parameter Tracking

UTM parameters are automatically captured and stored as user properties:

- utm_source
- utm_medium
- utm_campaign
- utm_term
- utm_content

## Privacy & Compliance

### GDPR Compliance

- Consent banner before tracking
- Opt-out functionality
- Data retention policies
- User data deletion capabilities

### Data Masking

- Password fields masked in session recordings
- Email and phone inputs masked
- Sensitive form data protected

## Performance Considerations

- PostHog loads asynchronously
- No blocking of page rendering
- Minimal impact on Core Web Vitals
- Efficient event batching

## Testing

### Local Development

```bash
# Set up environment variables
cp .env.example .env
# Add your PostHog key

# Run development server
npm run dev
```

### Production Deployment

1. Set environment variables in Vercel
2. Deploy with PostHog integration
3. Verify events in PostHog dashboard
4. Set up feature flags and funnels

## Monitoring & Alerts

- Set up alerts for conversion rate drops
- Monitor form abandonment rates
- Track A/B test statistical significance
- Alert on tracking errors

## Troubleshooting

### Common Issues

1. **Events not appearing**: Check PostHog key and network
2. **Feature flags not working**: Verify flag configuration
3. **GDPR banner not showing**: Check localStorage for consent
4. **Performance issues**: Review PostHog configuration

### Debug Mode

Enable debug mode in development:

```typescript
// In posthog.ts
loaded: (posthog) => {
  if (import.meta.env.DEV) {
    console.log('PostHog loaded')
    posthog.debug() // Enable debug mode
  }
}
```
