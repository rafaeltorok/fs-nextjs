"use client";

import { createContext, useContext, useState } from "react";

// TypeScript types
type NotificationType = "success" | "error";

interface NotificationContextType {
  message: string;
  type: NotificationType;
  showNotification: (message: string, type?: NotificationType) => void;
}

// React Context
const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
});

// Provider function
export function NotificationProvider({
  children,
}: {
  children: React.ReactNode,
}) {
  // Set the initial state
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  // Handle the message timeout and content
  function showNotification (
    msg: string,
    notifType: NotificationType = "success",
  ) {
    setMessage(msg);
    setType(notifType);
    setTimeout(() => setMessage(""), 5000);
  }

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  );
}

// Wraps the context into a custom hook for simplification
export function useNotification() {
  return useContext(NotificationContext);
}
