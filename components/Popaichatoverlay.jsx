"use client";

import { useState, useEffect, useRef } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import Image from "next/image";

export default function PopAIChatOverlay({ visible = true }) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "popai", text: "Hey! How can I help you today? 💬" },
    ]);
    const containerRef = useRef(null);
    const startX = useRef(0);
    const endX = useRef(0);

    useEffect(() => {
        const handleTouchStart = (e) => {
            startX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            endX.current = e.changedTouches[0].clientX;
            const delta = endX.current - startX.current;
            if (delta > 100) setOpen(true);
            if (delta < -100) setOpen(false);
        };

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { role: "user", text: input }]);
        setTimeout(() => {
            setMessages((prev) => [...prev, { role: "popai", text: `You said: ${input}` }]);
        }, 600);
        setInput("");
    };

    if (!visible) return null;

    return (
        <div
            ref={containerRef}
            className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] z-[100] text-white flex flex-col items-center justify-end transition-transform duration-500 ease-in-out backdrop-blur-lg ${open ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {/* Header */}
            <div className="w-full px-6 py-4 bg-black/80 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <Image
                        src="/logos/p-browser1.png"
                        alt="Popai"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <h2 className="text-base font-semibold">PopAI</h2>
                        <p className="text-xs text-gray-400">Your smart assistant</p>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 w-full px-4 py-6 space-y-4 overflow-y-auto">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${msg.role === "popai"
                                ? "bg-indigo-600 self-start text-white"
                                : "bg-white text-black self-end"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input Field */}
            <div className="w-full p-4 bg-black/90 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 p-3 bg-white/10 rounded-xl text-white outline-none"
                    placeholder="Ask something..."
                />
                <button
                    onClick={handleSend}
                    className="bg-indigo-500 p-3 rounded-xl hover:bg-indigo-600"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
