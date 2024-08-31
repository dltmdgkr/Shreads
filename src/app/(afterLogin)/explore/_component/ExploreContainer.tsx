"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";
import FollowRecommends from "./FollowRecommends";

export default function ExploreContainer() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <SearchForm search={search} setSearch={setSearch} />
      <div className="mt-20">
        <FollowRecommends search={search} />
      </div>
    </>
  );
}
