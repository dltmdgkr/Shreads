import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

const fetchRepostStatus = async (userId: string, postId: number) => {
  if (!userId || !postId) {
    throw new Error("Invalid userId or postId");
  }

  const supabase = createClientComponentClient();
  const { data: repostData, error } = await supabase
    .from("reposts")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Error fetching like status: " + error.message);
  }

  return !!repostData;
};

export function useFetchReposts(userId: string, postId: number) {
  return useQuery({
    queryKey: ["reposts", userId, postId],
    queryFn: () => fetchRepostStatus(userId, postId),
    enabled: !!userId && !!postId,
  });
}
