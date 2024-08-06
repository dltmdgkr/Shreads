"use client";

import { useState } from "react";
import FollowRecommends from "./_component/FollowRecommends";
import SearchForm from "./_component/SearchForm";

export default function Page() {
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
