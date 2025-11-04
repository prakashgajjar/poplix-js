"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Smile,
  X as XIcon,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import EmojiPicker from "./EmojiComp";
import Image from "next/image";
import { getuserinfo } from "../../actions/auth/getuserinfo";

const SendPostBigComp = () => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [userData, setUserData] = useState(null);
  const textareaRef = useRef(null);

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    setPreviewUrl(null);
  };

  const handlePost = async () => {
    if (isPosting) return;

    setIsPosting(true);
    const formData = new FormData();
    formData.append("content", content);
    if (media) formData.append("post", media);

    try {
      const response = await axios.post("/api/home/post/sendpost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) toast.success("New post just dropped!");
      else toast.error("Couldn't upload. Try again");
    } catch (error) {
      toast.error("Error posting. Check console.");
      console.error(error);
    }

    setContent("");
    setMedia(null);
    setPreviewUrl(null);
    setIsPosting(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getuserinfo();
      setUserData(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0d0d0d] rounded-2xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-start gap-4">
        {userData && (
          <Image
            src={userData?.user?.avatar || ""}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover border border-gray-700"
          />
        )}

        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening, love? "
            className="w-full bg-transparent text-white text-lg placeholder-gray-500 resize-none outline-none"
            rows={1}
          />

          {previewUrl && (
            <div className="mt-4 relative">
              <button
                onClick={handleRemoveMedia}
                className="absolute top-2 right-2 bg-black/60 p-1 rounded-full hover:bg-black/80 z-10"
              >
                <XIcon className="w-5 h-5 text-white" />
              </button>
              {media?.type.startsWith("video") ? (
                <video
                  src={previewUrl}
                  controls
                  className="w-full max-h-96 rounded-xl object-cover"
                />
              ) : (
                <Image
                  src={previewUrl}
                  alt="Media Preview"
                  width={800}
                  height={400}
                  className="w-full rounded-xl object-cover"
                />
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4 text-blue-400">
              <label className="cursor-pointer">
                <ImageIcon className="w-5 h-5" />
                <input type="file" accept="image/*" onChange={handleMediaChange} className="hidden" />
              </label>
              <label className="cursor-pointer">
                <VideoIcon className="w-5 h-5" />
                <input type="file" accept="video/*" onChange={handleMediaChange} className="hidden" />
              </label>
              <button onClick={() => setShowEmoji(!showEmoji)}>
                <Smile className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handlePost}
              disabled={(!content && !media) || isPosting}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${
                (content || media) && !isPosting
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </div>

          {showEmoji && <div className="mt-2"><EmojiPicker setContent={setContent} /></div>}
        </div>
      </div>
    </div>
  );
};

export default SendPostBigComp;
