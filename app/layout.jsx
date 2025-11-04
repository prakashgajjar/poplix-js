"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Sidebar from "./Navbar";
import SubscribePremium from "./home/SubscribePremium";
import TrendingCard from "./home/TrendingCard";
import FollowSuggestions from "./home/FollowSuggestions";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const showSidebar = !(
    pathname === "/" ||
    pathname === "/popai" ||
    pathname === "/premium" ||
    pathname === "/premium/success" ||
    pathname === "/premium/cancel"
  );

  const showSidebar1 = !pathname.startsWith("/message");

  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile status bar */}
        <meta name="theme-color" content="#10B981" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/logos/poplix1.png" />
      </head>
      <body className="bg-black h-screen overflow-hidden text-white antialiased">
        <div className="flex h-screen overflow-hidden w-screen mx-auto">
          {/* Left Sidebar */}
          {showSidebar && <Sidebar />}

          {/* Main Content */}
          <div className="flex-1 px-1 md:px-1 lg:px-1">
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                success: {
                  style: { background: '#4ade80', color: '#fff' },
                },
                error: {
                  style: { background: '#f87171', color: '#fff' },
                },
              }}
            />
          </div>

          {/* Right Aside */}
          {showSidebar && showSidebar1 && (
            <aside className="hidden lg:block w-[300px] px-1 mt-2 py-1">
              <div className="flex flex-col mt-2 gap-5">
                <SubscribePremium />
                <TrendingCard />
                <FollowSuggestions />
              </div>
            </aside>
          )}
        </div>
      </body>
    </html>
  );
}
