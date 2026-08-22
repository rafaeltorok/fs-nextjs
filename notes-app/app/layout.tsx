import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import { NotificationProvider } from "./context/NotificationContext";
import Notification from "./components/Notification";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
