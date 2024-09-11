"use client";

import { useCallback, useState } from "react";
import SearchForm from "./SearchForm";
import FollowRecommends from "./FollowRecommends";
import { useDebounce } from "../../_hook/useDebounce";

export default function ExploreContainer() {
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce(search, 300);

  const handleSetSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <>
      <SearchForm search={search} setSearch={handleSetSearch} />
      <div className="mt-20">
        <FollowRecommends debouncedValue={debouncedValue} />
      </div>
    </>
  );
}
