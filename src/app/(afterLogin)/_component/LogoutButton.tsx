"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useFetchUser } from "../_hook/useFetchUser";

export default function LogoutButton() {
  const supabase = createClientComponentClient();
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
        <img
          src={me?.avatar_url}
          alt="프로필 이미지"
          className="w-10 h-10 rounded-full border"
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
