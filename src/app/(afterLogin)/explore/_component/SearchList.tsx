import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { followUser } from "../_lib/followUser";
import { useFetchUser } from "../../_hook/useFetchUser";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function SearchList({ user }: { user: any }) {
  const supabase = createBrowserSupabaseClient();
  const { user: me } = useFetchUser();
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const fetchFollowerCount = async () => {
      // Supabase에서 팔로워 수를 가져오는 쿼리 실행
      const { data, error } = await supabase
        .from("follows")
        .select("follower_id", { count: "exact" })
        .eq("followed_id", user.id);

      if (error) {
        console.error("Error fetching follower count:", error);
      } else {
        // 팔로워 수 업데이트
        setFollowers(data.length);
      }
    };

    fetchFollowerCount();
  }, [user.id]);

  const queryClient = useQueryClient();

  const followMutationQuery = useMutation({
    mutationKey: ["users", "follows"],
    mutationFn: () => followUser(user.id, me.id, following),
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      console.log(queryKeys);
    },
    onError: (err, variables, context) => {
      console.error("Error updating like:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onClickFollow = () => {
    followMutationQuery.mutate();
    setFollowing((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <Link href={`/${user.id}`}>
          <div className="flex items-center">
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h2 className="text-md font-semibold">{user.user_name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </Link>
        <button
          onClick={onClickFollow}
          className={`border border-gray-300 text-sm py-1.5 px-8 rounded-xl ${
            following ? "text-gray-500" : "text-black"
          }`}
        >
          {following ? "팔로잉" : "팔로우"}
        </button>
      </div>
      <div className="ml-[70px] pb-3 border-b border-gray-200">
        <p>팔로워 {followers}명</p>
      </div>
    </div>
  );
}
