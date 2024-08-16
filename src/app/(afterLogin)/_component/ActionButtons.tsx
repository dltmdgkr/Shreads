"use client";

import { TfiComment } from "react-icons/tfi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { CiHeart, CiLocationArrow1 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import cx from "classnames";
import { Post } from "@/model/Post";
import { MouseEventHandler, useEffect, useState } from "react";
import { postLike } from "../(home)/_lib/postLike";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useFetchUser } from "../_hook/useFetchUser";
import { useFetchLikes } from "../_hook/useFetchLikes";
import { repostPost } from "../(home)/_lib/repostPost";
import { useFetchReposts } from "../_hook/useFetchReposts";

export default function ActionButtons({ post }: { post: Post }) {
  const queryClient = useQueryClient();
  const postId = post.id;
  const { user, loading } = useFetchUser();

  const { data: liked, isLoading: isLikeLoading } = useFetchLikes(
    user?.id,
    postId
  );
  const { data: reposted, isLoading: isRepostLoading } = useFetchReposts(
    user?.id,
    postId
  );
  const [isLiked, setIsLiked] = useState(liked);
  const [isReposted, setIsReposted] = useState(reposted);
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [repostCount, setRepostCount] = useState(post.repost_count || 0);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const { mutate: likePost } = useMutation({
    mutationFn: (params: { postId: number; userId: string; liked: boolean }) =>
      postLike(params.postId, params.userId, params.liked),
    onMutate: async (variables) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const postData: any = queryClient.getQueryData(queryKey);
          if (Array.isArray(postData)) {
            const index = postData.findIndex(
              (v: { id: number }) => v.id === postId
            );

            if (index > -1) {
              const updatedPosts = [...postData];
              updatedPosts[index] = {
                ...updatedPosts[index],
                like_count: variables.liked
                  ? postData[index].like_count + 1
                  : postData[index].like_count - 1,
              };

              queryClient.setQueryData(queryKey, updatedPosts);
            }
          } else if (postData.id === postId) {
            queryClient.setQueryData(queryKey, {
              ...postData,
              like_count: variables.liked
                ? postData.like_count + 1
                : postData.like_count - 1,
            });
          }
        }
      });
    },
    onError: (err, variables, context) => {
      console.error("Error updating like:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", user.id, postId] });
    },
  });

  const { mutate: repost } = useMutation({
    mutationFn: (params: {
      userId: string;
      postId: number;
      reposted: boolean;
    }) => repostPost(params.userId, params.postId, params.reposted),
    onMutate: async (variables) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const postData: any = queryClient.getQueryData(queryKey);
          if (Array.isArray(postData)) {
            const index = postData.findIndex(
              (v: { id: number }) => v.id === postId
            );

            if (index > -1) {
              const updatedPosts = [...postData];
              updatedPosts[index] = {
                ...updatedPosts[index],
                repost_count: variables.reposted
                  ? postData[index].repost_count + 1
                  : postData[index].repost_count - 1,
              };

              queryClient.setQueryData(queryKey, updatedPosts);
            }
          } else if (postData.id === postId) {
            queryClient.setQueryData(queryKey, {
              ...postData,
              repost_count: variables.reposted
                ? postData.like_count + 1
                : postData.like_count - 1,
            });
          }
        }
      });
    },
    onError: (err, variables, context) => {
      console.error("Error updating repost:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reposts", user.id] });
    },
  });

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };

  const onClickRepost: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsReposted((prev) => !prev);
    setRepostCount((prev) => (isReposted ? prev - 1 : prev + 1));
    repost({ userId: user.id, postId, reposted: !isReposted });
  };

  const onClickHeart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    likePost({ postId, userId: user.id, liked: !isLiked });
  };

  if (isLikeLoading || isRepostLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex mt-3">
      <div className="flex items-center">
        <Link
          href={`/${post.profiles?.user_name}/posts/${post.id}/create-comment`}
          onClick={stopPropagation}
        >
          <button className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-blue-100">
            <TfiComment />
          </button>
        </Link>
        <div className="text-sm text-gray-600">{post.comments?.length}</div>
      </div>
      <div className="flex items-center">
        <button
          onClick={onClickRepost}
          className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-green-100"
        >
          <HiArrowPathRoundedSquare className="text-xl" />
        </button>
        <div className="text-sm text-gray-600">{repostCount}</div>
      </div>
      <div className={cx("flex items-center", isLiked && "text-red-500")}>
        <button
          onClick={onClickHeart}
          className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-pink-100"
        >
          {isLiked ? (
            <FaHeart className="text-xl text-red-500" />
          ) : (
            <CiHeart className="text-2xl" />
          )}
        </button>
        <div className={cx("text-sm text-gray-600", isLiked && "text-red-500")}>
          {likeCount}
        </div>
      </div>
      <div className="flex items-center">
        <button className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-yellow-100">
          <CiLocationArrow1 className="text-xl" />
        </button>
      </div>
    </div>
  );
}
