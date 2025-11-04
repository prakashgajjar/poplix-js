"use client";
import React, { useState } from "react";
import { Mic } from "lucide-react";
import Image from "next/image";

export default function PopAIAssistantOverlay({ visible = true }) {
  const [listening, setListening] = useState(false);

  const handleListenToggle = () => {
    setListening(!listening);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex items-center justify-center">
      <div className="relative w-[320px] h-[320px] flex items-center justify-center bg-black/80 rounded-full shadow-2xl border border-white/10 backdrop-blur-md">
        {/* SVG Wave Animation */}
        {listening && (
    <div className="w-full max-w-7xl mx-auto absolute top-[-40px] left-1/2 -translate-x-1/2 z-0">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-40">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#8e2eff" />
            <stop offset="100%" stopColor="#ff4fcf" />
          </linearGradient>
        </defs>

        {Array.from({ length: 500 }).map((_, i) => {
          const y1 = 50 + Math.random() * 50;
          const y2 = 50 + Math.random() * 50;
          const y3 = 50 + Math.random() * 50;
          const opacity = 0.03 + Math.random() * 0.05;
          const duration = (3 + Math.random() * 3).toFixed(1);
          const delay = (Math.random() * 2).toFixed(1);
          const ampShift = 10 + Math.random() * 300;

          return (
            <path
              key={i}
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="1"
              opacity={opacity}
              d={`M0,100 C360,${y1} 1080,${y2} 1440,100`}
            >
              <animate
                attributeName="d"
                dur={`${duration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite"
                values={`
                  M0,100 C360,${y1 +ampShift } 1080,${y2 - ampShift} 1440,100;
                  M0,100 C360,${y2 - ampShift} 1080,${y3 + ampShift} 1440,100;
                  M0,100 C360,${y3 - ampShift} 1080,${y1 + ampShift} 1440,100;
                  M0,100 C360,${y1 + ampShift} 1080,${y2 - ampShift} 1440,100
                `}
              />
            </path>
          );
        })}
      </svg>
    </div>

        )}

        {/* Mic Button */}
        <button
          onClick={handleListenToggle}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${listening
            ? "bg-gradient-to-br from-[#00f0ff] via-[#8e2eff] to-[#ff4fcf] text-white shadow-[0_0_30px_8px_rgba(142,46,255,0.6)]"
            : "bg-white text-black border-black/20 shadow-md"
            }`}
        >
          <Mic size={36} />
        </button>

        {/* Logo (optional) */}
        <div className="absolute bottom-4 flex justify-center">
          <Image
            src="/logos/p-browser1.png"
            alt="Pop AI Logo"
            width={48}
            height={48}
            className="rounded-full shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
