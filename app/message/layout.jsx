"use client";

import "../globals.css";
import ContactNavbar from "./ContactsNavbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}) {
  const pathname = usePathname();
  const showSidebar = !(pathname === "/message");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white h-screen antialiased">
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          {showSidebar && (
            <div className=" w-[300px] hidden sm:block flex-shrink-0 border-r border-white/10 bg-zinc-950">
              <ContactNavbar /> 
            </div>
          )}

          {/* Main Chat Area */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
