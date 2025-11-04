"use client";
// import { loadStripe } from "../..stripe/stripe-js";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton({ planName, amount, email }) {
  const handleCheckout = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: planName,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        email,
      }),
    });

    console.log(res)

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl font-semibold transition"
    >
      Subscribe Now
    </button>
  );
}
