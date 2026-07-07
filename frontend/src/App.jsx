import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import "./styles/index.css";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0F172A",
            color: "#e2e8f0",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#6366F1", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#EF4444", secondary: "#fff" },
          },
        }}
      />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
