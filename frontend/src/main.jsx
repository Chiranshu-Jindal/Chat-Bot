/* src/main.jsx */
import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import { ChatProvider } from "./context/ChatContext";
import JoinCreateChat from "./components/JoinCreateChat";
import ChatPage from "./components/ChatPage";
import "./index.css";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <h1 className="text-center text-gray-900 dark:text-gray-100 text-xl">
            Error: {this.state.error?.message || "Something went wrong."} Please refresh the page.
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log("main.jsx: Initializing with BrowserRouter");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <ChatProvider>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<JoinCreateChat />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/about" element={<h1 className="text-center text-gray-900 dark:text-gray-100 mt-10">This is about page</h1>} />
            <Route path="*" element={<h1 className="text-center text-gray-900 dark:text-gray-100 mt-10">404 Page Not Found</h1>} />
          </Routes>
        </ChatProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>
);