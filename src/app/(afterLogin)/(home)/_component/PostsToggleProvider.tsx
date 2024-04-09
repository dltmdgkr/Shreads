"use client";

import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface PostsToggleContextType {
  recommendPosts: boolean;
  setRecommendPosts: Dispatch<SetStateAction<boolean>>;
}

export const PostsToggleContext = createContext<PostsToggleContextType>({
  recommendPosts: true,
  setRecommendPosts: () => {},
});

export default function PostToggleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [recommendPosts, setRecommendPosts] = useState(true);

  return (
    <PostsToggleContext.Provider value={{ recommendPosts, setRecommendPosts }}>
      {children}
    </PostsToggleContext.Provider>
  );
}
