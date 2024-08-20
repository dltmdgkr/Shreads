"use client";

import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (url) {
      setAvatarUrl(url);
    }
  }, [url]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setIsUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const tempUrl = URL.createObjectURL(file);
      setAvatarUrl(tempUrl);

      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${data!.path}`);

      if (publicData?.publicUrl) {
        onUpload(publicData.publicUrl);
        setAvatarUrl(publicData.publicUrl);
      }
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {avatarUrl ? (
        <img
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="avatar image rounded-full border-2 border-gray-200 shadow-md"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image bg-gray-200 rounded-full border-2 border-gray-300 shadow-inner"
          style={{ height: size, width: size }}
        />
      )}

      <div>
        <label
          className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer"
          htmlFor="single"
        >
          {isUploading ? "업로드 중..." : "사진 업로드"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}
