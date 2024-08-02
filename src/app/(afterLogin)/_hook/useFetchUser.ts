// useFetchUser 훅 수정
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

export function useFetchUser() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState({
    avatar_url: "",
    user_name: "",
    id: "",
  });
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchAvatar = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
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
          if (data) setUser(data);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchAvatar();
  }, [supabase]);

  return { user, loading };
}
