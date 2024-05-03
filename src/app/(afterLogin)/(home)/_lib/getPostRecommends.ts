// import { createClient } from "@/utils/supabase/client";

// export async function getPostRecommends({ pageParam }: { pageParam: number }) {
//   const supabase = createClient();
//   const { data, error }: any = supabase
//     .from("posts")
//     .select("*")
//     .range(pageParam, pageParam + 5);

//   if (error) {
//     throw error;
//   }

//   return data;
// }

export async function getPostRecommends({ pageParam }: { pageParam: number }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
