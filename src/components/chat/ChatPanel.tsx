
import { ChatMessage } from "@/types";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

type ChatPanelProps = {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  expanded: boolean;
};

const ChatPanel = ({ messages, onSendMessage, expanded }: ChatPanelProps) => {
  if (!expanded) {
    return (
      <div className="h-full flex items-center justify-center">
        <ChatInput onSendMessage={onSendMessage} expanded={false} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ChatContainer messages={messages} />
      <ChatInput onSendMessage={onSendMessage} expanded={true} />
    </div>
  );
};

export default ChatPanel;
