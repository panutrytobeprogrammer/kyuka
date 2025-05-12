"use client";
import { Spinner } from "@heroui/react";
import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type AppContextType = {
  showLoading: () => void;
  hideLoading: () => void;
};

const defaultValue: AppContextType = {
  showLoading: () => {},
  hideLoading: () => {},
};

const AppContext = createContext<AppContextType>(defaultValue);

const AppProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  const values = {
    showLoading: () => setLoading(true),
    hideLoading: () => setLoading(false),
  };

  return (
    <AppContext.Provider value={values}>
      {children}
      {loading && <Spinner variant="gradient" />}
    </AppContext.Provider>
  );
};

export { AppProvider };

export const useApp = () => useContext(AppContext);
