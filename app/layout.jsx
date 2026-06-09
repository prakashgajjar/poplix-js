import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutClient from "./LayoutClient";

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile status bar */}
        <meta name="theme-color" content="#10B981" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/logos/poplix1.png" />
      </head>
      <body className="bg-black h-screen overflow-hidden text-white antialiased">
        <LayoutClient>
          {children}
        </LayoutClient>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: { background: '#4ade80', color: '#fff' },
            },
            error: {
              style: { background: '#f87171', color: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}
