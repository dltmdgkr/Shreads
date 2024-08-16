import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getSinglePost } from "../../_lib/getSinglePost";

interface Props {
  params: {
    postId: string;
  };
}

export default async function Page({ params: { postId } }: Props) {
  const supabase = await createServerSupabaseClient();
  const post = await getSinglePost(supabase, postId);

  if (post.profiles?.user_name) {
    const encodedUserName = encodeURIComponent(post.profiles.user_name);
    redirect(`/${encodedUserName}/posts/${postId}`);
  }

  return null;
}
