import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import status from "./utils/status";

// These patterns protect both static and dynamic routes (like /username, /username/posts)
const protectedRoutePatterns = [
  /^\/home/,
  /^\/explore/,
  /^\/notifications/,
  /^\/popai/,
  /^\/message/,
  /^\/bookmarks/,
  /^\/premium/,
  /^\/more/,
  /^\/post/,
  /^\/premium\/success/,
  /^\/premium\/cancel/,
  /^\/[a-zA-Z0-9_]+(\/.*)?$/, // Matches /username and /username/anything
];

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("login")?.value;

  // Check if this path should be protected
  const isProtected = protectedRoutePatterns.some((pattern) =>
    pattern.test(pathname)
  );

  // Redirect logged-in user from "/" to "/home"
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Allow non-protected routes to go through
  if (!isProtected) {
    return NextResponse.next();
  }

  // If protected route but no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next(); // Token is valid
  } catch (error) {
    console.error("JWT Error:", error);
    return NextResponse.json({
      status: status.UNAUTHORIZED.code,
      message: status.UNAUTHORIZED.message,
    });
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|login|register|about|contact).*)"
  ]
};
