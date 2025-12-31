import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 p-2 bg-card border border-border rounded-2xl shadow-soft focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about GDG Batna..."
          disabled={disabled}
          className={cn(
            "flex-1 resize-none border-0 bg-transparent p-2 text-sm",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "placeholder:text-muted-foreground/60",
            "min-h-[40px] max-h-[120px]"
          )}
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || disabled}
          className={cn(
            "h-10 w-10 rounded-xl flex-shrink-0 transition-all",
            "bg-primary hover:bg-primary/90",
            "disabled:opacity-40"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
