"use client";

import { Tables } from "@/utils/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const [me, setMe] = useState({
    user_name: "",
    email: "",
    avatar_url: "",
  });
  const router = useRouter();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("ERROR:", error);
    }

    router.replace("/login");
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("user_name, email, avatar_url")
            .eq("id", user.id)
            .single();

          if (error) throw error;
          if (data) setMe(data);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <button className="flex" onClick={onLogout}>
      <div className="mr-3">
        <img
          src={me.avatar_url}
          alt="profile_image"
          style={{ width: "40px", borderRadius: "50%" }}
        />
      </div>
      <div>
        <div className="font-bold text-left">{me.user_name}</div>
        <div className="text-sm text-left leading-3">
          @{me.email.split("@")[0]}
        </div>
      </div>
    </button>
  );
}
