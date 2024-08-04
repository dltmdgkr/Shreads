import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function postComment(newComment: {
  content: string;
  user_id: string;
  post_id: string;
  images: string[];
}) {
  const supabase = createClientComponentClient();
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .insert([
      {
        content: newComment.content,
        user_id: newComment.user_id,
        post_id: newComment.post_id,
      },
    ])
    .select()
    .single();

  if (commentError) {
    throw commentError;
  }

  const commentId = commentData.id;

  if (newComment.images.length > 0) {
    const imageInserts = newComment.images.map((image) => ({
      comment_id: commentId,
      image_url: image,
    }));

    const { error: imageError } = await supabase
      .from("commentImages")
      .insert(imageInserts);

    if (imageError) {
      throw imageError;
    }
  }

  return commentData;
}
