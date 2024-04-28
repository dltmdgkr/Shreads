"use client";

import { supabase } from "@/lib/supabase";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("ERROR:", error);
    }

    router.replace("/login");
  };

  return (
    <button className="flex" onClick={onLogout}>
      <div className="mr-3">
        <img
          // src={me.user.image!}
          alt="profile_image"
          style={{ width: "40px", borderRadius: "50%" }}
        />
      </div>
      <div>
        {/* <div className="font-bold">{me.user.name}</div> */}
        {/* <div className="text-sm text-left leading-3">@{me.user.email}</div> */}
      </div>
    </button>
  );
}
