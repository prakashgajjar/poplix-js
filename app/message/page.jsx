"use client"

import Image from "next/image";
import ContactNavbar from "./ContactsNavbar";
import GlassSidebar from "../../components/GlassSidebar";
import SwipeToGoBack from "../../components/SwipeToGoBack";

export default function ChatUI() {

  return (
    <SwipeToGoBack to="/home">
      <div className="flex h-screen  bg-zinc-950/90 text-white">
        {/* Left Sidebar */}
        <GlassSidebar />
        <div className="h-screen ">
          <ContactNavbar />
        </div>
        <div className="flex flex-col  flex-1 items-center justify-center text-center bg-zinc-950 text-white px-4">
          <div className="opacity-40 mb-6">
            <Image
              src="/logos/poplix2.png"
              alt="Start Chat"
              width={200}
              height={200}
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold">No Chat Selected</h2>

          {/* Subtext */}
          <p className="mt-2 max-w-md text-sm text-gray-400">
            Select a conversation from the left sidebar to start chatting.
          </p>

          {/* Optional CTA */}
          <button
            className="mt-6 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-full transition"
            onClick={() => alert("Maybe open global chat or help guide")}
          >
            Learn how to start chatting 💬
          </button>
        </div>

      </div>
    </SwipeToGoBack>
  );
}

