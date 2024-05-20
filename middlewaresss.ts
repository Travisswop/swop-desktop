import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  // Get the session data
  const session = await auth();

  // If the user is authenticated, allow the request to proceed
  if (session?.user) {
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to the sign-in page
  const loginUrl = new URL("/signin", request.url);
  const response = NextResponse.redirect(loginUrl);
  return response;
}

export const config = {
  matcher: [
    "/",
    "/websites/:path*",
    "/qr-code/:path*",
    "/analytics/:path*",
    "/messages/:path*",
    "/mint/:path*",
    "/orders/:path*",
    "/automations/:path*",
    "/support-center/:path*",
  ],
};
