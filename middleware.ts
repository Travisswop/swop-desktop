import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const url = new URL(req.nextUrl.origin);
    url.pathname = "/signin";
    return Response.redirect(url.toString());
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup|profile).*)",
  ],
};
