"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-black flex items-center justify-center text-white px-4 relative">
      {showConfetti && <Confetti width={1800} height={1000} />}
      <div className="max-w-md w-full text-center space-y-6">
        <CheckCircle2 size={64} className="text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
        <p className="text-gray-400 text-sm">
          Your subscription to <strong>Poplix Premium</strong> is now active! Enjoy Poplix
        </p>
        <button
          onClick={() => router.push("/home")}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition font-medium"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
