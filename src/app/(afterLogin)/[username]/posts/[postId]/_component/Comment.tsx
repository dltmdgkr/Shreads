import { CommentWithProfiles } from "../_lib/getComments";

export default function Comment({ comment }: { comment: CommentWithProfiles }) {
  return (
    <div className="flex items-start mt-3 pl-3 pb-3 border-b border-gray-200">
      <img
        src={comment.profiles.avatar_url!}
        alt="프로필 사진"
        className="w-12 h-12 rounded-full mr-4 mt-1"
      />
      <div className="flex-col">
        <p className="text-lg font-semibold mb-1">
          {comment.profiles.user_name}
        </p>
        <p className="text-gray-700 mb-2">{comment.content}</p>
      </div>
    </div>
  );
}
