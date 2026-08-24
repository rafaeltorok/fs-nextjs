"use client";

import { useNotification } from "../context/NotificationContext";
import "../notification.css";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  function getClass() {
    switch (type) {
      case "success":
        return "notification-success";
      case "error":
        return "notification-error";
      default:
        return undefined;
    }
  }

  return (
    <div className={getClass()}>
      {message}
    </div>
  );
}
