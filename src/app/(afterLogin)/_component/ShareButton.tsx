import { Post } from "@/model/Post";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { MouseEventHandler, useEffect, useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";

export default function ShareButton({ post }: { post: Post }) {
  const supabase = createBrowserSupabaseClient();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Kakao = (window as any).Kakao;
      if (Kakao && !Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }

    if (post.postImages && post.postImages.length > 0) {
      const firstImage = post.postImages[0].image_url;
      if (firstImage) {
        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(firstImage);
        if (data) {
          setImageUrl(data.publicUrl);
        }
      }
    }
  }, [post.postImages]);

  const stopPropagation: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const Kakao = (window as any).Kakao;
      if (Kakao) {
        const url = "https://shreads-x.vercel.app";
        const shareUrl = window.location.href;

        Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: `shreads의 ${post.profiles.user_name}(@${
              post.profiles.email?.split("@")[0]
            })님`,
            description: post.content,
            imageUrl: imageUrl || url,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
          social: {
            likeCount: post.like_count,
            commentCount: post.comments.length,
          },
          buttons: [
            {
              title: "상세보기",
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
