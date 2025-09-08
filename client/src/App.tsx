import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PostHogProvider from "@/components/providers/PostHogProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import GDPRBanner from "@/components/ui/gdpr-banner";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <PostHogProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <GDPRBanner />
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </PostHogProvider>
  );
}

export default App;
