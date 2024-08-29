import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import { LiaHomeSolid } from "react-icons/lia";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function DesktopNavMenu({ session, segment }: any) {
  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:h-full lg:bg-white lg:shadow-md">
      <nav className="flex flex-col p-4 text-gray-700">
        {segment === "(home)" ? (
          <Link href="/" className="flex items-center py-2">
            <HomeIcon className="mr-3" fontSize="medium" />
            <span className="font-bold text-lg">홈</span>
          </Link>
        ) : (
          <Link href="/" className="flex items-center py-2">
            <LiaHomeSolid
              className="mr-3"
              fontSize="medium"
              style={{ stroke: "currentColor", strokeWidth: 1 }}
            />
            <span>홈</span>
          </Link>
        )}
        {segment === "explore" ? (
          <Link href="/explore" className="flex items-center py-2">
            <SearchIcon className="mr-3" fontSize="medium" />
            <span className="font-bold text-lg">탐색하기</span>
          </Link>
        ) : (
          <Link href="/explore" className="flex items-center py-2">
            <SearchIcon className="mr-3" fontSize="small" />
            <span>탐색하기</span>
          </Link>
        )}
        {segment === "messages" ? (
          <Link href="/messages" className="flex items-center py-2">
            <MailOutlineIcon className="mr-3" fontSize="medium" />
            <span className="font-bold text-lg">쪽지</span>
          </Link>
        ) : (
          <Link href="/messages" className="flex items-center py-2">
            <MailOutlineIcon className="mr-3" fontSize="small" />
            <span>쪽지</span>
          </Link>
        )}
        {segment === `${session?.user.id}` ? (
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
            className="flex items-center py-2"
          >
            <PermIdentityIcon className="mr-3" fontSize="small" />
            <span>프로필</span>
          </Link>
        )}
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
  );
}
