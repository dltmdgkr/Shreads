import { Post } from "@/model/Post";
import { TypedSupabaseClient } from "@/utils/types";

export async function getPostRecommends(client: TypedSupabaseClient) {
  return await client
    .from("posts")
    .select("*, profiles (*), postImages (*)")
    .returns<Post[]>();
}
