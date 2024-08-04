import { Comment } from "@/model/Comment";
import dayjs from "dayjs";

export default function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="flex items-start mt-3 pl-3 pb-3 border-b border-gray-200">
      <img
        src={comment.profiles.avatar_url!}
        alt="프로필 이미지"
        className="w-10 h-10 rounded-full mr-4 mt-1 border"
      />
      <div className="flex-col">
        <div className="flex">
          <p className="font-bold mb-1 mr-2">{comment.profiles.user_name}</p>
          <span className="text-gray-500">
            {dayjs(comment.created_at).fromNow()}
          </span>
        </div>
        <p className="text-gray-700 mb-2">{comment.content}</p>
        <div className="flex gap-2 overflow-scroll">
          {comment.commentImages.map((image) => (
            <img
              key={image.id}
              src={image.image_url!}
              alt="댓글 이미지"
              className="cursor-pointer rounded-lg border border-gray-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
