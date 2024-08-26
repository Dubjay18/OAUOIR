import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";
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
  if (req.cookies.has("supabaseSession") && req.url.endsWith("/login")) {
    return NextResponse.rewrite(new URL("/admin", req.url));
  }
  if (req.cookies.has("supabaseSession") && req.url.endsWith("/admin")) {
    return res;
  }
  if (!session && !req.url.endsWith("/login")) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
  if (session && req.url.endsWith("/login")) {
    console.log("Session", session);
    const newRes = NextResponse.rewrite(new URL("/admin", req.url));
    newRes.cookies.set("supabaseSession", session.access_token, {
      maxAge: session.expires_in,
      sameSite: "lax",
    });

    return newRes;
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ["/admin", "/login"],
};
