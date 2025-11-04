'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Heart, MessageCircle, Send } from 'lucide-react';
import PostComment from './PostComment';


export default function MediaModal({ post, onClose }) {

    const modalRef = useRef(null);
    // console.log("post comments : " , post?.comments)

    // Escape key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Outside click to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target )) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
      <div className="fixed w-screen h-[800px] sm:h-screen inset-0 z-50 bg-transparent flex items-center justify-center p-2 md:p-4 animate-fadeIn">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full p-1 z-50"
                aria-label="Close"
            >
                <X size={24} />
            </button>

            {/* Modal Container */}
            <div
                ref={modalRef}
                className="bg-black/40 backdrop-blur-xs  rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] flex  md:flex-row overflow-hidden"
            >
                {/* Media Section */}
                <div className="flex-1 w-[530px] h-[670px] md:h-[943px] flex items-center justify-center bg-[#111] ">
                    {post.type === 'image' ? (
                        <Image
                            src={post.url}
                            alt="Post Media"
                            width={600}
                            height={800}
                            className="max-h-[90vh] w-auto h-auto object-contain"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    ) : (
                        <video
                            src={post.url}
                            className="max-h-[90vh] w-auto h-auto object-contain"
                            playsInline
                            muted={false}
                            loop
                            autoPlay
                            
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    )}
                </div>

                {/* Desktop Comment Sidebar */}
                <div className="md:w-[500px] lg:block hidden bg-[#111] p-4 border-l-[1px] border-white/20 rounded-r-xl">
                    <div className="mb-4 border-b border-gray-700 pb-2">
                        <h1 className="text-lg font-semibold text-white">Comments</h1>
                    </div>

                    {post?.comments?.length > 0 ? (
                        post?.comments.map((comment, index) => (
                            <div key={comment._id || index} className="mb-3">
                                <PostComment comment={comment} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-sm text-gray-400 py-10">
                            No comments yet. Be the first to share your thoughts 💬
                        </div>
                    )}
                </div>

            </div>

            {/* Mobile Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black/90 border-t border-white/10 px-6 py-3 flex justify-around text-white">
                <Heart size={24} className="cursor-pointer" />
                <MessageCircle size={24} className="cursor-pointer" />
                <Send size={24} className="cursor-pointer" />
            </div>
        </div>
    );
}
