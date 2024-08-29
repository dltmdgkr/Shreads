import Link from "next/link";
import { Post } from "@/model/Post";
import { useDraggableScroll } from "../_hook/useDraggableScroll";
import Image from "next/image";

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
      className="flex gap-2 overflow-scroll scrollbar-hide md:w-[80vh] max-w-[70vw]"
    >
      {post.postImages?.map((image, index) => (
        <Link
          key={image.id}
          href={`/${post.profiles.user_name}/posts/${post.id}/photo/${image.id}`}
          onClick={onClick}
        >
          <div
            style={{ position: "relative", width: "150px", height: "150px" }}
          >
            <Image
              src={image.image_url!}
              alt="게시글 이미지"
              fill
              priority={index === 0}
              className="rounded-lg border border-gray-300"
              sizes="(max-width: 768px) 150px, (min-width: 769px) 150px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
