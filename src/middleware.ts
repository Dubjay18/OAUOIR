import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("Session", session);
  console.log("Req", req.url.endsWith("/login"));

  if (!session && !req.url.endsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (session && req.url.endsWith("/login")) {
    console.log("Session", session);
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ["/admin", "/login"],
};
