// components/LoadingPost.tsx
import React from 'react';

const LoadingPost = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-black text-white rounded-xl shadow-md animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="w-1/3 h-4 bg-gray-700 rounded" />
          <div className="w-1/4 h-3 bg-gray-600 rounded" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-5/6 h-4 bg-gray-700 rounded" />
        <div className="w-2/3 h-4 bg-gray-700 rounded" />
      </div>

      <div className="mt-4 h-48 bg-gray-800 rounded-xl" />

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <div className="w-8 h-4 bg-gray-700 rounded" />
        <div className="w-8 h-4 bg-gray-700 rounded" />
        <div className="w-8 h-4 bg-gray-700 rounded" />
        <div className="w-8 h-4 bg-gray-700 rounded" />
        <div className="w-8 h-4 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default LoadingPost;
