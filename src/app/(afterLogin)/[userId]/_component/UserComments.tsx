import { useQuery } from "@tanstack/react-query";
import Comment from "../posts/[postId]/_component/Comment";
import Post from "../../_component/Post";
import { Comment as CommentType } from "@/model/Comment";
import { Post as PostType } from "@/model/Post";
import { getPostsWithComments } from "../_lib/getPostsWithUserComments";
import { useFetchUser } from "../../_hook/useFetchUser";

export default function UserComments({ userId }: { userId: string }) {
  const { user } = useFetchUser();
  const { data, isLoading } = useQuery({
    queryKey: ["postsWithComments"],
    queryFn: () => getPostsWithComments(),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const posts: PostType[] = Array.isArray(data) ? data : [];

  const filteredPosts = posts.filter((post) =>
    (post.comments as CommentType[]).some(
      (comment) => comment.user_id === userId
    )
  );

  if (filteredPosts.length === 0) {
    return <span>작성한 답글이 없습니다.</span>;
  }

  return (
    <div>
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <div className="pb-4">
            <Post post={post} userId={user.id} />
          </div>

          <div className="ml-6 pl-4 border-l-2 border-gray-300 space-y-4">
            {(post.comments as CommentType[])
              .filter((comment) => comment.user_id === userId)
              .map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-3 rounded-lg border border-gray-300"
                >
                  <Comment comment={comment} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
