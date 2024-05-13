import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import { PostWithProfiles } from "../(home)/_lib/getFollowingPosts";

dayjs.locale("ko");

dayjs.extend(relativeTime);

export default function Post({ post }: { post: PostWithProfiles }) {
  if (!post) return;
  return (
    <PostArticle post={post}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${post.user_id}`} className={style.postUserImage}>
            <img
              src={post.profiles.avatar_url!}
              alt={post.profiles.user_name!}
            />

            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${post.user_id}`}>
              <span className={style.postUserName}>
                {post.profiles.user_name}
              </span>
              &nbsp;
              <span className={style.postUserId}>
                @{post.profiles.email?.split("@")[0]}
              </span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(post.created_at).fromNow(true)}
            </span>
          </div>
          <div>{post.content}</div>
          <div className={style.postImageSection}>
            <PostImages post={post} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
