
import { SIDEBAR } from "@/constants/strings";
import { ChatHistory } from "@/types";
import { formatDate } from "@/utils";
import { MessageSquare } from "lucide-react";

type ChatListProps = {
  chats: ChatHistory[];
  onSelectChat: (id: string) => void;
  selectedChatId: string | null;
};

const ChatList = ({ chats, onSelectChat, selectedChatId }: ChatListProps) => {
  const todayChats = chats.filter(
    (chat) => chat.timestamp.toDateString() === new Date().toDateString()
  );
  
  const yesterdayChats = chats.filter(
    (chat) => 
      new Date(chat.timestamp.setHours(0,0,0,0)).toString() === 
      new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0,0,0,0).toString()
  );
  
  const olderChats = chats.filter(
    (chat) => 
      chat.timestamp < new Date(new Date().setDate(new Date().getDate() - 1))
  );

  const ChatGroup = ({ title, items }: { title: string; items: ChatHistory[] }) => (
    <div className="space-y-2 mb-6">
      <h3 className="text-xs uppercase text-sidebar-foreground/50 px-4">{title}</h3>
      {items.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-sidebar-accent rounded-lg transition-colors ${
            selectedChatId === chat.id ? "bg-sidebar-accent" : ""
          }`}
        >
          <MessageSquare size={16} className="shrink-0 text-sidebar-foreground/70" />
          <div className="truncate flex-1 text-sm text-sidebar-foreground">
            {chat.title}
          </div>
          <div className="text-xs text-sidebar-foreground/50">
            {formatDate(chat.timestamp)}
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4">
      {todayChats.length > 0 && (
        <ChatGroup title={SIDEBAR.TODAY} items={todayChats} />
      )}
      
      {yesterdayChats.length > 0 && (
        <ChatGroup title={SIDEBAR.YESTERDAY} items={yesterdayChats} />
      )}
      
      {olderChats.length > 0 && (
        <ChatGroup title={SIDEBAR.PREVIOUS} items={olderChats} />
      )}
    </div>
  );
};

export default ChatList;
