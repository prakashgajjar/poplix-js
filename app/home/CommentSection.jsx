"use client";

import { useState, useRef } from "react";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { sendcomment } from "../../actions/postActions/sendcomments";
import { formatDistanceToNow } from "date-fns";
import DeleteCommentModal from "../../components/DeleteCommentModal";
import { deletecomments } from "../../actions/postActions/deletecomment";

export default function CommentSection({ comments, postId, user }) {
  const [commentText, setCommentText] = useState("");
  const [showCommentDelete, setShowCommentDelete] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);


  const commentBoxRef = useRef(null);
  const timeRef = useRef(null);

  const handleTouchStart = (comment) => {
    if (comment?.user?._id === user?.user?._id) {
      {
        timeRef.current = setTimeout(() => {
          setCommentToDelete(comment); // store comment here
          setShowCommentDelete(true);
        }, 600);
      }
    }
  };

  const handleTouchEnd = (comment) => {
    // if (comment?.user?._id === user?.user?._id)
    clearTimeout(timeRef.current);
    console.log(comment)
  };

  const handleSend = () => {
    if (!commentText.trim()) return;
    sendcomment(postId, commentText);
    setCommentText("");
    // Optionally scroll to bottom
    setTimeout(() => {
      commentBoxRef.current?.scrollTo({ top: commentBoxRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };


  const handleDeleteComment = async (id) => {
    await deletecomments(id)
  }

  return (
    <div className="w-full max-w-2xl h-[450px] bg-[#0d0d11] border border-[#2a2a2a] rounded-2xl shadow-xl mx-auto flex flex-col overflow-hidden">

      {/* 📝 Input */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#333] bg-[#121218]">
        <Image
          src={user?.user?.avatar || "https://res.cloudinary.com/dsndcjfwh/image/upload/v1749358852/user_irazfm.png"}
          alt="User"
          width={36}
          height={36}
          className="rounded-full object-cover "
        />

        <div className="relative flex-1">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your thoughts..."
            rows={1}
            className="w-full resize-none bg-[#181820] text-white placeholder-gray-500 text-sm rounded-lg px-4 py-2 pr-10 border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          <button
            onClick={handleSend}
            className="absolute top-1/2 -translate-y-1/2 right-2 p-1 text-cyan-400 hover:text-cyan-300 transition"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>


      <div>
        {
          <DeleteCommentModal
            show={showCommentDelete && commentToDelete?.user?._id === user?.user?._id}
            onDelete={() => {
              handleDeleteComment(commentToDelete._id);
              setShowCommentDelete(false);
              setCommentToDelete(null);
            }}
            onCancel={() => {
              setShowCommentDelete(false);
              setCommentToDelete(null);
            }}
          />

        }
      </div>

      {/* 💬 Comments */}
      <div ref={commentBoxRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {comments?.map((comment, idx) => (

          <div key={idx} className="flex items-start gap-3">

            <Image
              src={comment?.user?.avatar}
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full h-8 w-8 object-cover border border-[#444] flex-shrink-0"
            />
            <div className="flex-1 bg-[#181820] px-4 py-3 rounded-xl border border-[#2a2a2a]"
              onTouchStart={() => handleTouchStart(comment)}
              onMouseDown={() => handleTouchStart(comment)}
              onTouchEnd={() => handleTouchEnd(comment)}
              onMouseUp={() => handleTouchEnd(comment)}
              onMouseLeave={() => handleTouchEnd(comment)}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-white font-medium">@{comment?.user?.username}</p>
                <span
                  className="text-xs text-gray-500"
                  title={new Date(comment.createdAt).toLocaleString()}
                >
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>

              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {comment?.content}
              </p>
            </div>
          </div>
        ))}
        {comments?.length === 0 && (
          <p className="text-sm text-center text-gray-500 mt-10">No comments yet. Be the first 💬</p>
        )}
      </div>
    </div>
  );
}
