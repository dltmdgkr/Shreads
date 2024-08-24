"use client";

import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { FormEventHandler, useState } from "react";

export default function ForgotPassword() {
  const supabase = createBrowserSupabaseClient();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPasswordHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.NEXT_PUBLIC_SHREADS_URL
          ? `${process.env.NEXT_PUBLIC_SHREADS_URL}/reset-password`
          : "http://localhost:3000/reset-password",
      });

      if (error) {
        console.error("Error sending reset password email:", error.message);
        alert("Failed to send reset email. Please try again.");
      } else {
        alert("이메일에서 비밀번호 재설정 링크를 확인해주세요");
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("문제가 발생했습니다. 잠시후 다시 시도해주세요");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-sm">
        <BackButton />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 my-8">비밀번호 찾기</h2>
      <form
        onSubmit={resetPasswordHandler}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "전송중..." : "인증"}
        </button>
      </form>
    </div>
  );
}
