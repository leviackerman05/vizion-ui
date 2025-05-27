import { CHAT } from "@/constants/strings";
import { ChatMessage as ChatMessageType } from "@/types";
import { formatDate } from "@/utils";

type ChatMessageProps = {
  message: ChatMessageType;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex mb-4 scrollbar-hide animate-fade-in ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`flex max-w-3/4 ${isUser ? "flex-row-reverse" : ""}`}>
        <div
          className={`flex items-center justify-center h-8 w-8 rounded-full shrink-0 ${
            isUser ? "ml-2 bg-primary" : "mr-2 bg-secondary"
          }`}
        >
          <span
            className={`text-sm font-medium ${
              isUser ? "text-primary-foreground" : "text-secondary-foreground"
            }`}
          >
            {isUser ? "U" : "V"}
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-medium text-sm">
              {isUser ? CHAT.USER_PREFIX : CHAT.AI_PREFIX}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(message.timestamp)}
            </span>
          </div>

          <div
            className={`p-3 rounded-lg ${
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {message.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
