import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatInterfaceRef {
  sendMessage: (message: string) => void;
}

const ChatInterface = forwardRef<ChatInterfaceRef>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you with your business automation today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, shouldAutoScroll]);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    sendMessage: (message: string) => {
      setInput(message);
      setShouldAutoScroll(true); // Enable auto-scroll for this interaction
      
      // Auto-submit after a short delay
      setTimeout(() => {
        if (message.trim()) {
          // Create a synthetic form submission
          const userMessage: Message = {
            id: Date.now().toString(),
            content: message,
            sender: "user",
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, userMessage]);
          setInput("");
          setIsLoading(true);
          
          // Send to backend
          fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
          })
          .then(response => response.json())
          .then(data => {
            const aiMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: data.response || "I received your message but couldn't generate a response. Please try again.",
              sender: "ai",
              timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
          })
          .catch(error => {
            console.error('Chat error:', error);
            const errorMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: "I'm sorry, I'm having trouble connecting to the AI service. Please try again later.",
              sender: "ai",
              timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
          })
          .finally(() => {
            setIsLoading(false);
          });
        }
      }, 1500);
    }
  }), []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Disable auto-scroll on manual user interaction
    setShouldAutoScroll(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting to the AI service. Please try again later.",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-secondary rounded-2xl shadow-2xl h-96 flex flex-col overflow-hidden" data-testid="chat-interface">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">AI Assistant - Live Chat</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "ai" && (
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-secondary text-secondary-foreground"
              }`}
              data-testid={`message-${message.sender}`}
            >
              {message.content}
            </div>
            {message.sender === "user" && (
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-2 justify-start">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card/30">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Re-enable auto-scroll when user starts typing manually
              if (e.target.value === '') {
                setShouldAutoScroll(true);
              }
            }}
            onFocus={() => setShouldAutoScroll(false)}
            placeholder="Ask me anything about AI automation..."
            className="flex-1 bg-background/50 border-border text-gray-800 placeholder:text-muted-foreground"
            disabled={isLoading}
            data-testid="chat-input"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="bg-primary hover:bg-accent text-primary-foreground"
            data-testid="chat-send-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
});

ChatInterface.displayName = "ChatInterface";

export default ChatInterface;
export type { ChatInterfaceRef };