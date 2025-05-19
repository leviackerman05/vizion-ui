
import { ChatMessage as ChatMessageType } from "@/types";
import { CHAT } from "@/constants/strings";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";

type ChatContainerProps = {
  messages: ChatMessageType[];
};

const ChatContainer = ({ messages }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center text-muted-foreground">
          <p>{CHAT.EMPTY}</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default ChatContainer;
