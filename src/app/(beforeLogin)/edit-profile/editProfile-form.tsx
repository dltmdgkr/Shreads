"use client";

import { useCallback, useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function EditProfileForm({ user }: { user: User | null }) {
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (!user) {
        console.log("no user");
      }

      const { data, error, status } = await supabase
        .from("profiles")
        .select("user_name, avatar_url")
        .eq("id", user?.id)
        .single();

      if (data) {
        setUsername(data.user_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    user_name,
    avatar_url,
  }: {
    user_name: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          user_name,
          avatar_url,
        })
        .eq("id", user?.id);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <Avatar
        uid={user?.id ?? null}
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ user_name: username, avatar_url: url });
        }}
      />

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({ user_name: username, avatar_url: avatarUrl })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
    </div>
  );
}
