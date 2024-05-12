"use client";

import { useState } from "react";
import PhotoModalPrevButton from "./PhotoModalPrevButton";
import PhotoModalNextButton from "./PhotoModalNextButton";

export default function PhotoModalImage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const post = {
    // postId: 1,
    // content: string;
    // User: {
    //   id: string;
    //   name: string;
    //   image: string;
    // };
    // createdAt: Date;
    Images: ["/noneProfile.jpg", "/ElonMusk.png", "/nextjs.png"],
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.Images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.Images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <>
      <PhotoModalPrevButton handlePrevImage={handlePrevImage} />
      <img src={post.Images[currentImageIndex]} alt="" />
      <PhotoModalNextButton handleNextImage={handleNextImage} />
    </>
  );
}
