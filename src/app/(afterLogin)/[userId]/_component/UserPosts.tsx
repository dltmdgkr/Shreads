import { useQuery } from "@tanstack/react-query";
import { getPostsByUser } from "../_lib/getPostsByUser";
import Post from "../../_component/Post";

export default function UserPosts({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPostsByUser({ userId }),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const posts = Array.isArray(data) ? data : [];

  if (posts.length === 0) {
    return <span>게시글이 없습니다.</span>;
  }

  return posts.map((post) => <Post key={post.id} post={post} />);
}
