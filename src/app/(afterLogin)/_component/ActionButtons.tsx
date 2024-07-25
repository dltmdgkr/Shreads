"use client";

import { TfiComment } from "react-icons/tfi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { CiHeart, CiLocationArrow1 } from "react-icons/ci";
import cx from "classnames";
import { Post } from "@/model/Post";
import { MouseEventHandler, useState } from "react";
import { postLike } from "../(home)/_lib/postLike";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function ActionButtons({ post }: { post: Post }) {
  const commented = false;
  const reposted = false;

  const queryClient = useQueryClient();
  const postId = post.id;
  const userId = post.profiles.id;
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.like_count || 0);

  const { mutate: likePost } = useMutation({
    mutationFn: (params: {
      postId: number;
      userId: string;
      liked: boolean;
      like_count: number;
    }) =>
      postLike(params.postId, params.userId, params.liked, params.like_count),
    onMutate: (variables) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const postData: any = queryClient.getQueryData(queryKey);
          if (Array.isArray(postData.data)) {
            const index = postData.data.findIndex(
              (v: { id: number }) => v.id === postId
            );

            if (index > -1) {
              const updatedPosts = [...postData.data];
              updatedPosts[index] = {
                ...updatedPosts[index],
                like_count: variables.liked
                  ? postData.data[index].like_count + 1
                  : postData.data[index].like_count - 1,
                liked: variables.liked,
              };

              queryClient.setQueryData(queryKey, {
                ...postData,
                data: updatedPosts,
              });
            }
          } else if (postData.id === postId) {
            queryClient.setQueryData(queryKey, {
              ...postData,
              like_count: variables.liked
                ? postData.like_count + 1
                : postData.like_count - 1,
              liked: variables.liked,
            });
          }
        }
      });
    },
    onError: (err, variables, context) => {
      console.error("Error updating like:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };

  const onClickRepost = () => {};

  const onClickHeart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    likePost({ postId, userId, liked: !liked, like_count: likeCount });
  };

  return (
    <div className="flex mt-3">
      <div className={cx("flex items-center", commented && "text-blue-500")}>
        <Link
          href={`/${post.profiles.user_name}/posts/${post.id}/create-comment`}
          onClick={stopPropagation}
        >
          <button className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-blue-100">
            <TfiComment />
          </button>
        </Link>
        <div className="text-sm text-gray-600">{post.comments.length}</div>
      </div>
      <div className={cx("flex items-center", reposted && "text-green-500")}>
        <button
          onClick={onClickRepost}
          className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-green-100"
        >
          <HiArrowPathRoundedSquare className="text-xl" />
        </button>
        <div className="text-sm text-gray-600">{1 || ""}</div>
      </div>
      <div className={cx("flex items-center", liked && "text-pink-500")}>
        <button
          onClick={onClickHeart}
          className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-pink-100"
        >
          <CiHeart className="text-2xl" />
        </button>
        <div className={cx("text-sm text-gray-600", liked && "text-pink-500")}>
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
