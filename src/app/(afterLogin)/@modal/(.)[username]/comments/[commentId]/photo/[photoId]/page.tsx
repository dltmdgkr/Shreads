import PhotoModalCloseButton from "../../../../posts/[postId]/photo/[photoId]/_component/PhotoModalCloseButton";
import PhotoModalCommentImage from "./_component/PhotoModalCommentImage";

export default async function PhotoModal({
  params,
}: {
  params: { commentId: string; photoId: string };
}) {
  const { commentId, photoId } = params;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black">
      <PhotoModalCloseButton />
      <PhotoModalCommentImage commentId={commentId} photoId={photoId} />
    </div>
  );
}
