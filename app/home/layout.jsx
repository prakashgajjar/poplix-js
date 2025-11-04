import "../globals.css";
    
export const metadata = {
  title: `Poplix - Home`,
  description:
    "Poplix is your next-gen social media platform, designed to help you connect with friends, share moments, and discover local buzz.",
  icons: {
    icon: "/logos/poplix1.png",
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-black h-screen overflow-hidden text-white antialiased">
        {children}
      </body>
    </html>
  );
}
