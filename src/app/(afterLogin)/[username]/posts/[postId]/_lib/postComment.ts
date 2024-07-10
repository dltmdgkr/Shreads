import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function postComment(newComment: {
  content: string;
  user_id: string;
  post_id: string;
  images: string[] | null;
}) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.from("comments").insert([
    {
      content: newComment.content,
      user_id: newComment.user_id,
      post_id: newComment.post_id,
      images: newComment.images,
    },
  ]);
  if (error) {
    throw error;
  }
  return data;
}
