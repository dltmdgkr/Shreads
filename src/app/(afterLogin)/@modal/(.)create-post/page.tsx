"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import SubmitButton from "../../_component/SubmitButton";
import { useFetchUser } from "../../_hook/useFetchUser";
import useDisableBodyScroll from "../../_hook/useDisableBodyScroll";

export default function CreatePostModal() {
  const { user } = useFetchUser();
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useDisableBodyScroll();

  const [content, setContent] = useState("");

  const onSubmit = () => {};

  const onClickClose = () => {
    router.back();
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="relative sm:max-w-[80vw] sm:min-w-[600px] bg-white rounded-lg flex flex-col">
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
        <form
          className="flex flex-col flex-1 bg-white rounded-full"
          onSubmit={onSubmit}
        >
          <div className="flex items-center py-3 px-4">
            <div className="w-10 h-10 mr-3">
              <img
                src={user.avatar_url}
                alt="프로필 이미지"
                className="w-full h-full rounded-full border"
              />
            </div>
            <div className="flex-1">
              <textarea
                className="w-full h-full border-0 outline-none text-lg"
                placeholder="슈레드를 시작하세요!"
                value={content}
                onChange={onChangeContent}
              />
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
                />
                <button
                  className="w-9 h-9 cursor-pointer flex items-center justify-center"
                  type="button"
                  onClick={onClickButton}
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
              <SubmitButton disabled={content === ""} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
