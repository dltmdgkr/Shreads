"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "../../_component/SubmitButton";
import { useFetchUser } from "../../_hook/useFetchUser";
import useDisableBodyScroll from "../../_hook/useDisableBodyScroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBoard } from "../../(home)/_lib/postBoard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CreatePostModal() {
  const supabase = createClientComponentClient();
  const imageRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { user } = useFetchUser();
  const router = useRouter();
  useDisableBodyScroll();

  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<Array<string | null>>([]);
  const [isUploading, setIsUploading] = useState(false);

  const postData = useMutation({
    mutationFn: (newPost: {
      content: string;
      user_id: string;
      images: string[];
    }) => postBoard(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postData.mutate({
      content,
      user_id: user.id,
      images: preview.filter((url) => url !== null) as string[],
    });
    setContent("");
    setPreview([]);
    onClickClose();
  };

  const onClickClose = () => {
    router.back();
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
      alert(`Error removing image: ${JSON.stringify(error)}`);
    }
  };

  const onUploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      setIsUploading(true);

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
      alert(`Error uploading images: ${JSON.stringify(error)}`);
    } finally {
      setIsUploading(false);
    }
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="relative sm:max-w-[50vw] sm:min-w-[600px] min-w-[350px] bg-white rounded-lg flex flex-col">
        <button
          className="top-3 left-3 w-12 h-12 rounded-full border-0 bg-white flex items-center justify-center"
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
        <form className="w-full bg-white rounded-full" onSubmit={onSubmit}>
          <div className="flex pl-4 mb-2">
            <img
              src={user.avatar_url}
              alt="프로필 이미지"
              className="w-10 h-10 rounded-full mr-3 border"
            />
            <p className="font-bold">{user.user_name}</p>
          </div>
          <div className="flex items-center py-3 px-4">
            <div className="w-full overflow-scroll">
              <TextareaAutosize
                className="w-full border-0 outline-none text-lg"
                placeholder="슈레드를 시작하세요!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex gap-2 overflow-scroll scrollbar-hide">
                {preview?.map((v, index) =>
                  v ? (
                    <div key={index} className="relative">
                      <img
                        className="border rounded-lg"
                        src={v}
                        alt="미리보기"
                        style={{ minWidth: 150, minHeight: 150 }}
                      />
                      <div
                        onClick={() => onRemoveImage(index)}
                        className="absolute top-2 right-2 w-4 h-4 rounded-full border-none cursor-pointer bg-gray-300 bg-opacity-75 flex items-center justify-center"
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="text-white"
                        >
                          <g>
                            <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 py-3 px-4">
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  type="file"
                  name="imageFiles"
                  multiple
                  hidden
                  ref={imageRef}
                  onChange={onUploadImages}
                />
                <button
                  className="w-9 h-9 cursor-pointer flex items-center justify-center"
                  type="button"
                  onClick={onClickButton}
                  disabled={isUploading}
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </svg>
                </button>
              </div>
              <SubmitButton disabled={content === "" || isUploading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
