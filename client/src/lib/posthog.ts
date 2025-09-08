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
        
        // Configure user behavior analysis
        configureUserBehaviorAnalysis(posthog)
      },
      // GDPR compliance
      capture_pageview: false, // We'll capture manually
      capture_pageleave: true,
      // Advanced session recording configuration
      session_recording: {
        maskAllInputs: true,
        maskInputOptions: {
          password: true,
          email: true,
          tel: true,
        },
        // Smart sampling for performance
        recordCrossOriginIframes: false,
        recordCanvas: false,
        // Performance optimizations
        collectFonts: false,
        // Session recording sampling (10% of sessions)
        sampleRate: 0.1,
        // Record specific user behaviors
        recordHeaders: false,
        recordBody: false,
      },
      // Heatmap configuration
      heatmaps: {
        enabled: true,
        // Track all interactive elements
        capturePerformance: true,
      },
      // Advanced tracking
      capture_performance: true,
      capture_console_logs: false,
      capture_console_warn: false,
      capture_console_error: true,
      // User identification
      person_profiles: 'identified_only',
      // Feature flags
      bootstrap: {
        featureFlags: {},
        featureFlagPayloads: {},
      },
    })
  }
}

// Configure advanced user behavior analysis
const configureUserBehaviorAnalysis = (posthog: any) => {
  // Set up user properties for cohort analysis
  const userProperties = {
    // Device and browser info
    device_type: getDeviceType(),
    browser: getBrowserInfo(),
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    
    // Geographic info (if available)
    country: 'OM', // Default to Oman
    region: 'Muscat',
    
    // Traffic source
    traffic_source: getTrafficSource(),
    referrer: document.referrer || 'direct',
    
    // User behavior indicators
    is_mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    is_touch_device: 'ontouchstart' in window,
    
    // Landing page specific
    landing_page: window.location.pathname,
    utm_campaign: getUTMParameter('utm_campaign'),
    utm_source: getUTMParameter('utm_source'),
    utm_medium: getUTMParameter('utm_medium'),
  }
  
  // Set user properties
  posthog.people.set(userProperties)
  
  // Track initial page load with enhanced data
  trackEvent('page_load', {
    ...userProperties,
    load_time: performance.now(),
    connection_type: getConnectionType(),
  })
}

// Helper functions for user behavior analysis
const getDeviceType = () => {
  const userAgent = navigator.userAgent
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet'
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile'
  return 'desktop'
}

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Other'
}

const getTrafficSource = () => {
  const referrer = document.referrer
  if (!referrer) return 'direct'
  if (referrer.includes('google')) return 'google'
  if (referrer.includes('facebook')) return 'facebook'
  if (referrer.includes('linkedin')) return 'linkedin'
  if (referrer.includes('twitter')) return 'twitter'
  return 'referral'
}

const getUTMParameter = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param) || null
}

const getConnectionType = () => {
  // @ts-ignore - Connection API is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  return connection ? connection.effectiveType : 'unknown'
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

// Advanced user journey tracking
export const trackUserJourney = {
  // Section engagement tracking
  sectionView: (sectionName: string, timeSpent: number) => {
    trackEvent('section_view', {
      section: sectionName,
      time_spent: timeSpent,
      engagement_level: getEngagementLevel(timeSpent)
    })
  },
  
  // Element interaction tracking
  elementHover: (elementType: string, elementId: string) => {
    trackEvent('element_hover', {
      element_type: elementType,
      element_id: elementId,
      interaction_type: 'hover'
    })
  },
  
  elementClick: (elementType: string, elementId: string, elementText: string) => {
    trackEvent('element_click', {
      element_type: elementType,
      element_id: elementId,
      element_text: elementText,
      interaction_type: 'click'
    })
  },
  
  // Form field analysis
  formFieldFocus: (fieldName: string, fieldType: string) => {
    trackEvent('form_field_focus', {
      field_name: fieldName,
      field_type: fieldType,
      interaction_type: 'focus'
    })
  },
  
  formFieldBlur: (fieldName: string, fieldType: string, timeSpent: number) => {
    trackEvent('form_field_blur', {
      field_name: fieldName,
      field_type: fieldType,
      time_spent: timeSpent,
      interaction_type: 'blur'
    })
  },
  
  // Mobile vs desktop behavior
  touchInteraction: (elementType: string, elementId: string) => {
    trackEvent('touch_interaction', {
      element_type: elementType,
      element_id: elementId,
      interaction_type: 'touch',
      device_type: getDeviceType()
    })
  },
  
  // Performance tracking
  pagePerformance: (metrics: any) => {
    trackEvent('page_performance', {
      ...metrics,
      device_type: getDeviceType(),
      connection_type: getConnectionType()
    })
  }
}

// Engagement level calculation
const getEngagementLevel = (timeSpent: number) => {
  if (timeSpent < 5) return 'low'
  if (timeSpent < 15) return 'medium'
  if (timeSpent < 30) return 'high'
  return 'very_high'
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
