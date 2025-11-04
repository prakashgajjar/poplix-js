import React from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react"; // or any icon lib you use

const Card = ({ post }) => {
  return (
    <div className="relative w-full h-full group overflow-hidden">
      {/* Post media */}
      {post?.type === "image" && (
        <Image
          src={post.url}
          alt="Post media"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      )}

      {post?.type === "video" && (
        <video
          src={post.url}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-100"
          playsInline
          muted
          loop
        />
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-semibold text-sm gap-4">
        <div className="flex items-center gap-1">
          <Heart className="w-5 h-5" />
          <span>{post.likes.length || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
