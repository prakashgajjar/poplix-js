
"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Smile,
  X as XIcon,

} from "lucide-react";
import EmojiPicker from "./EmojiComp";
import Image from "next/image";
import { getuserinfo } from "../../actions/auth/getuserinfo";
import { sendpost } from "../../actions/postActions/sendpost";

const SendPost = () => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [userData, setUSerData] = useState(null);
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
    formData.append('content', content);
    if (media) {
      formData.append('post', media);
    }
    
    await sendpost(formData);

    setContent("");
    setMedia(null);
    setPreviewUrl(null);
    setIsPosting(false);
  };

  useEffect(() => {
    async function run() {
      const data = await getuserinfo();
      setUSerData(data)
    }
    run();
  }, [])

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [content]);

  return (
    <div className="bg-black p-4 rounded-xl border border-gray-800 text-white w-full  mx-auto">
      <div className="flex items-start gap-3">
        {
          userData && <Image
            src={`${userData?.user?.avatar || ""}`}
            alt="Profile"
            height={40}
            width={40}
            className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
          />
        }
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What’s happening?"
            className="w-full bg-transparent text-white placeholder-gray-500 text-lg outline-none resize-none overflow-hidden"
            rows={1}
          />

          {/* Unified Media Preview */}
          {previewUrl && (
            <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-700">
              <button
                onClick={handleRemoveMedia}
                className="absolute top-2 right-2 bg-black/60 p-1 rounded-full hover:bg-black/80 transition z-10"
              >
                <XIcon className="w-4 h-4 text-white" />
              </button>
              <div className="w-full">
                {media?.type.startsWith("video/") ? (
                  <video
                    src={previewUrl}
                    controls
                    className="max-h-64 w-full object-cover rounded-xl"
                  />
                ) : (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    className="w-full object-cover rounded-xl"
                    width={800}
                    height={400}
                  />
                )}
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4 items-center text-blue-400 text-sm">
              <label className="cursor-pointer">
                <ImageIcon className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </label>
              <label className="cursor-pointer">
                <VideoIcon className="w-5 h-5" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </label>
              <div onClick={() => setShowEmoji(!showEmoji)}>
                <Smile className="w-5 h-5" />
              </div>

            </div>

            <button
              onClick={handlePost}
              disabled={(!content && !media) || isPosting}
              className={`px-4 py-1 rounded-full font-semibold transition ${(content || media) && !isPosting
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
          <div>
            {
              showEmoji && <div className='mt-2'>
                <EmojiPicker setContent={setContent} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPost;
