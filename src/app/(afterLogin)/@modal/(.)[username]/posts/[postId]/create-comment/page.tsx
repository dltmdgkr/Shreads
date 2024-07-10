"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { postComment } from "../../../../../[username]/posts/[postId]/_lib/postComment";
import TextareaAutosize from "react-textarea-autosize";
import { getSinglePost } from "../../../../../[username]/posts/[postId]/_lib/getSinglePost";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function CreateCommentModal() {
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();
  const router = useRouter();
  const match = window.location.pathname.match(/\/posts\/(\d+)/);
  if (!match) return;
  const postId = match[1];

  const { data: post } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost(supabase, postId),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const [user, setUser] = useState({
    avatar_url: "",
    user_name: "",
    id: "",
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          if (error) throw error;
          if (data) setUser(data);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, []);

  const commentData = useMutation({
    mutationFn: (newComment: {
      content: string;
      user_id: string;
      post_id: string;
    }) => postComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", postId, "comments"],
      });
    },
  });

  const onClickClose = () => {
    router.back();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commentData.mutate({
      content,
      user_id: user.id,
      post_id: postId,
    });
    setContent("");
    onClickClose();
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="relative max-w-[50vw] min-w-[600px] bg-white rounded-xl flex flex-col">
        <button
          className="top-3 left-3 w-12 h-12 flex items-center justify-center"
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
        <div className="pl-4">
          <div className="flex">
            <img
              src={post?.profiles.avatar_url!}
              alt="프로필 이미지"
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="font-bold mr-2">{post?.profiles.user_name}</p>
            <span className="text-gray-500">
              {dayjs(post?.created_at).fromNow(true)}
            </span>
          </div>
          <div className="pl-12">
            <div>{post?.content}</div>
            <div className="flex gap-4 mt-4 overflow-scroll">
              {post?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="업로드 이미지"
                  style={{ width: 300, height: 300 }}
                  className="cursor-pointer rounded-lg border border-gray-300"
                />
              ))}
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex-col p-2 w-full items-center bg-white rounded-b-xl"
          >
            <div className="flex items-center mb-1">
              <img
                src={user.avatar_url}
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="font-bold mr-2">{user.user_name}</span>
            </div>
            <TextareaAutosize
              value={content}
              onChange={onChange}
              placeholder={`${post?.profiles.user_name}님에게 답글 남기기`}
              className="w-full focus:outline-none resize-none pl-12 mb-2"
            />
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className={`px-6 py-2 mr-2 mb-5 font-semibold border rounded-xl ${
                  content === ""
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-black border-gray-400"
                }`}
                disabled={content === ""}
              >
                게시
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
