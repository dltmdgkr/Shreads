"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";
import FollowRecommends from "./FollowRecommends";
import { useDebounce } from "../../_hook/useDebounce";

export default function ExploreContainer() {
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce(search, 300);

  return (
    <>
      <SearchForm search={search} setSearch={setSearch} />
      <div className="mt-20">
        <FollowRecommends debouncedValue={debouncedValue} />
      </div>
    </>
  );
}
