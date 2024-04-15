export async function getSinglePost({
  queryKey,
}: {
  queryKey: [_1: string, _2: string];
}) {
  const [_1, postId] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
    {
      next: {
        tags: ["posts", postId],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
