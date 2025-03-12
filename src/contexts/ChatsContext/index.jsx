import { createContext, useContext, useMemo, useState } from "react";
import { useUsers } from "../UsersContext";

const ChatsContext = createContext();

const SAMPLE_CHATS = [
  {
    id: 1,
    name: "Chat 1",
    type: "room",
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
          id: 2002,
          name: "Beshty",
        },
        created_at: "2025-03-10T03:05:34.182Z",
      },
      {
        id: 6,
        content: "Are you ready to set a new record",
        sender: {
          id: 2002,
          name: "Beshty",
        },
        created_at: "2025-03-10T03:05:25.145Z",
      },
      {
        id: 5,
        content: "Hi Default User",
        sender: {
          id: 2002,
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
          id: 2002,
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
        thread: {
          chatId: 2,
        },
        created_at: "2025-03-10T03:03:39.656Z",
      },
    ],
  },
  {
    id: 2,
    name: "Hello, how are you?",
    type: "thread",
    metadata: {
      chatId: 1,
      messageId: 1,
    },
    messages: [],
  },
];

export const ChatsProvider = ({ children }) => {
  const { currentUser } = useUsers();
  const [chats, setChats] = useState(SAMPLE_CHATS);
  const [currentChatId, setCurrentChatId] = useState(null);

  const currentChat = useMemo(() => {
    return chats.find((chat) => chat.id === currentChatId) ?? null;
  }, [currentChatId, chats]);

  const createNewChat = (name) => {
    setChats([
      ...chats,
      { id: chats.length + 1, name, messages: [], type: "room" },
    ]);
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

  const sendMessageAndCreateThread = (chatId, messageContent) => {
    const chatIndex = chats.findIndex((chat) => chat.id === chatId);
    if (chatIndex === -1) return;
    const nChat = {
      id: chats.length + 1,
      name: messageContent,
      type: "thread",
      metadata: {
        chatId,
        messageId: chats[chatIndex].messages.length + 1,
      },
      messages: [],
    };
    const nMessage = {
      id: chats[chatIndex].messages.length + 1,
      content: messageContent,
      sender: currentUser,
      thread: {
        chatId: nChat.id,
      },
      created_at: new Date(),
    };
    nChat.messages.push({
      id: 1,
      content: messageContent,
      sender: currentUser,
      created_at: new Date(),
    });
    chats[chatIndex].messages.splice(0, 0, nMessage);
    setChats([...chats, nChat]);
  };

  const getNumberOfMessagesByChatId = (chatId) => {
    return chats.find((_) => _.id === chatId)?.messages.length;
  };

  const deleteMessageByMessageIdAndChatId = (chatId, messageId) => {
    // const chatIndex = chats.findIndex((_) => _.id === chatId);
    // if (chatIndex === -1) return;

    // const messageIndex = chats[chatIndex].messages.findIndex(
    //   (_) => _.id === messageId
    // );
    // if (messageIndex === -1) return;

    // const nMessages = chats[chatIndex].messages.filter(
    //   (_) => _.id !== messageId
    // );

    setChats(
      chats.map((chat) => {
        // debugger
        return chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.filter((msg) => msg.id !== messageId),
            }
          : chat;
      })
    );
  };

  return (
    <ChatsContext.Provider
      value={{
        chats,
        currentChat,
        createNewChat,
        sendMessageToChat,
        deleteChatById,
        setCurrentChatById: setCurrentChatId,
        sendMessageAndCreateThread,
        getNumberOfMessagesByChatId,
        deleteMessageByMessageIdAndChatId,
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
