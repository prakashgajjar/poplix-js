import "../globals.css";

export const metadata = {
  title: "Poplix Premium - Unlock Your Power",
  description:
    "Upgrade to Poplix Premium and supercharge your experience — enjoy reply boosts, exclusive features, priority support, and more. Elevate your social voice today.",
  icons: {
    icon: "/logos/poplix1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
