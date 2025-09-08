import posthog from 'posthog-js'

// PostHog configuration
export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY || 'phc-demo-key', {
      api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
      // Privacy settings
      respect_dnt: true,
      opt_out_capturing_by_default: false,
      // Performance settings
      loaded: (posthog) => {
        if (import.meta.env.DEV) console.log('PostHog loaded')
      },
      // GDPR compliance
      capture_pageview: false, // We'll capture manually
      capture_pageleave: true,
      // Session settings
      session_recording: {
        maskAllInputs: true,
        maskInputOptions: {
          password: true,
          email: true,
          phone: true,
        },
      },
    })
  }
}

// Event tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    })
  }
}

// UTM parameter tracking
export const trackUTMParameters = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const utmParams = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
    }

    // Only track if UTM parameters exist
    const hasUTM = Object.values(utmParams).some(value => value !== null)
    if (hasUTM) {
      posthog.people.set(utmParams)
      trackEvent('utm_parameters_detected', utmParams)
    }
  }
}

// Feature flag functions
export const getFeatureFlag = (flagName: string, defaultValue: boolean = false) => {
  if (typeof window !== 'undefined' && posthog) {
    return posthog.isFeatureEnabled(flagName) ?? defaultValue
  }
  return defaultValue
}

// Conversion funnel tracking
export const trackConversionFunnel = {
  landingPageView: () => trackEvent('landing_page_view'),
  scrollToFeatures: () => trackEvent('scroll_to_features'),
  viewPricing: () => trackEvent('view_pricing'),
  ctaClick: (ctaLocation: string) => trackEvent('cta_click', { location: ctaLocation }),
  formStart: () => trackEvent('form_start'),
  formComplete: () => trackEvent('form_complete'),
  formAbandon: (step: string) => trackEvent('form_abandon', { step }),
}

// Scroll depth tracking
export const trackScrollDepth = () => {
  if (typeof window !== 'undefined') {
    let maxScroll = 0
    const milestones = [25, 50, 75, 100]
    const trackedMilestones = new Set<number>()

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone)
            trackEvent('scroll_depth', { 
              percentage: milestone,
              max_scroll: maxScroll 
            })
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup function
    return () => window.removeEventListener('scroll', handleScroll)
  }
}

// Time on page tracking
export const trackTimeOnPage = () => {
  if (typeof window !== 'undefined') {
    const startTime = Date.now()
    
    const trackTime = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)
      trackEvent('time_on_page', { seconds: timeOnPage })
    }

    // Track time on page when user leaves
    window.addEventListener('beforeunload', trackTime)
    
    // Also track at intervals
    const interval = setInterval(() => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)
      if (timeOnPage % 30 === 0) { // Every 30 seconds
        trackEvent('time_on_page_interval', { seconds: timeOnPage })
      }
    }, 1000)

    // Cleanup function
    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', trackTime)
    }
  }
}

export default posthog
