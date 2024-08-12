// import { Tables } from "@/utils/database.types";
// import { TypedSupabaseClient } from "@/utils/types";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// export async function getUserInfo(client: TypedSupabaseClient) {
//   const supabase = createClientComponentClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return await client
//     .from("profiles")
//     .select("*")
//     .eq("id", user?.id!)
//     .returns<Tables<"profiles">[]>();
// }
