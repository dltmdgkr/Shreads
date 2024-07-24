import Link from "next/link";
import { Post } from "@/model/Post";
import { useDraggableScroll } from "../_hook/useDraggableScroll";

export default function PostImages({ post }: { post: Post }) {
  const { scrollRef, onDragStart, onDragEnd, onDragMove, onClick } =
    useDraggableScroll();

  return (
    <div
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      className="flex gap-2 overflow-scroll scrollbar-hide"
    >
      {post.postImages?.map((image) => (
        <Link
          key={image.id}
          href={`/${post.profiles.user_name}/posts/${post.id}/photo/${image.id}`}
          onClick={onClick}
        >
          <img
            src={image.image_url!}
            alt="게시글 이미지"
            className="rounded-lg border border-gray-300"
            style={{ minWidth: 150, height: 150 }}
          />
        </Link>
      ))}
    </div>
  );
}
