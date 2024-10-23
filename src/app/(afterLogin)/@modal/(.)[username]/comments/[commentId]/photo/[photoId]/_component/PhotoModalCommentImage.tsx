"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[userId]/posts/[postId]/_lib/getSinglePost";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import PhotoModalPrevButton from "@/app/(afterLogin)/@modal/(.)[username]/posts/[postId]/photo/[photoId]/_component/PhotoModalPrevButton";
import PhotoModalNextButton from "@/app/(afterLogin)/@modal/(.)[username]/posts/[postId]/photo/[photoId]/_component/PhotoModalNextButton";
import { getSingleComment } from "@/app/(afterLogin)/[userId]/posts/[postId]/_lib/getSingleComment";
import Image from "next/image";

export default function PhotoModalCommentImage({
  commentId,
  photoId,
}: {
  commentId: string;
  photoId: string;
}) {
  const supabase = createClientComponentClient();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: comment } = useQuery({
    queryKey: ["comments", commentId],
    queryFn: () => getSingleComment(supabase, commentId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  useEffect(() => {
    if (comment?.commentImages) {
      const initialIndex = comment?.commentImages.findIndex(
        (image) => image.id === +photoId
      );
      if (initialIndex !== -1) {
        setCurrentImageIndex(initialIndex);
      }
    }
  }, [comment, photoId]);

  const handlePrevImage = () => {
    if (comment?.commentImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? comment?.commentImages.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (comment?.commentImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === comment?.commentImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (!commentId || !comment || !comment?.commentImages) {
    return null;
  }

  return (
    <>
      <PhotoModalPrevButton handlePrevImage={handlePrevImage} />
      <Image
        src={comment?.commentImages[currentImageIndex].image_url!}
        alt="댓글 이미지"
        width={800}
        height={800}
      />
      <PhotoModalNextButton handleNextImage={handleNextImage} />
    </>
  );
}
