import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function postBoard(newPost: {
  content: string;
  user_id: string;
  images: string[];
}) {
  const supabase = createClientComponentClient();
  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert([
      {
        content: newPost.content,
        user_id: newPost.user_id,
      },
    ])
    .select();

  if (postError) throw postError;
  if (!post || post.length === 0) throw new Error("Failed to create post");

  const postId = post[0].id;

  const imageInserts = newPost.images.map((imageUrl) => ({
    post_id: postId,
    image_url: imageUrl,
  }));

  const { error: imageError } = await supabase
    .from("postImages")
    .insert(imageInserts);

  if (imageError) throw imageError;
}
