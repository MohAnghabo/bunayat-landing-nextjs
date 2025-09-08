import React, { useEffect } from 'react'
import { PostHogProvider as ReactPostHogProvider } from 'posthog-js/react'
import { trackUTMParameters, trackScrollDepth, trackTimeOnPage } from '@/lib/posthog'

interface PostHogProviderProps {
  children: React.ReactNode
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // Track UTM parameters on first load
    trackUTMParameters()

    // Set up scroll depth tracking
    const cleanupScroll = trackScrollDepth()

    // Set up time on page tracking
    const cleanupTime = trackTimeOnPage()

    return () => {
      cleanupScroll?.()
      cleanupTime?.()
    }
  }, [])

  return (
    <ReactPostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY || ''}
      options={{
        api_host: '/api/posthog',
        defaults: '2025-05-24',
        capture_exceptions: true,
        debug: import.meta.env.MODE === 'development',
      }}
    >
      {children}
    </ReactPostHogProvider>
  )
}