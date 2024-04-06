import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import PhotoModalImage from "./_component/PhotoModalImage";

export default function PhotoModal() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black">
      <PhotoModalCloseButton />
      <PhotoModalImage />
    </div>
  );
}
