import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then(() => {
        console.log("[Service worker]", "registered");
      })
      .catch((err) => {
        console.log("[Service worker]", "Error:", err);
      });
  });
}
