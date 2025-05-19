
import { INPUT } from "@/constants/strings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  expanded: boolean;
};

const ChatInput = ({ onSendMessage, expanded }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`${
        expanded ? "w-full p-4 border-t border-border" : "w-2/3 max-w-2xl"
      } mx-auto transition-all duration-300`}
    >
      <div className={`rainbow-border flex items-center gap-2 rounded-lg p-1 bg-white transition-all duration-300 ${
        expanded ? "" : "shadow-lg"
      }`}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={INPUT.PLACEHOLDER}
          className="border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          autoFocus
        />
        <Button type="submit" size="sm" className="shrink-0">
          <Send size={16} className="mr-2" />
          {expanded ? INPUT.SEND : INPUT.SUBMIT}
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
