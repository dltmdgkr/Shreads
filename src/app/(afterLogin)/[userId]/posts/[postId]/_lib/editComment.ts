import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function editComment(updatedComment: {
  content: string;
  user_id: string;
  post_id: string;
  comment_id: string;
  images: string[];
}) {
  const supabase = createClientComponentClient();
  const { data: comment, error: commentError } = await supabase
    .from("comments")
    .update({ content: updatedComment.content })
    .eq("id", updatedComment.comment_id)
    .select();

  if (commentError) {
    throw commentError;
  }
  if (!comment || comment.length === 0)
    throw new Error("Failed to update comment");

  const { error: deleteError } = await supabase
    .from("commentImages")
    .delete()
    .eq("comment_id", updatedComment.comment_id);

  if (deleteError) throw deleteError;

  const imageInserts = updatedComment.images.map((image) => ({
    comment_id: updatedComment.comment_id,
    image_url: image,
  }));

  const { error: imageError } = await supabase
    .from("commentImages")
    .insert(imageInserts);

  if (imageError) {
    throw imageError;
  }
}
