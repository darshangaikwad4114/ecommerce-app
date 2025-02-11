import React, { useState, createContext, useCallback } from "react";

// Create a context for the sidebar
export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // useCallback to memoize the handleClose function
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
