import "../globals.css";

export const metadata = {
  title: "Popai - Poplix Voice Assistant",
  description:
    "Popai is your smart social companion on Poplix — ask questions, get insights, and interact effortlessly with your content using voice and AI.",
  icons: {
    icon: "/logos/poplix1.png",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased ">
        {children}
      </body>
    </html>
  );
}
