import React from "react";
import { createRoot } from "react-dom/client";
import PostHogProvider from "./components/providers/PostHogProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
