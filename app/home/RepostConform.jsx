"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const RepostConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#111] border border-gray-800 p-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            {/* Content */}
            <h2 className="text-xl font-semibold text-white mb-3">Repost Confirmation</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to repost this to your followers?
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
              >
                Repost
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RepostConfirmModal;
