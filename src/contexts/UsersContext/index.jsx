import { createContext, useContext, useState } from "react";

const UsersContext = createContext();

const DEFAULT_USER_STATE = [{ id: 1, name: "Default User" }];

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(DEFAULT_USER_STATE);
  const [currentUser, setCurrentUser] = useState(users[0]);

  const createNewUser = (name) => {
    setUsers([...users, { id: users.length + 1, name }]);
  };

  const setCurrentUserById = (id) => {
    setCurrentUser(users.find((user) => user.id === id));
  };

  return (
    <UsersContext.Provider
      value={{ users, currentUser, createNewUser, setCurrentUserById }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
