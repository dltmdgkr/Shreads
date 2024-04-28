import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("session!!!!", session);

  if (!session) {
    return NextResponse.redirect("http://localhost:3000/login");
  }

  return res;
}

export const config = {
  matcher: ["/", "/create-post", "/explore", "/messages"],
};
