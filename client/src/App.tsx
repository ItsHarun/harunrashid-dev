import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPalette } from "@/components/CommandPalette";
import { ThemeProvider } from "@/hooks/use-theme";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Thinking from "@/pages/Thinking";
import Kue from "@/pages/Kue";
import Beliefs from "@/pages/Beliefs";
import Now from "@/pages/Now";
import Contact from "@/pages/Contact";
import PostDetail from "@/pages/PostDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* List pages */}
      <Route path="/thinking" component={Thinking} />
      <Route path="/kue" component={Kue} />
      <Route path="/beliefs" component={Beliefs} />
      <Route path="/now" component={Now} />
      <Route path="/contact" component={Contact} />
      
      {/* Detail pages */}
      <Route path="/thinking/:slug">
        {(params) => <PostDetail type="thinking" />}
      </Route>
      <Route path="/kue/:slug">
        {(params) => <PostDetail type="kue" />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <ThemeToggle />
          <CommandPalette />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
