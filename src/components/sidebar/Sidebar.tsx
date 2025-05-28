import { SIDEBAR } from "@/constants/strings";
import { ChatHistory } from "@/types";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, LogOut, User } from "lucide-react";
import Logo from "./Logo";
import ChatList from "./ChatList";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  chats: ChatHistory[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  selectedChatId: string | null;
};

const Sidebar = ({
  chats,
  onNewChat,
  onSelectChat,
  selectedChatId,
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const uid = localStorage.getItem("uid");
    const sessionId = localStorage.getItem("session_id");

    if (uid && sessionId) {
      try {
        await fetch("http://localhost:8000/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-uid": uid,
            "x-session-id": sessionId,
          },
        });
      } catch (err) {
        console.error("Logout request failed:", err);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("session_id");
    navigate("/login");
  };

  return (
    <aside className="w-72 h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      <Logo />

      <div className="px-4 py-2">
        <Button
          variant="secondary"
          className="w-full flex items-center gap-2 bg-sidebar-accent text-sidebar-foreground"
          onClick={onNewChat}
        >
          <MessageSquare size={16} />
          <span>{SIDEBAR.NEW_CHAT}</span>
        </Button>
      </div>

      <ChatList
        chats={chats}
        onSelectChat={onSelectChat}
        selectedChatId={selectedChatId}
      />

      <div className="p-4 mt-auto border-t border-sidebar-border">
        <div className="flex items-center gap-3 text-sidebar-foreground mb-4">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="text-sm font-medium">User Account</div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Settings size={16} />
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full flex items-center gap-2 justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>{SIDEBAR.SIGN_OUT}</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
