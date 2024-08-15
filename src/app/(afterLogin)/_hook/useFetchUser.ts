import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

const supabase = createClientComponentClient();

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
