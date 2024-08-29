import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createBrowserSupabaseClient();

async function fetchUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return data;
  }

  throw new Error("User not found");
}

export function useFetchUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  return { user, loading: isLoading };
}
