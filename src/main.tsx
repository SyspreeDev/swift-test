import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { MouseProvider } from "./app/context/Mousecontext";

createRoot(document.getElementById("root")!).render(
  <MouseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MouseProvider>
);