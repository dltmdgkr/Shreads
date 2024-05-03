import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
// import GitHubProvider from "next-auth/providers/github";
import GitHub from "next-auth/providers/GitHub";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // clientId: process.env.AUTH_GITHUB_ID,
      // clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
});
