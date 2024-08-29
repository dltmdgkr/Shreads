import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Link from "next/link";

export default function MobileNavMenu({ session, segment }: any) {
  return (
    <div className="flex lg:hidden fixed top-0 left-0 right-0 text-gray-700 bg-white shadow-md px-2 py-4 justify-around">
      {segment === "(home)" ? (
        <Link href="/" className="border-b-2 border-gray-600">
          <HomeIcon />
        </Link>
      ) : (
        <Link href="/">
          <HomeIcon />
        </Link>
      )}
      {segment === "explore" ? (
        <Link href="/explore" className="border-b-2 border-gray-600">
          <SearchIcon />
        </Link>
      ) : (
        <Link href="/explore">
          <SearchIcon />
        </Link>
      )}
      <Link href="/create-post">
        <PostAddIcon />
      </Link>
      {segment === "messages" ? (
        <Link href="/messages" className="border-b-2 border-gray-600">
          <MailOutlineIcon />
        </Link>
      ) : (
        <Link href="/messages">
          <MailOutlineIcon />
        </Link>
      )}
      {segment === `${session?.user.id}` ? (
        <Link
          href={`/${session?.user.id}`}
          className="border-b-2 border-gray-600"
        >
          <PermIdentityIcon />
        </Link>
      ) : (
        <Link href={`/${session?.user.id}`}>
          <PermIdentityIcon />
        </Link>
      )}
    </div>
  );
}
