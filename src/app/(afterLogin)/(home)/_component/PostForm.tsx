"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "../../_component/SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBoard } from "../_lib/postBoard";
import { useFetchUser } from "../../_component/_lib/hooks/useFetchUser";

export default function PostForm() {
  const supabase = createClientComponentClient();
  const imageRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { user } = useFetchUser();

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
        queryKey: ["posts", "followings"],
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
    <form
      className="hidden sm:flex m-3 border-solid border-b pb-2"
      onSubmit={onSubmit}
    >
      <div className="flex flex-1 items-center">
        <div className="mr-3">
          <img
            src={user.avatar_url}
            alt="profile_image"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex-grow">
          <TextareaAutosize
            className="w-full h-full border-0 focus:outline-none"
            placeholder="슈레드를 시작하세요!"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
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
        </div>
      </div>
      <div className="flex items-center ml-3">
        <input
          type="file"
          name="imageFiles"
          multiple
          hidden
          ref={imageRef}
          onChange={onUploadImages}
        />
        <button type="button" onClick={onClickButton} disabled={isUploading}>
          <svg
            className="w-6 h-6 text-gray-700"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
          </svg>
        </button>
        <SubmitButton disabled={content === "" || isUploading} />
      </div>
    </form>
  );
}
