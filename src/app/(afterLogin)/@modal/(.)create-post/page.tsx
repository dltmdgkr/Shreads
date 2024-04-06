"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

export default function CreatePostModal() {
  const [content, setContent] = useState("");
  const imageRef = useRef(null);
  const router = useRouter();

  const onSubmit = () => {};
  const onClickClose = () => {
    router.back();
  };
  const onClickButton = () => {};
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const me = {
    id: "lee",
    image: "/noneProfile.jpg",
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="relative max-w-[80vw] min-w-[600px] bg-white rounded-lg flex flex-col">
        <button
          className="absolute top-0 left-3 w-9 h-9 rounded-full border-0 bg-white flex items-center justify-center"
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
                src={me.image}
                alt={me.id}
                className="w-full h-full rounded-full"
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
                  className="w-9 h-9 rounded-full border-0 cursor-pointer bg-blue-200 hover:bg-blue-300 flex items-center justify-center"
                  type="button"
                  onClick={onClickButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5.5A2.5 2.5 0 015.5 3h9A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9zm2-1.5A1.5 1.5 0 015.5 3h9a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 015 14.5v-9zM9 10a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm-1-7a1 1 0 100 2h5a1 1 0 100-2h-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <button
                className={`w-32 h-10 rounded-lg border-0 cursor-pointer ${
                  content
                    ? "bg-black text-white hover:bg-black"
                    : "bg-gray-300 text-gray-600"
                }`}
                disabled={!content}
              >
                게시하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
