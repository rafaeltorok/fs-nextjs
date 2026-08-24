import AuthSessionProvider from "./components/SessionProvider";

// Components
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";

// React context
import { NotificationProvider } from "./context/NotificationContext";

// Tailwind CSS
import "./globals.css";

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
