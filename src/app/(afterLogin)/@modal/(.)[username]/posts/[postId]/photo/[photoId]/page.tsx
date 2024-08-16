import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import PhotoModalPostImage from "./_component/PhotoModalPostImage";

export default async function PhotoModal({
  params,
}: {
  params: { postId: string; photoId: string };
}) {
  const { postId, photoId } = params;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black">
      <PhotoModalCloseButton />
      <PhotoModalPostImage postId={postId} photoId={photoId} />
    </div>
  );
}
