import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/lib/AuthContext";
import AppShell from "@/app/components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Frontend Laboratory App",
  description: "Lab 6-11 Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
