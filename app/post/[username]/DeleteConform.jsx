"use client";
import React from "react";
import { deletepost } from "../../../actions/postActions/deletepost";

const handleOndelete = async (postId) => {
  await deletepost(postId);
};

const DeleteConfirm = ({ onDelete, onCancel, postId }) => {
  console.log(postId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[#1e1e1e] w-[90%] max-w-sm rounded-xl p-6 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-center">Are you sure?</h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          This action cannot be undone.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              onDelete();
              await handleOndelete(postId);
            }}
            className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
