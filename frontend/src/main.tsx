import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();

//  check whether the device support touch
const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};

const dndBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DndProvider backend={dndBackend}>
      <FluentProvider theme={teamsLightTheme}>
        <App />
      </FluentProvider>
    </DndProvider>
  </React.StrictMode>
);
