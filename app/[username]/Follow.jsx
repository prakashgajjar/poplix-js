"use client";
import { useEffect, useState } from "react";
import { checkfollowuser } from "../../actions/profile/checkfollow";
import { followuser } from "../../actions/profile/follow";

export default function Follow({ id }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true); // Optional: loading state for smoother UX

  // Check follow status on mount
  useEffect(() => {
    const check = async () => {
      try {
        const res = await checkfollowuser(id);
        setIsFollowing(res || false);
      } catch (err) {
        console.error("Failed to check follow:", err);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, [id]);

  // Toggle follow/unfollow
  const handleFollow = async () => {
    try {
      setLoading(true);
      const res = await followuser(id);
      setIsFollowing(res); // Your API should return the new state
    } catch (err) {
      console.error("Failed to follow:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
        isFollowing
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-cyan-600 text-white hover:bg-cyan-500"
      } ${loading && "opacity-50 cursor-not-allowed"}`}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}
