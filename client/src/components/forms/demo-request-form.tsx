import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { demoRequestSchema, type DemoRequestFormData } from "@/lib/validations";
import { CheckCircle, MessageCircle, Calendar } from "lucide-react";
import { trackEvent, trackConversionFunnel } from "@/lib/posthog";

export default function DemoRequestForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      email: "",
      phone: "+968",
      properties: undefined,
      challenge: "general-inquiry",
      time: "morning",
      software: false,
    },
  });

  const submitDemo = useMutation({
    mutationFn: async (data: DemoRequestFormData) => {
      return apiRequest("POST", "/api/demo-request", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      // Track successful form completion
      trackConversionFunnel.formComplete();
      trackEvent('form_complete', {
        form_type: 'demo_request',
        conversion_value: 'high',
        properties_count: Object.keys(form.getValues()).length
      });
      
      toast({
        title: "Demo request submitted!",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DemoRequestFormData) => {
    // Track form start
    trackConversionFunnel.formStart();
    trackEvent('form_start', {
      form_type: 'demo_request',
      properties: Object.keys(data)
    });
    
    submitDemo.mutate(data);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Demo Request Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in Bunayat. We'll contact you within 24 hours to schedule your personalized demo.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">What happens next?</p>
              <div className="text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">We'll review your property portfolio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Prepare a customized demo for your needs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Contact you to schedule your demo</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Get Your Personalized Demo</CardTitle>
        <p className="text-muted-foreground mt-2">
          Join 200+ property managers in Oman who save 15+ hours weekly
        </p>
        <div className="bg-primary/10 rounded-lg p-3 mt-4">
          <p className="text-sm font-medium text-primary">
            ✓ Get your personalized demo in 24 hours
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Ahmed Al-Harthi"
              data-testid="input-name"
              className="min-h-[44px] text-base"
              autoComplete="name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="ahmed@example.com"
              data-testid="input-email"
              className="min-h-[44px] text-base"
              autoComplete="email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="+968 XXXX XXXX"
              data-testid="input-phone"
              className="min-h-[44px] text-base"
              autoComplete="tel"
              inputMode="tel"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label>Number of Properties *</Label>
            <Select onValueChange={(value) => form.setValue("properties", value as any)}>
              <SelectTrigger data-testid="select-properties" className="min-h-[44px] text-base">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 units</SelectItem>
                <SelectItem value="11-50">11-50 units</SelectItem>
                <SelectItem value="51-200">51-200 units</SelectItem>
                <SelectItem value="200+">200+ units</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.properties && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.properties.message}</p>
            )}
          </div>


          <Button
            type="submit"
            disabled={submitDemo.isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground min-h-[44px] text-base font-semibold"
            data-testid="button-submit-demo"
          >
            {submitDemo.isPending ? "Submitting..." : "Get My Free Demo"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Prefer other options?</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a 
                href="https://wa.me/96891155004?text=Hi! I'm interested in Bunayat for my property management business."
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium min-h-[44px] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('whatsapp_click', {
                    location: 'demo_form',
                    action: 'whatsapp_demo'
                  });
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Demo
              </a>
              <a 
                href="tel:+96891155004"
                className="inline-flex items-center justify-center px-4 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-lg text-sm font-medium min-h-[44px] transition-colors"
                onClick={() => {
                  trackEvent('phone_click', {
                    location: 'demo_form',
                    action: 'call_now'
                  });
                }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to receive marketing communications from Bunayat.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
