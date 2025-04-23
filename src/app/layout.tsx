import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hangtime",
  description: "Find and connect with climbing gyms and climbers",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background-soft`}
        suppressHydrationWarning
      >
        <div className="flex flex-col min-h-screen pb-16 md:pb-0">
          <main className="flex-1">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
