import "../globals.css";

export const metadata = {
  title: "Poplix Profile",
  description:
    "Show the world who you are on Poplix — your posts, moments, and connections, all in one beautiful profile.",
  icons: {
    icon: "/logos/poplix1.png",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-black text-white antialiased ">
        {children}
      </body>
    </html>
  );
}
