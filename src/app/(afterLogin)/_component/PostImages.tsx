import Link from "next/link";
import { Post } from "@/model/Post";
import { useDraggableScroll } from "../_hook/useDraggableScroll";

export default function PostImages({ post }: { post: Post }) {
  const { scrollRef, onDragStart, onDragEnd, onDragMove, onClick } =
    useDraggableScroll();

  const hasMultipleImages = post.postImages?.length > 4;

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasMultipleImages) {
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onClick={stopPropagation}
      className="flex gap-2 overflow-scroll scrollbar-hide md:w-[80vh]"
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
