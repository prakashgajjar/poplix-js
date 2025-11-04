'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getPosts } from '../../actions/postActions/getpost';
import GlassSidebar from '../../components/GlassSidebar';
import MediaCard from '../../components/Media';
import { finduser } from '../../actions/explore/finduser';
import SwipeToGoBack from '../../components/SwipeToGoBack';
import PostShow from '../../components/PostShow';


const ExplorePage= () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState('posts');
  const [showPost, setShowPost] = useState(false);
  const [postData, setPostData] = useState(null);
  const router = useRouter();
  const holdTimeout = useRef(null);
  const containerRef = useRef(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleFindUser = async () => {
    const userResult = await finduser(searchTerm);
    setUsers(userResult || []);
  };

  const fetchData = useCallback(async (pageNo = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);

    const fetchedPosts = await getPosts(pageNo);
    if (fetchedPosts.length > 0) {
      setPosts((prev) => [...prev, ...fetchedPosts]);
      setFilteredPosts((prev) => [...prev, ...fetchedPosts]);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, [hasMore]);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading || !hasMore) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 300) {
        setPage((prev) => prev + 1);
      }
    };

    const currentRef = containerRef.current;
    currentRef?.addEventListener('scroll', handleScroll);

    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase().trim();

    if (tab === 'posts') {
      if (lowerSearch === '') {
        setFilteredPosts(posts);
      } else {
        setFilteredPosts(
          posts.filter((post) =>
            post?.user?.username?.toLowerCase().includes(lowerSearch)
          )
        );
      }
    }
  }, [searchTerm, tab, posts]);


  return (
    <SwipeToGoBack to="/home">
      <div className="h-screen flex flex-col overflow-hidden bg-black text-white">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-black/30 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <button
              className="text-white hover:text-gray-300"
              onClick={() => router.replace('/home')}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Explore</h1>
            <div className="w-5 h-5" />
          </div>

          {/* Search */}
          <div className="px-4 pb-2">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Search className="text-white w-4 h-4 mr-2" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${tab}...`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleFindUser();
                }}
                className="w-full bg-transparent text-white outline-none text-sm"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-around border-b border-white/10">
            {(['posts', 'users']).map((item) => (
              <button
                key={item}
                className={`flex-1 py-2 text-sm font-medium ${tab === item
                  ? 'border-b-2 border-white text-white'
                  : 'text-white/50'
                  }`}
                onClick={() => setTab(item)}
              >
                {item === 'posts' ? 'Posts' : 'Users'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div ref={containerRef} className="flex-1 overflow-y-auto p-[2px]">
          {tab === 'posts' ? (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-[2px]">
              {filteredPosts.map((post) => {
                const handleClick = () => {
                  setPostData(post);
                  setShowPost(true);
                };

                const handlePressStart = () => {
                  holdTimeout.current = setTimeout(() => {
                    setPostData(post);
                    setShowPost(true);
                  }, 300);
                };

                const handlePressEnd = () => {
                  if (holdTimeout.current) {
                    clearTimeout(holdTimeout.current);
                    holdTimeout.current = null;
                  }
                  setShowPost(false);
                };

                return (
                  <div
                    key={post._id}
                    onTouchStart={handlePressStart}
                    onTouchEnd={handlePressEnd}
                    onTouchCancel={handlePressEnd}
                    onClick={handleClick}
                    onContextMenu={(e) => e.preventDefault()}
                    className="last:mb-20"
                  >
                    <MediaCard post={post} />
                  </div>
                );
              })}

              {showPost && postData && (
                <PostShow post={postData} onClose={() => setShowPost(false)} />
              )}
            </div>
          ) : (
            <div className="space-y-3 px-4 py-3">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition"
                  onClick={() => router.replace(`/${user.username}`)}
                >
                  <Image
                    src={user.avatar || ''}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex gap-1 items-center">
                      <p className="text-sm font-semibold">{user.username}</p>
                      {user.isVerified && (
                        <Image
                          src="data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20aria-label%3D%22Verified%20account%22%20role%3D%22img%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20stroke%3D%22%231DA1F2%22%20stroke-width%3D%222%22%20fill%3D%22%231DA1F2%22%3E%3C%2Fcircle%3E%0A%20%20%3Cpath%20d%3D%22M9%2012.5l2%202%204-4%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E%0A"
                          alt="Verified"
                          width={16}
                          height={16}
                          className="w-4 h-4 mt-[3px] object-contain"
                        />
                      )}
                    </div>
                    <p className="text-xs text-white/50">{user.fullname || ''}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(tab === 'posts' && filteredPosts.length === 0) ||
            (tab === 'users' && users.length === 0) ? (
            <div className="text-center text-white/40 mt-10 text-sm">
              No {tab} found.
            </div>
          ) : null}
        </div>

        <GlassSidebar />
      </div>
    </SwipeToGoBack>
  );
};

export default ExplorePage;
