"use client";

import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import GlassSidebar from "../../components/GlassSidebar";
import MediaCard from "../../components/Media";
import { getbookmarks } from "../../actions/bookmarks/getbookmarks";
import Image from "next/image";

const BookmarkPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState("media");
  const [savedPosts, setSavedPosts] = useState([]);

  const getBookmarks = async () => {
    const data = await getbookmarks();
    setSavedPosts(data);
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  const mediaPosts = savedPosts.filter(
    (post) => post?.type === "image" || post?.type === "video"
  );
  const textPosts = savedPosts.filter((post) => post?.type === "text");

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button
            className="text-white hover:text-gray-300"
            onClick={() => router.replace("/home")}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Bookmarks</h1>
          <div className="w-5 h-5" />
        </div>

        {/* Tabs */}
        <div className="flex justify-around border-t border-white/10">
          <button
            onClick={() => setTab("media")}
            className={`flex-1 py-2 font-medium text-sm ${
              tab === "media"
                ? "border-b-2 border-white text-white"
                : "text-white/50"
            }`}
          >
            Images & Videos
          </button>
          <button
            onClick={() => setTab("text")}
            className={`flex-1 py-2 font-medium text-sm ${
              tab === "text"
                ? "border-b-2 border-white text-white"
                : "text-white/50"
            }`}
          >
            Text Posts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-[2px]">
        {tab === "media" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px]">
            {mediaPosts.map((post) => (
              <MediaCard key={post._id} post={post} />
            ))}
            {mediaPosts.length === 0 && (
              <p className="text-center text-white/40 mt-10 text-sm">
                No images or videos saved.
              </p>
            )}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {textPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-2 mb-2 text-sm text-white/70">
                  <span>../..{post.user.username}</span>
                  {post.user.isVerified && (
                    <Image
                      src="data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20aria-label%3D%22Verified%20account%22%20role%3D%22img%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20stroke%3D%22%231DA1F2%22%20stroke-width%3D%222%22%20fill%3D%22%231DA1F2%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M9%2012.5l2%202%204-4%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E%0A"
                      alt="Verified"
                      width={16}
                      height={16}
                      className="w-4 -ml-1 h-4 object-contain"
                    />
                  )}
                </div>
                <p className="text-sm">{post.content}</p>
                <div className="flex gap-4 mt-3 text-xs text-white/50">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments.length}
                  </div>
                </div>
              </div>
            ))}
            {textPosts.length === 0 && (
              <p className="text-center text-white/40 mt-10 text-sm">
                No text posts saved.
              </p>
            )}
          </div>
        )}
      </div>

      <GlassSidebar />
    </div>
  );
};

export default BookmarkPage;
