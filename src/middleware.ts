import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/members/:path*",
    "/announcements/:path*",
    "/schedule/:path*",
    "/training/:path*",
    "/reports/:path*",
    "/feedback/:path*",
    "/resources/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};

export default withAuth(function middleware() {
  // Auth middleware - just checks if user is authenticated
  // Protect routes from unauthenticated access
});
