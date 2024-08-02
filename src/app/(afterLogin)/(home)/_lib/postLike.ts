import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function postLike(postId: number, userId: string, liked: boolean) {
  const supabase = createClientComponentClient();

  if (liked) {
    // 좋아요 추가
    const { error: insertLikeError } = await supabase
      .from("likes")
      .insert([{ post_id: postId, user_id: userId }]);

    if (insertLikeError) {
      console.error("Error inserting like:", insertLikeError);
      throw insertLikeError;
    }
  } else {
    // 좋아요 제거
    const { error: deleteLikeError } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (deleteLikeError) {
      console.error("Error deleting like:", deleteLikeError);
      throw deleteLikeError;
    }
  }

  // 게시물의 like_count 업데이트
  const { count: likeCount, error: likeCountError } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (likeCountError) {
    console.error("Error fetching like count:", likeCountError);
    throw likeCountError;
  }

  const { error: updatePostError } = await supabase
    .from("posts")
    .update({ like_count: likeCount })
    .eq("id", postId);

  if (updatePostError) {
    console.error("Error updating post like count:", updatePostError);
    throw updatePostError;
  }
}
