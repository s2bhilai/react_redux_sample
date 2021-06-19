import React, { useContext } from "react";

import { ThemeContext, ThemeProvider } from "../contexts/ThemeContext";

function Layout({ startingTheme, children }) {
  return (
    <ThemeProvider startingTheme={startingTheme}>
      <LayoutNoThemeProvider>{children}</LayoutNoThemeProvider>
    </ThemeProvider>
  );
}

function LayoutNoThemeProvider({ children }) {
  //If we use this stmt before creating theme context
  //then error is thrown so created LayoutNoThemeProvider
  const theme = useContext(ThemeContext);

  return (
    <div
      className={
        theme === "light" ? "container-fluid light" : "container-fluid dark"
      }
    >
      {children}
    </div>
  );
}

export default Layout;
