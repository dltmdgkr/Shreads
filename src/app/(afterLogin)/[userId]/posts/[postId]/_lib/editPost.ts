import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function editPost(updatedPost: {
  content: string;
  user_id: string;
  images: string[];
  post_id: string;
}) {
  const supabase = createClientComponentClient();

  // 기존 게시글 업데이트
  const { data: post, error: postError } = await supabase
    .from("posts")
    .update({ content: updatedPost.content })
    .eq("id", updatedPost.post_id)
    .select();

  if (postError) throw postError;
  if (!post || post.length === 0) throw new Error("Failed to update post");

  // 기존 이미지들 삭제 후 새 이미지 삽입
  const { error: deleteError } = await supabase
    .from("postImages")
    .delete()
    .eq("post_id", updatedPost.post_id);

  if (deleteError) throw deleteError;

  const imageInserts = updatedPost.images.map((imageUrl) => ({
    post_id: updatedPost.post_id,
    image_url: imageUrl,
  }));

  const { error: imageError } = await supabase
    .from("postImages")
    .insert(imageInserts);

  if (imageError) throw imageError;
}
