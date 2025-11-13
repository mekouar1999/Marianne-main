import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

console.log("🌟 main.jsx is executing");

const rootElement = document.getElementById("root");
console.log("📍 Root element:", rootElement);

if (!rootElement) {
  console.error("❌ Root element not found!");
} else {
  console.log("✅ Root element found, creating React root");
  const root = createRoot(rootElement);
  console.log("🎯 Rendering React app");

  try {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log("🎉 React app render initiated successfully");
  } catch (error) {
    console.error("💥 Error rendering React app:", error);
  }
}
