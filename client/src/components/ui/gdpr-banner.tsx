import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, Shield, Cookie } from 'lucide-react'
import posthog from '@/lib/posthog'

export default function GDPRBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('posthog-consent')
    
    if (!hasConsent) {
      setShowBanner(true)
      // Animate in after a short delay
      setTimeout(() => setIsVisible(true), 100)
    }
  }, [])

  const handleAccept = () => {
    // Enable PostHog tracking
    if (typeof window !== 'undefined' && posthog) {
      posthog.opt_in_capturing()
    }
    
    // Store consent
    localStorage.setItem('posthog-consent', 'accepted')
    
    // Track consent given
    posthog?.capture('gdpr_consent_given', { 
      consent_type: 'analytics',
      timestamp: new Date().toISOString()
    })
    
    // Hide banner
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleDecline = () => {
    // Disable PostHog tracking
    if (typeof window !== 'undefined' && posthog) {
      posthog.opt_out_capturing()
    }
    
    // Store consent
    localStorage.setItem('posthog-consent', 'declined')
    
    // Hide banner
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className={`mx-auto max-w-4xl transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <Cookie className="w-5 h-5 text-primary" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Privacy & Analytics
              </h3>
              <p className="text-muted-foreground mb-4">
                We use analytics to improve your experience on our website. This helps us understand how you use our property management platform and optimize it for better performance. Your data is handled securely and never shared with third parties.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAccept}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Accept Analytics
                </Button>
                <Button 
                  onClick={handleDecline}
                  variant="outline"
                >
                  Decline
                </Button>
                <Button 
                  onClick={() => window.open('/privacy-policy', '_blank')}
                  variant="ghost"
                  className="text-sm"
                >
                  Privacy Policy
                </Button>
              </div>
            </div>
            
            <Button
              onClick={handleDecline}
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
