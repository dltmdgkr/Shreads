import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Container } from "@mui/material";
import { ReactNode } from "react";
import LogoutButton from "./_component/LogoutButton";
import Link from "next/link";
import RQProvider from "./_component/RQProvider";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export default async function AfterLoginLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <RQProvider>
      <Container fixed>
        <div className="relative flex min-h-screen">
          {/* 데스크탑 영역 네비게이션바 영역 */}
          <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:h-full lg:bg-white lg:shadow-md">
            <nav className="flex flex-col p-4 text-gray-700">
              <Link href="/" className="flex items-center py-2">
                <HomeIcon className="mr-3" fontSize="small" />
                <span>홈</span>
              </Link>
              <Link href="/explore" className="flex items-center py-2">
                <SearchIcon className="mr-3" fontSize="small" />
                <span>탐색하기</span>
              </Link>
              <Link href="/messages" className="flex items-center py-2">
                <MailOutlineIcon className="mr-3" fontSize="small" />
                <span>쪽지</span>
              </Link>
              <Link
                href={`${session?.user.id}`}
                className="flex items-center py-2"
              >
                <PermIdentityIcon className="mr-3" fontSize="small" />
                <span>프로필</span>
              </Link>
              <Link href="/create-post" className="flex items-center py-2">
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
            <Link href="/">
              <HomeIcon />
            </Link>
            <Link href="/explore">
              <SearchIcon />
            </Link>
            <Link href="/create-post">
              <PostAddIcon />
            </Link>
            <Link href="/messages">
              <MailOutlineIcon />
            </Link>
            <Link href={`${session?.user.id}`}>
              <PermIdentityIcon />
            </Link>
          </div>

          <div className="flex-1 lg:ml-64 sm:p-4 mt-16 lg:mt-0">{children}</div>
          {modal}
        </div>
      </Container>
    </RQProvider>
  );
}
