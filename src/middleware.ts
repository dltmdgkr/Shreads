import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("middleware req.url", req.url);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_SHREADS_URL
        ? `${process.env.NEXT_PUBLIC_SHREADS_URL}/login`
        : "http://localhost:3000/login"
    );
  }

  return res;
}

export const config = {
  matcher: ["/", "/create-post", "/explore", "/messages"],
};
