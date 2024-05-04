// export async function getUserInfo({
//   queryKey,
// }: {
//   queryKey: [_1: string, _2: string];
// }) {
//   const [_1, username] = queryKey;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
//     {
//       next: {
//         tags: ["users", username],
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

import { Tables } from "@/utils/database.types";
import { TypedSupabaseClient } from "@/utils/types";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

export async function getUserInfo(client: TypedSupabaseClient) {
  const supabase = createClientComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await client
    .from("profiles")
    .select("*")
    .eq("id", user?.id!)
    .returns<Tables<"profiles">[]>();
}
