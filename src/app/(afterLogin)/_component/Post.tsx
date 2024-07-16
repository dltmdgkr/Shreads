import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post({ post }: { post: Post }) {
  if (!post) return null;

  return (
    <PostArticle post={post}>
      <div className="flex flex-col cursor-pointer sm:p-3 pt-4">
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
              </Link>
              <span className="text-gray-500">
                {dayjs(post.created_at).fromNow(true)}
              </span>
            </div>
            <div>{post.content}</div>
            <div className="mt-3">
              <PostImages post={post} />
            </div>
            <ActionButtons post={post} />
          </div>
        </div>
      </div>
    </PostArticle>
  );
}
