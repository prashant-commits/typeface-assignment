import { useUsers } from "@/contexts/UsersContext";
import { cn } from "@/lib";
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";
const UsersDropdown = ({ className }) => {
  const { users, currentUser, createNewUser, setCurrentUserById } = useUsers();
  const [open, setOpen] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    strategy: "fixed",
    placement: "bottom-end",
    open,
    onOpenChange: (open) => {
      setOpen(open);
      if (!open) {
        setAddingUser(false);
      }
    },
  });
  const click = useClick(context);
  const dismiss = useDismiss(context, {
    escapeKey: true,
    outsidePressEvent: "mousedown",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleAddUserClick = () => {
    setAddingUser(true);
  };

  const handleAddUserKeyDown = (e) => {
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
      createNewUser(name);
      setAddingUser(false);
    }

  };

  const handleSelectUser = (id) => {
    setCurrentUserById(id);
    setOpen(false);
    setAddingUser(false);
  }

  return (
    <>
      <button
        ref={refs.setReference}
        className={cn(
          "rounded-full size-10 bg-white ring-1 ring-gray-700/10 shadow-sm flex items-center justify-center text-[20px] leading-10 text-blue-600 font-semibold",
          className
        )}
        {...getReferenceProps()}
      >
        {currentUser?.name.charAt(0)}
      </button>
      {open && (
        <div
          ref={refs.setFloating}
          className="bg-white ring-1 ring-gray-700/10 shadow-sm rounded-md w-[200px] h-[300px] max-h-[300px] mt-3 grid grid-rows-[auto_28px] overflow-hidden"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <ul className="flex flex-col items-stretch list-none overflow-auto">
            {users.map(({ id, name }, index) => (
              <li
                key={id}
                className="px-2 py-1.5 text-[13px] leading-6 text-gray-700 group hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-150 ease-out font-medium flex items-center"
                onClick={() => handleSelectUser(id)}
              >
                {name}
                {currentUser.id === id && (
                  <span className="ms-auto text-xs text-gray-500 group-hover:text-current italic">
                    current
                  </span>
                )}
              </li>
            ))}
            {addingUser && (
              <label>
                <li className="px-2 py-1.5 text-[13px] leading-6  bg-blue-500 text-white font-medium flex items-center [&.empty-error]:ring-4 [&.empty-error]:ring-red-500/50  ring-0 ring-white ring-inset transition-all duration-[75ms] ease-in-out">
                  <input
                    type="text"
                    placeholder="John Doe"
                    autoFocus
                    className="flex-1 outline-transparent border-transparent"
                    onKeyDown={handleAddUserKeyDown}
                  />
                </li>
              </label>
            )}
          </ul>
          <div className="flex items-center justify-start p-1 border-t border-gray-300">
            <button
              className="h-5 text-[11px] leading-3 text-gray-500 rounded-sm hover:bg-gray-100 px-1 hover:text-gray-700 cursor-pointer transition-all duration-150 ease-out font-medium"
              onClick={handleAddUserClick}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersDropdown;
