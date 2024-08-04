"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateComment() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace(/\/create-comment$/, "");
      router.push(path);
    }
  }, [router]);

  return null;
}
