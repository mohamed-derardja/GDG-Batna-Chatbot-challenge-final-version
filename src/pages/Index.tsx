import { useState, useRef, useEffect, useCallback } from "react";
// GDG Batna AI Chatbot
import { Message, streamChat } from "@/lib/chat";
import { Header } from "@/components/Header";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SuggestionChips } from "@/components/SuggestionChips";
import { ChatInput } from "@/components/ChatInput";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (input: string) => {
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setIsStreaming(false);

    let assistantContent = "";

    const updateAssistantMessage = (chunk: string) => {
      assistantContent += chunk;
      setIsStreaming(true);
      setIsLoading(false);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      onDelta: updateAssistantMessage,
      onDone: () => {
        setIsLoading(false);
        setIsStreaming(false);
      },
      onError: (error) => {
        setIsLoading(false);
        setIsStreaming(false);
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      },
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Chat area */}
      <main className="flex-1 overflow-hidden">
        <div className="container max-w-3xl mx-auto h-full flex flex-col">
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin">
            {showWelcome && <WelcomeMessage />}

            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isLast={
                  isStreaming &&
                  index === messages.length - 1 &&
                  message.role === "assistant"
                }
              />
            ))}

            {isLoading && !isStreaming && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom section */}
          <div className="px-4 pb-6 pt-2 space-y-4 bg-gradient-to-t from-background via-background to-transparent">
            {showWelcome && (
              <SuggestionChips
                onSelect={handleSuggestionClick}
                disabled={isLoading}
              />
            )}
            <ChatInput onSend={sendMessage} disabled={isLoading || isStreaming} />
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground">
                Powered by AI • Ask about GDG Batna events, community, and more
              </p>
              <p className="text-xs text-muted-foreground/70">
                Made with ❤️ by <span className="font-medium text-muted-foreground">Mohamed Derardja</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
