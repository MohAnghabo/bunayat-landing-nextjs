import { useEffect, useRef, useState } from 'react'
import { trackUserJourney, trackEvent } from '@/lib/posthog'

interface UserBehaviorMetrics {
  timeOnPage: number
  scrollDepth: number
  interactions: number
  sectionsViewed: Set<string>
  formInteractions: number
}

export function useUserBehavior() {
  const [metrics, setMetrics] = useState<UserBehaviorMetrics>({
    timeOnPage: 0,
    scrollDepth: 0,
    interactions: 0,
    sectionsViewed: new Set(),
    formInteractions: 0
  })
  
  const startTime = useRef(Date.now())
  const lastInteraction = useRef(Date.now())
  const interactionCount = useRef(0)
  const sectionsViewed = useRef(new Set<string>())
  const formInteractionCount = useRef(0)

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000)
      setMetrics(prev => ({ ...prev, timeOnPage: timeSpent }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0
    const milestones = [25, 50, 75, 100]
    const trackedMilestones = new Set<number>()

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        setMetrics(prev => ({ ...prev, scrollDepth: maxScroll }))
        
        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone)
            trackEvent('scroll_milestone', { 
              percentage: milestone,
              max_scroll: maxScroll,
              device_type: getDeviceType()
            })
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track section visibility
  useEffect(() => {
    const sections = [
      'hero', 'problem-solution', 'features', 'how-it-works', 
      'pricing', 'faq', 'final-cta'
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.id || entry.target.className
            if (!sectionsViewed.current.has(sectionName)) {
              sectionsViewed.current.add(sectionName)
              setMetrics(prev => ({ 
                ...prev, 
                sectionsViewed: new Set(sectionsViewed.current) 
              }))
              
              trackUserJourney.sectionView(sectionName, 0)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Track user interactions
  const trackInteraction = (type: string, elementId: string, elementText?: string) => {
    interactionCount.current++
    lastInteraction.current = Date.now()
    
    setMetrics(prev => ({ ...prev, interactions: interactionCount.current }))
    
    if (type === 'click') {
      trackUserJourney.elementClick('button', elementId, elementText || '')
    } else if (type === 'hover') {
      trackUserJourney.elementHover('button', elementId)
    } else if (type === 'touch') {
      trackUserJourney.touchInteraction('button', elementId)
    }
  }

  // Track form interactions
  const trackFormInteraction = (fieldName: string, fieldType: string, action: 'focus' | 'blur', timeSpent?: number) => {
    if (action === 'focus') {
      formInteractionCount.current++
      setMetrics(prev => ({ ...prev, formInteractions: formInteractionCount.current }))
      trackUserJourney.formFieldFocus(fieldName, fieldType)
    } else if (action === 'blur' && timeSpent) {
      trackUserJourney.formFieldBlur(fieldName, fieldType, timeSpent)
    }
  }

  // Track page performance
  const trackPerformance = () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      const metrics = {
        load_time: navigation.loadEventEnd - navigation.loadEventStart,
        dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        first_paint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        first_contentful_paint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        connection_type: getConnectionType()
      }
      
      trackUserJourney.pagePerformance(metrics)
    }
  }

  // Track user engagement level
  const getEngagementLevel = () => {
    const { timeOnPage, scrollDepth, interactions, sectionsViewed } = metrics
    
    if (timeOnPage < 10 || scrollDepth < 25) return 'low'
    if (timeOnPage < 30 || scrollDepth < 50) return 'medium'
    if (timeOnPage < 60 || scrollDepth < 75) return 'high'
    return 'very_high'
  }

  // Track user journey completion
  const trackJourneyCompletion = () => {
    const engagementLevel = getEngagementLevel()
    
    trackEvent('user_journey_complete', {
      time_on_page: metrics.timeOnPage,
      scroll_depth: metrics.scrollDepth,
      interactions: metrics.interactions,
      sections_viewed: metrics.sectionsViewed.size,
      form_interactions: metrics.formInteractions,
      engagement_level: engagementLevel,
      device_type: getDeviceType(),
      traffic_source: getTrafficSource()
    })
  }

  return {
    metrics,
    trackInteraction,
    trackFormInteraction,
    trackPerformance,
    getEngagementLevel,
    trackJourneyCompletion
  }
}

// Helper functions
const getDeviceType = () => {
  const userAgent = navigator.userAgent
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet'
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile'
  return 'desktop'
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

const getConnectionType = () => {
  // @ts-ignore - Connection API is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  return connection ? connection.effectiveType : 'unknown'
}
