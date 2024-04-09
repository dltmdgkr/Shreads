import SearchForm from "./_component/SearchForm";
import SearchList from "./_component/SearchList";

export default function Page() {
  return (
    <>
      <SearchForm />
      <div className="mt-[80px]">
        <SearchList />
        <SearchList />
        <SearchList />
        <SearchList />
        <SearchList />
      </div>
    </>
  );
}
