import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const fetchLikeStatus = async (userId: string, postId: number) => {
  if (!userId || !postId) {
    throw new Error("Invalid userId or postId");
  }

  const supabase = createBrowserSupabaseClient();
  const { data: likeData, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Error fetching like status: " + error.message);
  }

  return !!likeData;
};

export function useFetchLikes(userId: string, postId: number) {
  return useQuery({
    queryKey: ["likes", userId, postId],
    queryFn: () => fetchLikeStatus(userId, postId),
    enabled: !!userId && !!postId,
  });
}
