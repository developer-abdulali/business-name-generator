import { NextResponse } from "next/server";

// This function checks if the user is authenticated
export function middleware(request) {
  // Assuming you store the user's authentication status in a cookie named 'token'
  const token = request.cookies.get("token");

  // If no token is present, redirect to the home page
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If the token is present, allow the request to continue
  return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
  matcher: [
    "/recruiter/companies/register-company",
    "/recruiter/companies/:path*", // Matches all routes under /recruiter/companies
    "/recruiter/jobs/:path*", // Matches all routes under /recruiter/jobs
    "/profile",
    "/recruiter/:path*",
    // Add more paths as needed
  ],
};
