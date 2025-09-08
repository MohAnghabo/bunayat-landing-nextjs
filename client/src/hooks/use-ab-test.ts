import { useState, useEffect } from 'react'
import { getFeatureFlag } from '@/lib/posthog'

export function useABTest(flagName: string, defaultValue: boolean = false) {
  const [variant, setVariant] = useState<boolean>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkFlag = async () => {
      try {
        const flagValue = getFeatureFlag(flagName, defaultValue)
        setVariant(flagValue)
      } catch (error) {
        console.warn(`Failed to get feature flag ${flagName}:`, error)
        setVariant(defaultValue)
      } finally {
        setIsLoading(false)
      }
    }

    checkFlag()
  }, [flagName, defaultValue])

  return { variant, isLoading }
}

// Specific A/B test hooks for common use cases
export function useStreamlinedLandingPage() {
  return useABTest('streamlined_landing_page', false)
}

export function usePricingLayout() {
  return useABTest('pricing_layout_variant', false)
}

export function useCTACopy() {
  return useABTest('cta_copy_variant', false)
}
