"use client";
import React, { useRef, useState } from "react";
import { Heart, MessageCircle, VolumeX, Volume2, Check } from "lucide-react";
import Image from "next/image";

const MediaCard = ({ post }) => {
  // console.log(post)
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  return (
  post && <div
      className="relative aspect-square group overflow-hidden "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Post */}
      {post.type === "image" && (
        <>
        { post.url && 
          <Image
            src={post?.url || null}
            alt="post"
            fill
            className="object-cover group-hover:scale-100 transition-transform duration-300"
            onContextMenu={(e) => e.preventDefault()}
          />
        }

          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-2 text-white transition-opacity duration-300">
              <div className="flex items-center gap-1 text-xs">
                <span>@{post.user.username}</span>
                {post.isVerified && <Check className="w-3 h-3 text-blue-400" />}
              </div>
              <div className="flex justify-center items-center gap-6 m-auto">
                <div className="flex items-center gap-1">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments.length}</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Video Post */}
      {post.type === "video" && (
        <>
       { post.url &&  <video
            ref={videoRef}
            src={post?.url}
            className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-300"
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onMouseOver={(e) => e.currentTarget.play()}
            onMouseOut={(e) => e.currentTarget.pause()}
          />
       }
          {isHovered && (
            <div
              className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white cursor-pointer z-10"
              onClick={toggleMute}
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MediaCard;
