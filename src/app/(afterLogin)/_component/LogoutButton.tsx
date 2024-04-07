"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession();

  if (!me?.user) {
    return null;
  }

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/login");
    });
  };

  return (
    <button className="flex" onClick={onLogout}>
      <div className="mr-3">
        <img
          src={me.user.image!}
          alt="profile_image"
          style={{ width: "40px", borderRadius: "50%" }}
        />
      </div>
      <div>
        <div className="font-bold">{me.user.name}</div>
        <div className="text-sm text-left leading-3">@{me.user.email}</div>
      </div>
    </button>
  );
}
