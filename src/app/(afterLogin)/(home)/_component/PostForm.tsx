"use client";

import { useRef } from "react";

export default function PostForm() {
  const imageRef = useRef<HTMLInputElement>(null);
  const me = {
    id: "lee",
    image: "/noneProfile.jpg",
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  return (
    <form className="flex m-3 border-solid border-b pb-2">
      <div className="flex flex-1 items-center">
        <div className="mr-3">
          <img
            src={me.image}
            alt="profile_image"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex-grow">
          <textarea
            className="w-full h-full border-0 focus:outline-none"
            placeholder="슈레드를 시작하세요!"
          />
        </div>
      </div>
      <div className="flex items-center ml-3">
        <input type="file" name="imageFiles" multiple hidden ref={imageRef} />
        <button
          type="button"
          onClick={onClickButton}
          className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
          </svg>
        </button>
        <button className="ml-3 py-2 px-4 rounded-lg bg-gray-300 text-white hover:bg-gray-400">
          게시
        </button>
      </div>
    </form>
  );
}
