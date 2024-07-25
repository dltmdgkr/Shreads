import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function postLike(
  postId: number,
  userId: string,
  liked: boolean,
  like_count: number
) {
  const supabase = createClientComponentClient();
  const { data, error: getPostError } = await supabase
    .from("posts")
    .select("like_count")
    .eq("id", postId)
    .single();

  if (getPostError) {
    console.error("Error fetching post:", getPostError);
    throw getPostError;
  }

  const newLikeCount = liked ? data.like_count + 1 : data.like_count - 1;

  const { error: updatePostError } = await supabase
    .from("posts")
    .update({ like_count: newLikeCount, liked })
    .eq("id", postId);

  if (updatePostError) {
    console.error("Error updating post:", updatePostError);
    throw updatePostError;
  }
}
