"use client";

import { TfiComment } from "react-icons/tfi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { CiHeart, CiLocationArrow1 } from "react-icons/ci";
import cx from "classnames";

export default function ActionButtons() {
  const commented = false;
  const reposted = false;
  const liked = true;

  const onClickComment = () => {};
  const onClickRepost = () => {};
  const onClickHeart = () => {};

  return (
    <div className="flex justify-between mt-3 space-x-1">
      <div className={cx("flex items-center", commented && "text-blue-500")}>
        <button
          onClick={onClickComment}
          className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-blue-100"
        >
          <TfiComment />
        </button>
        <div className="text-sm text-gray-600">{1 || ""}</div>
      </div>
      <div className={cx("flex items-center", reposted && "text-green-500")}>
        <button
          onClick={onClickRepost}
          className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-green-100"
        >
          <HiArrowPathRoundedSquare className="text-lg" />
        </button>
        <div className="text-sm text-gray-600">{1 || ""}</div>
      </div>
      <div className={cx("flex items-center", liked && "text-pink-500")}>
        <button
          onClick={onClickHeart}
          className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-pink-100"
        >
          <CiHeart className="text-lg" />
        </button>
        <div className="text-sm text-gray-600">{0 || ""}</div>
      </div>
      <div className="flex items-center">
        <button className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-yellow-100">
          <CiLocationArrow1 className="text-lg" />
        </button>
      </div>
    </div>
  );
}
