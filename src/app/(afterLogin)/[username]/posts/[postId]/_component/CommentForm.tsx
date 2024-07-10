"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CommentForm({ post }: { post: any }) {
  const supabase = createClientComponentClient();

  const [user, setUser] = useState({
    avatar_url: "",
    user_name: "",
    id: "",
  });

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          if (error) throw error;
          if (data) setUser(data);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <Link
      href={`/${post?.profiles.user_name}/posts/${post?.id}/create-comment`}
    >
      <div className="flex fixed bottom-1 max-w-xl p-2 w-full border border-gray-300 rounded-full items-center bg-white">
        <img
          src={user.avatar_url}
          alt="프로필 이미지"
          className="w-8 h-8 rounded-full mr-2"
        />
        <input
          placeholder={`${post?.profiles.user_name}님에게 답글 남기기`}
          className="flex-1 focus:outline-none resize-none"
          style={{ color: "transparent" }}
        />
      </div>
    </Link>
  );
}
