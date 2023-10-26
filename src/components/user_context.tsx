import React, { createContext, useContext, useState } from "react";
import { defaultUser } from "../utils/funcs";
import { User } from "../utils/types";

const UserContext = createContext(defaultUser());

export const useUser = () => {
  return useContext(UserContext);
};

// @ts-ignore
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser());

  const updateUser = (newUserData: User) => {
    setUser(newUserData);
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
