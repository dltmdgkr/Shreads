import { useQuery } from "@tanstack/react-query";
import { getCommentsByUser } from "../_lib/getCommentsByUser";
import Comment from "../posts/[postId]/_component/Comment";

export default function UserComments({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["comments", userId],
    queryFn: () => getCommentsByUser({ userId }),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const comments = Array.isArray(data) ? data : [];

  if (comments.length === 0) {
    return <span>답글이 없습니다.</span>;
  }

  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));
}
