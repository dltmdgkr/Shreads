// import { Post } from "@/model/Post";
// import { TypedSupabaseClient } from "@/utils/types";

// export async function getPostRecommends(client: TypedSupabaseClient) {
//   return await client
//     .from("posts")
//     .select("*, profiles (*), postImages (*), comments (*)")
//     .returns<Post[]>()
//     .order("created_at", { ascending: false });
// }

"use server";

import { Post } from "@/model/Post";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getPostRecommends() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles (*), postImages (*), comments (*)")
    .returns<Post[]>()
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    console.error("getPostRecommends 에러발생", error.message);
  }

  return data;
}
