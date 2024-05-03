// export default async function getFollowingPosts() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/followingPosts`,
//     {
//       next: {
//         tags: ["posts", "followings"],
//       },
//     }
//   );

import { Tables } from "@/utils/database.types";
import { TypedSupabaseClient } from "@/utils/types";

export interface PostWithProfiles extends Tables<"posts"> {
  profiles: Tables<"profiles">;
}

export async function getFollowingPosts(client: TypedSupabaseClient) {
  return await client
    .from("posts")
    .select("*, profiles (*)")
    // .returns<Tables<"posts"> & Tables<"profiles">[]>();
    .returns<PostWithProfiles[]>();
}
