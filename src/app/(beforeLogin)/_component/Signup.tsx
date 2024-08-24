"use client";

import BackButton from "@/app/(afterLogin)/_component/BackButton";
import onSubmit from "../_lib/signup";
import { useFormState, useFormStatus } from "react-dom";

function showMessage(message: string | null) {
  if (message === "no_email") {
    return "이메일을 입력해주세요";
  }
  if (message === "no_name") {
    return "닉네임을 입력해주세요";
  }
  if (message === "no_password") {
    return "비밀번호를 입력해주세요";
  }
  if (message === "password_mismatch") {
    return "비밀번호가 일치하지 않습니다";
  }
  if (message === "no_image") {
    return "이미지를 업로드 해주세요";
  }
  if (message === "user_exists") {
    return "이미 사용중인 아이디입니다";
  }
  if (message === "weak_password") {
    return "비밀번호를 6자 이상 입력해주세요";
  }
  return "";
}

export default function Signup() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <BackButton />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          회원가입
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={formAction}>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              이메일
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="email"
                type="text"
                autoComplete="text"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              닉네임
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder=""
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              비밀번호
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              비밀번호 확인
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm_password"
                type="password"
                autoComplete="confirm-password"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="image"
            >
              프로필
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              disabled={pending}
            >
              회원가입 하기
            </button>
            <div className="font-bold text-rose-500 text-center mt-2">
              {showMessage(state?.message)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
