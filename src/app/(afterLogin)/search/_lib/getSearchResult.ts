type Props = {
  searchParams: { q: string };
};

export default async function getSearchResult({ searchParams }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchParams.q}`,
    {
      next: {
        tags: ["posts", "search", searchParams.q],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
