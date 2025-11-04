import "../globals.css";

export const metadata = {
    title: "Poplix - Bookmarks",
    description:
        "All your favorite posts in one place. Revisit saved images, videos, and thoughts anytime with Poplix Bookmarks — stay organized, stay inspired.",
    icons: {
        icon: "/logos/poplix1.png",
    },
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" >
            <body className="bg-black h-screen overflow-hidden text-white antialiased ">
                {children}
            </body>
        </html>
    );
}
