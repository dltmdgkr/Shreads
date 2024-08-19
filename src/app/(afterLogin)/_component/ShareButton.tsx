import { Post } from "@/model/Post";
import { MouseEventHandler, useEffect } from "react";
import { CiLocationArrow1 } from "react-icons/ci";

export default function ShareButton({ post }: { post: Post }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const Kakao = (window as any).Kakao;
      if (Kakao && !Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const stopPropagation: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const Kakao = (window as any).Kakao;
      if (Kakao) {
        const url = "https://shreads-x.vercel.app";
        const shareUrl = window.location.href;

        console.log("post", post);

        Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: "슈레드",
            description: post.content,
            imageUrl: url + post.postImages,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
          social: {
            likeCount: 10,
            commentCount: 20,
            sharedCount: 30,
          },
          buttons: [
            {
              title: "슈레드",
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          ],
        });
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        stopPropagation(e);
        handleShare();
      }}
      className="flex items-center justify-center w-9 h-9 bg-white border-none outline-none rounded-full cursor-pointer transition-colors duration-200 hover:bg-yellow-100"
    >
      <CiLocationArrow1 className="text-xl" />
    </button>
  );
}
