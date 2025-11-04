"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import SwipeToGoBack from "../../components/SwipeToGoBack";
import CheckoutButton from "../../components/CheckoutPayment";


const plans = [
  {
    name: "Basic",
    price: "₹19",
    amount:190,
    frequency: "/month",
    features: [
      "Small reply boost",
      "Access to Explore",
      "Limited bookmarks",
      "Large reply boost",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "₹49",
    amount:4900,
    frequency: "/3 month",
    features: [
      "Everything in Basic",
      "AI-powered suggestions",
      "Edit posts anytime",
      "Large reply boost",
      "Premium badge",
    ],
    highlight: true,
  },
  {
    name: "Premium+",
    price: "₹59",
    amount:5900,
    frequency: "/6 month",
    features: [
      "Everything in Premium",
      "Max boost & reach",
      "Unlock Poplix AI Studio",
      "Early access to features",
    ],
    highlight: false,
  },
];

export default function PremiumPage() {
  const router = useRouter();

  return (
    <SwipeToGoBack to="/home">
      <div className="h-screen overflow-auto bg-black text-white px-6 py-16 relative">
        {/* Back Button */}
        <button
          onClick={() => router.replace('/home')}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-4xl font-bold text-center mb-10">Upgrade to Poplix Premium</h1>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Enjoy an enhanced experience, creator tools, top-tier visibility, and AI-powered features. Choose a plan that fits your buzz.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border ${plan.highlight ? "border-pink-500 shadow-pink-700/40 shadow-lg scale-105" : "border-gray-800"
                } p-8 bg-zinc-900 flex flex-col justify-between`}
            >
              <div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="text-4xl font-bold mt-2">{plan.price}<span className="text-base text-gray-400">{plan.frequency}</span></p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="text-green-500" size={18} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <CheckoutButton
                  planName={plan.name}
                  amount={plan.amount}
                  email="prakashgajjar096@gmail.com"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 text-gray-500 text-sm">
          Billed monthly. Cancel anytime. By subscribing, you agree to our Terms & Privacy Policy.
        </div>
      </div>
    </SwipeToGoBack>
  );
}
