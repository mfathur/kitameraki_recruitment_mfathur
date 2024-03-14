import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
