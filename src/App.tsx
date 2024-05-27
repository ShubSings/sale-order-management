// src/App.tsx
import React from "react";
import AppRoutes from "./routes";
import DarkModeSwitch from "./components/DarkModeSwitch";

const App: React.FC = () => {
  return (
    <>
      <DarkModeSwitch />
      <AppRoutes />
    </>
  );
};

export default App;
