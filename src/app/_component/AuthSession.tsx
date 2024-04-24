"use client"; // Provider는 클라이언트 컴포넌트

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AuthSession({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
