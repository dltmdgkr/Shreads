"use client";

import { useRouter } from "next/navigation";
import { useFetchUser } from "../_hook/useFetchUser";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();
  const { user: me } = useFetchUser();

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
        <Image
          src={me?.avatar_url}
          alt="프로필 이미지"
          className="w-10 h-10 rounded-full border"
          width={40}
          height={40}
        />
      </div>
      <div>
        <div className="font-bold text-left">{me?.user_name}</div>
        <div className="text-sm text-left leading-3">
          @{me?.email.split("@")[0]}
        </div>
      </div>
    </button>
  );
}
