"use client";

import React from "react";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import { LiaHomeSolid } from "react-icons/lia";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Session } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

export default function NavMenu({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:h-full lg:bg-white lg:shadow-md">
        <nav className="flex flex-col p-4 text-gray-700">
          {pathname === "/" ? (
            <Link href="/" className="flex items-center py-2">
              <HomeIcon className="mr-3" fontSize="medium" />
              <span className="font-bold text-lg">홈</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center py-2 hover:bg-gray-100 transition duration-300 rounded-md px-2"
            >
              <LiaHomeSolid
                className="mr-3"
                fontSize="medium"
                style={{ stroke: "currentColor", strokeWidth: 1 }}
              />
              <span>홈</span>
            </Link>
          )}
          {pathname === "/explore" ? (
            <Link href="/explore" className="flex items-center py-2">
              <SearchIcon className="mr-3" fontSize="medium" />
              <span className="font-bold text-lg">탐색하기</span>
            </Link>
          ) : (
            <Link
              href="/explore"
              className="flex items-center py-2 hover:bg-gray-100 transition duration-300 rounded-md px-2"
            >
              <SearchIcon className="mr-3" fontSize="small" />
              <span>탐색하기</span>
            </Link>
          )}
          {pathname === "/messages" ? (
            <Link href="/messages" className="flex items-center py-2">
              <MailOutlineIcon className="mr-3" fontSize="medium" />
              <span className="font-bold text-lg">쪽지</span>
            </Link>
          ) : (
            <Link
              href="/messages"
              className="flex items-center py-2 hover:bg-gray-100 transition duration-300 rounded-md px-2"
            >
              <MailOutlineIcon className="mr-3" fontSize="small" />
              <span>쪽지</span>
            </Link>
          )}
          {pathname === `/${session?.user.id}` ? (
            <Link
              href={`/${session?.user.id}`}
              className="flex items-center py-2"
            >
              <PermIdentityIcon className="mr-3" fontSize="medium" />
              <span className="font-bold text-lg">프로필</span>
            </Link>
          ) : (
            <Link
              href={`/${session?.user.id}`}
              className="flex items-center py-2 hover:bg-gray-100 transition duration-300 rounded-md px-2"
            >
              <PermIdentityIcon className="mr-3" fontSize="small" />
              <span>프로필</span>
            </Link>
          )}
          <Link
            href="/create-post"
            className="flex items-center py-2 hover:bg-gray-100 transition duration-300 rounded-md px-2"
          >
            <PostAddIcon className="mr-3" fontSize="small" />
            <span>게시하기</span>
          </Link>
          <Divider className="my-2" />
          <div className="py-2">
            <LogoutButton />
          </div>
        </nav>
      </div>

      {/* 모바일 화면 네비게이션바 영역 */}
      <div className="flex lg:hidden fixed top-0 left-0 right-0 text-gray-700 bg-white shadow-md px-2 py-4 justify-around">
        {pathname === "/" ? (
          <Link href="/" className="border-b-2 border-gray-600">
            <HomeIcon />
          </Link>
        ) : (
          <Link
            href="/"
            className="hover:bg-gray-100 transition duration-300 rounded-md"
          >
            <HomeIcon />
          </Link>
        )}
        {pathname === "/explore" ? (
          <Link href="/explore" className="border-b-2 border-gray-600">
            <SearchIcon />
          </Link>
        ) : (
          <Link
            href="/explore"
            className="hover:bg-gray-100 transition duration-300 rounded-md"
          >
            <SearchIcon />
          </Link>
        )}
        <Link
          href="/create-post"
          className="hover:bg-gray-100 transition duration-300 rounded-md"
        >
          <PostAddIcon />
        </Link>
        {pathname === "/messages" ? (
          <Link href="/messages" className="border-b-2 border-gray-600">
            <MailOutlineIcon />
          </Link>
        ) : (
          <Link
            href="/messages"
            className="hover:bg-gray-100 transition duration-300 rounded-md"
          >
            <MailOutlineIcon />
          </Link>
        )}
        {pathname === `/${session?.user.id}` ? (
          <Link
            href={`/${session?.user.id}`}
            className="border-b-2 border-gray-600"
          >
            <PermIdentityIcon />
          </Link>
        ) : (
          <Link
            href={`/${session?.user.id}`}
            className="hover:bg-gray-100 transition duration-300 rounded-md"
          >
            <PermIdentityIcon />
          </Link>
        )}
      </div>
    </>
  );
}
