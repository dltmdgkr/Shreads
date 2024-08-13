"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";
import { getFollowingUsers } from "../_lib/getFollowingUsers";
import { useFetchUser } from "../../_hook/useFetchUser";

export default function FollowingPosts() {
  const { user, loading } = useFetchUser();

  const { data: usersData } = useQuery<any[]>({
    queryKey: ["users", "followings"],
    queryFn: () => getFollowingUsers(user.id),
    staleTime: 60 * 1000,
    enabled: !loading,
  });

  const { data: postsData } = useQuery({
    queryKey: ["posts", "followings"],
    queryFn: () => getFollowingPosts(),
    staleTime: 60 * 1000,
  });

  const followingUsers = Array.isArray(usersData) ? usersData : [];

  const posts = postsData?.filter((post) =>
    followingUsers.includes(post.user_id)
  );

  return posts?.map((post) => <Post key={post.id} post={post} />);
}
