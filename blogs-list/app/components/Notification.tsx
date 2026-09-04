"use client";

import { useNotification } from "../context/NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  function getClass() {
    switch (type) {
      case "success":
        return "px-2 py-4 rounded text-white bg-green-600 font-bold";
      case "error":
        return "px-2 py-4 rounded text-white bg-red-600 font-bold";
      default:
        return undefined;
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 flex-1 text-center">
      <p className={getClass()} data-testid="notification">{message}</p>
    </div>
  );
}
