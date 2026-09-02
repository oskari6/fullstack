import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationContext";
import AuthSessionProvider from "./components/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blogs app",
  description: "A simple blogs application built with Next.js",
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
