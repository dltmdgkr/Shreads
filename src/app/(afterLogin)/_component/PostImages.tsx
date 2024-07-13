import Link from "next/link";
import { Post } from "@/model/Post";

export default function PostImages({ post }: { post: Post }) {
  return (
    <div className="flex gap-2 overflow-scroll">
      {post.postImages?.map((image) => (
        <Link
          key={image.id}
          href={`/${post.profiles.user_name}/posts/${post.id}/photo/${image.id}`}
        >
          <img
            src={image.image_url!}
            alt="게시글 이미지"
            className="rounded-lg border border-gray-300"
          />
        </Link>
      ))}
    </div>
  );
}
