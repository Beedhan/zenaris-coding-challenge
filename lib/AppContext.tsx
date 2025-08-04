"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  // Define your context value types here
  items: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  setItems: React.Dispatch<
    React.SetStateAction<{
      breakfast: string[];
      lunch: string[];
      dinner: string[];
      snacks: string[];
    }>
  >;
  dislikedItems: {
    name: string;
    severity: "mild" | "absolutely";
  }[];
  setDislikedItems: React.Dispatch<
    React.SetStateAction<{ name: string; severity: "mild" | "absolutely" }[]>
  >;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<{
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  }>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [dislikedItems, setDislikedItems] = useState<
    { name: string; severity: "mild" | "absolutely" }[]
  >([]);

  return (
    <AppContext.Provider
      value={{ items, setItems, dislikedItems, setDislikedItems }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
