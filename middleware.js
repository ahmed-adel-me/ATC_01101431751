export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // This protects everything except for these routes
    "/((?!_next/static|_next/image|favicon.ico|auth/login|auth/signup).*)",
  ],
};
