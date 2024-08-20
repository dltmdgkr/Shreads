"use client";

import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ConfirmModal from "@/app/(afterLogin)/_component/ConfirmModal";
import SuccessModal from "@/app/(afterLogin)/_component/SuccessModal";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/app/(afterLogin)/messages/_lib/getUserById";

export default function EditProfileForm({ user }: { user: User | null }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { data: profileData } = useQuery({
    queryKey: ["users", user?.id],
    queryFn: () => getUserById(user?.id!),
    enabled: !!user,
  });

  useEffect(() => {
    if (profileData) {
      setUsername(profileData.user_name);
      setAvatarUrl(profileData.avatar_url);
    }
  }, [profileData]);

  async function updateProfile({
    user_name,
    avatar_url,
  }: {
    user_name: string | null;
    avatar_url: string | null;
  }) {
    try {
      setIsLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          user_name,
          avatar_url,
        })
        .eq("id", user?.id);
      if (error) throw error;

      setIsSuccessModalOpen(true);
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setIsLoading(false);
    }
  }

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const onClickClose = () => {
    router.back();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["users", user?.id] });
    queryClient.invalidateQueries({ queryKey: ["posts", user?.id] });
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onClickClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative sm:max-w-[500px] w-full min-w-[350px] bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 ease-in-out">
        <button
          className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition duration-200"
          onClick={openConfirmModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="form-widget space-y-6 mt-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={user?.email || ""}
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="flex justify-center">
            <Avatar
              uid={user?.id ?? null}
              url={avatarUrl}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url);
              }}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="w-full bg-black text-white font-medium px-6 py-2 rounded-lg disabled:bg-gray-400"
              onClick={() => {
                updateProfile({ user_name: username, avatar_url: avatarUrl });
              }}
              disabled={isLoading}
            >
              {isLoading ? "업로드 중 ..." : "완료"}
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="프로필수정 내역을 삭제 하시겠습니까?"
        onConfirm={onClickClose}
        onCancel={closeConfirmModal}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        message="프로필 수정이 완료되었습니다."
        onClose={closeSuccessModal}
      />
    </div>
  );
}
