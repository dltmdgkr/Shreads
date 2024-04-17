export default async function getComments({
  queryKey,
}: {
  queryKey: [_1: string, _2: string, _3: string];
}) {
  const [_1, postId, _3] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/comments`,
    {
      next: {
        tags: ["posts", postId, "comments"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
