"use client";

import { useEffect, useState } from "react";
import PhotoModalPrevButton from "./PhotoModalPrevButton";
import PhotoModalNextButton from "./PhotoModalNextButton";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[userId]/posts/[postId]/_lib/getSinglePost";
import Image from "next/image";

export default function PhotoModalPostImage({
  postId,
  photoId,
}: {
  postId: string;
  photoId: string;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: post } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost(postId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  useEffect(() => {
    if (post?.postImages) {
      const initialIndex = post.postImages.findIndex(
        (image) => image.id === +photoId
      );
      if (initialIndex !== -1) {
        setCurrentImageIndex(initialIndex);
      }
    }
  }, [post, photoId]);

  const handlePrevImage = () => {
    if (post?.postImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? post?.postImages.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (post?.postImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === post?.postImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (!postId || !post || !post?.postImages) {
    return null;
  }

  return (
    <>
      <PhotoModalPrevButton handlePrevImage={handlePrevImage} />
      <Image
        src={post?.postImages[currentImageIndex].image_url!}
        alt="게시글 이미지"
        width={800}
        height={800}
      />
      <PhotoModalNextButton handleNextImage={handleNextImage} />
    </>
  );
}
