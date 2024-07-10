// import style from "./post.module.css";
// import Link from "next/link";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import "dayjs/locale/ko";
// import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
// import PostArticle from "./PostArticle";
// import PostImages from "./PostImages";
// import { Post } from "@/model/Post";
// import { PostWithProfiles } from "../(home)/_lib/getFollowingPosts";

// dayjs.locale("ko");

// dayjs.extend(relativeTime);

// export default function Post({ post }: { post: PostWithProfiles }) {
//   if (!post) return;
//   return (
//     <PostArticle post={post}>
//       <div className={style.postWrapper}>
//         <div className={style.postUserSection}>
//           <Link
//             href={`/${post.profiles.user_name}`}
//             className={style.postUserImage}
//           >
//             <img
//               src={post.profiles.avatar_url!}
//               alt={post.profiles.user_name!}
//             />

//             <div className={style.postShade} />
//           </Link>
//         </div>
//         <div className={style.postBody}>
//           <div className={style.postMeta}>
//             <Link href={`/${post.profiles.user_name}`}>
//               <span className={style.postUserName}>
//                 {post.profiles.user_name}
//               </span>
//               &nbsp;
//               <span className={style.postUserId}>
//                 @{post.profiles.email?.split("@")[0]}
//               </span>
//               &nbsp; · &nbsp;
//             </Link>
//             <span className={style.postDate}>
//               {dayjs(post.created_at).fromNow(true)}
//             </span>
//           </div>
//           <div>{post.content}</div>
//           <div className={style.postImageSection}>
//             <PostImages post={post} />
//           </div>
//           <ActionButtons />
//         </div>
//       </div>
//     </PostArticle>
//   );
// }

import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { PostWithProfiles } from "../(home)/_lib/getFollowingPosts";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post({ post }: { post: PostWithProfiles }) {
  if (!post) return null;

  return (
    <PostArticle post={post}>
      <div className="flex flex-col cursor-pointer">
        <div className="flex">
          <div className="mr-3 w-10">
            <Link
              href={`/${post.profiles.user_name}`}
              className="relative block w-10 h-10 rounded-full"
            >
              <img
                src={post.profiles.avatar_url!}
                alt={post.profiles.user_name!}
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute top-0 left-0 w-10 h-10 rounded-full" />
            </Link>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center mb-2">
              <Link
                href={`/${post.profiles.user_name}`}
                className="flex items-center"
              >
                <span className="font-bold hover:underline">
                  {post.profiles.user_name}
                </span>
                &nbsp;
                <span className="text-gray-500">
                  @{post.profiles.email?.split("@")[0]}
                </span>
                &nbsp;·&nbsp;
              </Link>
              <span className="text-gray-500">
                {dayjs(post.created_at).fromNow(true)}
              </span>
            </div>
            <div>{post.content}</div>
            <div className="mt-3">
              <PostImages post={post} />
            </div>
            <ActionButtons />
          </div>
        </div>
      </div>
    </PostArticle>
  );
}
