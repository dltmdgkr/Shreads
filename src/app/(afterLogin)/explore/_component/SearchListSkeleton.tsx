import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchListSkeleton() {
  return (
    <div className="flex flex-col p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <Skeleton circle height={40} width={40} className="mr-4" />
        <div className="flex flex-col flex-1">
          <Skeleton width={120} height={20} />
          <Skeleton width={80} height={16} className="mt-1" />
        </div>
        <Skeleton width={80} height={30} />
      </div>
      <div className="mt-2">
        <Skeleton width={100} height={20} />
      </div>
    </div>
  );
}
