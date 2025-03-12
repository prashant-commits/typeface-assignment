import { useChats } from "@/contexts/ChatsContext";
import { useUsers } from "@/contexts/UsersContext";
import { cn } from "@/lib";

const ChatSection = ({ className }) => {
  const {
    currentChat,
    sendMessageToChat,
    sendMessageAndCreateThread,
    setCurrentChatById,
    getNumberOfMessagesByChatId,
    deleteMessageByMessageIdAndChatId,
  } = useChats();
  const { currentUser } = useUsers();

  /**
   *
   * @param {import("react").KeyboardEvent} e
   * @returns
   */
  const handleSendMessage = (e) => {
    if (!currentChat) return;
    const message = e.target.value.trim();
    if (!message) return;
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessageToChat(currentChat.id, message);
      e.target.value = "";
    }
    if (e.key === "Enter" && e.shiftKey) {
      sendMessageAndCreateThread(currentChat.id, message);
      e.target.value = "";
    }
  };

  const handleGotoThread = (chatId) => {
    setCurrentChatById(chatId);
  };

  return (
    <div className={cn("h-full grid overflow-hidden", className)}>
      {currentChat ? (
        <div className="grid grid-rows-[auto_min-content] gap-2 h-full overflow-hidden p-3">
          <div className="flex flex-col-reverse gap-5 items-stretch overflow-auto pt-12">
            {currentChat?.messages?.map(
              ({ id, content, sender, created_at, ...rest }, index) => (
                <div
                  key={id}
                  className={cn(
                    "flex items-center",
                    rest.thread && "cursor-pointer"
                  )}
                  onClick={() => {
                    rest.thread && handleGotoThread(rest.thread.chatId);
                  }}
                >
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
                        "text-[9px] leading-2.5 text-gray-500 mt-1 mx-4 flex items-center gap-2",
                        sender.id === currentUser.id && "self-end"
                      )}
                    >
                      <span>
                        {sender.id === currentUser.id
                          ? `You - ${new Date(created_at).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}`
                          : `From ${sender.name} - ${new Date(
                              created_at
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`}
                      </span>
                      <span>
                        <button
                          onClick={(e) => {
                            console.log(e);
                            
                            e.stopPropagation()
                            deleteMessageByMessageIdAndChatId(
                              currentChat.id,
                              id
                            );
                          }}
                        >
                          del
                        </button>
                      </span>
                    </p>
                    {rest.thread && (
                      <p
                        className={cn(
                          "text-[9px] leading-2.5 text-gray-500 mt-1 mx-4",
                          sender.id === currentUser.id && "self-end"
                        )}
                      >
                        Thread -{" "}
                        {getNumberOfMessagesByChatId(rest.thread.chatId)}{" "}
                        Messages
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="relative">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Message"
                className="w-full py-2 px-4 rounded-full ring-1 ring-gray-900/10 shadow-sm bg-white"
                onKeyDown={handleSendMessage}
              />
            </div>
            <p className="absolute -bottom-4 left-4 text-gray-700 text-[11px] leading-4">
              Hit <span className="font-medium">Enter</span> to
              send,&nbsp;&nbsp;Hit&nbsp;
              <span className="font-medium">Shift + Enter</span> to create
              thread
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
