import { Message } from "@/lib/chat";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-gradient-to-br from-google-blue via-google-red to-google-green"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-soft",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-md"
            : "bg-card text-card-foreground rounded-tl-md border border-border"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
          {isLast && message.role === "assistant" && (
            <span className="inline-block w-1.5 h-4 ml-0.5 bg-current animate-pulse rounded-sm" />
          )}
        </p>
      </div>
    </div>
  );
}
