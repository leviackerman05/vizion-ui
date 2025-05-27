import { useEffect, useState } from "react";
import { ChatHistory, ChatMessage, VideoMetadata, VideoState } from "@/types";
import { createUserMessage, createAiMessage } from "@/utils";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatPanel from "@/components/chat/ChatPanel";
import VideoPanel from "@/components/video/VideoPanel";
import { v4 as uuidv4 } from "uuid";
import {
  fetchUserChats,
  fetchChatMessages,
  sendUserPrompt,
} from "@/lib/api/chats";

const generatingResponses = [
  "Sure, working on it...",
  "Alright, let me get that ready for you.",
  "Okay, generating your animation now...",
  "One moment while I bring that to life...",
];

const doneResponses = [
  "Here’s the animation!",
  "Done! Check out the result.",
  "Your video is ready — have a look!",
  "Hope you like how it turned out!",
];

function getRandomFiller(stage: "generating" | "done") {
  const pool = stage === "generating" ? generatingResponses : doneResponses;
  return pool[Math.floor(Math.random() * pool.length)];
}

const Index = () => {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chats, setChats] = useState<ChatHistory[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle");
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(
    null
  );
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const USER_ID = "user_123";

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchUserChats(USER_ID);
        const mapped: ChatHistory[] = data.map((item: any) => ({
          id: item.chat_id,
          title: item.name,
          lastMessage: "Tap to view",
          timestamp: new Date(item.createdAt),
        }));
        setChats(mapped);
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };
    loadChats();
  }, []);

  const handleSendMessage = async (text: string) => {
    const userMsg = createUserMessage(text);
    let currentChatId = selectedChatId;

    if (!expanded || !selectedChatId) {
      const newChatId = uuidv4();
      const newChat: ChatHistory = {
        id: newChatId,
        title: text.length > 30 ? text.slice(0, 30) + "..." : text,
        lastMessage: text,
        timestamp: new Date(),
      };
      setChats([newChat, ...chats]);
      setSelectedChatId(newChatId);
      setExpanded(true);
      currentChatId = newChatId;
    }

    setMessages((prev) => [...prev, userMsg]);
    setVideoState("generating");
    const aiLoading = createAiMessage("Generating your video...");
    setTimeout(() => setMessages((prev) => [...prev, aiLoading]), 300);

    try {
      const data = await sendUserPrompt(USER_ID, currentChatId, text);
      const videoUrl = data.video_url + `?t=${Date.now()}`;
      setVideoSrc(videoUrl);
      setVideoState("ready");
      setVideoMetadata({
        duration: "unknown",
        format: "MP4",
        resolution: "unknown",
        size: "unknown",
      });
      const aiDone = createAiMessage(getRandomFiller("done"));
      setMessages((prev) => [...prev, aiDone]);
    } catch (err) {
      console.error(err);
      setVideoState("error");
      setMessages((prev) => [
        ...prev,
        createAiMessage("❌ Failed to generate video."),
      ]);
    }
  };

  const handleSelectChat = async (chatId: string) => {
    setSelectedChatId(chatId);
    setExpanded(true);
    try {
      const data = await fetchChatMessages(USER_ID, chatId);
      const loadedMessages: ChatMessage[] = data.messages.map((m: any) => ({
        id: crypto.randomUUID(),
        text: typeof m === "string" ? m : m.message,
        sender: "user",
      }));

      const interleaved: ChatMessage[] = [];
      loadedMessages.forEach((m) => {
        interleaved.push(m);
        interleaved.push({
          id: crypto.randomUUID(),
          text: getRandomFiller("generating"),
          sender: "ai",
          timestamp: undefined,
        });
        interleaved.push({
          id: crypto.randomUUID(),
          text: getRandomFiller("done"),
          sender: "ai",
          timestamp: undefined,
        });
      });
      setMessages(interleaved);
      setVideoState("ready");
      setVideoMetadata({
        duration: "unknown",
        format: "MP4",
        resolution: "unknown",
        size: "unknown",
      });
    } catch (err) {
      console.error("Failed to load chat:", err);
    }
  };

  const handleNewChat = () => {
    setExpanded(false);
    setSelectedChatId(null);
    setMessages([]);
    setVideoState("idle");
    setVideoMetadata(null);
    setVideoSrc(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden scrollbar-hide">
        <Sidebar
          chats={chats}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
        />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 flex overflow-hidden">
            <div
              className={`transition-all duration-500 ${
                expanded ? "w-1/2 border-r border-border" : "w-full"
              }`}
            >
              <ChatPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                expanded={expanded}
              />
            </div>
            {expanded && (
              <div className="w-1/2 animate-fade-in">
                <VideoPanel
                  videoState={videoState}
                  videoSrc={
                    videoState === "ready" ? videoSrc ?? undefined : undefined
                  }
                  metadata={videoMetadata}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
