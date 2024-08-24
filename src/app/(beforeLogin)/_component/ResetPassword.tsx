"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useEffect, useState, FormEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updatePasswordHandler: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    if (!newPassword) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    if (!confirmPassword) {
      setErrorMessage("비밀번호를 다시 한번 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (data) {
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setNewPassword("");
      setConfirmPassword("");
      router.push("/login");
    }

    if (error) {
      alert("비밀번호 업데이트 중 오류가 발생했습니다.");
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        새 비밀번호 설정
      </h2>
      <form
        onSubmit={updatePasswordHandler}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            새로운 비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="새 비밀번호를 입력하세요"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md"
        >
          비밀번호 변경
        </button>
        <p className="font-bold text-rose-500 text-center mt-2">
          {errorMessage}
        </p>
      </form>
    </div>
  );
}
