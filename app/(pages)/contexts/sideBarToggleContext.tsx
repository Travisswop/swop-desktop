"use client";

// ThemeContext.js
import React, { createContext, useState } from "react";

// Create a context with default value
const SideBarToggleContext = createContext({
  toggle: false,
  settingToggle: () => {},
});

// Provider component to wrap your app and provide the context value
export const SideBarToggleProvider = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);

  const settingToggle = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <SideBarToggleContext.Provider value={{ toggle, settingToggle }}>
      {children}
    </SideBarToggleContext.Provider>
  );
};

export default SideBarToggleContext;
