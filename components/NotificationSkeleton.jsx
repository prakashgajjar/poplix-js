import React from "react";

const NotificationSkeletonItem = () => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl w-full bg-neutral-900 animate-pulse">
      {/* Avatar Placeholder */}
      <div className="w-11 h-11 rounded-full bg-gray-700" />

      {/* Content */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
        {/* Message & Time */}
        <div className="space-y-2 flex-1 w-full">
          <div className="h-3 w-40 bg-gray-700 rounded" />
          <div className="h-2 w-24 bg-gray-600 rounded" />
        </div>

        {/* Button Placeholder */}
        <div className="flex gap-2 mt-2 sm:mt-0">
          <div className="px-4 py-2 bg-gray-700 rounded-full w-24 h-8" />
          <div className="px-4 py-2 bg-gray-700 rounded-full w-24 h-8" />
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeletonItem;
