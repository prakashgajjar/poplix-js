"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Navbar";
import SubscribePremium from "./home/SubscribePremium";
import TrendingCard from "./home/TrendingCard";
import FollowSuggestions from "./home/FollowSuggestions";

export default function LayoutClient({ children }) {
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
    <div className="flex h-screen overflow-hidden w-screen mx-auto">
      {/* Left Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 px-1 md:px-1 lg:px-1">
        {children}
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
  );
}
