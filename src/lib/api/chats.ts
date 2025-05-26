const BASE_URL = "http://localhost:8000";

export const fetchUserChats = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/chats/${userId}`);
  return res.json();
};

export const fetchChatMessages = async (userId: string, chatId: string) => {
  const res = await fetch(`${BASE_URL}/chatdata/${userId}/${chatId}`);
  return res.json();
};

export const sendUserPrompt = async (
  userId: string,
  chatId: string,
  prompt: string
) => {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, chat_id: chatId, prompt }),
  });

  return res.json();
};
