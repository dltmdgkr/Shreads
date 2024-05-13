import { Tables } from "@/utils/database.types";
import { TypedSupabaseClient } from "@/utils/types";

export interface PostWithProfiles extends Tables<"posts"> {
  profiles: Tables<"profiles">;
}

export async function getFollowingPosts(client: TypedSupabaseClient) {
  return await client
    .from("posts")
    .select("*, profiles (*)")
    .returns<PostWithProfiles[]>();
}
