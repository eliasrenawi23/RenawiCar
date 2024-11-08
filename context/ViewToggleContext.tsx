// components/ViewToggleContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface ViewToggleContextProps {
  isTableView: boolean;
  toggleToListView: () => void;
  toggleToGridView: () => void;
}

const ViewToggleContext = createContext<ViewToggleContextProps | undefined>(
  undefined
);

const ViewToggleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTableView, setIsTableView] = useState(true);

  const toggleToListView = () => setIsTableView(true);
  const toggleToGridView = () => setIsTableView(false);

  return (
    <ViewToggleContext.Provider
      value={{ isTableView, toggleToListView, toggleToGridView }}
    >
      {children}
    </ViewToggleContext.Provider>
  );
};
export default ViewToggleProvider;

export const useViewToggle = () => {
  const context = useContext(ViewToggleContext);
  if (!context) {
    throw new Error("useViewToggle must be used within a ViewToggleProvider");
  }
  return context;
};
