import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        {/* 프로필 이미지 */}
        <Skeleton circle height={40} width={40} className="mr-3" />
        {/* 사용자 정보 */}
        <div className="flex flex-col flex-1">
          <Skeleton width={120} height={20} />
          <Skeleton width={80} height={16} className="mt-1" />
        </div>
      </div>
      {/* 게시글 내용 */}
      <Skeleton count={1} height={20} className="my-2" />
      {/* 게시글 이미지 */}
      <Skeleton height={200} width="100%" className="my-2" />
      {/* 액션 버튼들 */}
      <div className="flex justify-start gap-2">
        <Skeleton width={50} height={30} />
        <Skeleton width={50} height={30} />
        <Skeleton width={50} height={30} />
        <Skeleton width={50} height={30} />
      </div>
    </div>
  );
}
