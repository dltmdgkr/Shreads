import { redirect } from "next/navigation";
import { getSinglePost } from "../../_lib/getSinglePost";

interface Props {
  params: {
    postId: string;
  };
}

export default async function Page({ params: { postId } }: Props) {
  const post = await getSinglePost(postId);

  if (post.profiles?.user_name) {
    const encodedUserName = encodeURIComponent(post.profiles.user_name);
    redirect(`/${encodedUserName}/posts/${postId}`);
  }

  return null;
}
