"use server";

import { Post } from "@/model/Post";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function getPostRecommends({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const supabase = await createServerSupabaseClient();

  const { data, error, count } = await supabase
    .from("posts")
    .select("*, profiles (*), postImages (*), comments (*)", { count: "exact" })
    .returns<Post[]>()
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error) {
    console.error("getPostRecommends 에러발생", error.message);
    return { data: [], hasNextPage: false };
  }

  const hasNextPage = count ? count > page * pageSize : false;

  return {
    data: data ?? [],
    page,
    pageSize,
    hasNextPage,
  };
}
