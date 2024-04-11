"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    try {
      await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      router.replace("/");
    } catch (err) {
      console.error(err);
      setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
  };

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          로그인
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={onSubmit}
        >
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              아이디
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="text"
                type="text"
                autoComplete="text"
                value={id}
                onChange={onChangeId}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                비밀번호
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-gray-500 hover:text-gray-600"
                >
                  비밀번호를 잊어버렸나요?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={onChangePassword}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              로그인 하기
            </button>
            <div className="font-bold text-rose-500 text-center mt-2">
              {message}
            </div>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-gray-500 hover:text-gray-600"
          >
            회원가입 하기
          </Link>
        </p>
      </div>
    </div>
  );
}
