import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { demoRequestSchema, type DemoRequestFormData } from "@/lib/validations";

export default function DemoRequestForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      properties: undefined,
      challenge: "",
      software: false,
      time: undefined,
    },
  });

  const submitDemo = useMutation({
    mutationFn: async (data: DemoRequestFormData) => {
      return apiRequest("POST", "/api/demo-request", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Demo request submitted!",
        description: "We'll contact you within 24 hours to schedule your demo.",
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
    submitDemo.mutate(data);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for your interest in Bunanyat. We'll contact you within 24 hours to schedule your personalized demo.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Request Your Free Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Ahmed Al-Harthi"
                data-testid="input-name"
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
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...form.register("phone")}
                placeholder="+968 XXXX XXXX"
                data-testid="input-phone"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label>Number of Properties *</Label>
              <Select onValueChange={(value) => form.setValue("properties", value as any)}>
                <SelectTrigger data-testid="select-properties">
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
          </div>

          <div>
            <Label>Main Challenge *</Label>
            <Select onValueChange={(value) => form.setValue("challenge", value)}>
              <SelectTrigger data-testid="select-challenge">
                <SelectValue placeholder="Select your main challenge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent-collection">Rent Collection</SelectItem>
                <SelectItem value="maintenance">Maintenance Management</SelectItem>
                <SelectItem value="communication">Tenant Communication</SelectItem>
                <SelectItem value="reporting">Financial Reporting</SelectItem>
                <SelectItem value="bilingual">Arabic/English Support</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.challenge && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.challenge.message}</p>
            )}
          </div>

          <div>
            <Label>Preferred Demo Time *</Label>
            <Select onValueChange={(value) => form.setValue("time", value as any)}>
              <SelectTrigger data-testid="select-time">
                <SelectValue placeholder="Select preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (9 AM - 12 PM GST)</SelectItem>
                <SelectItem value="afternoon">Afternoon (2 PM - 5 PM GST)</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.time && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.time.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="software"
              {...form.register("software")}
              data-testid="checkbox-software"
            />
            <Label htmlFor="software" className="text-sm">
              I'm currently using property management software
            </Label>
          </div>

          <Button
            type="submit"
            disabled={submitDemo.isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="button-submit-demo"
          >
            {submitDemo.isPending ? "Submitting..." : "Request Demo"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to receive marketing communications from Bunanyat.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
