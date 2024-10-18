"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

export default function Login() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailLogin, setEmailLogin] = useState(false);
  const [kakaoLogin, setKakaoLogin] = useState(false);
  const [githubLogin, setGithubLogin] = useState(false);
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setEmailLogin(true);
    try {
      const { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        console.error("Supabase Auth Error:", error.message);
        setErrorMessage("이메일과 비밀번호가 일치하지 않습니다.");
        setEmailLogin(false);
      } else if (dataUser) {
        router.replace("/");
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      setErrorMessage("이메일과 비밀번호가 일치하지 않습니다.");
      setEmailLogin(false);
    }
  };

  const signInWithKakao = async () => {
    setKakaoLogin(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SHREADS_URL
          ? `${process.env.NEXT_PUBLIC_SHREADS_URL}/auth/callback`
          : "http://localhost:3000/auth/callback",
      },
    });
    router.refresh();
  };

  const signInWithGithub = async () => {
    setGithubLogin(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SHREADS_URL
          ? `${process.env.NEXT_PUBLIC_SHREADS_URL}/auth/callback`
          : "http://localhost:3000/auth/callback",
      },
    });
    router.refresh();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              이메일
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="email"
                type="text"
                autoComplete="text"
                value={data?.email}
                onChange={onChange}
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
                <Link
                  href="/forgot-password"
                  className="font-semibold text-gray-500 hover:text-gray-600"
                >
                  비밀번호를 잊어버렸나요?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={data?.password}
                onChange={onChange}
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
              {emailLogin ? (
                <PulseLoader
                  size={8}
                  color="#ffffff"
                  style={{ padding: 0.1 }}
                />
              ) : (
                "로그인 하기"
              )}
            </button>
            <p className="font-bold text-rose-500 text-center mt-2">
              {errorMessage}
            </p>
          </div>
        </form>
        <div className="flex items-center justify-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-sm text-gray-500">간편 로그인</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <button
          type="button"
          onClick={signInWithKakao}
          className="flex w-full justify-center items-center rounded-full bg-[#FEE500] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          {kakaoLogin ? (
            <PulseLoader size={8} style={{ padding: 0.1 }} />
          ) : (
            <>
              <RiKakaoTalkFill className="mr-2 text-xl" />
              Kakao로 시작하기
            </>
          )}
        </button>
        <button
          type="button"
          onClick={signInWithGithub}
          className="flex w-full justify-center items-center border border-gray-200 rounded-full bg-white mt-2 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          {githubLogin ? (
            <PulseLoader size={8} style={{ padding: 0.1 }} />
          ) : (
            <>
              <FaGithub className="mr-2 text-lg" /> Github로 시작하기
            </>
          )}
        </button>
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
