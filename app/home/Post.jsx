"use client";

import { MessageCircle, Heart, Repeat, Bookmark, BarChart3 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { likepost } from "../../actions/postActions/postlike";
import { getlikes } from "../../actions/postActions/getlikes";
import { useRouter } from 'next/navigation';
import { repost } from "../../actions/postActions/repost";
import { formatDistanceToNow } from 'date-fns';
import RepostConfirmModal from "./RepostConform";
import { toast } from "react-hot-toast";
import CommentSection from "./CommentSection";
import { getcomments } from "../../actions/postActions/getcomments";
import { getuserinfo } from "../../actions/auth/getuserinfo";
import { addview } from "../../actions/postActions/addviews";
import { savepost } from "../../actions/postActions/savepost";
import CustomVideoPlayer from "../../components/CustomVideoPlayer";


const PostCard = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [showRepostModal, setShowRepostModal] = useState(false);
    const [commentLoad, setCommentLoad] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const [savedPost, setSavedPost] = useState(false);

    const [user, setUser] = useState(null);
    const contentRef = useRef(null);
    const postRef = useRef(null);
    const hasViewed = useRef(false);
    const router = useRouter()

    const [likedPost, setLikedPost] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    // const [videoLoaded, setVideoLoaded] = useState(false);
    const secureUrl = post?.url?.replace(/^http:\/\//i, 'https://');
    const safeAvatar = post?.user?.avatar?.replace(/^http:\/\//i, 'https://');
    const safeContent = post?.content?.replace(/http:\/\//g, 'https://');



    const handleLike = async () => {
        const res = await likepost(post._id);

        if (res?.liked) {
            setLikedPost((prev) => [...prev, post._id]);
        } else {
            setLikedPost((prev) => prev.filter((id) => id !== post._id));
        }
    };

    const handleGetlike = async () => {
        const data = await getlikes();
        setLikedPost(data);
    };
    const handleRepost = async () => {
        try {
            const res = await repost(post._id);
            if (res?.status == 200) {
                toast.success("Reposted done");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err)
        }
    };

    const handleSavedPost = async () => {
        await savepost(post._id);
        // console.log(data)
        setSavedPost(true);
    }


    //ckecklike include or not 
    useEffect(() => {
        if (likedPost && likedPost.includes(post._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [likedPost, post._id]);

    //like get handler useEffect
    useEffect(() => {
        async function getData() {
            try {
                const data = await getuserinfo();
                await handleGetlike();
                setUser(data);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, []);

    //show more and less for text 
    useEffect(() => {
        const el = contentRef.current;
        if (el && el.scrollHeight > el.clientHeight) {
            setShowReadMore(true);
        }
    }, [post]);


    //add view useEffect 
    useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            const entry = entries[0];

            if (entry.isIntersecting && !hasViewed.current) {
                hasViewed.current = true;
                await addview(post._id);
            }
        }, { threshold: 0.6 });

        if (postRef.current) {
            observer.observe(postRef.current);
        }

        return () => {
            if (postRef.current) {
                observer.unobserve(postRef.current);
            }
        };
    }, [post._id]);

    return (
        post && <div ref={postRef}>
            <div className="max-w-2xl mx-auto bg-black text-white p-4 rounded-xl shadow-md">
                {/* Header */}
                <div className="flex relative -left-[25px]  items-center md:-left-[29px] space-x-2">
                    <Image
                        src={safeAvatar}
                        alt="User"
                        width={40}
                        height={40}
                        className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-bold flex items-center space-x-1 cursor-pointer" onClick={() => {
                            router.replace(`/${post?.user?.username}`);
                        }}>
                            <span>{post?.user?.username}</span>
                            <Image
                                src="/icons/verify.png"
                                alt="Verified"
                                width={17}
                                height={17}
                                className="w-4 h-4 mt-[1px] object-contain"
                            />
                            <span className="text-gray-400 text-sm">
                                · {formatDistanceToNow(new Date(post?.createdAt))}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mt-2 max-w-2xl relative left-[16px] space-y-2 text-md">
                    <div
                        ref={contentRef}
                        className={`text-white whitespace-pre-wrap break-words overflow-hidden ${expanded ? "" : "line-clamp-4"}`}
                    >
                        {safeContent}
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
                <RepostConfirmModal
                    isOpen={showRepostModal}
                    onClose={() => setShowRepostModal(false)}
                    onConfirm={handleRepost}
                />

                {/* Media */}
                {post?.type === "image" && (
                    <div className="mt-3 grid relative left-[16px] grid-cols-2 gap-2 rounded-xl overflow-hidden">
                        <Image
                            src={secureUrl}
                            alt="Post media"
                            width={900}
                            height={300}
                            className="col-span-2 rounded-xl object-cover"
                        />
                    </div>
                )}

                {post?.type === "video" && (
                    <div className="mt-3 grid relative left-[16px] grid-cols-2 gap-2 rounded-xl overflow-hidden">
                        <div className="col-span-2 rounded-xl relative">
                            <CustomVideoPlayer
                                src={secureUrl}
                                onLoadedData={() => true}
                            />
                        </div>
                    </div>
                )}


                {/* Action Buttons */}
                <div className="flex justify-between px-3 text-gray-400 mt-4 ml-4 text-sm">
                    <div className="flex items-center  hover:text-blue-400 cursor-pointer" onClick={async () => {
                        if (!commentLoad) {
                            // console.log(post._id)
                            const data = await getcomments(post._id);
                            setCommentData(data)
                            // console.log(data);

                        }
                        setCommentLoad(!commentLoad);
                    }}>
                        <MessageCircle size={16} /> <span>{post?.comments?.length}</span>
                    </div>

                    <div className="flex items-center space-x-1 hover:text-green-400 cursor-pointer" onClick={() => setShowRepostModal(true)}>
                        <Repeat size={16} /> <span>{post?.countRepost || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-pink-400 cursor-pointer" onClick={handleLike}>
                        <Heart size={16} className={`${isLiked ? "fill-pink-500" : ""}`} /> <span>{post?.likes.length}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-white cursor-pointer">
                        <BarChart3 size={16} /> <span>{post?.views}</span>
                    </div>
                    {<div className="flex items-center space-x-1 hover:text-white cursor-pointer" onClick={() => {
                        handleSavedPost()
                    }}>
                        <Bookmark size={16} className={`${(savedPost) ? "fill-blue-600" : ""}`} /> <span>{post?.saved?.length || 0}</span>
                    </div>}
                </div>

            </div>
            <div className="mt-2 relative left-2">
                {
                    commentLoad && <CommentSection
                        comments={commentData}
                        postId={post?._id}
                        user={user}
                    />
                }
            </div>
        </div>
    );
};

export default PostCard;
