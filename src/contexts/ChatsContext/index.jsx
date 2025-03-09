import { createContext, useContext, useState } from "react";

const ChatsContext = createContext();

const SAMPLE_CHATS = [
  {
    id: 1,
    name: "Chat 1",
    messages: [
      {
        id: 1,
        content: "Hello, how are you?",
        sender: {
          id: 1,
          name: "John Doe",
        },
        created_at: new Date(),
      },
    ],
  },
];

export const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState(SAMPLE_CHATS);
  const [currentChat, setCurrentChat] = useState(null);

  const createNewChat = (name) => {
    setChats([...chats, { id: chats.length + 1, name, messages: [] }]);
  };

  const deleteChatById = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  const sendMessageToChat = (chatId, message) => {
    setChats((prev) => {
      const chatIndex = prev.findIndex((chat) => chat.id === chatId);
      if (chatIndex !== -1) {
        prev[chatIndex].messages.splice(0, 0, message);
        return [...prev];
      }
      return prev;
    });
  };

  const setCurrentChatById = (chatId) => {
    setCurrentChat(chatId);
  };

  return (
    <ChatsContext.Provider
      value={{
        chats,
        currentChat,
        createNewChat,
        sendMessageToChat,
        deleteChatById,
        setCurrentChatById,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error("useChats must be used within a ChatsProvider");
  }
  return context;
};
