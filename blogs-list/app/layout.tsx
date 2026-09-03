import type { Metadata } from "next";

// Components
import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";

// Context provider
import { NotificationProvider } from "./context/NotificationContext";

// CSS styles
import "./globals.css";

export const metadata: Metadata = {
  title: "Blogs List",
  description: "A blogs list web app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
