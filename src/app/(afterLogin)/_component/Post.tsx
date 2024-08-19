"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import { PiPencil } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import { MouseEventHandler } from "react";
import { deletePost } from "../[userId]/posts/[postId]/_lib/deletePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post({
  post,
  userId,
}: {
  post: Post;
  userId?: string | undefined;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(post.id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.back();
    },
    onError: (error) => {
      console.error("Failed to delete post:", error);
    },
  });

  if (!post) return null;

  const stopPropagation: MouseEventHandler<
    HTMLAnchorElement | SVGSVGElement
  > = (e) => {
    e.stopPropagation();
  };

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
    closeModal();
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDelete = () => {
    deletePostMutation.mutate();
    closeConfirmModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PostArticle post={post}>
      <div className="flex flex-col cursor-pointer sm:p-3 pt-4">
        <div className="flex">
          <div className="mr-3 w-10">
            <Link
              href={`/${post.profiles?.id}`}
              onClick={stopPropagation}
              className="relative block w-10 h-10 rounded-full"
            >
              <img
                src={post.profiles?.avatar_url!}
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full border"
              />
            </Link>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center mb-2 justify-between">
              <div className="flex items-center">
                <Link
                  href={`/${post.profiles?.id}`}
                  onClick={stopPropagation}
                  className="flex items-center"
                >
                  <div className="font-bold hover:underline mr-1">
                    {post.profiles?.user_name}
                  </div>
                  &nbsp;
                </Link>
                <div className="text-gray-500">
                  {dayjs(post.created_at).fromNow(true)}
                </div>
              </div>
              {userId === post.user_id && (
                <svg
                  onClick={(e) => {
                    stopPropagation(e);
                    toggleModal(e);
                  }}
                  aria-label="더 보기"
                  role="img"
                  viewBox="0 0 24 24"
                  className="cursor-pointer"
                  style={{ fill: "#6B7280", height: "24px", width: "24px" }}
                >
                  <title>더 보기</title>
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              )}
            </div>
            <div>{post.content}</div>
            <div className="mt-3">
              <PostImages post={post} />
            </div>
            <ActionButtons post={post} />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="absolute right-0 z-50 rounded-lg p-4 px-8 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="flex items-center w-full text-left py-2 hover:underline"
              onClick={() => {
                router.push(`/edit-post/${post.id}`);
                closeModal();
              }}
            >
              <span className="mr-2">수정</span>
              <PiPencil />
            </button>
            <button
              className="flex items-center w-full text-left py-2 hover:underline text-red-500"
              onClick={openConfirmModal}
            >
              <span className="mr-2">삭제</span>
              <RiDeleteBinLine />
            </button>
            <button
              className="flex items-center w-full text-left py-2 hover:underline"
              onClick={closeModal}
            >
              <span className="mr-2">취소</span>
              <IoIosCloseCircleOutline />
            </button>
          </div>
        )}

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          message="정말로 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={closeConfirmModal}
        />
      </div>
    </PostArticle>
  );
}
