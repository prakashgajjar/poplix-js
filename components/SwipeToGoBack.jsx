"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SwipeToGoBack({
  to = "/home",
  threshold = 100,
  children,
}) {
  const [navigating, setNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let startX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const screenWidth = window.innerWidth;

      if (screenWidth < 1500 && endX - startX > threshold) {
        setNavigating(true);
        setTimeout(() => {
          router.push(to);
        }, 300); // small delay for smoothness
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [router, to, threshold]);

  if (navigating) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500" />
        <p className="ml-4 text-lg font-semibold">Going back...</p>
      </div>
    );
  }

  return <>{children}</>;
}
