import { cn } from "@/lib/utils";

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void;
  disabled?: boolean;
}

const suggestions = [
  "What is GDG Batna?",
  "Upcoming events",
  "How can I join?",
  "Tell me about DevFest",
  "Who leads the team?",
];

export function SuggestionChips({ onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion, index) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className={cn(
            "px-4 py-2 text-sm rounded-full border border-border",
            "bg-card hover:bg-secondary transition-all duration-200",
            "hover:shadow-soft hover:border-primary/30 hover:scale-105",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
            "animate-fade-in"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
