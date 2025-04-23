"use client";
import { createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();

  const value = { user };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
