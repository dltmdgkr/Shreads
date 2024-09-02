import { useQuery } from "@tanstack/react-query";
import Comment from "../posts/[postId]/_component/Comment";
import Post from "../../_component/Post";
import { Comment as CommentType } from "@/model/Comment";
import { Post as PostType } from "@/model/Post";
import { getPostsWithComments } from "../_lib/getPostsWithUserComments";
import { useFetchUser } from "../../_hook/useFetchUser";
import { FadeLoader } from "react-spinners";

export default function UserComments({ userId }: { userId: string }) {
  const { user } = useFetchUser();
  const { data, isLoading } = useQuery({
    queryKey: ["postsWithComments"],
    queryFn: () => getPostsWithComments(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center sm:w-full w-[80vw] h-full text-center mt-8">
        <FadeLoader color="#adb5bd" />
      </div>
    );
  }

  const posts: PostType[] = Array.isArray(data) ? data : [];

  const filteredPosts = posts.filter((post) =>
    (post.comments as CommentType[]).some(
      (comment) => comment.user_id === userId
    )
  );

  if (filteredPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center sm:w-full w-[60vw] h-full text-center mt-8">
        <p className="mt-2 text-gray-500">아직 답글을 게시하지 않았습니다.</p>
      </div>
    );
  }

  return (
    <div>
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <div className="pb-4">
            <Post post={post} userId={user.id} />
          </div>

          <div className="sm:w-full w-[75vw] sm:ml-6 pl-4 border-l-2 border-gray-300 space-y-4">
            {(post.comments as CommentType[])
              .filter((comment) => comment.user_id === userId)
              .map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-3 rounded-lg border border-gray-300"
                >
                  <Comment comment={comment} post={post} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
