import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}

export const config = {
  matcher: ["/", "/create-post", "/explore", "/messages"],
};
