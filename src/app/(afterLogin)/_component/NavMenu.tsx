// "use client";

// import Divider from "@mui/material/Divider";
// import HomeIcon from "@mui/icons-material/Home";
// import { LiaHomeSolid } from "react-icons/lia";
// import SearchIcon from "@mui/icons-material/Search";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import PostAddIcon from "@mui/icons-material/PostAdd";
// import Link from "next/link";
// import LogoutButton from "./LogoutButton";
// import { useSelectedLayoutSegment } from "next/navigation";
// import { Session } from "@supabase/supabase-js";

// export default function NavMenu({ session }: { session: Session | null }) {
//   const segment = useSelectedLayoutSegment();
//   return (
//     <>
//       {/* 데스크탑 영역 네비게이션바 영역 */}
//       <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:h-full lg:bg-white lg:shadow-md">
//         <nav className="flex flex-col p-4 text-gray-700">
//           {segment === "(home)" ? (
//             <Link href="/" className="flex items-center py-2">
//               <HomeIcon className="mr-3" fontSize="medium" />
//               <span className="font-bold text-lg">홈</span>
//             </Link>
//           ) : (
//             <Link href="/" className="flex items-center py-2">
//               <LiaHomeSolid
//                 className="mr-3"
//                 fontSize="medium"
//                 style={{ stroke: "currentColor", strokeWidth: 1 }}
//               />
//               <span>홈</span>
//             </Link>
//           )}
//           {segment === "explore" ? (
//             <Link href="/explore" className="flex items-center py-2">
//               <SearchIcon className="mr-3" fontSize="medium" />
//               <span className="font-bold text-lg">탐색하기</span>
//             </Link>
//           ) : (
//             <Link href="/explore" className="flex items-center py-2">
//               <SearchIcon className="mr-3" fontSize="small" />
//               <span>탐색하기</span>
//             </Link>
//           )}
//           {segment === "messages" ? (
//             <Link href="/messages" className="flex items-center py-2">
//               <MailOutlineIcon className="mr-3" fontSize="medium" />
//               <span className="font-bold text-lg">쪽지</span>
//             </Link>
//           ) : (
//             <Link href="/messages" className="flex items-center py-2">
//               <MailOutlineIcon className="mr-3" fontSize="small" />
//               <span>쪽지</span>
//             </Link>
//           )}
//           {segment === `${session?.user.id}` ? (
//             <Link
//               href={`/${session?.user.id}`}
//               className="flex items-center py-2"
//             >
//               <PermIdentityIcon className="mr-3" fontSize="medium" />
//               <span className="font-bold text-lg">프로필</span>
//             </Link>
//           ) : (
//             <Link
//               href={`/${session?.user.id}`}
//               className="flex items-center py-2"
//             >
//               <PermIdentityIcon className="mr-3" fontSize="small" />
//               <span>프로필</span>
//             </Link>
//           )}
//           <Link href="/create-post" className="flex items-center py-2">
//             <PostAddIcon className="mr-3" fontSize="small" />
//             <span>게시하기</span>
//           </Link>
//           <Divider className="my-2" />
//           <div className="py-2">
//             <LogoutButton />
//           </div>
//         </nav>
//       </div>

//       {/* 모바일 화면 네비게이션바 영역 */}
//       <div className="flex lg:hidden fixed top-0 left-0 right-0 text-gray-700 bg-white shadow-md px-2 py-4 justify-around">
//         {segment === "(home)" ? (
//           <Link href="/" className="border-b-2 border-gray-600">
//             <HomeIcon />
//           </Link>
//         ) : (
//           <Link href="/">
//             <HomeIcon />
//           </Link>
//         )}
//         {segment === "explore" ? (
//           <Link href="/explore" className="border-b-2 border-gray-600">
//             <SearchIcon />
//           </Link>
//         ) : (
//           <Link href="/explore">
//             <SearchIcon />
//           </Link>
//         )}
//         <Link href="/create-post">
//           <PostAddIcon />
//         </Link>
//         {segment === "messages" ? (
//           <Link href="/messages" className="border-b-2 border-gray-600">
//             <MailOutlineIcon />
//           </Link>
//         ) : (
//           <Link href="/messages">
//             <MailOutlineIcon />
//           </Link>
//         )}
//         {segment === `${session?.user.id}` ? (
//           <Link
//             href={`/${session?.user.id}`}
//             className="border-b-2 border-gray-600"
//           >
//             <PermIdentityIcon />
//           </Link>
//         ) : (
//           <Link href={`/${session?.user.id}`}>
//             <PermIdentityIcon />
//           </Link>
//         )}
//       </div>
//     </>
//   );
// }

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Session } from "@supabase/supabase-js";
import { useSelectedLayoutSegment } from "next/navigation";

const DesktopNavMenu = React.lazy(() => import("./DesktopNavMenu"));
const MobileNavMenu = React.lazy(() => import("./MobileNavMenu"));

export default function NavMenu({ session }: { session: Session | null }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop === null) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isDesktop ? (
        <DesktopNavMenu session={session} segment={segment} />
      ) : (
        <MobileNavMenu session={session} segment={segment} />
      )}
    </Suspense>
  );
}
