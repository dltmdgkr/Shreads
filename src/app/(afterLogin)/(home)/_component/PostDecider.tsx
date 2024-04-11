"use client";

import PostRecommends from "./PostRecommends";
import FollowingPosts from "./FollowingPosts";
import { useContext } from "react";
import { PostsToggleContext } from "./PostsToggleProvider";

export default function PostDecider() {
  const { recommendPosts } = useContext(PostsToggleContext);

  return recommendPosts ? <PostRecommends /> : <FollowingPosts />;
}
