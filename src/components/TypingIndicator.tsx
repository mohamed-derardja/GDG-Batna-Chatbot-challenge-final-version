import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-google-blue via-google-red to-google-green">
        <Bot className="w-4 h-4 text-white" />
      </div>

      {/* Typing bubble */}
      <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3 shadow-soft">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-typing" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
