"use client"
import { useRouter } from "next/navigation";
const SubscribePremium = () => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black p-6 rounded-3xl shadow-xl border border-purple-700 max-w-sm mx-auto">
      <h2 className="text-2xl font-extrabold text-white mb-3 tracking-wide">
        Subscribe to Premium 
      </h2>
      <p className="text-gray-300 mb-5 leading-relaxed">
        Unlock exclusive features, boost your productivity, and start earning revenue today.
      </p>
      <button
        onClick={() => router.push("/premium")}
        className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300 text-white font-semibold py-3 rounded-full shadow-lg shadow-purple-700/50 focus:outline-none focus:ring-4 focus:ring-purple-500"
        aria-label="Subscribe to Premium"
      >
        Get Premium
      </button>
    </div>
  );
};

export default SubscribePremium;
