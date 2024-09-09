import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import AuthProvider from "./(afterLogin)/_component/AuthProvider";
import { createServerSupabaseClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s • Shreads",
    default: "Shreads",
  },
  description:
    "소통과 상호작용을 중심으로 설계된 SNS 플랫폼, Shreads에서 더 많은 대화를 나누어 보세요.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Shreads",
    description:
      "소통과 상호작용을 중심으로 설계된 SNS 플랫폼, Shreads에서 더 많은 대화를 나누어 보세요.",
    type: "website",
    url: "https://shreads-x.vercel.app",
    locale: "ko_KR",
    images: [
      {
        url: "https://shreads-x.vercel.app/api/og",
        alt: "Shreads",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="ko">
      <AuthProvider accessToken={session?.access_token}>
        <body className={inter.className}>{children}</body>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive"
        />
      </AuthProvider>
    </html>
  );
}
