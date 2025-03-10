import { createContext, useContext, useState } from "react";
import { useUsers } from "../UsersContext";

const ChatsContext = createContext();

const SAMPLE_CHATS = [
  {
    id: 1,
    name: "Chat 1",
    messages: [
      {
        id: 8,
        content: "I hope you can learn new things",
        sender: {
          id: 1,
          name: "Default User",
        },
        created_at: "2025-03-10T03:05:48.166Z",
      },
      {
        id: 7,
        content: "HI Beshty",
        sender: {
          id: 2,
          name: "Beshty",
        },
        created_at: "2025-03-10T03:05:34.182Z",
      },
      {
        id: 6,
        content: "Are you ready to set a new record",
        sender: {
          id: 2,
          name: "Beshty",
        },
        created_at: "2025-03-10T03:05:25.145Z",
      },
      {
        id: 5,
        content: "Hi Default User",
        sender: {
          id: 2,
          name: "Beshty",
        },
        created_at: "2025-03-10T03:05:06.609Z",
      },
      {
        id: 4,
        content: "Are a nice person",
        sender: {
          id: 1,
          name: "Default User",
        },
        created_at: "2025-03-10T03:04:48.588Z",
      },
      {
        id: 3,
        content: "You",
        sender: {
          id: 1,
          name: "Default User",
        },
        created_at: "2025-03-10T03:04:42.234Z",
      },
      {
        id: 2,
        content: "Wassup",
        sender: {
          id: 2,
          name: "Beshty",
        },
        created_at: "2025-03-10T03:03:44.945Z",
      },
      {
        id: 1,
        content: "Hello, how are you?",
        sender: {
          id: 7008,
          name: "John Doe",
        },
        created_at: "2025-03-10T03:03:39.656Z",
      },
    ],
  },
];

export const ChatsProvider = ({ children }) => {
  const { currentUser } = useUsers();
  const [chats, setChats] = useState(SAMPLE_CHATS);
  const [currentChat, setCurrentChat] = useState(null);

  const createNewChat = (name) => {
    setChats([...chats, { id: chats.length + 1, name, messages: [] }]);
  };

  const deleteChatById = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
  };

  const sendMessageToChat = (chatId, messageContent) => {
    const chatIndex = chats.findIndex((chat) => chat.id === chatId);
    if (chatIndex === -1) return;
    chats[chatIndex].messages.splice(0, 0, {
      id: chats[chatIndex].messages.length + 1,
      content: messageContent,
      sender: currentUser,
      created_at: new Date(),
    });
    setChats([...chats]);
  };

  const setCurrentChatById = (chatId) => {
    setCurrentChat(chats.find((chat) => chat.id === chatId));
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
