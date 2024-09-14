import { useFetchUser } from "@/app/(afterLogin)/_hook/useFetchUser";
import { Comment } from "@/model/Comment";
import { Post } from "@/model/Post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { PiPencil } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { deleteComment } from "../_lib/deleteComment";
import ConfirmModal from "@/app/(afterLogin)/_component/ConfirmModal";

export default function Comment({
  comment,
  post,
}: {
  comment: Comment;
  post: Post;
}) {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(comment.id, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["postsWithComments"] });
    },
    onError: (error) => {
      console.error("Failed to delete comment:", error);
    },
  });

  const stopPropagation: MouseEventHandler<
    HTMLAnchorElement | SVGSVGElement
  > = (e) => {
    e.stopPropagation();
  };

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
    closeModal();
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDelete = () => {
    deleteCommentMutation.mutate();
    closeConfirmModal();
  };

  return (
    <div className="flex items-start mt-3 pl-3 pb-3 border-b border-gray-200">
      <Link href={`/${comment.user_id}`}>
        <img
          src={comment.profiles.avatar_url!}
          alt="프로필 이미지"
          className="min-w-10 max-w-10 min-h-8 max-h-10 rounded-full mr-4 mt-1 border object-cover"
        />
      </Link>
      <div className="flex-col flex-1">
        <div className="flex md:w-[80vh] w-[40vw]">
          <div className="flex flex-1 items-center mb-1">
            <Link href={`/${comment.user_id}`}>
              <p className="font-bold mr-2 hover:underline">
                {comment.profiles.user_name}
              </p>
            </Link>
            <span className="text-gray-500 text-sm">
              {dayjs(comment?.created_at).fromNow(true)}
            </span>
          </div>
          {user?.id === comment.user_id && (
            <svg
              onClick={(e) => {
                stopPropagation(e);
                toggleModal(e);
              }}
              aria-label="더 보기"
              role="img"
              viewBox="0 0 24 24"
              className="cursor-pointer x1lliihq xffa9am x2lah0s x1jwls1v x1n2onr6 x17fnjtu x1gaogpn"
              style={{ fill: "#6B7280", height: "24px", width: "24px" }}
            >
              <title>더 보기</title>
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
          )}
        </div>
        <p className="text-gray-700 mb-2 whitespace-pre-line">
          {comment.content}
        </p>
        <div className="flex gap-2 overflow-x-auto md:w-[70vh] max-w-[50vw]">
          {comment.commentImages?.map((image) => (
            <img
              key={image.id}
              src={image.image_url!}
              alt="댓글 이미지"
              className="cursor-pointer rounded-lg border border-gray-300 object-cover min-w-24 min-h-24"
              onClick={() =>
                router.push(
                  `/${comment.profiles.user_name}/comments/${comment.id}/photo/${image.id}`
                )
              }
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="absolute right-0 z-50 rounded-lg p-4 px-8 bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="flex items-center w-full text-left py-2 hover:underline"
            onClick={() => {
              router.push(
                `/${post?.profiles?.user_name}/posts/${post?.id}/edit-comment/${comment.id}`
              );
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

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="정말로 삭제하시겠습니까?"
        onConfirm={handleDelete}
        onCancel={closeConfirmModal}
      />
    </div>
  );
}
