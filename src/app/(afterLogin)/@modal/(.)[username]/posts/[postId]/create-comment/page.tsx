"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { postComment } from "../../../../../[username]/posts/[postId]/_lib/postComment";
import TextareaAutosize from "react-textarea-autosize";
import { getSinglePost } from "../../../../../[username]/posts/[postId]/_lib/getSinglePost";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import SubmitButton from "@/app/(afterLogin)/_component/SubmitButton";
import { useDraggableScroll } from "@/app/(afterLogin)/_component/_lib/hooks/useDraggableScroll";
import { useFetchUser } from "@/app/(afterLogin)/_component/_lib/hooks/useFetchUser";

export default function CreateCommentModal({
  params,
}: {
  params: { postId: string };
}) {
  const { scrollRef, onDragStart, onDragEnd, onDragMove, onClick } =
    useDraggableScroll();
  const supabase = createClientComponentClient();
  const [preview, setPreview] = useState<Array<string | null>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { user } = useFetchUser();
  const router = useRouter();
  const { postId } = params;

  const { data: post } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost(supabase, postId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const [content, setContent] = useState("");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const commentData = useMutation({
    mutationFn: (newComment: {
      content: string;
      user_id: string;
      post_id: string;
      images: string[];
    }) => postComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", postId, "comments"],
      });
    },
  });

  const onClickClose = () => {
    router.back();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commentData.mutate({
      content,
      user_id: user.id,
      post_id: postId,
      images: preview.filter((url) => url !== null) as string[],
    });
    setContent("");
    setPreview([]);
    onClickClose();
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onRemoveImage = async (index: number) => {
    try {
      const imageUrl = preview[index];
      if (!imageUrl) return;
      const fileName = imageUrl.split("/").pop() as string;

      const { error } = await supabase.storage
        .from("images")
        .remove([fileName]);

      if (error) {
        throw error;
      }

      setPreview((prevPreview) => {
        const prev = [...prevPreview];
        prev[index] = null;
        return prev;
      });
    } catch (error) {
      alert("Error removing image!");
    }
  };

  const onUploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const uploadedUrls = await Promise.all(
        Array.from(event.target.files).map(async (file) => {
          const fileExt = file.name.split(".").pop();
          const filePath = `${Math.random()}.${fileExt}`;

          const { data, error: uploadError } = await supabase.storage
            .from("images")
            .upload(filePath, file);

          if (uploadError) {
            throw uploadError;
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("images").getPublicUrl(data!.path);
          return publicUrl;
        })
      );

      setPreview((prevPreview) => [...prevPreview, ...uploadedUrls]);
    } catch (error) {
      alert("Error uploading images!");
    }
  };

  const onClickButton = () => {
    inputRef.current?.click();
  };

  if (!postId) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="relative sm:max-w-[50vw] sm:min-w-[600px] bg-white rounded-xl flex flex-col">
        <button
          className="top-3 left-3 w-12 h-12 flex items-center justify-center"
          onClick={onClickClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 10l3.647-3.646a1 1 0 10-1.414-1.414L10.88 8.293 7.234 4.646a1 1 0 00-1.414 1.414L9.466 10l-3.647 3.646a1 1 0 101.414 1.414L10.88 11.707l3.647 3.647a1 1 0 101.414-1.414L12.293 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="pl-4">
          <div className="flex">
            <img
              src={post?.profiles.avatar_url!}
              alt="프로필 이미지"
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="font-bold mr-2">{post?.profiles.user_name}</p>
            <span className="text-gray-500">
              {dayjs(post?.created_at).fromNow(true)}
            </span>
          </div>
          <div className="pl-12">
            <div>{post?.content}</div>
            <div
              ref={scrollRef}
              onMouseDown={onDragStart}
              onMouseMove={onDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              className="flex gap-4 mt-4 overflow-scroll scrollbar-hide mr-4"
            >
              {post?.postImages?.map((image) => (
                <img
                  key={image.id}
                  src={image.image_url!}
                  alt="게시글 이미지"
                  style={{ width: 250, height: 300 }}
                  className="cursor-pointer rounded-lg border border-gray-300"
                />
              ))}
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex-col p-2 w-full items-center bg-white rounded-b-xl"
          >
            <div className="flex items-center mb-1">
              <img
                src={user.avatar_url}
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="font-bold mr-2">{user.user_name}</span>
            </div>
            <TextareaAutosize
              value={content}
              onChange={onChange}
              placeholder={`${post?.profiles.user_name}님에게 답글 남기기`}
              className="w-full focus:outline-none resize-none pl-12 mb-2"
            />
            <div className="flex">
              {preview.map(
                (v, index) =>
                  v && (
                    <div
                      className="flex-1"
                      key={index}
                      onClick={() => onRemoveImage(index)}
                    >
                      <img
                        className="w-[100%] object-contain max-h-24"
                        src={v}
                        alt="미리보기"
                      />
                    </div>
                  )
              )}
            </div>
            <div className="flex justify-end items-center w-full">
              <div className="flex-1 pl-12">
                <input
                  type="file"
                  name="imageFiles"
                  multiple
                  hidden
                  ref={inputRef}
                  onChange={onUploadImages}
                />
                <button type="button" onClick={onClickButton}>
                  <svg
                    className="w-6 h-6 text-gray-700"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </svg>
                </button>
              </div>
              <div className="mr-2 mb-5">
                <SubmitButton disabled={content === ""} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
