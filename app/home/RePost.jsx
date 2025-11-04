"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { MessageCircle, Heart, Repeat, BarChart3 } from "lucide-react";
import { likepost } from "../../actions/postActions/postlike";
import { getlikes } from "../../actions/postActions/getlikes";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import CustomVideoPlayer from "../../components/CustomVideoPlayer";

const RePostCard = ({ post, repostUser }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);
  const [likedPost, setLikedPost] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  // const [videoLoaded, setVideoLoaded] = useState(false);


  useEffect(() => {
    if (likedPost?.includes(post._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedPost, post._id]);

  const handleLike = async () => {
    const res = await likepost(post._id);
    if (res?.liked) {
      setLikedPost(prev => [...prev, post._id]);
    } else {
      setLikedPost(prev => prev.filter(id => id !== post._id));
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const data = await getlikes();
      setLikedPost(data);
    };
    fetchLikes();
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (el && el.scrollHeight > el.clientHeight) {
      setShowReadMore(true);
    }
  }, [post]);

  return (
    <div className="max-w-2xl mx-auto bg-black text-white px-4 py-3 rounded-xl shadow-md ">

      {/* Repost Header with avatar */}
      <div className="flex items-start -left-[25px]  md:-left-[29px] relative space-x-3 mb-2 cursor-pointer " onClick={() => {
        router.replace(`/${repostUser?.username}`);
      }}>
        <Image
          src={`${repostUser?.avatar}`}
          alt="User"
          width={40}
          height={40}
          className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <span className="font-semibold text-white">{repostUser?.username}</span>
            <Repeat size={14} />
            <span>reposted</span>
          </div>
        </div>
      </div>

      {/* Original Post Card */}
      <div className="ml-4 border border-gray-700 rounded-xl px-2 py-3 bg-[#111]">
        {/* Original Post Header */}
        <div className="flex items-start space-x-3">
          <Image
            src={post?.user?.avatar}
            alt="User"
            width={40}
            height={40}
            className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1 font-bold cursor-pointer" onClick={() => router.replace(`/${post?.user?.username}`)}>
              <span>{post?.user?.username}</span>
              {/* Verified Badge */}
              <Image
                src="data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20aria-label%3D%22Verified%20account%22%20role%3D%22img%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20stroke%3D%22%231DA1F2%22%20stroke-width%3D%222%22%20fill%3D%22%231DA1F2%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M9%2012.5l2%202%204-4%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E"
                alt="Verified"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <span className="text-gray-400 font-normal">
                · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-2 ml-12 text-md">
          <div
            ref={contentRef}
            className={`whitespace-pre-wrap break-words overflow-hidden ${expanded ? "" : "line-clamp-4"}`}
          >
            {post?.content}
          </div>
          {showReadMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-400 text-sm mt-1 hover:underline"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        {/* Media */}
        {post?.type === "image" && post?.url && (
          <div className="mt-3 ml-12 mr-2 rounded-xl overflow-hidden">
            <Image
              src={post.url}
              alt="Post media"
              width={900}
              height={300}
              className="w-full rounded-xl object-cover"
            />
          </div>
        )}

        {post?.type === "video" && post?.url && (
          <div className="mt-3 grid grid-cols-1 gap-2 rounded-xl overflow-hidden">
            <div className="relative w-full  rounded-xl overflow-hidden">
              <CustomVideoPlayer
                src={post?.url}
                onLoadedData={() => true}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between px-6 text-gray-400 mt-4 text-sm">
          <div className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer">
            <MessageCircle size={16} /> <span>{post?.comments?.length}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-green-400 cursor-pointer">
            <Repeat size={16} /> <span>{post?.countRepost?.length || 0}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-pink-400 cursor-pointer" onClick={handleLike}>
            <Heart size={16} className={`${isLiked ? "fill-pink-500" : ""}`} /> <span>{post?.likes?.length}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-white cursor-pointer">
            <BarChart3 size={16} /> <span>{post?.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RePostCard;
