import SearchForm from "../explore/_component/SearchForm";
import SearchResult from "./_component/SearchResult";

type Props = {
  searchParams: { q: string };
};

export default function Page({ searchParams }: Props) {
  console.log(searchParams);
  return (
    <>
      <SearchForm q={searchParams.q} />
      <div className="mt-[80px]">
        <SearchResult searchParams={searchParams} />
      </div>
    </>
  );
}
