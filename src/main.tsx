import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:channel",
    lazy: async () => {
      const { TwitchComputer } = await import(
        "./pages/TwitchComputer/TwitchComputer"
      );
      return { Component: TwitchComputer };
    },
  },
  {
    path: "/overlay/:channel",
    lazy: async () => {
      const { Embed } = await import("./pages/Embed/Embed");
      return { Component: Embed };
    },
  },
  {
    path: "/overlay-instructions",
    lazy: async () => {
      const { Overlay } = await import("./pages/Overlay/Overlay");
      return { Component: Overlay };
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
