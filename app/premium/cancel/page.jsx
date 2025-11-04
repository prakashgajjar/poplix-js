"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <XCircle size={64} className="text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold">Payment Cancelled</h1>
        <p className="text-gray-400 text-sm">
          Looks like you didn’t complete the payment. No worries — your journey on Poplix continues 💫
        </p>
        <button
          onClick={() => router.push("/premium")}
          className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-full transition font-medium"
        >
          Back to Plans
        </button>
      </div>
    </div>
  );
}
