"use client";

import { useState, useRef, useEffect } from "react";
import { updateprofile } from "../../actions/profile/updateprofile";
import { useRouter } from "next/navigation";

export default function ProfileInfo({ profile, userId }) {
  const [editingField, setEditingField] = useState(null);
  const [updatedName, setUpdatedName] = useState(profile?.fullname || "");
  const [updatedBio, setUpdatedBio] = useState(profile?.bio || "");
  const [showReadMore, setShowReadMore] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const editRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();

  const handleSave = async () => {
    await updateprofile(updatedName, updatedBio);
    setEditingField(null);
  };

  // Close editing when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target )) {
        setEditingField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check bio overflow
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkOverflow = () => {
      if (el.scrollHeight > el.clientHeight) {
        setShowReadMore(true);
      } else {
        setShowReadMore(false);
      }
    };

    checkOverflow();
  }, [updatedBio, expanded]);

  return (
    <div className="mt-2 text-white" ref={editRef}>
      {/* Name */}
      {editingField === "name" && userId === profile?._id ? (
        <div className="flex items-center gap-2">
          <input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="text-white bg-transparent border-[1px] p-1 rounded"
          />
          <button
            onClick={handleSave}
            className="text-sm bg-white text-black px-2 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <h1
          className="text-xl font-bold cursor-pointer"
          onDoubleClick={() => setEditingField("name")}
        >
          {userId === profile?._id && updatedName !== profile?.fullname
            ? updatedName
            : profile?.fullname || "Suthar Prakash"}
        </h1>
      )}

      {/* Username */}
      <p className="text-sm text-gray-400">@{profile?.username}</p>

      {/* Bio */}
      {editingField === "bio" && userId === profile?._id ? (
        <div className="flex items-center text-sm gap-2 mt-1">
          <textarea
            style={{ lineHeight: "1.5rem" }}
            value={updatedBio}
            onChange={(e) => setUpdatedBio(e.target.value)}
            className="p-1 w-full text-white bg-transparent border-white border-[1px] rounded"
          />
          <button
            onClick={handleSave}
            className="text-sm bg-white text-black px-2 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <p
          ref={contentRef}
          className={`text-sm mt-1 cursor-pointer ${expanded ? "" : "line-clamp-4"}`}
          style={{ whiteSpace: "pre-line" }}
          onDoubleClick={() => setEditingField("bio")}
        >
          {userId === profile?._id
            ? updatedBio || profile?.bio || "Hey there! I'm new here. Excited to connect and explore."
            : profile?.bio || "Hey there! I'm new here. Excited to connect and explore."}
        </p>
      )}

      {/* Read more toggle */}
      {showReadMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400 text-sm mt-1 hover:underline"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}

      {/* Followers/Following */}
      <div className="flex gap-4 mt-2 text-sm">
        <div
          className="cursor-pointer select-none"
          onClick={() => {
            router.push(`/${profile?.username}/following`);
          }}
        >
          <span className="font-bold text-white">
            {profile?.following?.length || 0}
          </span>{" "}
          Following
        </div>
        <div
          className="cursor-pointer select-none"
          onClick={() => {
            router.push(`/${profile?.username}/followers`);
          }}
        >
          <span className="font-bold text-white">
            {profile?.followers?.length || 0}
          </span>{" "}
          Followers
        </div>
      </div>
    </div>
  );
}
