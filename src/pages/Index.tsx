
import { useState, useEffect } from "react";
import { ChatHistory, ChatMessage, VideoMetadata, VideoState } from "@/types";
import { createAiMessage, createUserMessage, generateId, simulateVideoGeneration } from "@/utils";
import { CHAT } from "@/constants/strings";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatPanel from "@/components/chat/ChatPanel";
import VideoPanel from "@/components/video/VideoPanel";

const Index = () => {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chats, setChats] = useState<ChatHistory[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [videoState, setVideoState] = useState<VideoState>("idle");
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
  
  // Mock video source - in a real app this would come from the API
  const videoSrc = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const handleSendMessage = async (text: string) => {
    // Create user message
    const userMessage = createUserMessage(text);
    
    // If this is the first message, expand the layout
    if (!expanded) {
      setExpanded(true);
      
      // Create a new chat history entry
      const newChatId = generateId();
      const newChat: ChatHistory = {
        id: newChatId,
        title: text.length > 20 ? `${text.substring(0, 20)}...` : text,
        lastMessage: text,
        timestamp: new Date(),
      };
      
      setChats([newChat, ...chats]);
      setSelectedChatId(newChatId);
    }
    
    // Update messages
    setMessages([...messages, userMessage]);
    
    // Start video generation
    setVideoState("generating");
    
    // Simulate AI response with delay
    setTimeout(() => {
      const aiMessage = createAiMessage(
        "I'm generating your video based on your description. You'll see the results in a few moments."
      );
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    }, 1000);
    
    // Simulate video generation
    try {
      const metadata = await simulateVideoGeneration();
      setVideoMetadata(metadata);
      setVideoState("ready");
      
      // Add another AI message when video is ready
      const readyMessage = createAiMessage(
        "Your video has been generated! You can preview it now."
      );
      setMessages(prevMessages => [...prevMessages, readyMessage]);
    } catch (error) {
      setVideoState("error");
      console.error("Error generating video:", error);
    }
  };

  const handleNewChat = () => {
    setExpanded(false);
    setMessages([]);
    setSelectedChatId(null);
    setVideoState("idle");
    setVideoMetadata(null);
  };

  const handleSelectChat = (id: string) => {
    // In a real app, you would load chat messages from your backend
    setSelectedChatId(id);
    setExpanded(true);
    
    // Mock selecting a chat
    const selectedChat = chats.find(chat => chat.id === id);
    if (selectedChat) {
      const mockMessages = [
        createUserMessage(selectedChat.lastMessage),
        createAiMessage("This is a previous conversation.")
      ];
      setMessages(mockMessages);
      setVideoState("ready");
      setVideoMetadata({
        duration: "1:30",
        resolution: "1280x720",
        format: "MP4",
        size: "15.8 MB",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          chats={chats} 
          onNewChat={handleNewChat} 
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
        />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 flex overflow-hidden">
            <div className={`transition-all duration-500 ${
              expanded 
                ? "w-1/2 border-r border-border" 
                : "w-full"
            }`}>
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
                  videoSrc={videoState === "ready" ? videoSrc : undefined}
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
