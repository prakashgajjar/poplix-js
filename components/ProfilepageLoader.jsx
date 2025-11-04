import React from "react";
const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto bg-black text-white overflow-auto h-screen animate-pulse">

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-2 flex items-center gap-4">
        <div className="w-5 h-5 bg-gray-700 rounded" />
        <div>
          <div className="h-4 w-32 bg-gray-700 rounded mb-1" />
          <div className="h-3 w-20 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Banner */}
      <div className="w-full md:h-60 h-36 bg-gray-800" />

      {/* Profile Section */}
      <div className="px-4 mt-[-40px]">
        <div className="flex justify-between items-end">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-4 border-black bg-gray-700" />

          {/* Follow Button Placeholder */}
          <div className="w-20 h-8 rounded bg-gray-700" />
        </div>

        {/* Name, Username, Bio, Follows */}
        <div className="mt-4 space-y-2">
          <div className="h-5 w-40 bg-gray-700 rounded" />
          <div className="h-3 w-24 bg-gray-600 rounded" />
          <div className="h-3 w-full bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-700 rounded" />

          {/* Born / Joined */}
          <div className="flex gap-4 mt-3">
            <div className="h-3 w-28 bg-gray-600 rounded" />
            <div className="h-3 w-28 bg-gray-600 rounded" />
          </div>

          {/* Followers / Following */}
          <div className="flex gap-4 mt-1">
            <div className="h-3 w-20 bg-gray-600 rounded" />
            <div className="h-3 w-24 bg-gray-600 rounded" />
          </div>
        </div>
      </div>

      {/* Posts Tabs */}
      <div className="mt-6 px-4">
        <div className="flex items-center gap-2 border-b py-2">
          <div className="w-5 h-5 bg-gray-700 rounded" />
          <div className="w-20 h-4 bg-gray-700 rounded" />
        </div>

        {/* Posts Grid */}
        <div className="mt-4 grid grid-cols-3 gap-[1px] bg-black">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={idx}
              className="aspect-square bg-neutral-900"
            >
              <div className="w-full h-full bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
