"use client";
import { useEffect, useRef } from "react";

export default function DeleteCommentModal({ onDelete, onCancel, show }) {
  const modalRef = useRef();

  // Optional: Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onCancel]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-[#1a1a1a] text-white p-5 rounded-xl w-72 shadow-xl border border-[#333] animate-fade-in"
      >
        <h2 className="text-lg font-semibold mb-4">Delete this comment?</h2>
        <div className="flex justify-end gap-4">
          <button
            className="text-gray-400 hover:text-white transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="text-red-500 hover:text-red-400 font-semibold"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
