import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// proxy.ts replaces middleware.ts in Next.js 16
// Protects /admin/* routes by checking the session cookie.
// Firebase ID tokens are validated in API routes for full verification.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Catch accidental relative navigations like /collections/admin/login
  if (pathname.endsWith("/admin/login") && pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Allow admin login page through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect all other /admin/* routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("__session")?.value;
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from /auth/login if they have a session
  if (pathname === "/auth/login") {
    const sessionCookie = request.cookies.get("__session")?.value;
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match /admin/* and /auth/login but exclude static files
    "/admin/:path*",
    "/auth/login",
  ],
};
