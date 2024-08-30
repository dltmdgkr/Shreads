import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RoomSkeleton() {
  return (
    <div className="p-4 flex flex-row cursor-pointer">
      <div className="relative mr-4">
        <Skeleton circle width={48} height={48} />
      </div>
      <div className="flex flex-col text-gray-700 text-base w-full">
        <div className="flex items-center">
          <Skeleton width={80} height={20} />
          <Skeleton width={50} height={20} />
        </div>
        <Skeleton width="100%" height={20} />
      </div>
    </div>
  );
}
