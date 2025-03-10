import { useChats } from "@/contexts/ChatsContext";
import { cn } from "@/lib";
import { useState } from "react";

const ChatsList = ({ className }) => {
  const [addingChat, setAddingChat] = useState(false);
  const {
    chats,
    createNewChat,
    deleteChatById,
    setCurrentChatById,
    currentChat,
  } = useChats();

  const handleAddChatClick = () => {
    setAddingChat(true);
  };

  const handleAddChatKeyDown = (e) => {
    const name = e.target.value;
    const liParent = e.target.parentElement;

    if (e.key === "Enter") {
      if (!name) {
        liParent.classList.add("empty-error");
        setTimeout(() => {
          liParent.classList.remove("empty-error");
        }, 1000);
        return;
      }
      createNewChat(name);
      setAddingChat(false);
    }
  };

  return (
    <div
      className={cn("grid grid-rows-[auto_28px] overflow-hidden", className)}
    >
      <ul className="flex flex-col items-stretch list-none overflow-auto">
        {chats.map(({ id, name, messages }) => (
          <li
            key={id}
            className={cn(
              "px-2 py-1.5 text-[13px] leading-6 text-gray-700 group hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-150 ease-out font-medium",
              currentChat?.id === id && "bg-blue-500 text-white [&_p]:text-white"
            )}
            onClick={() => setCurrentChatById(id)}
          >
            <p>{name}</p>
            <p className="text-xs text-gray-500 group-hover:text-current">
              {messages[0] ? (
                <span className="italic">
                  {`${messages[0].sender.name}: ${messages[0].content}`}
                </span>
              ) : (
                "No messages yet"
              )}
            </p>
          </li>
        ))}
        {addingChat && (
          <label>
            <li className="px-2 py-1.5 text-[13px] leading-6  bg-blue-500 text-white font-medium flex items-center [&.empty-error]:ring-4 [&.empty-error]:ring-red-500/50  ring-0 ring-white ring-inset transition-all duration-[75ms] ease-in-out">
              <input
                type="text"
                placeholder="Room Name"
                autoFocus
                className="flex-1 outline-transparent border-transparent"
                onKeyDown={handleAddChatKeyDown}
              />
            </li>
          </label>
        )}
      </ul>
      <div className="flex items-center justify-start p-1 border-t border-gray-300">
        <button
          className="h-5 text-[11px] leading-3 text-gray-500 rounded-sm hover:bg-gray-100 px-1 hover:text-gray-700 cursor-pointer transition-all duration-150 ease-out font-medium"
          onClick={handleAddChatClick}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ChatsList;
