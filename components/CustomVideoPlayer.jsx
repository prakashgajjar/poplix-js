"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";

export default function CustomVideoPlayer({ src, onLoadedData }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = 0.8;
      video.muted = true;
      video.play().catch(() => setPlaying(false));
    }
  }, []);

  return (
    <div
      className="relative rounded-xl overflow-hidden mx-auto bg-black"
      style={{
        aspectRatio,
        maxHeight: "80vh", // 👈 Limit height to 80% of viewport
        width: "100%",
        maxWidth: aspectRatio < 1 ? "360px" : "100%", // 👈 Optional: limit vertical video width
      }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="w-full h-full bg-gray-300 animate-pulse rounded-xl" />
      )}

      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full ${
          !isLoaded ? "hidden" : "block"
        } object-contain`}
        muted={muted}
        autoPlay
        playsInline
        loop
        preload="metadata"
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        onClick={togglePlay}
        onLoadedData={() => {
          const video = videoRef.current;
          const ratio = video.videoWidth / video.videoHeight;
          setAspectRatio(ratio);
          setIsLoaded(true);
          onLoadedData?.();
        }}
      />

      {isLoaded && (
        <div className="absolute bottom-2 left-2 flex gap-3 z-10">
          <button
            onClick={togglePlay}
            className="bg-black/60 p-1 rounded-full text-white"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={toggleMute}
            className="bg-black/60 p-1 rounded-full text-white"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
