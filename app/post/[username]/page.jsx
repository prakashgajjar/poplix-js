"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { userpostdata } from "../../../actions/userposts/getuserpost";
import RePostCard from "../../home/RePost";
import PostCard from "../../home/Post";
import DeleteConfirm from "./DeleteConform";
import LoadingPost from "../../../components/Loading";
import { checkuservalid } from "../../../actions/auth/checkuservalid";
import SwipeToGoBack from "../../../components/SwipeToGoBack";
import GlassSidebar from "../../../components/GlassSidebar";


const UserPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState("");
  const [showDeletePost, setShowDeletePost] = useState(false);
  const [auth, setAuth] = useState(false);

  const params = useParams();
  const username = params?.username;
  const router = useRouter();

  // Fetch posts by username
  const fetchUserPosts = useCallback(async () => {
    if (!username) return;
    try {
      const res = await userpostdata(username );
      setPosts(res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  // Fetch logged-in user ID
  const checkAuth = useCallback(async () => {
    try {
      const res = await checkuservalid(username );
      // console.log(res);
      setAuth(res);

    } catch (e) {
      console.log(e)
      setAuth(false);
    }
  }, [username]);

  useEffect(() => {
    checkAuth();
    fetchUserPosts();
  }, [checkAuth, fetchUserPosts]);

  const handleBack = () => router.push(`/${username}`);


  const handleLongPress = (post) => {
    setPostId(post?._id);
    if (auth) {
      setShowDeletePost(true);
    }
  };

  return (
    <SwipeToGoBack to={`/${username}`}>
      <div className="h-screen overflow-auto p-2 md:p-6">
        <GlassSidebar />
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">
            {posts[0]?.user?.fullname || posts[0]?.user?.username || username}’s posts
          </h1>
        </div>

        {/* Delete Confirmation */}
        {showDeletePost && (
          <DeleteConfirm
            postId={postId}
            onCancel={() => setShowDeletePost(false)}
            onDelete={() => setShowDeletePost(false)}
          />
        )}

        {/* Posts */}
        {loading ? (
          <div className="text-center text-gray-400 mt-10 space-y-4">
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
          </div>
        ) : posts.length > 0 ? (
          <div className="flex pl-2 flex-col gap-4 mb-12">
            {posts.map((post) => (
              <div
                key={post._id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleLongPress(post);
                }}
              >
                {post.isRetweet ? (
                  <RePostCard post={post.retweetOf} repostUser={post.user} />
                ) : (
                  <PostCard post={post} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">No posts found.</div>
        )}
      </div>
    </SwipeToGoBack>
  );
};

export default UserPostPage;
