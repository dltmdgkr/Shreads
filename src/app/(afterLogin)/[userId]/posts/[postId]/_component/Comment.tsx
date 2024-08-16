import { Comment } from "@/model/Comment";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Comment({ comment }: { comment: Comment }) {
  const router = useRouter();

  return (
    <div className="flex items-start mt-3 pl-3 pb-3 border-b border-gray-200">
      <Link href={`/${comment.user_id}`}>
        <img
          src={comment.profiles.avatar_url!}
          alt="프로필 이미지"
          className="w-10 h-10 rounded-full mr-4 mt-1 border object-cover"
        />
      </Link>
      <div className="flex-col flex-1">
        <div className="flex items-center">
          <Link href={`/${comment.user_id}`}>
            <p className="font-bold mb-1 mr-2 hover:underline">
              {comment.profiles.user_name}
            </p>
          </Link>
          <span className="text-gray-500 text-sm">
            {dayjs(comment?.created_at).fromNow(true)}
          </span>
        </div>
        <p className="text-gray-700 mb-2">{comment.content}</p>
        <div className="flex gap-2 overflow-x-auto max-w-full">
          {comment.commentImages?.map((image) => (
            <img
              key={image.id}
              src={image.image_url!}
              alt="댓글 이미지"
              className="cursor-pointer rounded-lg border border-gray-300 object-cover min-w-24 min-h-24"
              onClick={() =>
                router.push(
                  `/${comment.profiles.user_name}/comments/${comment.id}/photo/${image.id}`
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
