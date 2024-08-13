import { createServerSupabaseClient } from "@/utils/supabase/server";
import SinglePost from "../../[userId]/posts/[postId]/_component/SinglePost";

interface Props {
  params: {
    postId: string;
  };
}

export default async function EditPost({ params: { postId } }: Props) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <SinglePost postId={postId} userId={user?.id} />;
}
