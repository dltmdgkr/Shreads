import { useQuery } from "@tanstack/react-query";
import { getPostsByUser } from "../_lib/getPostsByUser";
import Post from "../../_component/Post";
import { useFetchUser } from "../../_hook/useFetchUser";
import Link from "next/link";
import PostSkeleton from "../../_component/PostSkeleton";

export default function UserPosts({ userId }: { userId: string }) {
  const { user } = useFetchUser();
  const { data, isLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPostsByUser({ userId }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-2">
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  const posts = Array.isArray(data) ? data : [];

  if (posts.length === 0 && user.id === userId) {
    return (
      <div className="flex flex-col items-center justify-center sm:w-full w-[60vw] h-full text-center mt-8">
        <p className="text-lg font-semibold text-gray-700">
          아직 게시글을 작성하지 않았습니다.
        </p>
        <p className="mt-2 text-gray-500">
          회원님의 생각을 이야기하거나 요즘 기억에 남았던 일을 공유해보세요.
        </p>
        <Link
          href="/create-post"
          className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-md"
        >
          만들기
        </Link>
      </div>
    );
  } else if (posts.length === 0 && user.id !== userId) {
    return (
      <div className="flex flex-col items-center justify-center sm:w-full w-[60vw] h-full text-center mt-8">
        <p className="mt-2 text-gray-500">아직 게시글을 작성하지 않았습니다.</p>
      </div>
    );
  }

  return posts.map((post) => (
    <Post key={post.id} post={post} userId={user?.id} />
  ));
}
