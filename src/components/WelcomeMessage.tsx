import { Sparkles } from "lucide-react";

export function WelcomeMessage() {
  return (
    <div className="text-center py-8 px-4 animate-fade-in">
      {/* Animated gradient background */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="absolute inset-0 blur-2xl opacity-30 google-gradient rounded-full animate-pulse" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-google-blue via-google-red to-google-green flex items-center justify-center shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Welcome to GDG Batna! 👋
      </h2>
      
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        I'm here to help you learn about our tech community, events, and how to get involved. Ask me anything!
      </p>

      {/* Quick stats */}
      <div className="flex justify-center gap-6 text-center">
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="text-2xl font-bold text-google-blue">10+</div>
          <div className="text-xs text-muted-foreground">Events</div>
        </div>
        <div className="w-px bg-border" />
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="text-2xl font-bold text-google-red">2000+</div>
          <div className="text-xs text-muted-foreground">Attendees</div>
        </div>
        <div className="w-px bg-border" />
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="text-2xl font-bold text-google-green">Batna</div>
          <div className="text-xs text-muted-foreground">Algeria</div>
        </div>
      </div>
    </div>
  );
}
