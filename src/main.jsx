import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SpaceProvider } from "./SpaceProvider";
import App from "./App.jsx";
import "./index.css";
import "i18next";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SpaceProvider>
        <App />
      </SpaceProvider>
    </BrowserRouter>
  </StrictMode>
);
