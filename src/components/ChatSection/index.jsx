import { useChats } from "@/contexts/ChatsContext";
import { useUsers } from "@/contexts/UsersContext";
import { cn } from "@/lib";

const ChatSection = ({ className }) => {
  const { currentChat, sendMessageToChat } = useChats();
  const { currentUser } = useUsers();

  const handleSendMessage = (e) => {
    if (!currentChat) return;
    if (e.key === "Enter") {
      const message = e.target.value.trim();
      if (message) {
        sendMessageToChat(currentChat.id, message);
        e.target.value = "";
      }
    }
  };

  return (
    <div className={cn("h-full grid overflow-hidden", className)}>
      {currentChat ? (
        <div className="grid grid-rows-[auto_min-content] gap-2 h-full overflow-hidden p-3">
          <div className="flex flex-col-reverse gap-5 items-stretch overflow-auto pt-12">
            {currentChat?.messages?.map(
              ({ id, content, sender, created_at }, index) => (
                <div key={id} className="flex items-center">
                  <div
                    className={cn(
                      "max-w-[80%] flex flex-col items-start",
                      sender.id === currentUser.id && "ms-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "bg-white px-4 py-2 rounded-full inline-block",
                        sender.id === currentUser.id &&
                          "bg-blue-500 text-white [&_p]:text-white self-end"
                      )}
                    >
                      <p className="text-[13px] leading-4 font-medium">
                        {content}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "text-[9px] leading-2.5 text-gray-500 mt-1 mx-4",
                        sender.id === currentUser.id && "self-end"
                      )}
                    >
                      {sender.id === currentUser.id
                        ? `You - ${new Date(created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`
                        : `From ${sender.name} - ${new Date(
                            created_at
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Message"
              className="w-full py-2 px-4 rounded-full ring-1 ring-gray-900/10 shadow-sm bg-white"
              onKeyDown={handleSendMessage}
            />
            <p className="absolute -bottom-4 left-4 text-gray-700 text-[11px] leading-4">
              Hit <span className="font-medium">Enter</span> to send
            </p>
          </div>
        </div>
      ) : (
        <div className="col-span-full row-span-full place-self-center">
          <p className="text-gray-500 text-[13px] leading-4">
            Select a chat or create a new one
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
