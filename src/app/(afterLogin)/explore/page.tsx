import FollowRecommends from "./_component/FollowRecommends";
import SearchForm from "./_component/SearchForm";

export default function Page() {
  return (
    <>
      <SearchForm q={""} />
      <div className="mt-[80px]">
        <FollowRecommends />
      </div>
    </>
  );
}
