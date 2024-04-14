export async function getUserInfo({
  queryKey,
}: {
  queryKey: [_1: string, _2: string];
}) {
  const [_1, username] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
    {
      next: {
        tags: ["users", username],
      },
    }
  );
  console.log("queryKey", queryKey);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
