"use client";

export const dynamic = 'force-dynamic';

import { Toaster } from 'react-hot-toast';
import {
  FaHome, FaSearch, FaBell, FaUser,
  FaPaperPlane,
} from "react-icons/fa";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';

import SendPost from "./SendPost";
import Post from "../../app/home/Post";
import RePostCard from "./RePost";

import { getPosts } from '../../actions/postActions/getpost';
import { getpostfollowing } from '../../actions/postActions/getpostforfollowing';
import { getuserinfo } from "../../actions/auth/getuserinfo";
import GlassSidebar from '../../components/GlassSidebar';
import Image from 'next/image';;
import LoadingPost from '../../components/Loading';
import LogoLoader from '../../components/LogoLoader';


export default function HomeLayout() {
  const [posts, setPosts] = useState([]);
  const [followingPost, setFollowingPost] = useState([]);
  const [activeTab, setActiveTab] = useState("foryou");
  const [userData, setUSerData] = useState(null);
  const [showLoader, setShowLoader] = useState(false)
  const [page, setPage] = useState(1); // for 20 posts per page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    getPosts(page).then(setPosts).catch(console.error);

    async function fetchUser() {
      const data = await getuserinfo();
      setUSerData(data);

    }

    fetchUser();
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    if (posts.length > 14) {
      const newPosts = await getPosts(page); // API should return next 20
      if (newPosts.length < 15) setHasMore(false); // no more pages
      setPosts(prev => [...prev, ...newPosts]);
    } // merge with old
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [page, fetchPosts]);

  useEffect(() => {
    const currentRef = loaderRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1); // load next page
        }
      },
      {
        root: null,         // viewport
        rootMargin: '0px',
        threshold: 1.0      // when 100% in view
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);


  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">

      <Toaster position="top-right" reverseOrder={false} />
      {showLoader && <LogoLoader />}
      {/* Feed center */}
      <main className="flex-1 max-w-3xl border-x h-screen overflow-scroll pb-12 md:pb-8 lg:mb-0 border-gray-800 mx-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 🚀 Logo Left */}
          <div className="flex items-center gap-2">
            <Image
              src="/logos/poplix2.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
              height={40}
              width={40}
            />

            <h1 className="text-xl font-bold text-white">Home</h1>
          </div>
        </div>

        {/* Sticky Tab Bar */}
        <div className="sticky top-0 z-10 bg-black border-b border-gray-800">


          {/* 🔄 Tabs */}
          <div className="flex justify-between items-center border-t border-gray-700">
            <button
              onClick={() => setActiveTab("foryou")}
              className={`w-1/2 py-2 font-semibold transition ${activeTab === "foryou"
                ? "border-b-4 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              For You
            </button>
            <button
              onClick={async () => {
                setActiveTab("following");
                const data = await getpostfollowing(page);
                setFollowingPost(data);
              }}
              className={`w-1/2 py-2 font-semibold transition ${activeTab === "following"
                ? "border-b-4 border-blue-500 text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              Following
            </button>
          </div>
        </div>



        {/* Posts Feed */}

        {(posts === null || posts === undefined) ? (
          <LoadingPost />
        ) : (
          <div>
            {activeTab === "foryou" ? (
              <div className="p-4 [&>div:last-child]:mb-10">
                <SendPost />
                <hr className='opacity-30 mt-5' />
                <div>
                  {posts.length > 0 ? (
                    posts.map((post) =>
                      post?.isRetweet ? (
                        <div>
                          <RePostCard key={post._id} post={post?.retweetOf} repostUser={post?.user} />
                          <hr className='opacity-30 w-full flex mt-3 mb-3' />
                        </div>
                      ) : (
                        <div>
                          <Post key={post._id} post={post} />
                          <hr className='opacity-30 mt-3 mb-3' />
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-center text-gray-400 mt-10">
                      <LoadingPost />
                      <LoadingPost />
                      <LoadingPost />
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className={`p-4`} >
                {followingPost?.length > 0 ? (
                  followingPost.map((post) =>
                    post?.isRetweet ? (
                      <div>
                        <RePostCard key={post._id} post={post?.retweetOf} repostUser={post?.user} />
                        <hr className='opacity-30 mt-3 mb-3' />

                      </div>
                    ) : (
                      <div>
                        <Post key={post._id} post={post} />
                        <hr className='opacity-30 mt-3 mb-3' />
                      </div>
                    )
                  )
                ) : (
                  <div className="text-center text-gray-400  mt-10">
                    <LoadingPost />
                    <LoadingPost />
                    <LoadingPost />
                  </div>
                )}
              </div>

            )}
            {hasMore && (
              <div ref={loaderRef} className="text-center text-gray-400 py-4">
                {loading ? "Loading more..." : "Scroll to load more"}
              </div>
            )}
          </div>
        )}
        <div>
          <GlassSidebar />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0  w-full bg-black border-t border-gray-800 flex justify-around items-center py-2 md:hidden z-50">


        <FaSearch className="text-2xl cursor-pointer transition-all duration-200 ease-out hover:text-blue-500 active:text-blue-400 active:scale-95" onClick={() => {
          setShowLoader(true)
          router.push("/explore")
        }} />
        <FaPaperPlane className="text-2xl   cursor-pointer transition-all duration-200 active:text-blue-600 active:scale-95" onClick={() => {
          router.push('/message')
        }} />
        <FaHome
          className="text-2xl cursor-pointer transition-all duration-200 ease-out hover:text-blue-500 active:text-blue-400 active:scale-95"
          onClick={() => {
            if (userData) router.push(`/home`);
          }} />
        <FaBell className="text-2xl cursor-pointer transition-all duration-200 ease-out hover:text-blue-500 active:text-blue-400 active:scale-95" onClick={() => {
          router.push(`/notifications`);
        }} />
        <FaUser
          className="text-2xl cursor-pointer transition-all duration-200 ease-out hover:text-blue-500 active:text-blue-400 active:scale-95"
          onClick={() => {

            router.replace(`/${userData?.user?.username}`);

          }}
        />
      </div>
    </div>
  );
}
