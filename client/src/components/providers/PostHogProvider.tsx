import { useEffect, useState } from 'react'
import { initPostHog, trackUTMParameters, trackScrollDepth, trackTimeOnPage } from '@/lib/posthog'

interface PostHogProviderProps {
  children: React.ReactNode
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize PostHog
    initPostHog()
    setIsInitialized(true)

    // Track UTM parameters
    trackUTMParameters()

    // Set up scroll depth tracking
    const cleanupScroll = trackScrollDepth()
    
    // Set up time on page tracking
    const cleanupTime = trackTimeOnPage()

    // Cleanup functions
    return () => {
      cleanupScroll?.()
      cleanupTime?.()
    }
  }, [])

  // Don't render children until PostHog is initialized
  if (!isInitialized) {
    return <div>{children}</div>
  }

  return <>{children}</>
}
