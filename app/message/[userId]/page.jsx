"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { io } from "socket.io-client";
import { ArrowLeft, Mic, Paperclip, Send, Smile, Image as ImageIcon, Video, FileText } from "lucide-react";

import SwipeToGoBack from "../../../components/SwipeToGoBack";
import GlassSidebar from "../../../components/GlassSidebar";
import CustomVideoPlayer from "../../../components/CustomVideoPlayer";
import EmojiPicker from "../../home/EmojiComp";
import getLoginUserId from "../../../actions/me/getLoginUserId";
import { getuserchat } from "../../../actions/messages/getuserchat";
import { sendmessage } from "../../../actions/messages/sendmessage";

let socket; // singleton socket

const Page = () => {
  const { userId } = useParams();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [senderId, setSenderId] = useState(null);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showUploadTypeSelector, setShowUploadTypeSelector] = useState(false);

  const messagesEndRef = useRef(null);

  const uploadTypes = [
    { type: "image", label: "Image", icon: ImageIcon, accept: "image/*" },
    { type: "video", label: "Video", icon: Video, accept: "video/*" },
    { type: "file", label: "PDF", icon: FileText, accept: "application/pdf" },
  ];

  // ===== Helpers =====
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const groupMessagesByDate = (msgs) => {
    return msgs.reduce((acc, msg) => {
      const dateKey = formatDate(msg.createdAt || msg.time);
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(msg);
      return acc;
    }, {});
  };

  // ===== Fetch messages =====
  const handleGetChat = async () => {
    const data = await getuserchat(userId);
    setMessages(data.messages || []);
    setUser(data.user || {});
    scrollToBottom();
  };

  // ===== Media upload =====
  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMedia(file);
    setPreviewUrl(URL.createObjectURL(file));
    setShowUploadTypeSelector(false);
  };

  // ===== Socket init =====
  // ===== Socket init =====
useEffect(() => {
  let currentRoom = null; // track current room
  const init = async () => {
    const id = await getLoginUserId();
    setSenderId(id);

    await handleGetChat();

    if (!socket) {
      socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
      console.log(socket) // your backend URL
    }

    // Leave previous room if exists
    if (currentRoom) {
      socket.emit("leaveRoom", currentRoom);
    }

    currentRoom = `${id}-${userId}`;
    socket.emit("joinRoom", { senderId: id, receiverId: userId });

    // Clean old listeners to prevent duplicates
    socket.off("receiveMessage");

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      // Only add message if it belongs to current chat
      if (msg.senderId === userId || msg.receiverId === userId) {
        setMessages((prev) => {
          if (prev.some((m) => m.time === msg.time)) return prev;
          return [...prev, msg];
        });
        scrollToBottom();
      }
    });
  };

  init();

  return () => {
    if (currentRoom) socket.emit("leaveRoom", currentRoom);
    // Do NOT disconnect socket here if you want it to persist across users
  };
}, [userId]);


  // ===== Send message =====
  const handleInputSend = async () => {
    if ((!message || !message.trim()) && !media) return;

    const msgData = {
      senderId,
      receiverId: userId,
      content: message,
      media: media || null,
      type: media ? media.type.split("/")[0] : "text",
      time: new Date().toISOString(),
    };

    // emit message
    socket.emit("sendMessage", msgData);

    // add to local state
    setMessages((prev) => [...prev, msgData]);
    setMessage("");
    setMedia(null);
    setPreviewUrl(null);
    scrollToBottom();

    // send to backend
    const formData = new FormData();
    formData.append("message", msgData.content);
    formData.append("receiverId", msgData.receiverId);
    if (media) formData.append("media", media);
    await sendmessage(formData);
  };

  // ===== Render =====
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <SwipeToGoBack to="/message">
      <div className="flex flex-col h-screen bg-zinc-950">
        <GlassSidebar />

        {/* Header */}
        {user && (
          <div className="p-3 flex items-center gap-3 border-b border-gray-800">
            <button className="text-white md:hidden" onClick={() => router.replace("/message")}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Image
              src={user?.avatar || "/logos/user.png"}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-1">
              <h2 className="font-medium text-white text-sm">{user?.fullname || "User"}</h2>
              <p className="text-xs">{user?.username || "User"}</p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 text-sm scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              <div className="text-center text-gray-400 text-xs mb-2">{date}</div>
              {groupedMessages[date].map((msg, i) => {
                const isMe = ((msg.sender === senderId) || (msg.senderId === senderId));

                return (
                  <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[70%]">
                      {msg.type === "text" && (
                        <div
                          className={`px-4 py-2 text-sm rounded-lg mb-1 ${
                            isMe
                              ? "bg-[#005c4b] text-white rounded-br-none"
                              : "bg-[#202c33] text-white rounded-bl-none"
                          }`}
                        >
                          {msg.content}
                        </div>
                      )}

                      {msg.type === "image" && msg.media && (
                        <div className="mb-1">
                          <div className="rounded-lg overflow-hidden border border-gray-700">
                            <Image
                              src={URL.createObjectURL(msg.media)}
                              alt="uploaded image"
                              width={250}
                              height={250}
                              className="object-cover rounded-lg"
                            />
                          </div>
                          {msg.content && <p className="text-sm mt-1 px-1 text-white">{msg.content}</p>}
                        </div>
                      )}

                      {msg.type === "video" && msg.media && (
                        <div>
                          <CustomVideoPlayer src={URL.createObjectURL(msg.media)} />
                          {msg.content && <p>{msg.content}</p>}
                        </div>
                      )}

                      <div className="text-[10px] text-gray-500 mt-1 ml-1">
                        {formatTime(msg.createdAt || msg.time)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center px-4 py-3 border-t border-gray-800 gap-3 bg-[#1e1e1e]">
          <div className="relative">
            <button onClick={() => setShowEmoji(!showEmoji)}>
              <Smile size={20} className="text-white" />
            </button>
            {showEmoji && <div className="absolute bottom-12 left-0 z-50"><EmojiPicker setContent={setMessage} /></div>}
          </div>

          <button onClick={() => setShowUploadTypeSelector(!showUploadTypeSelector)}>
            <Paperclip size={20} className="text-white" />
          </button>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInputSend()}
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 bg-zinc-900 border border-gray-700 text-white rounded-full outline-none text-sm"
          />

          <button>
            <Mic size={20} className="text-white" />
          </button>
          <button onClick={handleInputSend}>
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </SwipeToGoBack>
  );
};

export default Page;
